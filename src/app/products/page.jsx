import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BadgeRussianRuble,
  Boxes,
  Package,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import { getCurrentSession } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

async function addProductToCart(formData) {
  "use server";

  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const productId = String(formData.get("productId") || "");

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      stock: true,
      status: true,
    },
  });

  if (!product || product.status !== "ACTIVE" || product.stock <= 0) {
    redirect("/products");
  }

  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId: product.id,
      },
    },
    select: {
      id: true,
      quantity: true,
    },
  });

  const nextQuantity = Math.min(
    (existingCartItem?.quantity || 0) + 1,
    product.stock
  );

  if (existingCartItem) {
    await prisma.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: nextQuantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId: session.user.id,
        productId: product.id,
        quantity: 1,
      },
    });
  }

  revalidatePath("/products");
  revalidatePath("/cart");

  redirect("/cart");
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: [
      {
        isFeatured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    include: {
      category: true,
    },
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-xs font-bold uppercase tracking-[0.34em] text-[#d8b66a]">
              <Boxes className="size-4" />
              Каталог
            </div>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Пчелопродукты
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Здесь будут товары, которые можно добавить в корзину и оформить
              через личный кабинет.
            </p>
          </div>

          <Link
            href="/cart"
            aria-label="Корзина"
            title="Корзина"
            className="group inline-flex size-14 items-center justify-center rounded-2xl border border-[#d8b66a]/35 bg-black/24 text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_14px_38px_rgba(216,182,106,0.14)]"
          >
            <ShoppingCart className="size-5 transition duration-300 group-hover:scale-110" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/40 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
              <Package className="size-5" />
            </div>

            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Пока нет активных товаров. Добавим их через административную
              панель.
            </p>

            <Link
              href="/admin/products"
              className="group mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/35 bg-black/24 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
            >
              Перейти в панель
              <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const isOutOfStock = product.stock <= 0;

              return (
                <article
                  key={product.id}
                  className="group flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-[#d8b66a]/18 bg-black/40 shadow-[0_20px_54px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#d8b66a]/36 hover:bg-black/48 hover:shadow-[0_28px_70px_rgba(216,182,106,0.1)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-[#d8b66a]/14 bg-black/28">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex size-14 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                          <PackageCheck className="size-6" />
                        </div>
                      </div>
                    )}

                    {product.category?.name && (
                      <p className="absolute left-4 top-4 m-0 rounded-full border border-[#d8b66a]/18 bg-black/58 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a] backdrop-blur-sm">
                        {product.category.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      {product.title}
                    </h2>

                    {product.shortDescription && (
                      <p className="mt-3 text-sm leading-7 text-[#f3efe5]/72">
                        {product.shortDescription}
                      </p>
                    )}

                    <div className="mt-auto pt-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          {product.oldPriceKopecks && (
                            <p className="m-0 text-sm text-[#f3efe5]/42 line-through">
                              {formatPriceFromKopecks(product.oldPriceKopecks)}
                            </p>
                          )}

                          <p className="m-0 flex items-center gap-2 text-xl font-bold text-[#d8b66a]">
                            <BadgeRussianRuble className="size-5" />
                            {formatPriceFromKopecks(product.priceKopecks)}
                          </p>
                        </div>

                        <p className="m-0 rounded-full border border-[#d8b66a]/18 bg-black/20 px-3 py-1 text-xs text-[#f3efe5]/66">
                          Остаток: {product.stock}
                        </p>
                      </div>

                      <form action={addProductToCart} className="mt-5">
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />

                        <button
                          type="submit"
                          disabled={isOutOfStock}
                          className="group/button inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:border-[#d8b66a]/14 disabled:bg-[#d8b66a]/18 disabled:text-[#d8b66a]/44"
                        >
                          <ShoppingCart className="size-4 transition duration-300 group-hover/button:scale-110" />
                          {isOutOfStock ? "Нет в наличии" : "В корзину"}
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}