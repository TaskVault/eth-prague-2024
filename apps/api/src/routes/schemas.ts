import { z } from "@hono/zod-openapi";

export const reactionType = ["like", "dislike"] as const;
export const ReactionType = z.enum(reactionType);
export type ReactionType = z.infer<typeof ReactionType>;


export const postsOutput = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    userId: z.string(),
    likes: z.number(),
    dislikes: z.number(),
    comments: z.array(z.object({
        id: z.string(),
        text: z.string(),
        postId: z.string(),
        userId: z.string(),
    }))
});
export type PostsOutput = z.infer<typeof postsOutput>;

export const postsCreate = z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
});
export type PostsCreate = z.infer<typeof postsCreate>;

export const reactionsUpsert = z.object({
    reaction: ReactionType,
});
export type ReactionsUpsert = z.infer<typeof reactionsUpsert>;

export const commentsCreate = z.object({
    text: z.string(),
});
export type CommentsCreate = z.infer<typeof commentsCreate>;

export const usersCreate = z.object({
    wallet: z.string(),
});
export type UsersCreate = z.infer<typeof usersCreate>;

export const usersOutput = z.object({
    id: z.string(),
    wallet: z.string(),
    posts: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        image: z.string(),
        userId: z.string(),
    })),
    reactions: z.array(z.object({
        id: z.string(),
        reaction: ReactionType,
        postId: z.string(),
        userId: z.string(),
    })),
    comments: z.array(z.object({
        id: z.string(),
        text: z.string(),
        postId: z.string(),
        userId: z.string(),
    }))
});
export type UsersOutput = z.infer<typeof usersOutput>;