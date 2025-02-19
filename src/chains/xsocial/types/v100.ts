import type {Result, Option} from './support'

export type MultiAddress = MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw | MultiAddress_Address32 | MultiAddress_Address20

export interface MultiAddress_Id {
    __kind: 'Id'
    value: Uint8Array
}

export interface MultiAddress_Index {
    __kind: 'Index'
    value: null
}

export interface MultiAddress_Raw {
    __kind: 'Raw'
    value: Uint8Array
}

export interface MultiAddress_Address32 {
    __kind: 'Address32'
    value: Uint8Array
}

export interface MultiAddress_Address20 {
    __kind: 'Address20'
    value: Uint8Array
}

export interface EquivocationProof {
    setId: bigint
    equivocation: Equivocation
}

export type Void = never

export type PostExtension = PostExtension_RegularPost | PostExtension_Comment | PostExtension_SharedPost

export interface PostExtension_RegularPost {
    __kind: 'RegularPost'
}

export interface PostExtension_Comment {
    __kind: 'Comment'
    value: Comment
}

export interface PostExtension_SharedPost {
    __kind: 'SharedPost'
    value: bigint
}

export type Content = Content_None | Content_Other | Content_IPFS

export interface Content_None {
    __kind: 'None'
}

export interface Content_Other {
    __kind: 'Other'
    value: Uint8Array
}

export interface Content_IPFS {
    __kind: 'IPFS'
    value: Uint8Array
}

export interface WhoAndWhen {
    account: Uint8Array
    block: number
    time: bigint
}

export interface PostUpdate {
    spaceId: (bigint | undefined)
    content: (Content | undefined)
    hidden: (boolean | undefined)
}

export type SpacePermission = SpacePermission_ManageRoles | SpacePermission_RepresentSpaceInternally | SpacePermission_RepresentSpaceExternally | SpacePermission_UpdateSpace | SpacePermission_CreateSubspaces | SpacePermission_UpdateOwnSubspaces | SpacePermission_DeleteOwnSubspaces | SpacePermission_HideOwnSubspaces | SpacePermission_UpdateAnySubspace | SpacePermission_DeleteAnySubspace | SpacePermission_HideAnySubspace | SpacePermission_CreatePosts | SpacePermission_UpdateOwnPosts | SpacePermission_DeleteOwnPosts | SpacePermission_HideOwnPosts | SpacePermission_UpdateAnyPost | SpacePermission_DeleteAnyPost | SpacePermission_HideAnyPost | SpacePermission_CreateComments | SpacePermission_UpdateOwnComments | SpacePermission_DeleteOwnComments | SpacePermission_HideOwnComments | SpacePermission_HideAnyComment | SpacePermission_Upvote | SpacePermission_Downvote | SpacePermission_Share | SpacePermission_OverrideSubspacePermissions | SpacePermission_OverridePostPermissions | SpacePermission_SuggestEntityStatus | SpacePermission_UpdateEntityStatus | SpacePermission_UpdateSpaceSettings

export interface SpacePermission_ManageRoles {
    __kind: 'ManageRoles'
}

export interface SpacePermission_RepresentSpaceInternally {
    __kind: 'RepresentSpaceInternally'
}

export interface SpacePermission_RepresentSpaceExternally {
    __kind: 'RepresentSpaceExternally'
}

export interface SpacePermission_UpdateSpace {
    __kind: 'UpdateSpace'
}

export interface SpacePermission_CreateSubspaces {
    __kind: 'CreateSubspaces'
}

export interface SpacePermission_UpdateOwnSubspaces {
    __kind: 'UpdateOwnSubspaces'
}

export interface SpacePermission_DeleteOwnSubspaces {
    __kind: 'DeleteOwnSubspaces'
}

export interface SpacePermission_HideOwnSubspaces {
    __kind: 'HideOwnSubspaces'
}

export interface SpacePermission_UpdateAnySubspace {
    __kind: 'UpdateAnySubspace'
}

export interface SpacePermission_DeleteAnySubspace {
    __kind: 'DeleteAnySubspace'
}

export interface SpacePermission_HideAnySubspace {
    __kind: 'HideAnySubspace'
}

