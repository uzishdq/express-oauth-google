import { defineConfig } from "drizzle-kit";
import { EnvConfig } from "./src/config/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: EnvConfig.get("DATABASE_URL"),
  },
});
