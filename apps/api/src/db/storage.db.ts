import { relations } from "drizzle-orm";
import { integer, pgTable, text,uuid } from "drizzle-orm/pg-core";
import { number, z } from "zod";

export const users = pgTable("users",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      wallet: text("wallet").unique().notNull(),
    },
  ); 

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  userId: uuid("userId")
  .notNull()
  .references(() => users.id),
})

export const likesDislikes = pgTable("likes_dislikes", {
  id: uuid("id").primaryKey().defaultRandom(),
  likes: integer("likes").default(0),
  dislikes: integer("dislikes").default(0),
  postId: uuid("postId")
  .notNull()
  .references(() => posts.id),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  postId: uuid("postId")
  .notNull()
  .references(() => posts.id),
})

export const usersRelations = relations(users, ({many}) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({many, one}) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  likesDislikes: one(likesDislikes),
  comments: many(comments),
}));

export const likesDislikesRelations = relations(likesDislikes, ({one}) => ({
  post: one(posts, {
    fields: [likesDislikes.postId],
    references: [posts.id],
  }),
}));

export const commentsRelations = relations(comments, ({one}) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));
