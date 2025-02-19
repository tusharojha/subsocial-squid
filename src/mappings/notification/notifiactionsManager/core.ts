import { Ctx } from '../../../processor';
import { Account, EventName, Notification } from '../../../model';
import { EVENT_NOTIFICATION_RELATIONS } from './config';
import {
  NotificationAction,
  NotificationHandlerInputParams,
  NotificationHandlerParamsWithTarget,
  NotificationsHandlerBinderParams
} from '../types';

import { InvalidNotificationHandlerParamsForTargetWarn } from '../common';

import { notificationsHelpers } from './helpers';
import { In, Not } from 'typeorm';
import { FindManyOptions } from '@subsquid/typeorm-store/src/store';
import { getEntityIdFromEntityOrString } from '../../../common/utils';
import { getTargetAccForNotificationForAcc } from './utils';

export abstract class NotificationsHandlersManager {
  abstract addNotificationForAccount(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;
  abstract addNotificationForAccountFollowers(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;

  abstract deleteAllNotificationsAboutReaction(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;

  abstract deleteAllNotificationsAboutSpace(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;
  abstract deleteAllNotificationsAboutAccount(
    paramsWithTarget: NotificationHandlerParamsWithTarget
  ): Promise<void>;
}

export class NotificationsManager extends NotificationsHandlersManager {
  private static instance: NotificationsManager;

  private processorContext: Ctx | null = null;

  private handlersMatrix: Map<
    EventName,
    Array<(params: NotificationHandlerInputParams) => Promise<void>>
  > = new Map();

  static getInstance(): NotificationsManager {
    if (!NotificationsManager.instance) {
      NotificationsManager.instance = new NotificationsManager();
    }
    return NotificationsManager.instance;
  }

  constructor() {
    super();
    this.initHandlersMatrix();
  }

  public initHandlersMatrix() {
    for (const eventName in EVENT_NOTIFICATION_RELATIONS) {
      const handlersList = [];

      const handlerTargetsRel =
        EVENT_NOTIFICATION_RELATIONS[eventName as EventName];

      if (!handlerTargetsRel) continue;

      loopTargets: for (const handlerFuncName in handlerTargetsRel) {
        const targets =
          handlerTargetsRel![handlerFuncName as NotificationAction];
        if (!targets) continue loopTargets;

        for (const target of targets) {
          handlersList.push(
            (params: NotificationHandlerInputParams): Promise<void> =>
              this[handlerFuncName as NotificationAction]({ target, ...params })
          );
        }
      }

      this.handlersMatrix.set(eventName as EventName, handlersList);
    }
  }

  async handleNotifications<E extends EventName>(
    eventName: E,
    params: NotificationsHandlerBinderParams<E>
  ) {
    if (!this.handlersMatrix.has(eventName)) return;
    for (const handler of this.handlersMatrix.get(eventName)!) {
      // TODO remove type casting
      await handler(params as unknown as NotificationHandlerInputParams);
    }
  }

  async addNotificationForAccount(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    let targetAccount: Account | string | null =
      getTargetAccForNotificationForAcc(params);

    if (!targetAccount) return;

    await notificationsHelpers.add.one.forAccount(
      targetAccount,
      params.activity,
      params.ctx
    );
  }

  async addNotificationForAccountFollowers(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    const { target, space, activity, ctx } = params;

    let targetAccount: Account | string | null = null;

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'SpaceOwnerAccountFollowers': {
        if (!space || !space.ownedByAccount) {
          paramsWarning();
          break;
        }
        targetAccount = space.ownedByAccount;
        break;
      }
      default:
    }

    if (!targetAccount) return;

    await notificationsHelpers.add.one.forAccountFollowers(
      getEntityIdFromEntityOrString(targetAccount),
      activity,
      ctx
    );
  }

  async deleteAllNotificationsAboutReaction(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    const { target, post, activity, reaction, ctx } = params;

    let targetAccount: Account | string | null = null;

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'OriginPostOwner': {
        if (!post || !post.ownedByAccount) {
          paramsWarning();
          break;
        }
        targetAccount = post.ownedByAccount;
        break;
      }
      default:
    }

    if (!targetAccount || !reaction) return;

    await notificationsHelpers.remove.all.aboutReaction(
      targetAccount,
      reaction,
      ctx
    );
  }

  async deleteAllNotificationsAboutSpace(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    const { target, activity, account, space, ctx } = params;

    let targetAccount: Account | string | null = null;

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'SpaceFollowerAccount': {
        if (!account) {
          paramsWarning();
          break;
        }
        targetAccount = account;
        break;
      }
      default:
    }

    if (!targetAccount || !space) return;

    await notificationsHelpers.remove.all.aboutSpace(
      getEntityIdFromEntityOrString(targetAccount),
      space.id,
      ctx
    );
  }

  async deleteAllNotificationsAboutAccount(
    params: NotificationHandlerParamsWithTarget
  ): Promise<void> {
    const { target, activity, account, followingAccount, ctx } = params;

    let targetAccount: Account | string | null = null;
    let customQueryParams: FindManyOptions<Notification> = {};

    const paramsWarning = () => {
      InvalidNotificationHandlerParamsForTargetWarn(
        activity.event,
        target,
        ctx
      );
    };

    switch (target) {
      case 'FollowerAccount': {
        if (!followingAccount) {
          paramsWarning();
          break;
        }
        targetAccount = followingAccount;
        if (activity.event === EventName.AccountUnfollowed) {
          const accId = getEntityIdFromEntityOrString(account);
          const followingAccId =
            getEntityIdFromEntityOrString(followingAccount);

          customQueryParams = {
            where: [
              {
                account: { id: accId },
                activity: {
                  account: { id: followingAccId },
                  event: In([
                    EventName.AccountUnfollowed,
                    EventName.AccountFollowed,
                    EventName.SpaceFollowed,
                    EventName.SpaceUnfollowed,
                    EventName.SpaceUpdated,
                    EventName.SpaceCreated,
                    EventName.SpaceOwnershipTransferAccepted,
                    EventName.ProfileUpdated,
                    EventName.UserNameRegistered,
                    EventName.UserNameUpdated,
                    EventName.PostReactionCreated,
                    EventName.PostReactionUpdated,
                    EventName.PostReactionDeleted,
                    EventName.CommentReactionCreated,
                    EventName.CommentReactionUpdated,
                    EventName.CommentReactionDeleted,
                    EventName.CommentReplyReactionCreated,
                    EventName.CommentReplyReactionUpdated,
                    EventName.CommentReplyReactionDeleted,
                    EventName.PostFollowed,
                    EventName.PostUnfollowed
                  ])
                }
              },
              {
                account: { id: accId },
                activity: {
                  account: { id: followingAccId },
                  event: In([
                    EventName.PostShared,
                    EventName.CommentShared,
                    EventName.CommentReplyShared
                  ]),
                  post: {
                    ownedByAccount: { id: Not(accId) }
                  }
                }
              },
              {
                account: { id: accId },
                activity: {
                  account: { id: followingAccId },
                  event: In([
                    EventName.PostCreated,
                    EventName.CommentCreated,
                    EventName.CommentReplyCreated
                  ]),
                  post: {
                    space: {
                      ownedByAccount: { id: Not(accId) }
                    }
                  }
                }
              }
            ]
          };
        }
        break;
      }
      default:
    }

    if (!targetAccount) return;

    await notificationsHelpers.remove.all.aboutAccount(
      getEntityIdFromEntityOrString(account),
      getEntityIdFromEntityOrString(targetAccount),
      ctx,
      customQueryParams
    );
  }
}
