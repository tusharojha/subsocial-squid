import { ReactionKind, Post, Reaction, Activity, EventName } from '../../model';
import { setActivity } from '../activity';
import { getOrCreateAccount } from '../account';
import {
  ensurePositiveOrZeroValue,
  getSyntheticEventName
} from '../../common/utils';
import {
  CommonCriticalError,
  EntityProvideFailWarning
} from '../../common/errors';
import { Ctx } from '../../processor';
import { PostReactionUpdatedData } from '../../common/types';
import { getEntityWithRelations } from '../../common/gettersWithRelations';
import { NotificationsManager } from '../notification/notifiactionsManager';
import { FeedPublicationsManager } from '../newsFeed/feedPublicationsManager';

export async function postReactionUpdated(
  ctx: Ctx,
  eventData: PostReactionUpdatedData
): Promise<void> {
  const {
    accountId,
    reactionId,
    postId,
    newReactionKind,
    timestamp,
    blockNumber
  } = eventData;

  const account = await getOrCreateAccount(accountId, ctx);

  const reaction = await ctx.store.get(Reaction, reactionId);

  if (!reaction) {
    new EntityProvideFailWarning(Reaction, reactionId, ctx, eventData);
    throw new CommonCriticalError();
  }

  reaction.kind = newReactionKind;
  reaction.updatedAtTime = timestamp;
  reaction.updatedAtBlock = BigInt(blockNumber.toString());

  await ctx.store.save(reaction);

  const post = await getEntityWithRelations.post({ postId, ctx });

  if (!post) {
    new EntityProvideFailWarning(Post, postId, ctx, eventData);
    throw new CommonCriticalError();
  }

  if (reaction.kind === ReactionKind.Upvote) {
    post.upvotesCount += 1;
    post.downvotesCount = ensurePositiveOrZeroValue(post.downvotesCount - 1);
  } else if (reaction.kind === ReactionKind.Downvote) {
    post.downvotesCount += 1;
    post.upvotesCount = ensurePositiveOrZeroValue(post.upvotesCount - 1);
  }

  await ctx.store.save(post);

  const syntheticEventName = getSyntheticEventName(
    EventName.PostReactionUpdated,
    post
  );
  const activity = await setActivity({
    syntheticEventName,
    account,
    reaction,
    post,
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
      account: reaction.account,
      post,
      reaction,
      activity,
      ctx
    }
  );

  await FeedPublicationsManager.getInstance().handleFeedPublications(
    syntheticEventName,
    { post, account: reaction.account, reaction, activity, ctx }
  );
}
