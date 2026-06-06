import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeRussianRuble,
  ClipboardList,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  PackageCheck,
  Phone,
  UserRound,
} from "lucide-react";
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

function InfoRow({ icon: Icon, label, value }) {
  return (
    <p className="m-0 flex items-start gap-2 text-sm leading-6 text-[#f3efe5]/76">
      <Icon className="mt-1 size-4 shrink-0 text-[#d8b66a]/72" />

      <span>
        <span className="text-[#d8b66a]/82">{label}:</span>{" "}
        {value || "Не указано"}
      </span>
    </p>
  );
}

export default async function ProfileOrderPage({ params }) {
  const { orderId } = await params;
  const sessionUser = await requireUser();

  const [user, order] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: sessionUser.id,
      },
      select: {
        role: true,
      },
    }),
    prisma.order.findFirst({
      where: {
        id: orderId,
        userId: sessionUser.id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                image: true,
                slug: true,
              },
            },
          },
        },
      },
    }),
  ]);

  if (!order) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <CabinetTopNav showAdminLinks={user?.role === "ADMIN"} />

        <div className="mb-6 overflow-hidden rounded-[34px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <div className="relative px-5 py-7 sm:px-7 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.14),transparent_34%)]" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
                  <ClipboardList className="size-4" />
                  Детали заказа
                </div>

                <h1 className="m-0 max-w-3xl text-3xl font-bold tracking-[-0.06em] text-[#f3d98d] sm:text-4xl lg:text-5xl">
                  Заказ от {formatOrderDate(order.createdAt)}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72 sm:text-base">
                  Здесь отображается состав заказа, статус обработки и данные,
                  которые были указаны при оформлении.
                </p>
              </div>

              <Link
                href="/profile"
                className="group inline-flex w-fit items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
              >
                <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" />
                Назад
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_24px_70px_rgba(0,0,0,0.44)]">
            <div className="border-b border-[#d8b66a]/12 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                  <PackageCheck className="size-5" />
                </div>

                <div>
                  <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                    Состав заказа
                  </p>

                  <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                    Товары
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-5">
              {order.items.map((item) => {
                const productHref = item.product?.slug
                  ? `/products/${item.product.slug}`
                  : null;

                const content = (
                  <div className="flex flex-col gap-3 rounded-2xl border border-[#d8b66a]/10 bg-black/18 px-4 py-3 text-sm transition duration-300 hover:border-[#d8b66a]/22 hover:bg-black/26 md:flex-row md:items-center md:justify-between">
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

                      <div className="min-w-0">
                        <p className="m-0 font-bold text-[#f3d98d]">
                          {item.productTitle}
                        </p>

                        {item.productSlug && (
                          <p className="mt-1 truncate text-xs text-[#f3efe5]/42">
                            /products/{item.productSlug}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-left md:text-right">
                      <p className="m-0 text-sm text-[#f3efe5]/62">
                        {item.quantity} ×{" "}
                        {formatPriceFromKopecks(item.priceKopecks)}
                      </p>

                      <p className="mt-1 text-base font-bold text-[#d8b66a]">
                        {formatPriceFromKopecks(
                          item.quantity * item.priceKopecks
                        )}
                      </p>
                    </div>
                  </div>
                );

                if (!productHref) {
                  return <div key={item.id}>{content}</div>;
                }

                return (
                  <Link key={item.id} href={productHref} className="block">
                    {content}
                  </Link>
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_24px_70px_rgba(0,0,0,0.44)]">
              <div className="border-b border-[#d8b66a]/12 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <Clock3 className="size-5" />
                  </div>

                  <div>
                    <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                      Статус
                    </p>

                    <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      Обработка
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5">
                <OrderStatusBadge status={order.status} />

                <div className="rounded-[24px] border border-[#d8b66a]/10 bg-black/22 p-4">
                  <p className="m-0 text-xs font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                    Итого
                  </p>

                  <p className="mt-3 flex items-center gap-2 text-3xl font-bold tracking-[-0.05em] text-[#d8b66a]">
                    <BadgeRussianRuble className="size-7" />
                    {formatPriceFromKopecks(order.totalKopecks)}
                  </p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_24px_70px_rgba(0,0,0,0.44)]">
              <div className="border-b border-[#d8b66a]/12 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <UserRound className="size-5" />
                  </div>

                  <div>
                    <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                      Данные
                    </p>

                    <h2 className="m-0 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      Покупатель
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="space-y-3 rounded-[24px] border border-[#d8b66a]/10 bg-black/22 p-4">
                  <InfoRow
                    icon={UserRound}
                    label="Имя"
                    value={order.customerName}
                  />

                  <InfoRow
                    icon={Phone}
                    label="Телефон"
                    value={order.customerPhone}
                  />

                  <InfoRow
                    icon={Mail}
                    label="Email"
                    value={order.customerEmail}
                  />

                  <InfoRow
                    icon={MapPin}
                    label="Адрес / получение"
                    value={order.deliveryAddress}
                  />

                  <InfoRow
                    icon={MessageSquare}
                    label="Комментарий"
                    value={order.comment}
                  />
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}