export interface SpacePermission_CreatePosts {
    __kind: 'CreatePosts'
}

export interface SpacePermission_UpdateOwnPosts {
    __kind: 'UpdateOwnPosts'
}

export interface SpacePermission_DeleteOwnPosts {
    __kind: 'DeleteOwnPosts'
}

export interface SpacePermission_HideOwnPosts {
    __kind: 'HideOwnPosts'
}

export interface SpacePermission_UpdateAnyPost {
    __kind: 'UpdateAnyPost'
}

export interface SpacePermission_DeleteAnyPost {
    __kind: 'DeleteAnyPost'
}

export interface SpacePermission_HideAnyPost {
    __kind: 'HideAnyPost'
}

export interface SpacePermission_CreateComments {
    __kind: 'CreateComments'
}

export interface SpacePermission_UpdateOwnComments {
    __kind: 'UpdateOwnComments'
}

export interface SpacePermission_DeleteOwnComments {
    __kind: 'DeleteOwnComments'
}

export interface SpacePermission_HideOwnComments {
    __kind: 'HideOwnComments'
}

export interface SpacePermission_HideAnyComment {
    __kind: 'HideAnyComment'
}

export interface SpacePermission_Upvote {
    __kind: 'Upvote'
}

export interface SpacePermission_Downvote {
    __kind: 'Downvote'
}

export interface SpacePermission_Share {
    __kind: 'Share'
}

export interface SpacePermission_OverrideSubspacePermissions {
    __kind: 'OverrideSubspacePermissions'
}

export interface SpacePermission_OverridePostPermissions {
    __kind: 'OverridePostPermissions'
}

export interface SpacePermission_SuggestEntityStatus {
    __kind: 'SuggestEntityStatus'
}

export interface SpacePermission_UpdateEntityStatus {
    __kind: 'UpdateEntityStatus'
}

export interface SpacePermission_UpdateSpaceSettings {
    __kind: 'UpdateSpaceSettings'
}

export type User = User_Account | User_Space

export interface User_Account {
    __kind: 'Account'
    value: Uint8Array
}

export interface User_Space {
    __kind: 'Space'
    value: bigint
}

export interface RoleUpdate {
    disabled: (boolean | undefined)
    content: (Content | undefined)
    permissions: (SpacePermission[] | undefined)
}

export interface SpacePermissions {
    none: (SpacePermission[] | undefined)
    everyone: (SpacePermission[] | undefined)
    follower: (SpacePermission[] | undefined)
    spaceOwner: (SpacePermission[] | undefined)
}

export interface SpaceUpdate {
    content: (Content | undefined)
    hidden: (boolean | undefined)
    permissions: Option<(SpacePermissions | undefined)>
}

export type Call = Call_System | Call_Timestamp | Call_Grandpa | Call_Balances | Call_Sudo | Call_Spaces | Call_Roles | Call_SpaceFollows | Call_Posts

export interface Call_System {
    __kind: 'System'
    value: SystemCall
}

export interface Call_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Call_Grandpa {
    __kind: 'Grandpa'
    value: GrandpaCall
}

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Call_Spaces {
    __kind: 'Spaces'
    value: SpacesCall
}

export interface Call_Roles {
    __kind: 'Roles'
    value: RolesCall
}

export interface Call_SpaceFollows {
    __kind: 'SpaceFollows'
    value: SpaceFollowsCall
}

export interface Call_Posts {
    __kind: 'Posts'
    value: PostsCall
}

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export type Equivocation = Equivocation_Prevote | Equivocation_Precommit

export interface Equivocation_Prevote {
    __kind: 'Prevote'
    value: Type_88
}

export interface Equivocation_Precommit {
    __kind: 'Precommit'
    value: Type_94
}

