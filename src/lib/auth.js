import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  haveIBeenPwned,
  twoFactor,
} from "better-auth/plugins";
import { prisma } from "@/lib/prisma";

const trustedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://apidarb.ru",
  "https://www.apidarb.ru",
  process.env.BETTER_AUTH_URL,
].filter(Boolean);

const MIN_NEW_PASSWORD_LENGTH = 12;

export const auth = betterAuth({
  appName: "APIDARB",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    // Не повышаем глобальный минимум выше прежних 8 символов,
    // чтобы не заблокировать вход существующим аккаунтам.
    minPasswordLength: 8,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      const password =
        typeof ctx.body?.password === "string"
          ? ctx.body.password
          : "";

      if (password.length < MIN_NEW_PASSWORD_LENGTH) {
        throw new APIError("BAD_REQUEST", {
          message: `Новый пароль должен содержать не менее ${MIN_NEW_PASSWORD_LENGTH} символов.`,
        });
      }
    }),
  },

  rateLimit: {
    // В development Better Auth не должен блокировать локальную отладку.
    // На production защита остаётся включённой и хранится в PostgreSQL.
    enabled: process.env.NODE_ENV === "production",
    storage: "database",
    modelName: "rateLimit",
    window: 60,
    max: 60,
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5,
      },
      "/sign-up/email": {
        window: 300,
        max: 5,
      },
    },
  },

  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-real-ip"],
    },
  },

  plugins: [
    haveIBeenPwned({
      enabled: true,
      customPasswordCompromisedMessage:
        "Этот пароль найден в известных утечках. Используйте другой пароль.",
    }),
    twoFactor({
      issuer: "APIDARB",
    }),
  ],

  trustedOrigins: [...new Set(trustedOrigins)],
});
