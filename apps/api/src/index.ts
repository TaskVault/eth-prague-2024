import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import application from "routes/router";
import {migrateDB} from "./db/db";
import { cors } from "hono/cors";


const app = new OpenAPIHono();

app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Origin", "Content-Type", "Authorization"],
    allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
  }),
);

app.route("/", application);

app.get("/health", (c) => c.text("OK"));
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "api",
  },
});
app.get("/ui", swaggerUI({ url: "/doc" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
migrateDB().then(() => {
  console.log("Database migrated");
})