export interface Comment {
    rootPostId: bigint
    parentId: (bigint | undefined)
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SystemCall = SystemCall_remark | SystemCall_set_heap_pages | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_storage | SystemCall_kill_storage | SystemCall_kill_prefix | SystemCall_remark_with_event

/**
 * Make some on-chain remark.
 * 
 * # <weight>
 * - `O(1)`
 * # </weight>
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Uint8Array
}

/**
 * Set the number of pages in the WebAssembly environment's heap.
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 * Set the new runtime code.
 * 
 * # <weight>
 * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
 * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
 *   expensive).
 * - 1 storage write (codec `O(C)`).
 * - 1 digest item.
 * - 1 event.
 * The weight of this function is dependent on the runtime, but generally this is very
 * expensive. We will treat this as a full block.
 * # </weight>
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Uint8Array
}

/**
 * Set the new runtime code without doing any checks of the given `code`.
 * 
 * # <weight>
 * - `O(C)` where `C` length of `code`
 * - 1 storage write (codec `O(C)`).
 * - 1 digest item.
 * - 1 event.
 * The weight of this function is dependent on the runtime. We will treat this as a full
 * block. # </weight>
 */
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Uint8Array
}

/**
 * Set some items of storage.
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Uint8Array, Uint8Array][]
}

/**
 * Kill some items from storage.
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Uint8Array[]
}

/**
 * Kill all storage items with a key that starts with the given prefix.
 * 
 * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
 * the prefix we are removing to accurately calculate the weight of this function.
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Uint8Array
    subkeys: number
}

/**
 * Make some on-chain remark and emit event.
 */
