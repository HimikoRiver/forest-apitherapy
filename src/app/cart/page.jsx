import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import {
  ArrowRight,
  BadgeRussianRuble,
  LayoutGrid,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import CartQuantityControl from "@/components/cart/CartQuantityControl";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import CabinetTopNav from "@/components/shared/CabinetTopNav";
import { requireUser } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

async function updateCartItemQuantity(formData) {
  "use server";

  const user = await requireUser();

  const cartItemId = String(formData.get("cartItemId") || "").trim();
  const rawQuantity = Number(formData.get("quantity"));

  if (
    !cartItemId ||
    !Number.isSafeInteger(rawQuantity) ||
    rawQuantity < 1 ||
    rawQuantity > 999
  ) {
    return;
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      userId: user.id,
    },
    include: {
      product: {
        select: {
          stock: true,
        },
      },
    },
  });

  if (!cartItem || cartItem.product.stock < 1) {
    return;
  }

  const quantity = Math.min(rawQuantity, cartItem.product.stock);

  await prisma.cartItem.update({
    where: {
      id: cartItem.id,
    },
    data: {
      quantity,
    },
  });

  revalidatePath("/cart");
}

async function removeCartItem(formData) {
  "use server";

  const user = await requireUser();

  const cartItemId = String(formData.get("cartItemId") || "").trim();

  if (!cartItemId) {
    return;
  }

  await prisma.cartItem.deleteMany({
    where: {
      id: cartItemId,
      userId: user.id,
    },
  });

  revalidatePath("/cart");
}

export default async function CartPage() {
  const user = await requireUser();

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });

  const totalKopecks = cartItems.reduce((sum, item) => {
    return sum + item.product.priceKopecks * item.quantity;
  }, 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <CabinetTopNav />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-xs font-bold uppercase tracking-[0.34em] text-[#d8b66a]">
              <ShoppingCart className="size-4" />
              Личный кабинет
            </div>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Корзина
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Здесь будут товары, которые пользователь добавил из каталога.
            </p>
          </div>

          <Link
            href="/products"
            aria-label="В каталог"
            title="В каталог"
            className="group inline-flex size-14 items-center justify-center rounded-2xl border border-[#d8b66a]/35 bg-black/24 text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_14px_38px_rgba(216,182,106,0.14)]"
          >
            <LayoutGrid className="size-5 transition duration-300 group-hover:scale-110" />
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/40 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
              <ShoppingBag className="size-5" />
            </div>

            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Корзина пока пустая. Перейдите в каталог и добавьте первый товар.
            </p>

            <Link
              href="/products"
              className="group mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/35 bg-black/24 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
            >
              Смотреть товары
              <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-[28px] border border-[#d8b66a]/18 bg-black/40 p-5 shadow-[0_20px_54px_rgba(0,0,0,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#d8b66a]/36 hover:bg-black/48 hover:shadow-[0_28px_70px_rgba(216,182,106,0.1)]"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
                      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl border border-[#d8b66a]/16 bg-[#030b0c] sm:h-32 sm:w-32">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            sizes="(max-width: 639px) calc(100vw - 72px), 128px"
                            unoptimized={item.product.image.startsWith(
                              "/uploads/products/"
                            )}
                            className="object-contain p-2 transition duration-500 group-hover:scale-[1.03] sm:p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#f3d98d]">
                            <PackageCheck className="size-6" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        {item.product.category?.name && (
                          <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/76">
                            {item.product.category.name}
                          </p>
                        )}

                        <h2 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                          {item.product.title}
                        </h2>

                        {item.product.shortDescription && (
                          <p className="mt-3 max-w-xl text-sm leading-7 text-[#f3efe5]/72">
                            {item.product.shortDescription}
                          </p>
                        )}

                        <p className="mt-4 flex items-center gap-2 text-lg font-bold text-[#d8b66a]">
                          <BadgeRussianRuble className="size-5" />
                          {formatPriceFromKopecks(
                            item.product.priceKopecks
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-[190px]">
                      <CartQuantityControl
                        cartItemId={item.id}
                        quantity={item.quantity}
                        maxQuantity={item.product.stock}
                        updateAction={updateCartItemQuantity}
                      />

                      <form action={removeCartItem} className="mt-3">
                        <input
                          type="hidden"
                          name="cartItemId"
                          value={item.id}
                        />

                        <button
                          type="submit"
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-300/18 bg-red-400/8 px-4 py-3 text-sm font-medium text-red-100/82 transition duration-300 hover:border-red-300/34 hover:bg-red-400/12 hover:text-red-100"
                        >
                          <Trash2 className="size-4 transition duration-300 group-hover:scale-110" />
                          Удалить
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[28px] border border-[#d8b66a]/18 bg-black/40 p-5 shadow-[0_20px_54px_rgba(0,0,0,0.38)] lg:sticky lg:top-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                <ShoppingBag className="size-5" />
              </div>

              <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/78">
                Итого
              </p>

              <p className="mt-3 flex items-center gap-2 text-2xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                <BadgeRussianRuble className="size-5" />
                {formatPriceFromKopecks(totalKopecks)}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#f3efe5]/58">
                Финальная стоимость и наличие будут повторно проверены при оформлении заказа.
              </p>

              <Link
                href="/checkout"
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Оформить заказ
                <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-0.5" />
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
