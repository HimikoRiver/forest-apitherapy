import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Clock3,
  ListFilter,
  PackageCheck,
} from "lucide-react";

import OrdersPagination from "@/components/shared/OrdersPagination";
import { formatPriceFromKopecks } from "@/lib/money";

const ORDER_STATUS_LABELS = {
  PENDING: "Новый",
  PROCESSING: "В обработке",
  COMPLETED: "Завершён",
  CANCELED: "Отменён",
};

const ORDER_STATUS_DESCRIPTIONS = {
  PENDING: "Заказ создан и ожидает начала обработки.",
  PROCESSING: "Администратор уже занимается вашим заказом.",
  COMPLETED: "Заказ успешно выполнен.",
  CANCELED: "Заказ был отменён.",
};

const FILTERS = [
  {
    id: "ACTIVE",
    label: "Активные",
    title: "Активные заказы",
  },
  {
    id: "PENDING",
    label: "Новые",
    title: "Новые заказы",
  },
  {
    id: "PROCESSING",
    label: "В обработке",
    title: "Заказы в обработке",
  },
  {
    id: "COMPLETED",
    label: "Завершённые",
    title: "Завершённые заказы",
  },
  {
    id: "CANCELED",
    label: "Отменённые",
    title: "Отменённые заказы",
  },
  {
    id: "ALL",
    label: "Все",
    title: "Все заказы",
  },
];

function OrderStatusBadge({ status }) {
  const statusStyles = {
    PENDING:
      "border-[#d8b66a]/22 bg-[#d8b66a]/10 text-[#f3d98d]",
    PROCESSING:
      "border-blue-300/22 bg-blue-400/10 text-blue-100",
    COMPLETED:
      "border-emerald-300/22 bg-emerald-400/10 text-emerald-100",
    CANCELED:
      "border-red-300/22 bg-red-400/10 text-red-100",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] ${
        statusStyles[status] || statusStyles.PENDING
      }`}
    >
      <Clock3 className="size-3.5" />

      {ORDER_STATUS_LABELS[status] || status}
    </span>
  );
}

function OrderCard({ order }) {
  return (
    <Link
      href={`/profile/orders/${order.id}`}
      className="group/order block rounded-[28px] border border-[#d8b66a]/12 bg-black/24 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/34 hover:bg-black/32 hover:shadow-[0_20px_54px_rgba(0,0,0,0.28)]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <OrderStatusBadge status={order.status} />

          <h3 className="mt-4 text-xl font-bold tracking-[-0.05em] text-[#f3d98d] transition duration-300 group-hover/order:text-[#fff1b8]">
            Заказ от {order.createdAtLabel}
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#f3efe5]/58">
            {ORDER_STATUS_DESCRIPTIONS[order.status]}
          </p>

          <p className="mt-3 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#d8b66a]/72">
            Подробнее

            <ArrowRight className="size-3.5 transition duration-300 group-hover/order:translate-x-0.5" />
          </p>
        </div>

        <p className="m-0 shrink-0 text-2xl font-bold tracking-[-0.04em] text-[#d8b66a]">
          {formatPriceFromKopecks(order.totalKopecks)}
        </p>
      </div>

      <div className="mt-5 space-y-3">
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
                    unoptimized={item.product.image.startsWith(
                      "/uploads/products/"
                    )}
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
  );
}

export default function ProfileOrdersList({
  initialOrders,
  filterCounts,
  activeFilter,
  currentPage,
  totalPages,
  totalFilteredOrders,
}) {
  const activeFilterData =
    FILTERS.find((filter) => filter.id === activeFilter) ||
    FILTERS[0];

  const totalOrders = filterCounts.ALL || 0;

  return (
    <section
      id="orders"
      className="scroll-mt-24 overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_24px_70px_rgba(0,0,0,0.44)]"
    >
      <div className="border-b border-[#d8b66a]/12">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
              <ClipboardList className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="m-0 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/78">
                История заказов
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                {activeFilterData.title}
              </h2>
            </div>
          </div>

          <p className="m-0 w-fit rounded-full border border-[#d8b66a]/14 bg-black/22 px-3 py-1.5 text-xs text-[#f3efe5]/58">
            На странице: {initialOrders.length} из{" "}
            {totalFilteredOrders}
          </p>
        </div>

        {totalOrders > 0 && (
          <div className="border-t border-[#d8b66a]/8 px-5 py-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 2xl:grid-cols-6">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.id;

                return (
                  <Link
                    key={filter.id}
                    href={`/profile?status=${filter.id}&page=1#orders`}
                    scroll={false}
                    prefetch={false}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-10 min-w-0 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-[0.58rem] font-bold uppercase tracking-[0.1em] transition duration-300 ${
                      isActive
                        ? "border-[#d8b66a]/58 bg-[#d8b66a] text-[#07110f] shadow-[0_10px_28px_rgba(216,182,106,0.14)]"
                        : "border-[#d8b66a]/14 bg-black/22 text-[#f3efe5]/58 hover:border-[#d8b66a]/38 hover:bg-[#d8b66a]/8 hover:text-[#f3d98d]"
                    }`}
                  >
                    <span className="min-w-0 truncate">
                      {filter.label}
                    </span>

                    <span
                      className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[0.56rem] ${
                        isActive
                          ? "bg-black/14 text-[#07110f]"
                          : "bg-black/30 text-[#d8b66a]/78"
                      }`}
                    >
                      {filterCounts[filter.id] || 0}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {totalOrders === 0 ? (
        <div className="p-5">
          <div className="rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-5">
            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Заказов пока нет. Добавьте товар в корзину и
              оформите первый заказ.
            </p>

            <Link
              href="/products"
              className="group mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
            >
              Смотреть товары

              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      ) : initialOrders.length === 0 ? (
        <div className="p-5">
          <div className="flex items-start gap-3 rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-5">
            <ListFilter className="mt-0.5 size-5 shrink-0 text-[#d8b66a]/72" />

            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              В разделе «{activeFilterData.label}» заказов пока
              нет.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="space-y-3">
            {initialOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          <OrdersPagination
            basePath="/profile"
            activeFilter={activeFilter}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
}