import Link from "next/link";
import { revalidatePath } from "next/cache";
import CartQuantityControl from "@/components/cart/CartQuantityControl";
import { requireUser } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

async function updateCartItemQuantity(formData) {
  "use server";

  const user = await requireUser();

  const cartItemId = String(formData.get("cartItemId") || "");
  const requestedQuantity = Math.max(1, Number(formData.get("quantity") || 1));

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

  if (!cartItem) {
    return;
  }

  const quantity = Math.min(requestedQuantity, cartItem.product.stock);

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

  const cartItemId = String(formData.get("cartItemId") || "");

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
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
              Личный кабинет
            </p>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Корзина
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Здесь будут товары, которые пользователь добавил из каталога.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
          >
            В каталог
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Корзина пока пустая. Перейдите в каталог и добавьте первый товар.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Смотреть товары
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[28px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_20px_54px_rgba(0,0,0,0.38)]"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
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

                      <p className="mt-4 text-lg font-bold text-[#d8b66a]">
                        {formatPriceFromKopecks(item.product.priceKopecks)}
                      </p>
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
                          className="w-full rounded-2xl border border-red-400/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-100 transition hover:border-red-300/60"
                        >
                          Удалить
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                Итого
              </p>

              <p className="mt-4 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                {formatPriceFromKopecks(totalKopecks)}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#f3efe5]/66">
                Оформление заказа подключим следующим этапом.
              </p>

              <button
                type="button"
                disabled
                className="mt-5 w-full cursor-not-allowed rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a]/54"
              >
                Оформить заказ
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}