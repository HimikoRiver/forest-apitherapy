import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

const trustedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://apidarb.ru",
  "https://www.apidarb.ru",
  process.env.BETTER_AUTH_URL,
].filter(Boolean);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [...new Set(trustedOrigins)],
});