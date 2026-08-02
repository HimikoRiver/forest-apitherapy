"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  LoaderCircle,
  Mail,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Phone,
  RefreshCw,
  Save,
  ShoppingBag,
  UserRound,
  XCircle,
} from "lucide-react";

import { updateOrderStatus } from "@/app/admin/orders/actions";
import OrderContactActions from "@/components/shared/OrderContactActions";
import OrdersPagination from "@/components/shared/OrdersPagination";
import { formatPriceFromKopecks } from "@/lib/money";

const ORDER_STATUSES = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELED",
];

const ORDER_STATUS_LABELS = {
  PENDING: "Новый",
  PROCESSING: "В обработке",
  COMPLETED: "Завершён",
  CANCELED: "Отменён",
};

const ORDER_STATUS_DESTINATIONS = {
  PENDING: "Новые",
  PROCESSING: "В обработке",
  COMPLETED: "Завершённые",
  CANCELED: "Отменённые",
};

const FILTERS = [
  {
    id: "ACTIVE",
    label: "В работе",
    title: "Заказы в работе",
  },
  {
    id: "PENDING",
    label: "Новые",
    title: "Новые заказы",
  },
  {
    id: "PROCESSING",
    label: "В обработке",
    title:
      "Заказы в обработке",
  },
  {
    id: "COMPLETED",
    label: "Завершённые",
    title:
      "Завершённые заказы",
  },
  {
    id: "CANCELED",
    label: "Отменённые",
    title:
      "Отменённые заказы",
  },
  {
    id: "ALL",
    label: "Все",
    title: "Все заказы",
  },
];

function createDraftStatuses(
  orders
) {
  return Object.fromEntries(
    orders.map((order) => [
      order.id,
      order.status,
    ])
  );
}

function orderMatchesFilter(
  order,
  filter
) {
  if (filter === "ALL") {
    return true;
  }

  if (filter === "ACTIVE") {
    return (
      order.status === "PENDING" ||
      order.status === "PROCESSING"
    );
  }

  return order.status === filter;
}

function formatOrderDate(date) {
  return new Intl.DateTimeFormat(
    "ru-RU",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(date));
}

