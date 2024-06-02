import { OpenAPIHono, z } from "@hono/zod-openapi";
import { PostsCreate, reactionType, postsCreate, postsOutput, ReactionsUpsert, commentsCreate, CommentsCreate, usersCreate, usersOutput, UsersCreate, ReactionType } from "./schemas";
import { db } from "db/db";
import { comments, posts, reactions, users } from "db/storage.db";
import { and, eq } from "drizzle-orm";

const application = new OpenAPIHono();

application.openapi({
    method: "post",
    path: "/posts/{wallet}",
    request: {
        body: {
            content: {
                "application/json": { schema: postsCreate },
              },
        },
        params: z.object({
            wallet: z.string()
        })
    },
    responses: {
        201: {
            content: {
                "application/json": {schema: postsOutput}
            },
            description: "Created post",
        },
        404: {
            content: {
                "application/json": {schema: z.object({error: z.string()})}
            },
            description: "User not found",
        }
    }
}, async (c) => {
    const { wallet } = c.req.valid("param");
    const { title, description, image } = await c.req.json<PostsCreate>();
    console.log("wallet", wallet);
    const parsed = wallet.toLowerCase();
    console.log("wallet", parsed);
    let user = await db.query.users.findFirst({
        where: eq(users.wallet, parsed)
    }).execute();

    if (!user) {
       // create user
        const usersq = await db
        .insert(users)
        .values({ wallet: parsed })
        .returning()

        user = usersq[0];

    }

    // Create a post
    const post = await db
    .insert(posts)
    .values({title, description, image, userId: user.id})
    .returning()
    .execute();

    return c.json(post[0], 201);
})

application.openapi({
    method: "get",
    path: "/posts/{postId}",
    request: {
        params: z.object({
            postId: z.string()
        })
    },
    responses: {
        200: {
            content: {
                "application/json": {schema: postsOutput}
            },
            description: "Get post by id",
        }
    }
}, async (c) => {
    const { postId } = c.req.valid("param");

    const post = await db.query.posts.findFirst({
        where: (posts, { eq }) => eq(posts.id, postId),
        with: {reactions: true, comments: true}
    });

    const likes = post.reactions.filter(r => r.reaction === "like").length;
    const dislikes = post.reactions.filter(r => r.reaction === "dislike").length;

    return c.json({
        id: post.id,
        title: post.title,
        description: post.description,
        image: post.image,
        userId: post.userId,
        comments: post.comments,
        likes: likes,
        dislikes: dislikes,
    }, 200);
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
    path: "/posts/{postId}/reactions/{wallet}",
    request: {
        body: {
            content: {
                "application/json": { schema: z.object({reaction: z.enum(reactionType)})},
            }
        },
        params: z.object({
            postId: z.string(),
            wallet: z.string(),
        })
    },
    responses: {
        204: {
            description: "Updated reaction",
        }
    }
}, async (c) => {
    const { postId, wallet } = c.req.valid("param");
    const reaction = await c.req.json<ReactionsUpsert>();

    let user = await db.query.users.findFirst({
        where: eq(users.wallet, wallet.toLowerCase())
    }).execute();

    if (!user) {
        // create user
        const usersq = await db
            .insert(users)
            .values({ wallet: wallet.toLowerCase() })
            .returning()

        user = usersq[0];

    }

    const updateResult = await db
        .update(reactions)
        .set({ reaction: reaction.reaction })
        .where(and(eq(reactions.postId, postId), eq(reactions.userId, user.id)))
        .execute();

    if (updateResult.rowCount === 0) {
        await db
        .insert(reactions)
        .values({ postId, userId: user.id, reaction: reaction.reaction })
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

    console.log("found user", users);

    return c.json(users, 200);
});
export default application;
