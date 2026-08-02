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

const isLocalDatabase =
  connectionString.includes("localhost") ||
  connectionString.includes("127.0.0.1");

function createPrismaAdapter() {
  return new PrismaPg({
    connectionString,

    // Локальная Prisma Postgres работает стабильнее
    // с одним соединением.
    max: isLocalDatabase ? 1 : 10,

    // Сохраняем одно локальное соединение в пуле.
    min: isLocalDatabase ? 1 : 0,

    // Не ждём подключение бесконечно.
    connectionTimeoutMillis: 10_000,

    // Раньше здесь была 1 секунда.
    idleTimeoutMillis: 30_000,

    // Поддерживаем TCP-соединение активным.
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
  });
}

const adapter =
  globalForPrisma.prismaAdapter ?? createPrismaAdapter();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaAdapter = adapter;
}