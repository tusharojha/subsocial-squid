import { Block, ChainContext, Event } from '../subsocial/types/support';
import {
  AccountFollowedEventParsedData,
  AccountUnfollowedEventParsedData,
  CreatedSpaceEventParsedData,
  CreatePostCallParsedData,
  CreatePostEventParsedData,
  CreateSpaceCallParsedData,
  EventContext,
  MovedPostEventParsedData,
  MovePostCallParsedData,
  PostReactionCreateCallParsedData,
  PostReactionCreatedEventParsedData,
  PostReactionDeleteCallParsedData,
  PostReactionDeletedEventParsedData,
  PostReactionUpdateCallParsedData,
  PostReactionUpdatedEventParsedData,
  ProfileUpdatedEventParsedData,
  SpaceFollowedEventParsedData,
  SpaceOwnershipTransferAcceptedEventParsedData,
  SpaceUnfollowedEventParsedData,
  UpdatedSpaceEventParsedData,
  UpdatePostCallParsedData,
  UpdatePostEventParsedData,
  UpdateSpaceCallParsedData
} from '../../common/types';
import * as v7 from '../subsocial/types/v7';
import { InnerValue } from './sharedTypes';

export type ChainApi = {
  events: {
    parsePostCreatedEventArgs?: EventGetter<CreatePostEventParsedData>;
    parsePostUpdatedEventArgs?: EventGetter<UpdatePostEventParsedData>;
    parsePostMovedEventArgs?: EventGetter<MovedPostEventParsedData>;
    parseSpaceCreatedEventArgs?: EventGetter<CreatedSpaceEventParsedData>;
    parseSpaceUpdatedEventArgs?: EventGetter<UpdatedSpaceEventParsedData>;
    parsePostReactionCreatedEventArgs?: EventGetter<PostReactionCreatedEventParsedData>;
    parsePostReactionUpdatedEventArgs?: EventGetter<PostReactionUpdatedEventParsedData>;
    parsePostReactionDeletedEventArgs?: EventGetter<PostReactionDeletedEventParsedData>;
    parseProfileUpdatedEventArgs?: EventGetter<ProfileUpdatedEventParsedData>;
    parseSpaceFollowedEventArgs?: EventGetter<SpaceFollowedEventParsedData>;
    parseSpaceUnfollowedEventArgs?: EventGetter<SpaceUnfollowedEventParsedData>;
    parseSpaceOwnershipTransferAcceptedEventArgs?: EventGetter<SpaceOwnershipTransferAcceptedEventParsedData>;
    parseAccountFollowedEventArgs?: EventGetter<AccountFollowedEventParsedData>;
    parseAccountUnfollowedEventArgs?: EventGetter<AccountUnfollowedEventParsedData>;
  };
  calls: {
    parsePostCreatedCallArgs?: CallGetter<CreatePostCallParsedData>;
    parsePostUpdatedCallArgs?: CallGetter<UpdatePostCallParsedData>;
    parsePostMoveCallArgs?: CallGetter<MovePostCallParsedData>;
    parseSpaceCreateCallArgs?: CallGetter<CreateSpaceCallParsedData>;
    parseSpaceUpdateCallArgs?: CallGetter<UpdateSpaceCallParsedData>;
    parsePostReactionCreateCallArgs?: CallGetter<PostReactionCreateCallParsedData>;
    parsePostReactionUpdateCallArgs?: CallGetter<PostReactionUpdateCallParsedData>;
    parsePostReactionDeleteCallArgs?: CallGetter<PostReactionDeleteCallParsedData>;
  };
  storage: {
    getSpacesHandle: StorageGetter<
      [[Uint8Array, InnerValue] | [Uint8Array, InnerValue][]],
      (Uint8Array | undefined)[] | Uint8Array | undefined
    >;
  };
};

type EventGetter<R> = (ctx: EventContext) => R;
type CallGetter<R> = (ctx: EventContext) => R;
type StorageGetter<T extends Array<any>, R> = (
  ctx: ChainContext,
  block: Block,
  ...args: T
) => Promise<R>;

export type ChainName = 'subsocial' | 'soonsocial';

type SubsocialChainEvents =
  | 'parsePostCreatedEventArgs'
  | 'parsePostUpdatedEventArgs'
  | 'parsePostMovedEventArgs'
  | 'parseSpaceCreatedEventArgs'
  | 'parseSpaceUpdatedEventArgs'
  | 'parsePostReactionCreatedEventArgs'
  | 'parsePostReactionUpdatedEventArgs'
  | 'parsePostReactionDeletedEventArgs'
  | 'parseProfileUpdatedEventArgs'
  | 'parseSpaceFollowedEventArgs'
  | 'parseSpaceUnfollowedEventArgs'
  | 'parseSpaceOwnershipTransferAcceptedEventArgs'
  | 'parseAccountFollowedEventArgs'
  | 'parseAccountUnfollowedEventArgs';

type SoonsocialChainEvents =
  | 'parsePostCreatedEventArgs'
  | 'parsePostUpdatedEventArgs'
  | 'parsePostMovedEventArgs'
  | 'parseSpaceCreatedEventArgs'
  | 'parseSpaceUpdatedEventArgs'
  | 'parsePostReactionCreatedEventArgs'
  | 'parsePostReactionUpdatedEventArgs'
  | 'parsePostReactionDeletedEventArgs'
  | 'parseProfileUpdatedEventArgs'
  | 'parseSpaceFollowedEventArgs'
  | 'parseSpaceUnfollowedEventArgs'
  | 'parseSpaceOwnershipTransferAcceptedEventArgs'
  | 'parseAccountFollowedEventArgs'
  | 'parseAccountUnfollowedEventArgs';

type SubsocialChainStorageCalls = 'getSpacesHandle';
type SoonsocialChainStorageCalls = 'getSpacesHandle';

type SubsocialChainCalls =
  | 'parsePostCreatedCallArgs'
  | 'parsePostUpdatedCallArgs'
  | 'parsePostMoveCallArgs'
  | 'parseSpaceCreateCallArgs'
  | 'parseSpaceUpdateCallArgs'
  | 'parsePostReactionCreateCallArgs'
  | 'parsePostReactionUpdateCallArgs'
  | 'parsePostReactionDeleteCallArgs';

type SoonsocialChainCalls =
  | 'parsePostCreatedCallArgs'
  | 'parsePostUpdatedCallArgs'
  | 'parsePostMoveCallArgs'
  | 'parseSpaceCreateCallArgs'
  | 'parseSpaceUpdateCallArgs'
  | 'parsePostReactionCreateCallArgs'
  | 'parsePostReactionUpdateCallArgs'
  | 'parsePostReactionDeleteCallArgs';

export type ChainApiDecorated<C> = {
  events: C extends 'subsocial'
    ? Required<Pick<ChainApi['events'], SubsocialChainEvents>>
    : C extends 'soonsocial'
    ? Required<Pick<ChainApi['events'], SoonsocialChainEvents>>
    : any;
  calls: C extends 'subsocial'
    ? Required<Pick<ChainApi['calls'], SubsocialChainCalls>>
    : C extends 'soonsocial'
    ? Required<Pick<ChainApi['calls'], SoonsocialChainCalls>>
    : any;
  storage: C extends 'subsocial'
    ? Required<Pick<ChainApi['storage'], SubsocialChainStorageCalls>>
    : C extends 'soonsocial'
    ? Required<Pick<ChainApi['storage'], SoonsocialChainStorageCalls>>
    : any;
};

export type ApiDecorator = <C extends ChainName>(
  chainName: C
) => ChainApiDecorated<C>;