function OrderStatusBadge({
  status,
}) {
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
        statusStyles[status] ||
        statusStyles.PENDING
      }`}
    >
      <Clock3 className="size-3.5" />

      {ORDER_STATUS_LABELS[
        status
      ] || status}
    </span>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}) {
  if (!value) {
    return null;
  }

  return (
    <p className="m-0 flex items-start gap-2 text-sm leading-6 text-[#f3efe5]/72">
      <Icon className="mt-1 size-4 shrink-0 text-[#d8b66a]/72" />

      <span>
        <span className="text-[#d8b66a]/82">
          {label}:
        </span>{" "}
        {value}
      </span>
    </p>
  );
}

function OrderCard({
  order,
  selectedStatus,
  isSaving,
  onStatusChange,
  onSave,
}) {
  const hasChanges =
    selectedStatus !== order.status;

  return (
    <article className="group rounded-[30px] border border-[#d8b66a]/12 bg-black/24 p-5 transition duration-300 hover:border-[#d8b66a]/30 hover:bg-black/32 hover:shadow-[0_20px_54px_rgba(0,0,0,0.28)]">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <OrderStatusBadge
                status={order.status}
              />

              <h3 className="mt-3 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                Заказ от{" "}
                {formatOrderDate(
                  order.createdAt
                )}
              </h3>

              <p className="mt-2 break-all text-xs uppercase tracking-[0.16em] text-[#f3efe5]/38">
                ID: {order.id}
              </p>
            </div>

            <p className="m-0 text-2xl font-bold tracking-[-0.04em] text-[#d8b66a]">
              {formatPriceFromKopecks(
                order.totalKopecks
              )}
            </p>
          </div>

          <div className="mt-5 grid gap-3 rounded-[24px] border border-[#d8b66a]/10 bg-black/18 p-4 md:grid-cols-2">
            <ContactRow
              icon={UserRound}
              label="Клиент"
              value={
                order.customerName
              }
            />

            <ContactRow
              icon={Phone}
              label="Телефон"
              value={
                order.customerPhone
              }
            />

            <ContactRow
              icon={Mail}
              label="Email"
              value={
                order.customerEmail
              }
            />

            <ContactRow
              icon={
                LayoutDashboard
              }
              label="Аккаунт"
              value={
                order.user?.email
                  ? `${
                      order.user
                        .name ||
                      "Пользователь"
                    } · ${
                      order.user
                        .email
                    }`
                  : null
              }
            />

            <ContactRow
              icon={MapPin}
              label="Адрес / получение"
              value={
                order.deliveryAddress
              }
            />

            <ContactRow
              icon={
                MessageSquareText
              }
              label="Комментарий"
              value={order.comment}
            />
          </div>

          <div className="mt-5">
            <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/78">
              Состав заказа
            </p>

            <div className="mt-3 space-y-2.5">
              {order.items.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-2xl border border-[#d8b66a]/10 bg-black/18 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#d8b66a]/14 bg-black/28">
                        {item.product
                          ?.image ? (
                          <Image
                            src={
                              item
                                .product
                                .image
                            }
                            alt={
                              item.productTitle
                            }
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
                          {
                            item.productTitle
                          }
                        </p>

                        {item.productSlug && (
                          <p className="mt-1 break-all text-xs text-[#f3efe5]/42">
                            /products/
                            {
                              item.productSlug
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="m-0 shrink-0 text-[#f3efe5]/64">
                      {
                        item.quantity
                      }{" "}
                      ×{" "}
                      {formatPriceFromKopecks(
                        item.priceKopecks
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <aside className="h-fit space-y-3">
          <section className="rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                <RefreshCw
                  className={`size-4 ${
                    isSaving
                      ? "animate-spin"
                      : ""
                  }`}
                />
              </div>

              <div>
                <p className="m-0 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8b66a]/74">
                  Обработка
                </p>

                <h4 className="m-0 text-base font-bold text-[#f3d98d]">
                  Статус заказа
                </h4>
              </div>
            </div>

            <form
              className="mt-4 space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                onSave(order.id);
              }}
            >
              <label className="block">
                <span className="mb-2 block text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#d8b66a]/88">
                  Статус
                </span>

                <select
                  value={
                    selectedStatus
                  }
                  disabled={isSaving}
                  onChange={(event) =>
                    onStatusChange(
                      order.id,
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-2xl border border-[#d8b66a]/14 bg-black/36 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 focus:border-[#d8b66a]/58 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)] disabled:cursor-wait disabled:opacity-60"
                >
                  {ORDER_STATUSES.map(
                    (status) => (
                      <option
                        key={status}
                        value={
                          status
                        }
                      >
                        {ORDER_STATUS_LABELS[
                          status
                        ] ||
                          status}
                      </option>
                    )
                  )}
                </select>
              </label>

              <button
                type="submit"
                disabled={
                  !hasChanges ||
                  isSaving
                }
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/48 bg-[#d8b66a] px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#07110f] shadow-[0_14px_38px_rgba(216,182,106,0.14)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_20px_52px_rgba(216,182,106,0.2)] disabled:cursor-not-allowed disabled:border-[#d8b66a]/18 disabled:bg-[#d8b66a]/24 disabled:text-[#f3efe5]/42 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:brightness-100"
              >
                {isSaving ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : hasChanges ? (
                  <Save className="size-4 transition duration-300 group-hover:scale-110" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}

                {isSaving
                  ? "Сохраняем..."
                  : hasChanges
                    ? "Сохранить статус"
                    : "Статус сохранён"}
              </button>

              <p className="m-0 text-xs leading-5 text-[#f3efe5]/42">
                После сохранения
                статус обновится в
                личном кабинете
                клиента.
              </p>
            </form>
          </section>

          <OrderContactActions
            mode="admin"
            compact
            orderId={order.id}
            orderStatus={
              order.status
            }
            customerName={
              order.customerName
            }
            customerPhone={
              order.customerPhone
            }
            customerEmail={
              order.customerEmail
            }
          />
        </aside>
      </div>
    </article>
  );
}

export default function AdminOrdersManager({
  initialOrders,
  filterCounts,
  activeFilter,
  currentPage,
  totalPages,
  totalFilteredOrders,
}) {
  const router = useRouter();

  const toastTimerRef =
    useRef(null);

  const [orders, setOrders] =
    useState(initialOrders);

  const [
    draftStatuses,
    setDraftStatuses,
  ] = useState(() =>
    createDraftStatuses(
      initialOrders
    )
  );

  const [
    savingOrderId,
    setSavingOrderId,
  ] = useState(null);

  const [toast, setToast] =
    useState(null);

  useEffect(() => {
    setOrders(initialOrders);

    setDraftStatuses(
      createDraftStatuses(
        initialOrders
      )
    );
  }, [initialOrders]);

  useEffect(() => {
    return () => {
      if (
        toastTimerRef.current
      ) {
        window.clearTimeout(
          toastTimerRef.current
        );
      }
    };
  }, []);

  const visibleOrders =
    useMemo(
      () =>
        orders.filter((order) =>
          orderMatchesFilter(
            order,
            activeFilter
          )
        ),
      [activeFilter, orders]
    );

  const activeFilterData =
    FILTERS.find(
      (filter) =>
        filter.id ===
        activeFilter
    ) || FILTERS[0];

  const totalOrders =
    filterCounts.ALL || 0;

  function showToast(
    message,
    type = "success"
  ) {
    if (
      toastTimerRef.current
    ) {
      window.clearTimeout(
        toastTimerRef.current
      );
    }

    setToast({
      message,
      type,
    });

    toastTimerRef.current =
      window.setTimeout(() => {
        setToast(null);
      }, 4200);
  }

  function handleStatusChange(
    orderId,
    status
  ) {
    setDraftStatuses(
      (currentStatuses) => ({
        ...currentStatuses,
        [orderId]: status,
      })
    );
  }

  async function handleSave(
    orderId
  ) {
    const order = orders.find(
      (currentOrder) =>
        currentOrder.id ===
        orderId
    );

    const nextStatus =
      draftStatuses[orderId];

    if (
      !order ||
      !nextStatus ||
      nextStatus ===
        order.status ||
      savingOrderId
    ) {
      return;
    }

    setSavingOrderId(orderId);

    try {
      const result =
        await updateOrderStatus(
          orderId,
          nextStatus
        );

      if (!result?.ok) {
        setDraftStatuses(
          (
            currentStatuses
          ) => ({
            ...currentStatuses,
            [orderId]:
              order.status,
          })
        );

        showToast(
          result?.message ||
            "Не удалось сохранить статус.",
          "error"
        );

        return;
      }

      setOrders(
        (currentOrders) =>
          currentOrders.map(
            (currentOrder) =>
              currentOrder.id ===
              orderId
                ? {
                    ...currentOrder,
                    status:
                      nextStatus,
                    updatedAt:
                      new Date().toISOString(),
                  }
                : currentOrder
          )
      );

      setDraftStatuses(
        (
          currentStatuses
        ) => ({
          ...currentStatuses,
          [orderId]:
            nextStatus,
        })
      );

      showToast(
        `${result.message} Заказ находится в разделе «${ORDER_STATUS_DESTINATIONS[nextStatus]}».`
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      setDraftStatuses(
        (
          currentStatuses
        ) => ({
          ...currentStatuses,
          [orderId]:
            order.status,
        })
      );

      showToast(
        "Не удалось сохранить статус. Попробуйте ещё раз.",
        "error"
      );
    } finally {
      setSavingOrderId(null);
    }
  }

  return (
    <>
      <div
        id="orders"
        className="scroll-mt-24 overflow-hidden rounded-[32px] border border-[#d8b66a]/16 bg-[#030b0c]/76 shadow-[0_24px_70px_rgba(0,0,0,0.44)]"
      >
        <div className="border-b border-[#d8b66a]/12">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                <ShoppingBag className="size-4.5" />
              </div>

              <div className="min-w-0">
                <p className="m-0 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#d8b66a]/78">
                  Заявки
                </p>

                <h2 className="mt-1 text-lg font-bold tracking-[-0.04em] text-[#f3d98d]">
                  {
                    activeFilterData.title
                  }
                </h2>
              </div>
            </div>

            <p className="m-0 w-fit shrink-0 rounded-full border border-[#d8b66a]/14 bg-black/22 px-3 py-1.5 text-xs text-[#f3efe5]/58">
              На странице:{" "}
              {visibleOrders.length} из{" "}
              {totalFilteredOrders}
            </p>
          </div>

          {totalOrders > 0 && (
            <div className="border-t border-[#d8b66a]/8 px-5 py-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                {FILTERS.map(
                  (filter) => {
                    const isActive =
                      activeFilter ===
                      filter.id;

                    return (
                      <Link
                        key={
                          filter.id
                        }
                        href={`/admin/orders?status=${filter.id}&page=1#orders`}
                        scroll={
                          false
                        }
                        prefetch={
                          false
                        }
                        aria-current={
                          isActive
                            ? "page"
                            : undefined
                        }
                        className={`flex min-h-10 min-w-0 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-[0.58rem] font-bold uppercase tracking-[0.1em] transition duration-300 sm:text-[0.6rem] ${
                          isActive
                            ? "border-[#d8b66a]/58 bg-[#d8b66a] text-[#07110f] shadow-[0_10px_28px_rgba(216,182,106,0.14)]"
                            : "border-[#d8b66a]/14 bg-black/22 text-[#f3efe5]/58 hover:border-[#d8b66a]/38 hover:bg-[#d8b66a]/8 hover:text-[#f3d98d]"
                        }`}
                      >
                        <span className="min-w-0 truncate">
                          {
                            filter.label
                          }
                        </span>

                        <span
                          className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[0.56rem] ${
                            isActive
                              ? "bg-black/14 text-[#07110f]"
                              : "bg-black/30 text-[#d8b66a]/78"
                          }`}
                        >
                          {filterCounts[
                            filter.id
                          ] || 0}
                        </span>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>

        {totalOrders === 0 ? (
          <div className="p-5">
            <div className="rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-5">
              <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
                Заказов пока нет.
              </p>
            </div>
          </div>
        ) : visibleOrders.length ===
          0 ? (
          <div className="p-5">
            <div className="rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-5">
              <div className="flex items-start gap-3">
                <ClipboardList className="mt-0.5 size-5 shrink-0 text-[#d8b66a]/72" />

                <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
                  В разделе «
                  {
                    activeFilterData.label
                  }
                  » заказов пока нет.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="space-y-4">
              {visibleOrders.map(
                (order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    selectedStatus={
                      draftStatuses[
                        order.id
                      ] ||
                      order.status
                    }
                    isSaving={
                      savingOrderId ===
                      order.id
                    }
                    onStatusChange={
                      handleStatusChange
                    }
                    onSave={
                      handleSave
                    }
                  />
                )
              )}
            </div>

            <OrdersPagination
              basePath="/admin/orders"
              activeFilter={
                activeFilter
              }
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
            />
          </div>
        )}
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-4 top-4 z-[80] flex max-w-[calc(100vw-2rem)] items-start gap-3 rounded-[22px] border px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:right-6 sm:top-6 sm:max-w-md ${
            toast.type ===
            "error"
              ? "border-red-300/24 bg-[#2a0c0d]/92 text-red-100"
              : "border-emerald-300/24 bg-[#071b16]/92 text-emerald-100"
          }`}
        >
          {toast.type === "error" ? (
            <XCircle className="mt-0.5 size-5 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          )}

          <div>
            <p className="m-0 text-sm font-bold">
              {toast.type ===
              "error"
                ? "Ошибка"
                : "Готово"}
            </p>

            <p className="mt-1 text-sm leading-6 opacity-80">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
}