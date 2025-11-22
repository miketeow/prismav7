import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const t3env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    AUTH_GITHUB_CLIENT_ID: z.string().min(1),
    AUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
});
