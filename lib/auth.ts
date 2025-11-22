import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { t3env } from "./env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: t3env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: t3env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
});
