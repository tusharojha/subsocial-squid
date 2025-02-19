import { getSyntheticEventName } from '../../common/utils';
import { Account, Activity, EventName, Post } from '../../model';
import { getOrCreateAccount } from '../account';
import { updatePostsCountersInSpace } from '../space';
import { setActivity } from '../activity';
import { postFollowed } from '../postCommentFollows';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { PostCreatedData, SpaceCountersAction } from '../../common/types';
import { ensurePost } from './common';
import { Ctx } from '../../processor';
import { ElasticSearchManager } from '../../elasticsearch';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function postCreated(
  ctx: Ctx,
  eventData: PostCreatedData
): Promise<void> {
  const account = await getOrCreateAccount(eventData.accountId, ctx);

  const post = await ensurePost({
    postId: eventData.postId,
    ctx,
    eventData
  });

  await ctx.store.save(post);

  const syntheticEventName = getSyntheticEventName(EventName.PostCreated, post);

  ElasticSearchManager.index(ctx).addToQueue(post);

  post.ownedByAccount.ownedPostsCount += 1;

  await ctx.store.save(post.ownedByAccount);

  if (post.sharedPost) await handlePostShare(post, account, ctx, eventData);

  await updatePostsCountersInSpace({
    space: post.space ?? null,
    post,
    action: SpaceCountersAction.PostAdded,
    ctx
  });

  /**
   * Currently each post/comment/comment reply has initial follower as its creator.
   */
  await postFollowed(post, ctx);

  const activity = await setActivity({
    syntheticEventName,
    account,
    post,
    ctx,
    eventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
    return;
  }

  if (post.sharedPost) return;

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post, account, activity, ctx }
    );

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: post.ownedByAccount,
      post,
      activity,
      ctx
    }
    );
}

async function handlePostShare(
  newPost: Post,
  callerAccount: Account,
  ctx: Ctx,
  eventData: PostCreatedData
): Promise<void> {
  if (!newPost.sharedPost) return;

  const sharedPost = newPost.sharedPost;
  const syntheticEventName = getSyntheticEventName(
    EventName.PostShared,
    sharedPost
  );

  sharedPost.sharesCount += 1;

  await ctx.store.save(sharedPost);

  const activity = await setActivity({
    account: callerAccount,
    post: newPost,
    syntheticEventName,
    ctx,
    eventData
  });

  if (!activity) {
    new EntityProvideFailWarning(Activity, 'new', ctx, eventData);
    throw new CommonCriticalError();
  }

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: sharedPost.ownedByAccount,
      post: newPost,
      sharedPost,
      activity,
      ctx
    }
    );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post: newPost, account: newPost.ownedByAccount, activity, ctx }
    );
}
