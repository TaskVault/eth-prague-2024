import { relations } from "drizzle-orm";
import { integer, pgTable, text,uuid } from "drizzle-orm/pg-core";
import { number, z } from "zod";
import { ReactionType } from "routes/schemas";


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

export const reactions = pgTable("reactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  reaction: text("reaction").$type<ReactionType>().notNull(),
  userId: uuid("userId").notNull().references(() => users.id),
  postId: uuid("postId")
  .notNull().unique()
  .references(() => posts.id).unique(),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  userId: uuid("userId").notNull().references(() => users.id),
  postId: uuid("postId")
  .notNull()
  .references(() => posts.id),
})

export const usersRelations = relations(users, ({many}) => ({
  posts: many(posts),
  reactions: many(reactions),
  comments: many(comments),
}));

export const postsRelations = relations(posts, ({many, one}) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  reactions: many(reactions),
  comments: many(comments),
}));

export const reactionsRelations = relations(reactions, ({one}) => ({
  post: one(posts, {
    fields: [reactions.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [reactions.userId],
    references: [users.id],
  }),
}));

export const commentsRelations = relations(comments, ({one}) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));
