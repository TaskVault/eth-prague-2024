import { pgTable } from "drizzle-orm/pg-core";
import { z } from "zod";

export const table = pgTable(
    "table",
    {
    },
  ); 