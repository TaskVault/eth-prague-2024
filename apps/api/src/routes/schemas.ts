import { z } from "@hono/zod-openapi";

export const postsOutput = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    userId: z.string(),
    reactions: z.array(z.object({
        id: z.string(),
        reaction: z.string(),
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
export type PostsOutput = z.infer<typeof postsOutput>;

export const postsCreate = z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
});
export type PostsCreate = z.infer<typeof postsCreate>;