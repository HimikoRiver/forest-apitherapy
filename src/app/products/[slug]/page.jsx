export const dynamic = "force-dynamic";

import Image from "next/image";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import {
  BadgeRussianRuble,
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
      slug: true,
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
  revalidatePath(`/products/${product.slug}`);
  revalidatePath("/cart");

  redirect("/cart");
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-3 py-3 text-[#f3efe5] sm:px-5 sm:py-4 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <CabinetTopNav />

        <article className="overflow-hidden rounded-[26px] border border-[#d8b66a]/18 bg-black/42 shadow-[0_24px_70px_rgba(0,0,0,0.48)] sm:rounded-[28px]">
          <div className="grid gap-0 md:grid-cols-[40%_60%]">
            <div className="relative aspect-square w-full self-start overflow-hidden border-b border-[#d8b66a]/14 bg-black/28 md:border-b-0 md:border-r">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex size-16 items-center justify-center rounded-[22px] border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <PackageCheck className="size-7" />
                  </div>
                </div>
              )}

              {product.category?.name && (
                <p className="absolute left-3 top-3 m-0 rounded-full border border-[#d8b66a]/18 bg-black/62 px-3 py-1.5 text-[0.54rem] font-bold uppercase tracking-[0.16em] text-[#d8b66a] backdrop-blur-sm sm:left-4 sm:top-4 sm:text-[0.6rem]">
                  {product.category.name}
                </p>
              )}
            </div>

            <div className="flex min-w-0 flex-col p-4 sm:p-5 md:p-4 lg:p-6">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#d8b66a]/18 bg-black/24 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a] sm:text-[0.62rem]">
                  <PackageCheck className="size-3.5" />
                  Товар
                </div>

                <h1 className="m-0 text-2xl font-bold leading-[1.12] tracking-[-0.055em] text-[#f3d98d] sm:text-3xl md:text-[1.7rem] lg:text-[2.35rem]">
                  {product.title}
                </h1>

                {product.shortDescription && (
                  <p className="mt-3 max-w-3xl text-[0.78rem] leading-5 text-[#f3efe5]/74 sm:text-[0.82rem] md:text-[0.72rem] md:leading-5 lg:text-sm lg:leading-6">
                    {product.shortDescription}
                  </p>
                )}
              </div>

              <div className="mt-4 rounded-[20px] border border-[#d8b66a]/14 bg-black/24 p-3.5 sm:mt-5 sm:rounded-[22px] sm:p-4 md:mt-4 md:p-3.5 lg:mt-5 lg:p-4">
                <p className="m-0 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/82 sm:text-[0.64rem]">
                  Стоимость
                </p>

                <div className="mt-2.5 flex flex-wrap items-end gap-2 sm:mt-3 sm:gap-2.5">
                  <p className="m-0 flex items-center gap-1.5 text-xl font-bold tracking-[-0.05em] text-[#d8b66a] sm:text-2xl md:text-xl lg:text-2xl">
                    <BadgeRussianRuble className="size-4.5 sm:size-5" />
                    {formatPriceFromKopecks(product.priceKopecks)}
                  </p>

                  {product.oldPriceKopecks && (
                    <p className="mb-0.5 text-xs text-[#f3efe5]/40 line-through sm:text-sm md:text-xs lg:text-sm">
                      {formatPriceFromKopecks(product.oldPriceKopecks)}
                    </p>
                  )}
                </div>

                <p className="mt-2.5 inline-flex rounded-full border border-[#d8b66a]/18 bg-black/20 px-2.5 py-1 text-[0.62rem] text-[#f3efe5]/64 sm:mt-3 sm:text-[0.68rem]">
                  Остаток: {product.stock}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d8b66a]/14 p-4 sm:p-5 lg:p-6">
            {product.description && (
              <div className="rounded-[20px] border border-[#d8b66a]/14 bg-black/24 p-4 sm:rounded-[22px] sm:p-5">
                <p className="m-0 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/82 sm:text-[0.64rem]">
                  Описание
                </p>

                <p className="mt-3 whitespace-pre-line text-[0.78rem] leading-5 text-[#f3efe5]/70 sm:text-[0.82rem] sm:leading-6 lg:text-sm">
                  {product.description}
                </p>
              </div>
            )}

            <form
              action={addProductToCart}
              className={`${
                product.description ? "mt-4 sm:mt-5" : ""
              } flex justify-center md:justify-end`}
            >
              <input type="hidden" name="productId" value={product.id} />

              <button
                type="submit"
                disabled={isOutOfStock}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:border-[#d8b66a]/14 disabled:bg-[#d8b66a]/18 disabled:text-[#d8b66a]/44 sm:w-auto sm:min-w-[200px] sm:px-6 sm:py-3 sm:text-xs lg:min-w-[220px]"
              >
                <ShoppingCart className="size-4 transition duration-300 group-hover:scale-110" />

                {isOutOfStock ? "Нет в наличии" : "В корзину"}
              </button>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
}