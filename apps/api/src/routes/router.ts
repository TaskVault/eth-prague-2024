import { OpenAPIHono, z } from "@hono/zod-openapi";
import { PostsCreate, reactionType, postsCreate, postsOutput, ReactionsUpsert, commentsCreate, CommentsCreate, usersCreate, usersOutput, UsersCreate, ReactionType } from "./schemas";
import { db } from "db/db";
import { comments, posts, reactions, users } from "db/storage.db";
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

    // sort posts by most likes first
    const sortedPosts = posts.sort((a, b) => {
        const aLikes = a.reactions.filter(r => r.reaction === "like").length;
        const bLikes = b.reactions.filter(r => r.reaction === "like").length;
        return bLikes - aLikes;
    });

    const refinedPostData = sortedPosts.map(post => {
        const likes = post.reactions.filter(r => r.reaction === "like").length;
        const dislikes = post.reactions.filter(r => r.reaction === "dislike").length;
        return {
            id: post.id,
            title: post.title,
            description: post.description,
            image: post.image,
            userId: post.userId,
            comments: post.comments,
            likes: likes,
            dislikes: dislikes,
        }
    });

    return c.json(refinedPostData, 200);
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

application.openapi({
    method: "post",
    path: "/posts/{postId}/comments/{userId}",
    request: {
        body: {
            content: {
                "application/json": { schema: commentsCreate},
            }
        },
        params: z.object({
            postId: z.string(),
            userId: z.string(),
        })
    },
    responses: {
        201: {
            description: "Created comment",
        }
    }
}, async (c) => {
    const { postId, userId } = c.req.valid("param");
    const { text } = await c.req.json<CommentsCreate>();

    await db
    .insert(comments)
    .values({ postId, userId, text })
    .execute();

    return c.json(201);
})

application.openapi({
    method: "post",
    path: "/users",
    request: {
        body: {
            content: {
                "application/json": { schema: usersCreate }
            }
        }   
    },
    responses: {
        201: {
            content: {
                "application/json": { schema: usersOutput }
            },
            description: "Created user",
        }
    }
}, async (c) => {
    const { wallet } = await c.req.json<UsersCreate>();

    const user = await db
    .insert(users)
    .values({ wallet })
    .returning()
    .execute();

    return c.json(user[0], 201);
});

application.openapi({
    method: "get",
    path: "/users/{wallet}",
    request: {
        params: z.object({
            wallet: z.string()
        })   
    },
    responses: {
        200: {
            content: {
                "application/json": { schema: usersOutput }
            },
            description: "Created user",
        }
    }
}, async (c) => {
    const { wallet } = c.req.valid("param");

    const users = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.wallet, wallet),
        with: {posts: true, reactions: true, comments: true},

    });

    return c.json(users, 200);
});
export default application;