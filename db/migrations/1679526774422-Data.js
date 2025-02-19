module.exports = class Data1679526774422 {
    name = 'Data1679526774422'

    async up(db) {
        await db.query(`CREATE TABLE "post_followers" ("id" character varying NOT NULL, "follower_account_id" character varying, "following_post_id" character varying, CONSTRAINT "PK_ced73560f09ff759cf0d7590c8d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_5ba125d95c053ba440ac801ae1" ON "post_followers" ("follower_account_id") `)
        await db.query(`CREATE INDEX "IDX_2c149f02ff36804d9393709528" ON "post_followers" ("following_post_id") `)
        await db.query(`CREATE TABLE "comment_followers" ("id" character varying NOT NULL, "follower_account_id" character varying, "following_comment_id" character varying, CONSTRAINT "PK_bc06e7514ca9f7a7beb9b5d9d01" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_68bdb5fb30fa4a780b637a431c" ON "comment_followers" ("follower_account_id") `)
        await db.query(`CREATE INDEX "IDX_786ac17a6b890ba9a835ffab18" ON "comment_followers" ("following_comment_id") `)
        await db.query(`CREATE TABLE "reaction" ("id" character varying NOT NULL, "kind" character varying(8) NOT NULL, "status" character varying(7) NOT NULL, "created_at_block" numeric NOT NULL, "created_at_time" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at_block" numeric, "updated_at_time" TIMESTAMP WITH TIME ZONE, "post_id" character varying, "account_id" character varying, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4af0a7b3bc874c64e408aaa985" ON "reaction" ("post_id") `)
        await db.query(`CREATE INDEX "IDX_1fa27851b2897fc8a71a007283" ON "reaction" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_1440a3a8c0c7ab3c7feee27f9f" ON "reaction" ("kind") `)
        await db.query(`CREATE INDEX "IDX_caa8bfe29eb6373fc4a58c1af2" ON "reaction" ("status") `)
        await db.query(`CREATE TABLE "post" ("id" character varying NOT NULL, "is_comment" boolean NOT NULL, "hidden" boolean NOT NULL, "created_at_block" numeric, "created_at_time" TIMESTAMP WITH TIME ZONE, "created_on_day" TIMESTAMP WITH TIME ZONE, "updated_at_time" TIMESTAMP WITH TIME ZONE, "kind" character varying(11), "followers_count" integer NOT NULL, "replies_count" integer NOT NULL, "public_replies_count" integer NOT NULL, "hidden_replies_count" integer NOT NULL, "shares_count" integer NOT NULL, "upvotes_count" integer NOT NULL, "downvotes_count" integer NOT NULL, "reactions_count" integer NOT NULL, "title" text, "image" text, "link" text, "canonical" text, "content" text, "slug" text, "body" text, "summary" text, "is_show_more" boolean, "meta" text, "tags_original" text, "format" text, "tweet_id" text, "tweet_details" jsonb, "proposal_index" integer, "experimental" jsonb, "root_post_id" character varying, "parent_post_id" character varying, "shared_post_id" character varying, "owned_by_account_id" character varying, "created_by_account_id" character varying, "space_id" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ea813cdf5e4158eb4eb24cd049" ON "post" ("root_post_id") `)
        await db.query(`CREATE INDEX "IDX_0d4e62dcf3e5e150431136f114" ON "post" ("parent_post_id") `)
        await db.query(`CREATE INDEX "IDX_52122bf2cf235b80e8227a9c64" ON "post" ("shared_post_id") `)
        await db.query(`CREATE INDEX "IDX_5f6b12f909b19d6ed3362b4fdd" ON "post" ("is_comment") `)
        await db.query(`CREATE INDEX "IDX_d24a068d8348b2ca6037bc51fa" ON "post" ("hidden") `)
        await db.query(`CREATE INDEX "IDX_5deeff51b22d7d75ba6f2fbab8" ON "post" ("owned_by_account_id") `)
        await db.query(`CREATE INDEX "IDX_9506f1c2a4fd7133f1d6732c46" ON "post" ("created_by_account_id") `)
        await db.query(`CREATE INDEX "IDX_7542ee33dfa7190503a12afab6" ON "post" ("created_at_time") `)
        await db.query(`CREATE INDEX "IDX_4873b2ec27a93cd3f2518cb181" ON "post" ("space_id") `)
        await db.query(`CREATE INDEX "IDX_0f58455e3721b42bee04294b5e" ON "post" ("kind") `)
        await db.query(`CREATE INDEX "IDX_541b10f59e7ef19edca42545b3" ON "post" ("followers_count") `)
        await db.query(`CREATE INDEX "IDX_f9056c57d5e46c2b76b254c500" ON "post" ("public_replies_count") `)
        await db.query(`CREATE INDEX "IDX_ee6a76fb071d93e74a95cd7b7a" ON "post" ("shares_count") `)
        await db.query(`CREATE INDEX "IDX_b2940d134ab1ebe50ff5110db0" ON "post" ("upvotes_count") `)
        await db.query(`CREATE INDEX "IDX_67367858557044ab8a0e8f1c26" ON "post" ("downvotes_count") `)
        await db.query(`CREATE INDEX "IDX_b2b0214845132a78cdfe4e607c" ON "post" ("reactions_count") `)
        await db.query(`CREATE TABLE "space_followers" ("id" character varying NOT NULL, "follower_account_id" character varying, "following_space_id" character varying, CONSTRAINT "PK_ff33678164d2cd02e1127098295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b99731dad3b444d673552a12e2" ON "space_followers" ("follower_account_id") `)
        await db.query(`CREATE INDEX "IDX_0fc0101129e59985a769c8d124" ON "space_followers" ("following_space_id") `)
        await db.query(`CREATE TABLE "space" ("id" character varying NOT NULL, "created_at_block" numeric, "created_at_time" TIMESTAMP WITH TIME ZONE, "created_on_day" TIMESTAMP WITH TIME ZONE, "updated_at_time" TIMESTAMP WITH TIME ZONE, "updated_at_block" numeric, "posts_count" integer NOT NULL, "public_posts_count" integer NOT NULL, "hidden_posts_count" integer NOT NULL, "hidden" boolean NOT NULL, "content" text, "name" text, "image" text, "about" text, "summary" text, "is_show_more" boolean, "email" text, "tags_original" text, "links_original" text, "interests_original" text, "format" text, "handle" text, "experimental" jsonb, "can_follower_create_posts" boolean, "can_everyone_create_posts" boolean, "none_permissions" jsonb, "everyone_permissions" jsonb, "follower_permissions" jsonb, "space_owner_permissions" jsonb, "followers_count" integer NOT NULL, "username" text, "created_by_account_id" character varying, "owned_by_account_id" character varying, "profile_space_id" character varying, CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_af311c75ea1208213e4db8df49" ON "space" ("created_by_account_id") `)
        await db.query(`CREATE INDEX "IDX_1c5c2e3fd05bbd08b0d84788ec" ON "space" ("owned_by_account_id") `)
        await db.query(`CREATE INDEX "IDX_dc013b7d8430139bbf8e535461" ON "space" ("profile_space_id") `)
        await db.query(`CREATE INDEX "IDX_6fabd61b93614fd175ee153dde" ON "space" ("created_at_time") `)
        await db.query(`CREATE INDEX "IDX_d71f2099ed79bb6be78a09744d" ON "space" ("public_posts_count") `)
        await db.query(`CREATE INDEX "IDX_286837c58c9485202497293340" ON "space" ("hidden") `)
        await db.query(`CREATE INDEX "IDX_97b31c7a9c40cbcd462885db23" ON "space" ("handle") `)
        await db.query(`CREATE INDEX "IDX_d84cd196380938afd073961488" ON "space" ("followers_count") `)
        await db.query(`CREATE INDEX "IDX_c9fdb061c4d64b94a50d4419db" ON "space" ("username") `)
        await db.query(`CREATE TABLE "account_followers" ("id" character varying NOT NULL, "follower_account_id" character varying, "following_account_id" character varying, CONSTRAINT "PK_dade5b6e74b543ca2ea018b5a5a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_7bb4dcd7984d41c97348ceb69a" ON "account_followers" ("follower_account_id") `)
        await db.query(`CREATE INDEX "IDX_9130c3e03dd8405027b2855e18" ON "account_followers" ("following_account_id") `)
        await db.query(`CREATE TABLE "activity" ("id" character varying NOT NULL, "block_number" numeric NOT NULL, "event_index" integer NOT NULL, "event" character varying(30) NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "aggregated" boolean, "agg_count" numeric NOT NULL, "username" text, "account_id" character varying, "following_account_id" character varying, "space_id" character varying, "space_prev_id" character varying, "new_owner_id" character varying, "old_owner_id" character varying, "post_id" character varying, "reaction_id" character varying, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_96c7c848eec1feba0bc66b4519" ON "activity" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_ac07bea02c85cc9e8a79cc3c2a" ON "activity" ("event") `)
        await db.query(`CREATE INDEX "IDX_2309bdad81af5f2780c902b358" ON "activity" ("following_account_id") `)
        await db.query(`CREATE INDEX "IDX_3fc93c9bf3004b3005fcba6fae" ON "activity" ("space_id") `)
        await db.query(`CREATE INDEX "IDX_aa427db0caf033cca82901385b" ON "activity" ("space_prev_id") `)
        await db.query(`CREATE INDEX "IDX_56c479a191b096a17000b24bb1" ON "activity" ("new_owner_id") `)
        await db.query(`CREATE INDEX "IDX_89b047dd04bbd680c016fd777b" ON "activity" ("old_owner_id") `)
        await db.query(`CREATE INDEX "IDX_624114671c34d2515ec04c2c88" ON "activity" ("post_id") `)
        await db.query(`CREATE INDEX "IDX_b89929a58c06720ca096316ba9" ON "activity" ("reaction_id") `)
        await db.query(`CREATE INDEX "IDX_5217422b6180f345452ccf1d90" ON "activity" ("aggregated") `)
        await db.query(`CREATE TABLE "news_feed" ("id" character varying NOT NULL, "account_id" character varying, "activity_id" character varying, CONSTRAINT "PK_9325de5b82b32b083a96e63d8d8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_58688a6d8f474152cf47ab8283" ON "news_feed" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_f2e2e6333cfd2b5248d7e12fb8" ON "news_feed" ("activity_id") `)
        await db.query(`CREATE TABLE "notification" ("id" character varying NOT NULL, "account_id" character varying, "activity_id" character varying, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_6bfa96ab97f1a09d73091294ef" ON "notification" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_894ef2df998c9dbbdd45e39d88" ON "notification" ("activity_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "followers_count" integer NOT NULL, "following_accounts_count" integer NOT NULL, "owned_posts_count" integer NOT NULL, "following_posts_count" integer NOT NULL, "following_spaces_count" integer NOT NULL, "updated_at_time" TIMESTAMP WITH TIME ZONE, "updated_at_block" numeric, "usernames" text array, "profile_space_id" character varying, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_eecbf4763369e9e77cfd277aa7" ON "account" ("profile_space_id") `)
        await db.query(`CREATE TABLE "ipfs_fetch_log" ("id" character varying NOT NULL, "cid" text, "block_height" integer NOT NULL, "error_msg" text, CONSTRAINT "PK_4fa8c11108e720d810f1c4c9f6f" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "post_followers" ADD CONSTRAINT "FK_5ba125d95c053ba440ac801ae1f" FOREIGN KEY ("follower_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post_followers" ADD CONSTRAINT "FK_2c149f02ff36804d93937095280" FOREIGN KEY ("following_post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "comment_followers" ADD CONSTRAINT "FK_68bdb5fb30fa4a780b637a431c1" FOREIGN KEY ("follower_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "comment_followers" ADD CONSTRAINT "FK_786ac17a6b890ba9a835ffab18f" FOREIGN KEY ("following_comment_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_4af0a7b3bc874c64e408aaa9853" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_1fa27851b2897fc8a71a0072834" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_ea813cdf5e4158eb4eb24cd0495" FOREIGN KEY ("root_post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_0d4e62dcf3e5e150431136f1149" FOREIGN KEY ("parent_post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52122bf2cf235b80e8227a9c645" FOREIGN KEY ("shared_post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5deeff51b22d7d75ba6f2fbab88" FOREIGN KEY ("owned_by_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9506f1c2a4fd7133f1d6732c46e" FOREIGN KEY ("created_by_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_4873b2ec27a93cd3f2518cb1813" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "space_followers" ADD CONSTRAINT "FK_b99731dad3b444d673552a12e2e" FOREIGN KEY ("follower_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "space_followers" ADD CONSTRAINT "FK_0fc0101129e59985a769c8d1243" FOREIGN KEY ("following_space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "space" ADD CONSTRAINT "FK_af311c75ea1208213e4db8df493" FOREIGN KEY ("created_by_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "space" ADD CONSTRAINT "FK_1c5c2e3fd05bbd08b0d84788ec0" FOREIGN KEY ("owned_by_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "space" ADD CONSTRAINT "FK_dc013b7d8430139bbf8e5354616" FOREIGN KEY ("profile_space_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account_followers" ADD CONSTRAINT "FK_7bb4dcd7984d41c97348ceb69a2" FOREIGN KEY ("follower_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account_followers" ADD CONSTRAINT "FK_9130c3e03dd8405027b2855e180" FOREIGN KEY ("following_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_96c7c848eec1feba0bc66b45190" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_2309bdad81af5f2780c902b358f" FOREIGN KEY ("following_account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_3fc93c9bf3004b3005fcba6fae6" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_aa427db0caf033cca82901385b1" FOREIGN KEY ("space_prev_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_56c479a191b096a17000b24bb15" FOREIGN KEY ("new_owner_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_89b047dd04bbd680c016fd777bf" FOREIGN KEY ("old_owner_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_624114671c34d2515ec04c2c88c" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_b89929a58c06720ca096316ba96" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "news_feed" ADD CONSTRAINT "FK_58688a6d8f474152cf47ab8283a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "news_feed" ADD CONSTRAINT "FK_f2e2e6333cfd2b5248d7e12fb8b" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_6bfa96ab97f1a09d73091294efc" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_894ef2df998c9dbbdd45e39d884" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_eecbf4763369e9e77cfd277aa7f" FOREIGN KEY ("profile_space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "post_followers"`)
        await db.query(`DROP INDEX "public"."IDX_5ba125d95c053ba440ac801ae1"`)
        await db.query(`DROP INDEX "public"."IDX_2c149f02ff36804d9393709528"`)
        await db.query(`DROP TABLE "comment_followers"`)
        await db.query(`DROP INDEX "public"."IDX_68bdb5fb30fa4a780b637a431c"`)
        await db.query(`DROP INDEX "public"."IDX_786ac17a6b890ba9a835ffab18"`)
        await db.query(`DROP TABLE "reaction"`)
        await db.query(`DROP INDEX "public"."IDX_4af0a7b3bc874c64e408aaa985"`)
        await db.query(`DROP INDEX "public"."IDX_1fa27851b2897fc8a71a007283"`)
        await db.query(`DROP INDEX "public"."IDX_1440a3a8c0c7ab3c7feee27f9f"`)
        await db.query(`DROP INDEX "public"."IDX_caa8bfe29eb6373fc4a58c1af2"`)
        await db.query(`DROP TABLE "post"`)
        await db.query(`DROP INDEX "public"."IDX_ea813cdf5e4158eb4eb24cd049"`)
        await db.query(`DROP INDEX "public"."IDX_0d4e62dcf3e5e150431136f114"`)
        await db.query(`DROP INDEX "public"."IDX_52122bf2cf235b80e8227a9c64"`)
        await db.query(`DROP INDEX "public"."IDX_5f6b12f909b19d6ed3362b4fdd"`)
        await db.query(`DROP INDEX "public"."IDX_d24a068d8348b2ca6037bc51fa"`)
        await db.query(`DROP INDEX "public"."IDX_5deeff51b22d7d75ba6f2fbab8"`)
        await db.query(`DROP INDEX "public"."IDX_9506f1c2a4fd7133f1d6732c46"`)
        await db.query(`DROP INDEX "public"."IDX_7542ee33dfa7190503a12afab6"`)
        await db.query(`DROP INDEX "public"."IDX_4873b2ec27a93cd3f2518cb181"`)
        await db.query(`DROP INDEX "public"."IDX_0f58455e3721b42bee04294b5e"`)
        await db.query(`DROP INDEX "public"."IDX_541b10f59e7ef19edca42545b3"`)
        await db.query(`DROP INDEX "public"."IDX_f9056c57d5e46c2b76b254c500"`)
        await db.query(`DROP INDEX "public"."IDX_ee6a76fb071d93e74a95cd7b7a"`)
        await db.query(`DROP INDEX "public"."IDX_b2940d134ab1ebe50ff5110db0"`)
        await db.query(`DROP INDEX "public"."IDX_67367858557044ab8a0e8f1c26"`)
        await db.query(`DROP INDEX "public"."IDX_b2b0214845132a78cdfe4e607c"`)
        await db.query(`DROP TABLE "space_followers"`)
        await db.query(`DROP INDEX "public"."IDX_b99731dad3b444d673552a12e2"`)
        await db.query(`DROP INDEX "public"."IDX_0fc0101129e59985a769c8d124"`)
        await db.query(`DROP TABLE "space"`)
        await db.query(`DROP INDEX "public"."IDX_af311c75ea1208213e4db8df49"`)
        await db.query(`DROP INDEX "public"."IDX_1c5c2e3fd05bbd08b0d84788ec"`)
        await db.query(`DROP INDEX "public"."IDX_dc013b7d8430139bbf8e535461"`)
        await db.query(`DROP INDEX "public"."IDX_6fabd61b93614fd175ee153dde"`)
        await db.query(`DROP INDEX "public"."IDX_d71f2099ed79bb6be78a09744d"`)
        await db.query(`DROP INDEX "public"."IDX_286837c58c9485202497293340"`)
        await db.query(`DROP INDEX "public"."IDX_97b31c7a9c40cbcd462885db23"`)
        await db.query(`DROP INDEX "public"."IDX_d84cd196380938afd073961488"`)
        await db.query(`DROP INDEX "public"."IDX_c9fdb061c4d64b94a50d4419db"`)
        await db.query(`DROP TABLE "account_followers"`)
        await db.query(`DROP INDEX "public"."IDX_7bb4dcd7984d41c97348ceb69a"`)
        await db.query(`DROP INDEX "public"."IDX_9130c3e03dd8405027b2855e18"`)
        await db.query(`DROP TABLE "activity"`)
        await db.query(`DROP INDEX "public"."IDX_96c7c848eec1feba0bc66b4519"`)
        await db.query(`DROP INDEX "public"."IDX_ac07bea02c85cc9e8a79cc3c2a"`)
        await db.query(`DROP INDEX "public"."IDX_2309bdad81af5f2780c902b358"`)
        await db.query(`DROP INDEX "public"."IDX_3fc93c9bf3004b3005fcba6fae"`)
        await db.query(`DROP INDEX "public"."IDX_aa427db0caf033cca82901385b"`)
        await db.query(`DROP INDEX "public"."IDX_56c479a191b096a17000b24bb1"`)
        await db.query(`DROP INDEX "public"."IDX_89b047dd04bbd680c016fd777b"`)
        await db.query(`DROP INDEX "public"."IDX_624114671c34d2515ec04c2c88"`)
        await db.query(`DROP INDEX "public"."IDX_b89929a58c06720ca096316ba9"`)
        await db.query(`DROP INDEX "public"."IDX_5217422b6180f345452ccf1d90"`)
        await db.query(`DROP TABLE "news_feed"`)
        await db.query(`DROP INDEX "public"."IDX_58688a6d8f474152cf47ab8283"`)
        await db.query(`DROP INDEX "public"."IDX_f2e2e6333cfd2b5248d7e12fb8"`)
        await db.query(`DROP TABLE "notification"`)
        await db.query(`DROP INDEX "public"."IDX_6bfa96ab97f1a09d73091294ef"`)
        await db.query(`DROP INDEX "public"."IDX_894ef2df998c9dbbdd45e39d88"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP INDEX "public"."IDX_eecbf4763369e9e77cfd277aa7"`)
        await db.query(`DROP TABLE "ipfs_fetch_log"`)
        await db.query(`ALTER TABLE "post_followers" DROP CONSTRAINT "FK_5ba125d95c053ba440ac801ae1f"`)
        await db.query(`ALTER TABLE "post_followers" DROP CONSTRAINT "FK_2c149f02ff36804d93937095280"`)
        await db.query(`ALTER TABLE "comment_followers" DROP CONSTRAINT "FK_68bdb5fb30fa4a780b637a431c1"`)
        await db.query(`ALTER TABLE "comment_followers" DROP CONSTRAINT "FK_786ac17a6b890ba9a835ffab18f"`)
        await db.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_4af0a7b3bc874c64e408aaa9853"`)
        await db.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_1fa27851b2897fc8a71a0072834"`)
        await db.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_ea813cdf5e4158eb4eb24cd0495"`)
        await db.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_0d4e62dcf3e5e150431136f1149"`)
        await db.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52122bf2cf235b80e8227a9c645"`)
        await db.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5deeff51b22d7d75ba6f2fbab88"`)
        await db.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9506f1c2a4fd7133f1d6732c46e"`)
        await db.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_4873b2ec27a93cd3f2518cb1813"`)
        await db.query(`ALTER TABLE "space_followers" DROP CONSTRAINT "FK_b99731dad3b444d673552a12e2e"`)
        await db.query(`ALTER TABLE "space_followers" DROP CONSTRAINT "FK_0fc0101129e59985a769c8d1243"`)
        await db.query(`ALTER TABLE "space" DROP CONSTRAINT "FK_af311c75ea1208213e4db8df493"`)
        await db.query(`ALTER TABLE "space" DROP CONSTRAINT "FK_1c5c2e3fd05bbd08b0d84788ec0"`)
        await db.query(`ALTER TABLE "space" DROP CONSTRAINT "FK_dc013b7d8430139bbf8e5354616"`)
        await db.query(`ALTER TABLE "account_followers" DROP CONSTRAINT "FK_7bb4dcd7984d41c97348ceb69a2"`)
        await db.query(`ALTER TABLE "account_followers" DROP CONSTRAINT "FK_9130c3e03dd8405027b2855e180"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_96c7c848eec1feba0bc66b45190"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_2309bdad81af5f2780c902b358f"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_3fc93c9bf3004b3005fcba6fae6"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_aa427db0caf033cca82901385b1"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_56c479a191b096a17000b24bb15"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_89b047dd04bbd680c016fd777bf"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_624114671c34d2515ec04c2c88c"`)
        await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_b89929a58c06720ca096316ba96"`)
        await db.query(`ALTER TABLE "news_feed" DROP CONSTRAINT "FK_58688a6d8f474152cf47ab8283a"`)
        await db.query(`ALTER TABLE "news_feed" DROP CONSTRAINT "FK_f2e2e6333cfd2b5248d7e12fb8b"`)
        await db.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_6bfa96ab97f1a09d73091294efc"`)
        await db.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_894ef2df998c9dbbdd45e39d884"`)
        await db.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_eecbf4763369e9e77cfd277aa7f"`)
    }
}
