import { OpenAPIHono, z } from "@hono/zod-openapi";
import { ReactionType, PostsCreate, reactionType, postsCreate, postsOutput, ReactionsUpsert } from "./schemas";
import { db } from "db/db";
import { posts, reactions } from "db/storage.db";
import { and, eq } from "drizzle-orm";

const application = new OpenAPIHono();

application.openapi({
    method: "post",
    path: "/posts/{userId}",
    request: {
        body: {
            content: {
                "application/json": { schema: postsCreate },
              },
        },
        params: z.object({
            userId: z.string()
        })
    },
    responses: {
        201: {
            content: {
                "application/json": {schema: postsOutput}
            },
            description: "Created post",
        }
    }
}, async (c) => {
    const { userId } = c.req.valid("param");
    const { title, description, image } = await c.req.json<PostsCreate>();

    // Create a post
    const post = await db
    .insert(posts)
    .values({title, description, image, userId})
    .returning()
    .execute();

    return c.json(post[0], 201);
})


application.openapi({
    method: "get",
    path: "/posts",
    responses: {
        200: {
            content: {
                "application/json": {schema: z.array(postsOutput)}
            },
            description: "Get all posts",
        }
    }
}, async (c) => {
    const posts = await db.query.posts.findMany({
        with: {reactions: true, comments: true}
    });

    return c.json(posts, 200);
})

application.openapi({
    method: "put",
    path: "/posts/{postId}/reactions/{userId}",
    request: {
        body: {
            content: {
                "application/json": { schema: z.object({reaction: z.enum(reactionType)})},
            }
        },
        params: z.object({
            postId: z.string(),
            userId: z.string(),
        })
    },
    responses: {
        204: {
            description: "Updated reaction",
        }
    }
}, async (c) => {
    const { postId, userId } = c.req.valid("param");
    const reaction = await c.req.json<ReactionsUpsert>();

    const updateResult = await db
        .update(reactions)
        .set({ reaction: reaction.reaction })
        .where(and(eq(reactions.postId, postId), eq(reactions.userId, userId)))
        .execute();

    if (updateResult.rowCount === 0) {
        await db
        .insert(reactions)
        .values({ postId, userId, reaction: reaction.reaction })
        .execute();
    }

    return c.json(204);
})

export default application;