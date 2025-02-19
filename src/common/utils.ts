import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

import * as ss58 from '@subsquid/ss58';
import md5 from 'md5';
import { EventHandlerContext } from './contexts';
import {
  EventName,
  PostKind,
  Post,
  TweetDetails,
  ReferencedTweetDetails,
  TweetAttachmentsDetails
} from '../model';
import { EventData, PostTweetDetailsIPFS } from './types';
import { summarizeMd } from '@subsocial/utils';
import { NamedLink } from '@subsocial/api/types/ipfs';
import { IpfsContent, supportedIpfsContent } from '../storage/types';
import { Ctx } from '../processor';
import { Entity } from '@subsquid/typeorm-store/lib/store';

let subsocialSs58CodecInst: ss58.Codec | null = null;

export const validateEventHandlerInputs = (ctx: EventHandlerContext) => {
  if (ctx.event.extrinsic === undefined) {
    throw new Error(`No extrinsic has been provided`);
  }
};

/**
 * Remove pallet name from event name. It's required for using in conditions
 * together with enum values "EventName" as enum value cannot be defined in
 * format "PalletName.EventName".
 * @param rawEventName
 */
export const decorateEventName = (rawEventName: string): string => {
  return rawEventName.split('.')[1];
};

export const getActivityEntityId = (
  blockNumber: string,
  indexInBlock: string,
  eventName: string | EventName
): string => {
  return `${blockNumber}-${indexInBlock}-${md5(eventName)}`;
};

export const getNotificationEntityId = (
  accountId: string,
  activityId: string
): string => {
  return `${accountId}-${activityId}`;
};

export const getAccountFollowersEntityId = (
  followerId: string,
  followingId: string
): string => {
  return `${followerId}-${followingId}`;
};

export const getNewsFeedEntityId = (
  accountId: string,
  activityId: string
): string => {
  return `${accountId}-${activityId}`;
};

export const getSpaceFollowersEntityId = (
  followerId: string,
  spaceId: string
): string => {
  return `${followerId}-${spaceId}`;
};

export const getPostFollowersEntityId = (
  followerId: string,
  postId: string
): string => {
  return `${followerId}-${postId}`;
};

export const getSubsocialSs58Codec = (): ss58.Codec => {
  if (!subsocialSs58CodecInst) subsocialSs58CodecInst = ss58.codec('subsocial');
  return subsocialSs58CodecInst;
};

export const addressSs58ToString = (address: Uint8Array) => {
  const codecInst = getSubsocialSs58Codec();
  return codecInst.encode(address);
};

export const addressStringToSs58 = (address: string): Uint8Array => {
  const codecInst = getSubsocialSs58Codec();
  return codecInst.decode(address);
};

export const ensurePositiveOrZeroValue = (inputValue: number): number => {
  return inputValue < 0 ? 0 : inputValue;
};

export const stringDateToTimestamp = (date: string | undefined) =>
  date && date !== '' && new Date(Number(date)).getTime();

export const getDateWithoutTime = (date: Date | undefined): Date | undefined =>
  date ? new Date(dayjs(date).format('YYYY-MM-DD')) : undefined;

export const getSyntheticEventName = (
  originEvent: EventName,
  post: Post
): EventName => {
  switch (originEvent) {
    case EventName.PostCreated:
      if (!post.rootPost) return EventName.PostCreated;
      if (post.rootPost && !post.parentPost) return EventName.CommentCreated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyCreated;
      break;

    case EventName.PostShared:
      if (!post.rootPost) return EventName.PostShared;
      if (post.rootPost && !post.parentPost) return EventName.CommentShared;
      if (post.rootPost && post.parentPost) return EventName.CommentReplyShared;
      break;

    case EventName.PostMoved:
      /**
       * Only RegularPost can be moved to another not "null" space
       */
      if (post.space) return EventName.PostMoved;

      if (!post.rootPost) return EventName.PostDeleted;
      if (post.rootPost && !post.parentPost) return EventName.CommentDeleted;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyDeleted;
      break;

    case EventName.PostUpdated:
      if (!post.rootPost) return EventName.PostUpdated;
      if (post.rootPost && !post.parentPost) return EventName.CommentUpdated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyUpdated;
      break;

    case EventName.PostReactionCreated:
      if (!post.rootPost) return EventName.PostReactionCreated;
      if (post.rootPost && !post.parentPost)
        return EventName.CommentReactionCreated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyReactionCreated;
      break;

    case EventName.PostReactionUpdated:
      if (!post.rootPost) return EventName.PostReactionUpdated;
      if (post.rootPost && !post.parentPost)
        return EventName.CommentReactionUpdated;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyReactionUpdated;
      break;

    case EventName.PostReactionDeleted:
      if (!post.rootPost) return EventName.PostReactionDeleted;
      if (post.rootPost && !post.parentPost)
        return EventName.CommentReactionDeleted;
      if (post.rootPost && post.parentPost)
        return EventName.CommentReplyReactionDeleted;
      break;

    default:
      return originEvent;
  }
  return originEvent;
};

