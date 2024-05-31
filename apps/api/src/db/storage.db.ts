import { integer, pgTable, text,uuid } from "drizzle-orm/pg-core";
import { number, z } from "zod";

export const users = pgTable("users",
    {
      id: uuid("id").primaryKey(),
      wallet: text("wallet").unique().notNull(),
    },
  ); 

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  userId: uuid("userId")
  .notNull()
  .references(() => users.id),
})

export const likesDislikes = pgTable("likes_dislikes", {
  id: uuid("id").primaryKey(),
  likes: integer("likes").default(0),
  dislikes: integer("dislikes").default(0),
  postId: uuid("postId")
  .notNull()
  .references(() => posts.id),
  userId: uuid("userId")
  .notNull()
  .references(() => users.id),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey(),
  text: text("text").notNull(),
  postId: uuid("postId")
  .notNull()
  .references(() => posts.id),
  userId: uuid("userId")
  .notNull()
  .references(() => users.id),
})