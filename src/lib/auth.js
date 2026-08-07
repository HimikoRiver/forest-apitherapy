import { betterAuth } from "better-auth";
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
    minPasswordLength: 12,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
  },

  rateLimit: {
    enabled: true,
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
