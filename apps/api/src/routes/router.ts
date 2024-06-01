import { OpenAPIHono, z } from "@hono/zod-openapi";
import { PostsCreate, postsCreate, postsOutput } from "./schemas";
import { db } from "db/db";
import { posts, reactions } from "db/storage.db";

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

export default application;