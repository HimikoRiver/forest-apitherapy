import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2),
  customerPhone: z.string().trim().min(5),
  customerEmail: z.string().trim().email().optional().or(z.literal("")),
  deliveryAddress: z.string().trim().optional(),
  comment: z.string().trim().optional(),
});

async function createOrder(formData) {
  "use server";

  const user = await requireUser();

  const parsed = checkoutSchema.parse({
    customerName: String(formData.get("customerName") || ""),
    customerPhone: String(formData.get("customerPhone") || ""),
    customerEmail: String(formData.get("customerEmail") || ""),
    deliveryAddress: String(formData.get("deliveryAddress") || ""),
    comment: String(formData.get("comment") || ""),
  });

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
  });

  if (cartItems.length === 0) {
    redirect("/cart");
  }

  const totalKopecks = cartItems.reduce((sum, item) => {
    return sum + item.product.priceKopecks * item.quantity;
  }, 0);

  await prisma.$transaction(async (tx) => {
    for (const item of cartItems) {
      const updatedProduct = await tx.product.updateMany({
        where: {
          id: item.productId,
          stock: {
            gte: item.quantity,
          },
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      if (updatedProduct.count !== 1) {
        throw new Error(`Недостаточно товара: ${item.product.title}`);
      }
    }

    await tx.order.create({
      data: {
        userId: user.id,
        totalKopecks,
        customerName: parsed.customerName,
        customerPhone: parsed.customerPhone,
        customerEmail: parsed.customerEmail || null,
        deliveryAddress: parsed.deliveryAddress || null,
        comment: parsed.comment || null,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceKopecks: item.product.priceKopecks,
            productTitle: item.product.title,
            productSlug: item.product.slug,
          })),
        },
      },
    });

    await tx.cartItem.deleteMany({
      where: {
        userId: user.id,
      },
    });
  });

  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/products");
  revalidatePath("/profile");
  revalidatePath("/admin/products");

  redirect("/profile");
}

export default async function CheckoutPage() {
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
              Оформление
            </p>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Новый заказ
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Проверьте состав корзины и оставьте контактные данные для связи.
            </p>
          </div>

          <Link
            href="/cart"
            className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
          >
            Назад в корзину
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Корзина пустая. Сначала добавьте товары из каталога.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Смотреть товары
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <form
              action={createOrder}
              className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
            >
              <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                Контактные данные
              </h2>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Имя
                  </span>

                  <input
                    name="customerName"
                    required
                    defaultValue={user.name || ""}
                    className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                    placeholder="Ваше имя"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Телефон
                  </span>

                  <input
                    name="customerPhone"
                    required
                    className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                    placeholder="+7..."
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Email
                  </span>

                  <input
                    name="customerEmail"
                    type="email"
                    defaultValue={user.email || ""}
                    className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                    placeholder="example@mail.ru"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Адрес / способ получения
                  </span>

                  <textarea
                    name="deliveryAddress"
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                    placeholder="Адрес доставки или комментарий по получению"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                    Комментарий
                  </span>

                  <textarea
                    name="comment"
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                    placeholder="Дополнительные пожелания к заказу"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition hover:brightness-110"
                >
                  Подтвердить заказ
                </button>
              </div>
            </form>

            <aside className="h-fit rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                Состав заказа
              </p>

              <div className="mt-5 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-[#d8b66a]/14 bg-black/22 p-4"
                  >
                    <p className="m-0 text-sm font-bold text-[#f3d98d]">
                      {item.product.title}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#f3efe5]/62">
                      {item.quantity} ×{" "}
                      {formatPriceFromKopecks(item.product.priceKopecks)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[#d8b66a]/16 pt-5">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                  Итого
                </p>

                <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                  {formatPriceFromKopecks(totalKopecks)}
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
