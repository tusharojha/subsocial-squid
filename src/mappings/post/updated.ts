import {
  getBodySummary,
  getExperimentalFieldsFromIPFSContent,
  getJoinedList,
  getSyntheticEventName,
  getTweetDetailsEntity,
  isTweetDetailsIPFSValid
} from '../../common/utils';
import { Post, Account, EventName, Space, IpfsFetchLog } from '../../model';
import { getOrCreateAccount } from '../account';
import { updatePostsCountersInSpace } from '../space';
import { setActivity } from '../activity';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { PostUpdatedData, SpaceCountersAction } from '../../common/types';
import { Ctx } from '../../processor';
import { StorageDataManager } from '../../storage';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { ElasticSearchManager } from '../../elasticsearch';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';
import { createPostSlug } from '@subsocial/utils';

export async function postUpdated(
  ctx: Ctx,
  eventData: PostUpdatedData
): Promise<void> {
  const post = await getEntityWithRelations.post({
    postId: eventData.postId,
    ctx
  });
  if (!post) {
    new EntityProvideFailWarning(Post, eventData.postId, ctx, eventData);
    throw new CommonCriticalError();
  }

  const prevVisStateHidden = post.hidden;

  const storageDataManagerInst = StorageDataManager.getInstance(ctx);
  const postIpfsContent = await storageDataManagerInst.fetchIpfsContentByCid(
    'post',
    eventData.ipfsSrc,
    async (errorMsg: string | null) => {
      await ctx.store.save(
        new IpfsFetchLog({
          id: eventData.postId,
          cid: eventData.ipfsSrc,
          blockHeight: eventData.blockNumber,
          errorMsg: errorMsg
        })
      );
    }
  );

  const ownedByAccount = await getOrCreateAccount(
    post.ownedByAccount.id || eventData.accountId,
    ctx
  );

  if (typeof eventData.hidden === 'boolean') post.hidden = eventData.hidden;
  if (eventData.ipfsSrc) post.content = eventData.ipfsSrc;

  post.ownedByAccount = ownedByAccount;
  post.updatedAtTime = eventData.timestamp;

  if (postIpfsContent) {
    const bodySummary = getBodySummary(postIpfsContent.body);
    post.title = postIpfsContent.title ?? null;
    post.image = postIpfsContent.image ?? null;
    post.link = postIpfsContent.link ?? null;
    // post.format = postIpfsContent.format ?? null; // TODO check is it actual property
    post.format = null;
    post.canonical = postIpfsContent.canonical ?? null;
    post.body = postIpfsContent.body ?? null;
    post.summary = bodySummary.summary;
    post.isShowMore = bodySummary.isShowMore;
    post.slug =
      !postIpfsContent.title && !postIpfsContent.body
        ? eventData.postId
        : createPostSlug(eventData.postId, {
            title: postIpfsContent.title,
            body: postIpfsContent.body
          }) ?? null;
    // post.appId = postIpfsContent.appId ?? null;

    post.experimental =
      getExperimentalFieldsFromIPFSContent(postIpfsContent, 'post', ctx) ??
      null;

    if (postIpfsContent.tags) {
      post.tagsOriginal = getJoinedList(postIpfsContent.tags);
    }
    if (postIpfsContent.tweet) {
      post.tweetDetails = getTweetDetailsEntity(postIpfsContent.tweet);
      post.tweetId = isTweetDetailsIPFSValid(postIpfsContent.tweet)
        ? postIpfsContent.tweet.id
        : null;
    }

    // TODO Implementation is needed
    // const { meta } = postContent;
    // if (meta && !isEmptyArray(meta)) {
    //   post.proposalIndex = meta[0].proposalIndex;
    // }
  } else {
    post.slug = eventData.postId;
  }

  await ctx.store.save(post);

  ElasticSearchManager.index(ctx).addToQueue(post);

  await updatePostsCountersInSpace({
    space: post.space ?? null,
    post,
    isPrevVisStateHidden: prevVisStateHidden,
    action: SpaceCountersAction.PostUpdated,
    ctx
  });

  const syntheticEventName = getSyntheticEventName(EventName.PostUpdated, post);

  const activity = await setActivity({
    syntheticEventName,
    account: eventData.accountId,
    post,
    ctx,
    eventData
  });

  if (!activity) return;

  await NotificationsManager.getInstance().handleNotifications(
    syntheticEventName,
    {
      account: post.ownedByAccount,
      post,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post, account: post.ownedByAccount, activity, ctx }
  );
}
