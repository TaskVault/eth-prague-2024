import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "api",
  },
});

export default {
  port: 3000,
  fetch: app.fetch,
};