export async function batchCaller<T>({
  srcList,
  handler,
  batchSize = 100,
  timeout = 0
}: {
  srcList: Array<T>;
  handler: (batch: Array<T>, batchIndex?: number) => Promise<void>;
  batchSize?: number;
  timeout?: number;
}) {
  const promises = [];
  let delayIndex = 1;

  while (srcList.length > 0) {
    const batch = srcList.splice(0, batchSize);
    promises.push(
      new Promise<void>(async (res) => {
        await new Promise<void>((waitRes) =>
          setTimeout(async () => {
            const batchIndex = delayIndex;
            await handler(batch, batchIndex);
            waitRes();
          }, delayIndex * timeout)
        );
        res();
      })
    );
    delayIndex++;
  }
  await Promise.all(promises);
}

export function getOrderedListByBlockNumber<T extends EventData>(
  eventsList: Array<T>
): Array<T> {
  return eventsList.sort((a, b) =>
    a.blockNumber < b.blockNumber ? -1 : b.blockNumber < a.blockNumber ? 1 : 0
  );
}

export function* splitIntoBatches<T>(
  list: T[],
  maxBatchSize: number
): Generator<T[]> {
  if (list.length <= maxBatchSize) {
    yield list;
  } else {
    let offset = 0;
    while (list.length - offset > maxBatchSize) {
      yield list.slice(offset, offset + maxBatchSize);
      offset += maxBatchSize;
    }
    yield list.slice(offset);
  }
}

export function getBodySummary(body: string | undefined | null): {
  summary: string | null;
  isShowMore: boolean;
} {
  const sum = {
    summary: null,
    isShowMore: false
  };
  if (!body) return sum;

  return summarizeMd(body);
}

export function getJoinedList(src: string[] | NamedLink[] | string) {
  if (!Array.isArray(src)) return src;
  return src
    .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
    .join(',');
}

export function isTweetDetailsIPFSValid(srcData: PostTweetDetailsIPFS | null) {
  return srcData && typeof srcData !== 'string';
}

export function getTweetDetailsEntity(
  srcData: PostTweetDetailsIPFS | null
): TweetDetails | null {
  if (!srcData || !isTweetDetailsIPFSValid(srcData)) return null;

  return new TweetDetails({
    createdAt: srcData.created_at,
    username: srcData.username ?? null,
    authorId: srcData.author_id ?? null,
    conversationId: srcData.conversation_id ?? null,
    inReplyToUserId: srcData.in_reply_to_user_id ?? null,
    lang: srcData.lang ?? null,
    editHistoryTweetIds: srcData.edit_history_tweet_ids ?? null,
    referencedTweets:
      srcData.referenced_tweets && Array.isArray(srcData.referenced_tweets)
        ? srcData.referenced_tweets.map(
            (i) => new ReferencedTweetDetails({ id: i.id, type: i.type })
          )
        : null,
    attachments:
      srcData.attachments &&
      (srcData.attachments.hasOwnProperty('media_keys') ||
        srcData.attachments.hasOwnProperty('poll_ids'))
        ? new TweetAttachmentsDetails({
            mediaKeys: srcData.attachments.media_keys ?? null,
            pollIds: srcData.attachments.poll_ids ?? null
          })
        : null
  });
}

export function getExperimentalFieldsFromIPFSContent<
  T extends 'post' | 'space'
>(srcData: IpfsContent<T>, entity: T, ctx: Ctx): Record<string, any> | null {
  const experimentalFields: Record<string, any> = {};

  try {
    for (const contentField of Object.getOwnPropertyNames(srcData)) {
      if (!supportedIpfsContent.get(entity)!.has(contentField))
        // @ts-ignore
        experimentalFields[contentField] = srcData[contentField]; // We should ignore type checking here as we don't know field name of experimental field.
    }
  } catch (e) {
    ctx.log.error(
      `Experimental fields cannot be extracted from IPFS content for entity "${entity}"`
    );
  }

  if (Object.getOwnPropertyNames(experimentalFields).length > 0)
    return experimentalFields;
  return null;
}

export function getEntityIdFromEntityOrString(
  entityOrString: Entity | string
): string {
  return typeof entityOrString === 'string'
    ? entityOrString
    : entityOrString.id;
}
