export const dynamic = "force-dynamic";

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
import CabinetTopNav from "@/components/shared/CabinetTopNav";
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

  let isAdmin = false;

  if (products.length === 0) {
    const session = await getCurrentSession();

    if (session?.user?.id) {
      const currentUser = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          role: true,
        },
      });

      isAdmin = currentUser?.role === "ADMIN";
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-[1500px]">
        <CabinetTopNav />

        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-[#030b0c] px-4 py-2 text-xs font-bold uppercase tracking-[0.34em] text-[#d8b66a]">
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
            className="group inline-flex size-14 items-center justify-center rounded-2xl border border-[#d8b66a]/35 bg-[#030b0c] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#071b18] hover:text-[#f3d98d] hover:shadow-[0_14px_38px_rgba(216,182,106,0.14)]"
          >
            <ShoppingCart className="size-5 transition duration-300 group-hover:scale-110" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-[#030b0c] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#071b18] text-[#f3d98d]">
              <Package className="size-5" />
            </div>

            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              {isAdmin
                ? "Пока нет активных товаров. Добавим их через административную панель."
                : "Пока нет доступных товаров. Каталог скоро будет пополнен."}
            </p>

            {isAdmin && (
              <Link
                href="/admin/products"
                className="group mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/35 bg-[#030b0c] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#071b18] hover:text-[#f3d98d]"
              >
                Перейти в панель
                <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const isOutOfStock = product.stock <= 0;
              const productHref = `/products/${product.slug}`;

              return (
                <article
                  key={product.id}
                  className="group flex min-h-[360px] flex-col overflow-hidden rounded-[24px] border border-[#d8b66a]/18 bg-[#030b0c] shadow-[0_20px_54px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#d8b66a]/36 hover:bg-[#07120f] hover:shadow-[0_28px_70px_rgba(216,182,106,0.1)]"
                >
                  <Link
                    href={productHref}
                    aria-label={`Открыть товар ${product.title}`}
                    className="relative aspect-[4/3] overflow-hidden border-b border-[#d8b66a]/14 bg-[#030b0c]"
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#030b0c]">
                        <div className="flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#071b18] text-[#f3d98d]">
                          <PackageCheck className="size-5" />
                        </div>
                      </div>
                    )}

                    {product.category?.name && (
                      <p className="absolute left-3 top-3 m-0 rounded-full border border-[#d8b66a]/18 bg-[#030b0c] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#d8b66a]">
                        {product.category.name}
                      </p>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-4">
                    <Link
                      href={productHref}
                      className="w-fit transition duration-300 hover:text-[#fff1b8]"
                    >
                      <h2 className="m-0 text-lg font-bold tracking-[-0.05em] text-[#f3d98d]">
                        {product.title}
                      </h2>
                    </Link>

                    {product.shortDescription && (
                      <p className="mt-2 text-[0.8rem] leading-6 text-[#f3efe5]/72">
                        {product.shortDescription}
                      </p>
                    )}

                    <div className="mt-auto pt-4">
                      <div className="flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          {product.oldPriceKopecks && (
                            <p className="m-0 text-xs text-[#f3efe5]/42 line-through">
                              {formatPriceFromKopecks(
                                product.oldPriceKopecks
                              )}
                            </p>
                          )}

                          <p className="m-0 flex items-center gap-1.5 text-lg font-bold text-[#d8b66a]">
                            <BadgeRussianRuble className="size-4.5" />
                            {formatPriceFromKopecks(product.priceKopecks)}
                          </p>

                          <p className="mt-1.5 inline-flex rounded-full border border-[#d8b66a]/14 bg-black/18 px-2.5 py-1 text-[0.68rem] text-[#f3efe5]/58">
                            Остаток: {product.stock}
                          </p>
                        </div>

                        <form action={addProductToCart} className="shrink-0">
                          <input
                            type="hidden"
                            name="productId"
                            value={product.id}
                          />

                          <button
                            type="submit"
                            disabled={isOutOfStock}
                            aria-label={
                              isOutOfStock
                                ? `${product.title} нет в наличии`
                                : `Добавить ${product.title} в корзину`
                            }
                            title={isOutOfStock ? "Нет в наличии" : "Купить"}
                            className="group/button inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#d8b66a]/30 bg-[#d8b66a]/10 px-3 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-[#f3d98d] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#d8b66a] hover:text-[#07110f] disabled:cursor-not-allowed disabled:border-[#d8b66a]/12 disabled:bg-[#d8b66a]/8 disabled:text-[#d8b66a]/36"
                          >
                            <ShoppingCart className="size-3.5 transition duration-300 group-hover/button:scale-110" />
                            {isOutOfStock ? "Нет" : "Купить"}
                          </button>
                        </form>
                      </div>
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