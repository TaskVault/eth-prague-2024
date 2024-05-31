import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const application = new OpenAPIHono();

application.openapi({
    method: "get",
    path: "/test/path",
    request: {
        body: {
            content: {
                "application/json": { schema: z.object({}) },
              },
        }
    },
    responses: {
        200: {
            content: {
                "application/json": {schema: z.object({})}
            },
            description: "Success",
        }
    }
}, async (c) => {
    return c.json({}, 200);
})

export default application;