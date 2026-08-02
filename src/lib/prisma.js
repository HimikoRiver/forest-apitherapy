import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis;

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error("Переменная DATABASE_URL не указана.");
}

const isDirectPostgresUrl =
  connectionString.startsWith("postgres://") ||
  connectionString.startsWith("postgresql://");

if (!isDirectPostgresUrl) {
  throw new Error(
    "Для @prisma/adapter-pg нужен прямой DATABASE_URL формата postgres:// или postgresql://."
  );
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString,
    max: 10,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 1_000,
  });

  return new PrismaClient({
    adapter,
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}