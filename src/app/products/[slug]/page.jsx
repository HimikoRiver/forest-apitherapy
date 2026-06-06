import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { BadgeRussianRuble, PackageCheck, ShoppingCart } from "lucide-react";
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
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <CabinetTopNav />

        <article className="overflow-hidden rounded-[34px] border border-[#d8b66a]/18 bg-black/42 shadow-[0_30px_90px_rgba(0,0,0,0.52)]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.82fr)]">
            <div className="relative min-h-[320px] border-b border-[#d8b66a]/14 bg-black/28 lg:min-h-[620px] lg:border-b-0 lg:border-r">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] w-full items-center justify-center">
                  <div className="flex size-20 items-center justify-center rounded-[28px] border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <PackageCheck className="size-9" />
                  </div>
                </div>
              )}

              {product.category?.name && (
                <p className="absolute left-5 top-5 m-0 rounded-full border border-[#d8b66a]/18 bg-black/58 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a] backdrop-blur-sm">
                  {product.category.name}
                </p>
              )}
            </div>

            <div className="flex flex-col p-5 sm:p-7 lg:p-8">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-xs font-bold uppercase tracking-[0.34em] text-[#d8b66a]">
                  <PackageCheck className="size-4" />
                  Товар
                </div>

                <h1 className="m-0 text-3xl font-bold tracking-[-0.06em] text-[#f3d98d] sm:text-4xl lg:text-5xl">
                  {product.title}
                </h1>

                {product.shortDescription && (
                  <p className="mt-5 text-sm leading-7 text-[#f3efe5]/76 sm:text-base">
                    {product.shortDescription}
                  </p>
                )}
              </div>

              <div className="mt-7 rounded-[28px] border border-[#d8b66a]/14 bg-black/24 p-5">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/82">
                  Стоимость
                </p>

                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <p className="m-0 flex items-center gap-2 text-3xl font-bold tracking-[-0.05em] text-[#d8b66a]">
                    <BadgeRussianRuble className="size-7" />
                    {formatPriceFromKopecks(product.priceKopecks)}
                  </p>

                  {product.oldPriceKopecks && (
                    <p className="mb-1 text-base text-[#f3efe5]/40 line-through">
                      {formatPriceFromKopecks(product.oldPriceKopecks)}
                    </p>
                  )}
                </div>

                <p className="mt-4 inline-flex rounded-full border border-[#d8b66a]/18 bg-black/20 px-3 py-1 text-xs text-[#f3efe5]/66">
                  Остаток: {product.stock}
                </p>
              </div>

              {product.description && (
                <div className="mt-6 rounded-[28px] border border-[#d8b66a]/14 bg-black/24 p-5">
                  <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/82">
                    Описание
                  </p>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#f3efe5]/72">
                    {product.description}
                  </p>
                </div>
              )}

              <form action={addProductToCart} className="mt-7">
                <input type="hidden" name="productId" value={product.id} />

                <button
                  type="submit"
                  disabled={isOutOfStock}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:border-[#d8b66a]/14 disabled:bg-[#d8b66a]/18 disabled:text-[#d8b66a]/44"
                >
                  <ShoppingCart className="size-4 transition duration-300 group-hover:scale-110" />
                  {isOutOfStock ? "Нет в наличии" : "В корзину"}
                </button>
              </form>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}