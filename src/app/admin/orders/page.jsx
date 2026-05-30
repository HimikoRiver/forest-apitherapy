import Link from "next/link";
import { revalidatePath } from "next/cache";
import {
  ArrowLeft,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Phone,
  RefreshCw,
  Save,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

const ORDER_STATUSES = ["PENDING", "PROCESSING", "COMPLETED", "CANCELED"];

const ORDER_STATUS_LABELS = {
  PENDING: "Новый",
  PROCESSING: "В обработке",
  COMPLETED: "Завершён",
  CANCELED: "Отменён",
};

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

function formatOrderDate(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function OrderStatusBadge({ status }) {
  const statusStyles = {
    PENDING: "border-[#d8b66a]/22 bg-[#d8b66a]/10 text-[#f3d98d]",
    PROCESSING: "border-blue-300/22 bg-blue-400/10 text-blue-100",
    COMPLETED: "border-emerald-300/22 bg-emerald-400/10 text-emerald-100",
    CANCELED: "border-red-300/22 bg-red-400/10 text-red-100",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.2em] ${
        statusStyles[status] || statusStyles.PENDING
      }`}
    >
      <Clock3 className="size-3.5" />
      {ORDER_STATUS_LABELS[status] || status}
    </span>
  );
}

function ContactRow({ icon: Icon, label, value }) {
  if (!value) {
    return null;
  }

  return (
    <p className="m-0 flex items-start gap-2 text-sm leading-6 text-[#f3efe5]/72">
      <Icon className="mt-1 size-4 shrink-0 text-[#d8b66a]/72" />
      <span>
        <span className="text-[#d8b66a]/82">{label}:</span> {value}
      </span>
    </p>
  );
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
    <main className="min-h-screen px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-[34px] border border-[#d8b66a]/16 bg-[#030b0c]/72 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <div className="relative px-5 py-7 sm:px-7 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.14),transparent_34%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
                  <ClipboardList className="size-4" />
                  Административная панель
                </div>

                <h1 className="m-0 max-w-3xl text-3xl font-bold tracking-[-0.06em] text-[#f3d98d] sm:text-4xl lg:text-5xl">
                  Управление заказами
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72 sm:text-base">
                  Просматривайте заявки, контактные данные клиентов, состав
                  заказа и обновляйте статус обработки.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_12px_34px_rgba(216,182,106,0.12)]"
                >
                  <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" />
                  Назад
                </Link>

                <Link
                  href="/admin/products"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_12px_34px_rgba(216,182,106,0.12)]"
                >
                  <PackageCheck className="size-4 transition group-hover:scale-110" />
                  Товары
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/76 shadow-[0_24px_70px_rgba(0,0,0,0.44)]">
          <div className="border-b border-[#d8b66a]/12 px-5 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                  <ShoppingBag className="size-5" />
                </div>

                <div>
                  <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                    Заявки
                  </p>

                  <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                    Текущие заказы
                  </h2>
                </div>
              </div>

              <p className="m-0 rounded-full border border-[#d8b66a]/14 bg-black/22 px-3 py-1 text-xs text-[#f3efe5]/58">
                Всего: {orders.length}
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-5">
              <div className="rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-5">
                <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
                  Заказов пока нет.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-5">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="group rounded-[30px] border border-[#d8b66a]/12 bg-black/24 p-5 transition duration-300 hover:border-[#d8b66a]/30 hover:bg-black/32 hover:shadow-[0_20px_54px_rgba(0,0,0,0.28)]"
                >
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <div>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <OrderStatusBadge status={order.status} />

                          <h3 className="mt-3 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                            Заказ от {formatOrderDate(order.createdAt)}
                          </h3>

                          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#f3efe5]/38">
                            ID: {order.id}
                          </p>
                        </div>

                        <p className="m-0 text-2xl font-bold tracking-[-0.04em] text-[#d8b66a]">
                          {formatPriceFromKopecks(order.totalKopecks)}
                        </p>
                      </div>

                      <div className="mt-5 grid gap-3 rounded-[24px] border border-[#d8b66a]/10 bg-black/18 p-4 md:grid-cols-2">
                        <ContactRow
                          icon={UserRound}
                          label="Клиент"
                          value={order.customerName}
                        />

                        <ContactRow
                          icon={Phone}
                          label="Телефон"
                          value={order.customerPhone}
                        />

                        <ContactRow
                          icon={Mail}
                          label="Email"
                          value={order.customerEmail}
                        />

                        <ContactRow
                          icon={LayoutDashboard}
                          label="Аккаунт"
                          value={
                            order.user?.email
                              ? `${order.user.name || "Пользователь"} · ${
                                  order.user.email
                                }`
                              : null
                          }
                        />

                        <ContactRow
                          icon={MapPin}
                          label="Адрес / получение"
                          value={order.deliveryAddress}
                        />

                        <ContactRow
                          icon={MessageSquareText}
                          label="Комментарий"
                          value={order.comment}
                        />
                      </div>

                      <div className="mt-5">
                        <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                          Состав заказа
                        </p>

                        <div className="mt-3 space-y-2.5">
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
                                  <p className="mt-1 text-xs text-[#f3efe5]/42">
                                    /products/{item.productSlug}
                                  </p>
                                )}
                              </div>

                              <p className="m-0 shrink-0 text-[#f3efe5]/64">
                                {item.quantity} ×{" "}
                                {formatPriceFromKopecks(item.priceKopecks)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <aside className="h-fit rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                          <RefreshCw className="size-4" />
                        </div>

                        <div>
                          <p className="m-0 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/74">
                            Обработка
                          </p>

                          <h4 className="m-0 text-base font-bold text-[#f3d98d]">
                            Статус заказа
                          </h4>
                        </div>
                      </div>

                      <form action={updateOrderStatus} className="mt-4 space-y-3">
                        <input type="hidden" name="orderId" value={order.id} />

                        <label className="block">
                          <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
                            Статус
                          </span>

                          <select
                            name="status"
                            defaultValue={order.status}
                            className="w-full rounded-2xl border border-[#d8b66a]/14 bg-black/36 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 focus:border-[#d8b66a]/58 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {ORDER_STATUS_LABELS[status] || status}
                              </option>
                            ))}
                          </select>
                        </label>

                        <button
                          type="submit"
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/48 bg-[#d8b66a] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#07110f] shadow-[0_14px_38px_rgba(216,182,106,0.14)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_20px_52px_rgba(216,182,106,0.2)]"
                        >
                          <Save className="size-4 transition duration-300 group-hover:scale-110" />
                          Сохранить статус
                        </button>
                      </form>
                    </aside>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}