export interface SystemCall_remark_with_event {
    __kind: 'remark_with_event'
    remark: Uint8Array
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type TimestampCall = TimestampCall_set

/**
 * Set the current time.
 * 
 * This call should be invoked exactly once per block. It will panic at the finalization
 * phase, if this call hasn't been invoked by that time.
 * 
 * The timestamp should be greater than the previous one by the amount specified by
 * `MinimumPeriod`.
 * 
 * The dispatch origin for this call must be `Inherent`.
 * 
 * # <weight>
 * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
 * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
 *   `on_finalize`)
 * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
 * # </weight>
 */
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type GrandpaCall = GrandpaCall_report_equivocation | GrandpaCall_report_equivocation_unsigned | GrandpaCall_note_stalled

/**
 * Report voter equivocation/misbehavior. This method will verify the
 * equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence
 * will be reported.
 */
export interface GrandpaCall_report_equivocation {
    __kind: 'report_equivocation'
    equivocationProof: EquivocationProof
    keyOwnerProof: Void
}

/**
 * Report voter equivocation/misbehavior. This method will verify the
 * equivocation proof and validate the given key ownership proof
 * against the extracted offender. If both are valid, the offence
 * will be reported.
 * 
 * This extrinsic must be called unsigned and it is expected that only
 * block authors will call it (validated in `ValidateUnsigned`), as such
 * if the block author is defined it will be defined as the equivocation
 * reporter.
 */
export interface GrandpaCall_report_equivocation_unsigned {
    __kind: 'report_equivocation_unsigned'
    equivocationProof: EquivocationProof
    keyOwnerProof: Void
}

/**
 * Note that the current authority set of the GRANDPA finality gadget has stalled.
 * 
 * This will trigger a forced authority set change at the beginning of the next session, to
 * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
 * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
 * The block production rate (which may be slowed down because of finality lagging) should
 * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
 * authority will start voting on top of `best_finalized_block_number` for new finalized
 * blocks. `best_finalized_block_number` should be the highest of the latest finalized
 * block of all validators of the new authority set.
 * 
 * Only callable by root.
 */
export interface GrandpaCall_note_stalled {
    __kind: 'note_stalled'
    delay: number
    bestFinalizedBlockNumber: number
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type BalancesCall = BalancesCall_transfer | BalancesCall_set_balance | BalancesCall_force_transfer | BalancesCall_transfer_keep_alive | BalancesCall_transfer_all | BalancesCall_force_unreserve

/**
 * Transfer some liquid free balance to another account.
 * 
 * `transfer` will set the `FreeBalance` of the sender and receiver.
 * If the sender's account is below the existential deposit as a result
 * of the transfer, the account will be reaped.
 * 
 * The dispatch origin for this call must be `Signed` by the transactor.
 * 
 * # <weight>
 * - Dependent on arguments but not critical, given proper implementations for input config
 *   types. See related functions below.
 * - It contains a limited number of reads and writes internally and no complex
 *   computation.
 * 
 * Related functions:
 * 
 *   - `ensure_can_withdraw` is always called internally but has a bounded complexity.
 *   - Transferring balances to accounts that did not exist before will cause
 *     `T::OnNewAccount::on_new_account` to be called.
 *   - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
 *   - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
 *     that the transfer will not kill the origin account.
 * ---------------------------------
 * - Origin account is already in memory, so no DB operations for them.
 * # </weight>
 */
export interface BalancesCall_transfer {
    __kind: 'transfer'
    dest: MultiAddress
    value: bigint
}

/**
 * Set the balances of a given account.
 * 
 * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
 * also alter the total issuance of the system (`TotalIssuance`) appropriately.
 * If the new free or reserved balance is below the existential deposit,
 * it will reset the account nonce (`frame_system::AccountNonce`).
 * 
 * The dispatch origin for this call is `root`.
 */
export interface BalancesCall_set_balance {
    __kind: 'set_balance'
    who: MultiAddress
    newFree: bigint
    newReserved: bigint
}

/**
 * Exactly as `transfer`, except the origin must be root and the source account may be
 * specified.
 * # <weight>
 * - Same as transfer, but additional read and write because the source account is not
 *   assumed to be in the overlay.
 * # </weight>
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * Same as the [`transfer`] call, but with a check that the transfer will not kill the
 * origin account.
 * 
 * 99% of the time you want [`transfer`] instead.
 * 
 * [`transfer`]: struct.Pallet.html#method.transfer
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: MultiAddress
    value: bigint
}

/**
 * Transfer the entire transferable balance from the caller account.
 * 
 * NOTE: This function only attempts to transfer _transferable_ balances. This means that
 * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
 * transferred by this function. To ensure that this function results in a killed account,
 * you might need to prepare the account by removing any reference counters, storage
 * deposits, etc...
 * 
 * The dispatch origin of this call must be Signed.
 * 
 * - `dest`: The recipient of the transfer.
 * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
 *   of the funds the account has, causing the sender account to be killed (false), or
 *   transfer everything except at least the existential deposit, which will guarantee to
 *   keep the sender account alive (true). # <weight>
 * - O(1). Just like transfer, but reading the user's transferable balance first.
 *   #</weight>
 */
export interface BalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: MultiAddress
    keepAlive: boolean
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
    amount: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SudoCall = SudoCall_sudo | SudoCall_sudo_unchecked_weight | SudoCall_set_key | SudoCall_sudo_as

/**
 * Authenticates the sudo key and dispatches a function call with `Root` origin.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - Limited storage reads.
 * - One DB write (event).
 * - Weight of derivative `call` execution + 10,000.
 * # </weight>
 */
export interface SudoCall_sudo {
    __kind: 'sudo'
    call: Call
}

/**
 * Authenticates the sudo key and dispatches a function call with `Root` origin.
 * This function does not check the weight of the call, and instead allows the
 * Sudo user to specify the weight of the call.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - The weight of this call is defined by the caller.
 * # </weight>
 */
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Call
    weight: Weight
}

/**
 * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
 * key.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - Limited storage reads.
 * - One DB change.
 * # </weight>
 */
export interface SudoCall_set_key {
    __kind: 'set_key'
    new: MultiAddress
}

/**
 * Authenticates the sudo key and dispatches a function call with `Signed` origin from
 * a given account.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - Limited storage reads.
 * - One DB write (event).
 * - Weight of derivative `call` execution + 10,000.
 * # </weight>
 */
export interface SudoCall_sudo_as {
    __kind: 'sudo_as'
    who: MultiAddress
    call: Call
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SpacesCall = SpacesCall_create_space | SpacesCall_update_space | SpacesCall_force_create_space | SpacesCall_force_set_next_space_id

export interface SpacesCall_create_space {
    __kind: 'create_space'
    content: Content
    permissionsOpt: (SpacePermissions | undefined)
}

export interface SpacesCall_update_space {
    __kind: 'update_space'
    spaceId: bigint
    update: SpaceUpdate
}

export interface SpacesCall_force_create_space {
    __kind: 'force_create_space'
    spaceId: bigint
    created: WhoAndWhen
    owner: Uint8Array
    content: Content
    hidden: boolean
    permissionsOpt: (SpacePermissions | undefined)
}

export interface SpacesCall_force_set_next_space_id {
    __kind: 'force_set_next_space_id'
    spaceId: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type RolesCall = RolesCall_create_role | RolesCall_update_role | RolesCall_delete_role | RolesCall_grant_role | RolesCall_revoke_role | RolesCall_force_create_role | RolesCall_force_grant_role | RolesCall_force_set_next_role_id

/**
 * Create a new role, with a list of permissions, within a given space.
 * 
 * `content` can optionally contain additional information associated with a role,
 * such as a name, description, and image for a role. This may be useful for end users.
 * 
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_create_role {
    __kind: 'create_role'
    spaceId: bigint
    timeToLive: (number | undefined)
    content: Content
    permissions: SpacePermission[]
}

/**
 * Update an existing role by a given id.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_update_role {
    __kind: 'update_role'
    roleId: bigint
    update: RoleUpdate
}

/**
 * Delete a given role and clean all associated storage items.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_delete_role {
    __kind: 'delete_role'
    roleId: bigint
    userCount: number
}

/**
 * Grant a given role to a list of users.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_grant_role {
    __kind: 'grant_role'
    roleId: bigint
    users: User[]
}

/**
 * Revoke a given role from a list of users.
 * Only the space owner or a user with `ManageRoles` permission can call this dispatch.
 */
export interface RolesCall_revoke_role {
    __kind: 'revoke_role'
    roleId: bigint
    users: User[]
}

export interface RolesCall_force_create_role {
    __kind: 'force_create_role'
    created: WhoAndWhen
    roleId: bigint
    spaceId: bigint
    disabled: boolean
    content: Content
    permissions: SpacePermission[]
}

export interface RolesCall_force_grant_role {
    __kind: 'force_grant_role'
    roleId: bigint
    users: User[]
}

export interface RolesCall_force_set_next_role_id {
    __kind: 'force_set_next_role_id'
    roleId: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SpaceFollowsCall = SpaceFollowsCall_follow_space | SpaceFollowsCall_unfollow_space | SpaceFollowsCall_force_follow_space

export interface SpaceFollowsCall_follow_space {
    __kind: 'follow_space'
    spaceId: bigint
}

export interface SpaceFollowsCall_unfollow_space {
    __kind: 'unfollow_space'
    spaceId: bigint
}

export interface SpaceFollowsCall_force_follow_space {
    __kind: 'force_follow_space'
    follower: Uint8Array
    spaceId: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type PostsCall = PostsCall_create_post | PostsCall_update_post | PostsCall_move_post | PostsCall_force_create_post | PostsCall_force_remove_post | PostsCall_force_set_next_post_id

export interface PostsCall_create_post {
    __kind: 'create_post'
    spaceIdOpt: (bigint | undefined)
    extension: PostExtension
    content: Content
}

export interface PostsCall_update_post {
    __kind: 'update_post'
    postId: bigint
    update: PostUpdate
}

export interface PostsCall_move_post {
    __kind: 'move_post'
    postId: bigint
    newSpaceId: (bigint | undefined)
}

export interface PostsCall_force_create_post {
    __kind: 'force_create_post'
    postId: bigint
    created: WhoAndWhen
    owner: Uint8Array
    extension: PostExtension
    spaceIdOpt: (bigint | undefined)
    content: Content
    hidden: boolean
    upvotesCount: number
    downvotesCount: number
}

export interface PostsCall_force_remove_post {
    __kind: 'force_remove_post'
    postId: bigint
}

export interface PostsCall_force_set_next_post_id {
    __kind: 'force_set_next_post_id'
    postId: bigint
}

export interface Type_88 {
    roundNumber: bigint
    identity: Uint8Array
    first: [Prevote, Uint8Array]
    second: [Prevote, Uint8Array]
}

export interface Type_94 {
    roundNumber: bigint
    identity: Uint8Array
    first: [Precommit, Uint8Array]
    second: [Precommit, Uint8Array]
}

export interface Prevote {
    targetHash: Uint8Array
    targetNumber: number
}

export interface Precommit {
    targetHash: Uint8Array
    targetNumber: number
}
