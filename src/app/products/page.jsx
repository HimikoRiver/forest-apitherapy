import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
              Каталог
            </p>

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
            className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
          >
            Корзина
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Пока нет активных товаров. Добавим их через админ-панель.
            </p>

            <Link
              href="/admin/products"
              className="mt-5 inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Перейти в админку
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const isOutOfStock = product.stock <= 0;

              return (
                <article
                  key={product.id}
                  className="flex min-h-[310px] flex-col rounded-[28px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_20px_54px_rgba(0,0,0,0.38)]"
                >
                  {product.category?.name && (
                    <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/82">
                      {product.category.name}
                    </p>
                  )}

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

                        <p className="m-0 text-xl font-bold text-[#d8b66a]">
                          {formatPriceFromKopecks(product.priceKopecks)}
                        </p>
                      </div>

                      <p className="m-0 rounded-full border border-[#d8b66a]/18 px-3 py-1 text-xs text-[#f3efe5]/66">
                        Остаток: {product.stock}
                      </p>
                    </div>

                    <form action={addProductToCart} className="mt-5">
                      <input type="hidden" name="productId" value={product.id} />

                      <button
                        type="submit"
                        disabled={isOutOfStock}
                        className="w-full rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:border-[#d8b66a]/14 disabled:bg-[#d8b66a]/18 disabled:text-[#d8b66a]/44"
                      >
                        {isOutOfStock ? "Нет в наличии" : "В корзину"}
                      </button>
                    </form>
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