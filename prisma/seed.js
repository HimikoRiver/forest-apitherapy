import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const category = await prisma.category.upsert({
    where: {
      slug: "pcheloprodukty",
    },
    update: {
      name: "Пчелопродукты",
      description: "Натуральные продукты пчеловодства.",
    },
    create: {
      name: "Пчелопродукты",
      slug: "pcheloprodukty",
      description: "Натуральные продукты пчеловодства.",
    },
  });

  await prisma.product.upsert({
    where: {
      slug: "gornyy-med",
    },
    update: {
      title: "Горный мёд",
      shortDescription: "Натуральный мёд с насыщенным ароматом и мягким вкусом.",
      description:
        "Подходит для ежедневного употребления, чаепития и подарочных наборов.",
      priceKopecks: 120000,
      oldPriceKopecks: 150000,
      stock: 12,
      status: "ACTIVE",
      isFeatured: true,
      categoryId: category.id,
    },
    create: {
      title: "Горный мёд",
      slug: "gornyy-med",
      shortDescription: "Натуральный мёд с насыщенным ароматом и мягким вкусом.",
      description:
        "Подходит для ежедневного употребления, чаепития и подарочных наборов.",
      priceKopecks: 120000,
      oldPriceKopecks: 150000,
      stock: 12,
      status: "ACTIVE",
      isFeatured: true,
      categoryId: category.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });