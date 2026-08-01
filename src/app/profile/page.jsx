import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  Mail,
  PackageCheck,
  UserRound,
} from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import CabinetTopNav from "@/components/shared/CabinetTopNav";
import { requireUser } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

const ORDER_STATUS_LABELS = {
  PENDING: "Новый",
  PROCESSING: "В обработке",
  COMPLETED: "Завершён",
  CANCELED: "Отменён",
};

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
    COMPLETED:
      "border-emerald-300/22 bg-emerald-400/10 text-emerald-100",
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

export default async function ProfilePage() {
  const sessionUser = await requireUser();

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    select: {
      name: true,
      email: true,
      role: true,
      orders: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const orders = user?.orders || [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <CabinetTopNav showAdminLinks={user?.role === "ADMIN"} />

        <div className="mb-3 overflow-hidden rounded-[34px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <div className="relative px-5 py-7 sm:px-7 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.14),transparent_34%)]" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
                <UserRound className="size-4" />
                Личный кабинет
              </div>

              <h1 className="m-0 max-w-3xl text-3xl font-bold tracking-[-0.06em] text-[#f3d98d] sm:text-4xl lg:text-5xl">
                Добро пожаловать
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#f3efe5]/72 sm:text-base sm:leading-8">
                Здесь хранятся данные профиля, история заказов и быстрые
                переходы к покупкам.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[360px_1fr]">
          <aside className="h-fit overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_24px_70px_rgba(0,0,0,0.44)]">
            <div className="border-b border-[#d8b66a]/12 px-5 py-5">
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                  <UserRound className="size-5" />
                </div>

                <div>
                  <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                    Пользователь
                  </p>

                  <h2 className="mt-1.5 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                    Профиль
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="rounded-[24px] border border-[#d8b66a]/10 bg-black/22 p-4">
                <div className="space-y-4 text-sm leading-7 text-[#f3efe5]/82">
                  <p className="m-0 flex items-start gap-2.5">
                    <UserRound className="mt-1.5 size-4 shrink-0 text-[#d8b66a]/72" />

                    <span>
                      <span className="text-[#d8b66a]/82">Имя:</span>{" "}
                      {user?.name || "Не указано"}
                    </span>
                  </p>

                  <p className="m-0 flex items-start gap-2.5">
                    <Mail className="mt-1.5 size-4 shrink-0 text-[#d8b66a]/72" />

                    <span>
                      <span className="text-[#d8b66a]/82">Email:</span>{" "}
                      {user?.email || sessionUser.email}
                    </span>
                  </p>

                  <p className="m-0 flex items-start gap-2.5">
                    <LayoutDashboard className="mt-1.5 size-4 shrink-0 text-[#d8b66a]/72" />

                    <span>
                      <span className="text-[#d8b66a]/82">Роль:</span>{" "}
                      {user?.role || "USER"}
                    </span>
                  </p>
                </div>
              </div>

              <SignOutButton />
            </div>
          </aside>

          <section className="overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_24px_70px_rgba(0,0,0,0.44)]">
            <div className="border-b border-[#d8b66a]/12 px-5 py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <ClipboardList className="size-5" />
                  </div>

                  <div>
                    <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                      История заказов
                    </p>

                    <h2 className="mt-1.5 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      Ваши заказы
                    </h2>
                  </div>
                </div>

                <p className="m-0 rounded-full border border-[#d8b66a]/14 bg-black/22 px-3 py-1.5 text-xs text-[#f3efe5]/58">
                  Всего: {orders.length}
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="p-5">
                <div className="rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-5">
                  <p className="m-0 text-sm leading-7 text-[#f3efe5]/72 sm:leading-8">
                    Заказов пока нет. Добавьте товар в корзину и оформите первый
                    заказ.
                  </p>

                  <Link
                    href="/products"
                    className="group mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
                  >
                    Смотреть товары
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-5">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/profile/orders/${order.id}`}
                    className="group/order block rounded-[28px] border border-[#d8b66a]/12 bg-black/24 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/34 hover:bg-black/32 hover:shadow-[0_20px_54px_rgba(0,0,0,0.28)]"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <OrderStatusBadge status={order.status} />

                        <h3 className="mt-4 text-xl font-bold tracking-[-0.05em] text-[#f3d98d] transition duration-300 group-hover/order:text-[#fff1b8]">
                          Заказ от {formatOrderDate(order.createdAt)}
                        </h3>

                        <p className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66a]/70">
                          Подробнее
                          <ArrowRight className="size-3.5 transition duration-300 group-hover/order:translate-x-0.5" />
                        </p>
                      </div>

                      <p className="m-0 text-2xl font-bold tracking-[-0.04em] text-[#d8b66a]">
                        {formatPriceFromKopecks(order.totalKopecks)}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-3 rounded-2xl border border-[#d8b66a]/10 bg-black/18 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#d8b66a]/14 bg-black/28">
                              {item.product?.image ? (
                                <Image
                                  src={item.product.image}
                                  alt={item.productTitle}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#f3d98d]">
                                  <PackageCheck className="size-5" />
                                </div>
                              )}
                            </div>

                            <span className="font-bold leading-6 text-[#f3d98d]">
                              {item.productTitle}
                            </span>
                          </div>

                          <span className="shrink-0 leading-6 text-[#f3efe5]/62">
                            {item.quantity} ×{" "}
                            {formatPriceFromKopecks(item.priceKopecks)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}