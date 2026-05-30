import Link from "next/link";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

const ORDER_STATUSES = ["PENDING", "PROCESSING", "COMPLETED", "CANCELED"];

async function updateOrderStatus(formData) {
  "use server";

  await requireAdmin();

  const orderId = String(formData.get("orderId") || "");
  const status = String(formData.get("status") || "");

  if (!ORDER_STATUSES.includes(status)) {
    return;
  }

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/profile");
}

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
              Админка
            </p>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Заказы
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Здесь отображаются заказы пользователей, контактные данные,
              состав заказа и текущий статус.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Назад
            </Link>

            <Link
              href="/admin/products"
              className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Товары
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Заказов пока нет.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                      {order.status}
                    </p>

                    <h2 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      Заказ от{" "}
                      {new Intl.DateTimeFormat("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(order.createdAt)}
                    </h2>

                    <div className="mt-4 grid gap-2 text-sm leading-6 text-[#f3efe5]/76">
                      <p className="m-0">
                        <span className="text-[#d8b66a]/82">Клиент:</span>{" "}
                        {order.customerName}
                      </p>

                      <p className="m-0">
                        <span className="text-[#d8b66a]/82">Телефон:</span>{" "}
                        {order.customerPhone}
                      </p>

                      {order.customerEmail && (
                        <p className="m-0">
                          <span className="text-[#d8b66a]/82">Email:</span>{" "}
                          {order.customerEmail}
                        </p>
                      )}

                      {order.deliveryAddress && (
                        <p className="m-0">
                          <span className="text-[#d8b66a]/82">
                            Адрес / получение:
                          </span>{" "}
                          {order.deliveryAddress}
                        </p>
                      )}

                      {order.comment && (
                        <p className="m-0">
                          <span className="text-[#d8b66a]/82">
                            Комментарий:
                          </span>{" "}
                          {order.comment}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full rounded-3xl border border-[#d8b66a]/14 bg-black/22 p-4 lg:w-[280px]">
                    <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                      Итого
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      {formatPriceFromKopecks(order.totalKopecks)}
                    </p>

                    <form action={updateOrderStatus} className="mt-5 space-y-3">
                      <input type="hidden" name="orderId" value={order.id} />

                      <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                          Статус
                        </span>

                        <select
                          name="status"
                          defaultValue={order.status}
                          className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition focus:border-[#d8b66a]/60"
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>

                      <button
                        type="submit"
                        className="w-full rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#07110f] transition hover:brightness-110"
                      >
                        Обновить статус
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#d8b66a]/14 pt-5">
                  <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                    Состав заказа
                  </p>

                  <div className="mt-4 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-2 rounded-2xl border border-[#d8b66a]/10 bg-black/18 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <p className="m-0 font-bold text-[#f3d98d]">
                            {item.productTitle}
                          </p>

                          {item.productSlug && (
                            <p className="mt-1 text-xs text-[#f3efe5]/44">
                              /products/{item.productSlug}
                            </p>
                          )}
                        </div>

                        <p className="m-0 text-[#f3efe5]/64">
                          {item.quantity} ×{" "}
                          {formatPriceFromKopecks(item.priceKopecks)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}