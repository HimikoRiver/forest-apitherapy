import { createHash } from "node:crypto";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeRussianRuble,
  ClipboardList,
  Mail,
  MapPin,
  MessageSquareText,
  PackageCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { z } from "zod";
import CheckoutSubmitButton from "@/components/checkout/CheckoutSubmitButton";
import PhoneCountryField from "@/components/checkout/PhoneCountryField";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import CabinetTopNav from "@/components/shared/CabinetTopNav";
import { requireUser } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

const STOCK_CHANGED_ERROR = "ORDER_STOCK_CHANGED";

const checkoutSchema = z.object({
  checkoutToken: z
    .string()
    .regex(/^[a-f0-9]{64}$/, "Некорректный ключ оформления заказа"),

  customerName: z.string().trim().min(2).max(100),

  customerPhone: z
    .string()
    .trim()
    .regex(
      /^\+[1-9]\d{7,14}$/,
      "Телефон должен быть указан в международном формате"
    ),

  customerEmail: z.string().trim().email().optional().or(z.literal("")),

  deliveryAddress: z.string().trim().max(1000).optional(),

  comment: z.string().trim().max(2000).optional(),
});

const CHECKOUT_NOTICES = {
  "cart-changed":
    "Состав корзины или наличие товара изменились. Проверьте заказ и нажмите кнопку ещё раз.",
};

function createCheckoutToken(userId, cartItems) {
  const cartSignature = cartItems
    .map((item) => {
      return [
        item.id,
        item.productId,
        item.quantity,
        item.product.priceKopecks,
      ].join(":");
    })
    .sort()
    .join("|");

  return createHash("sha256")
    .update(`${userId}|${cartSignature}`)
    .digest("hex");
}

function isUniqueConstraintError(error) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
  );
}

async function findExistingOrder(userId, checkoutToken) {
  const existingOrder = await prisma.order.findUnique({
    where: {
      checkoutToken,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!existingOrder || existingOrder.userId !== userId) {
    return null;
  }

  return existingOrder;
}

async function createOrder(formData) {
  "use server";

  const user = await requireUser();

  const parsed = checkoutSchema.parse({
    checkoutToken: String(formData.get("checkoutToken") || ""),
    customerName: String(formData.get("customerName") || ""),
    customerPhone: String(formData.get("customerPhone") || ""),
    customerEmail: String(formData.get("customerEmail") || ""),
    deliveryAddress: String(formData.get("deliveryAddress") || ""),
    comment: String(formData.get("comment") || ""),
  });

  /*
   * Повторный запрос может прийти уже после того,
   * как первый заказ был полностью создан.
   */
  const previouslyCreatedOrder = await findExistingOrder(
    user.id,
    parsed.checkoutToken
  );

  if (previouslyCreatedOrder) {
    redirect(`/profile/orders/${previouslyCreatedOrder.id}`);
  }

  let transactionResult;

  try {
    transactionResult = await prisma.$transaction(async (tx) => {
      /*
       * Корзину читаем повторно внутри транзакции.
       * Данные со страницы могли измениться после её открытия.
       */
      const cartItems = await tx.cartItem.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          productId: "asc",
        },
        include: {
          product: true,
        },
      });

      if (cartItems.length === 0) {
        return {
          type: "EMPTY",
        };
      }

      const currentCheckoutToken = createCheckoutToken(
        user.id,
        cartItems
      );

      /*
       * Если количество, цена или состав корзины изменились,
       * старую форму использовать нельзя.
       */
      if (currentCheckoutToken !== parsed.checkoutToken) {
        return {
          type: "CART_CHANGED",
        };
      }

      const unavailableItem = cartItems.find((item) => {
        return (
          item.quantity < 1 ||
          item.product.status !== "ACTIVE" ||
          item.product.stock < item.quantity
        );
      });

      if (unavailableItem) {
        return {
          type: "CART_CHANGED",
        };
      }

      const totalKopecks = cartItems.reduce((sum, item) => {
        return (
          sum +
          item.product.priceKopecks * item.quantity
        );
      }, 0);

      /*
       * Заказ создаётся до списания остатков.
       * Уникальный checkoutToken не позволит второму
       * параллельному запросу создать ещё один заказ.
       */
      const order = await tx.order.create({
        data: {
          checkoutToken: currentCheckoutToken,
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
        select: {
          id: true,
        },
      });

      for (const item of cartItems) {
        const updatedProduct = await tx.product.updateMany({
          where: {
            id: item.productId,
            status: "ACTIVE",
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
          throw new Error(STOCK_CHANGED_ERROR);
        }
      }

      /*
       * Удаляем только те позиции, которые вошли в заказ.
       * Новый товар, добавленный параллельно, останется в корзине.
       */
      await tx.cartItem.deleteMany({
        where: {
          userId: user.id,
          id: {
            in: cartItems.map((item) => item.id),
          },
        },
      });

      return {
        type: "CREATED",
        orderId: order.id,
      };
    });
  } catch (error) {
    /*
     * Два параллельных запроса с одним checkoutToken:
     * первый создаёт заказ, второй получает P2002.
     */
    if (isUniqueConstraintError(error)) {
      const existingOrder = await findExistingOrder(
        user.id,
        parsed.checkoutToken
      );

      if (existingOrder) {
        transactionResult = {
          type: "EXISTING",
          orderId: existingOrder.id,
        };
      } else {
        throw error;
      }
    } else if (error?.message === STOCK_CHANGED_ERROR) {
      transactionResult = {
        type: "CART_CHANGED",
      };
    } else {
      throw error;
    }
  }

  if (transactionResult.type === "EMPTY") {
    redirect("/cart");
  }

  if (transactionResult.type === "CART_CHANGED") {
    redirect("/checkout?notice=cart-changed");
  }

  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/products");
  revalidatePath("/profile");
  revalidatePath("/admin/products");
  revalidatePath("/admin/orders");
  revalidatePath(
    `/profile/orders/${transactionResult.orderId}`
  );

  redirect(
    `/profile/orders/${transactionResult.orderId}`
  );
}

function CheckoutTextField({
  icon: Icon,
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
        <Icon className="size-4" />
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
      />
    </label>
  );
}

function CheckoutTextarea({
  icon: Icon,
  label,
  name,
  rows,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/88">
        <Icon className="size-4" />
        {label}
      </span>

      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-sm leading-6 text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
      />
    </label>
  );
}

export default async function CheckoutPage({
  searchParams,
}) {
  const user = await requireUser();
  const resolvedSearchParams = await searchParams;

  const noticeValue = Array.isArray(
    resolvedSearchParams?.notice
  )
    ? resolvedSearchParams.notice[0]
    : resolvedSearchParams?.notice;

  const noticeMessage =
    CHECKOUT_NOTICES[noticeValue] || null;

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
    return (
      sum +
      item.product.priceKopecks * item.quantity
    );
  }, 0);

  const checkoutToken =
    cartItems.length > 0
      ? createCheckoutToken(user.id, cartItems)
      : "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-3 text-[#f3efe5] sm:px-6 sm:py-4 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <CabinetTopNav />

        <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-xs font-bold uppercase tracking-[0.34em] text-[#d8b66a]">
              <ClipboardList className="size-4" />
              Оформление
            </div>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Новый заказ
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Проверьте состав корзины и оставьте контактные
              данные для связи.
            </p>
          </div>

          <Link
            href="/cart"
            aria-label="Назад в корзину"
            title="Назад в корзину"
            className="group inline-flex size-14 items-center justify-center rounded-2xl border border-[#d8b66a]/35 bg-black/24 text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/70 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_14px_38px_rgba(216,182,106,0.14)]"
          >
            <ArrowLeft className="size-5 transition duration-300 group-hover:-translate-x-0.5" />
          </Link>
        </div>

        {noticeMessage && (
          <div className="mb-3 flex items-start gap-3 rounded-[22px] border border-amber-300/24 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#f3d98d]" />

            <p className="m-0">
              {noticeMessage}
            </p>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="rounded-[30px] border border-[#d8b66a]/18 bg-black/40 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
              <ShoppingBag className="size-5" />
            </div>

            <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
              Корзина пустая. Сначала добавьте товары из
              каталога.
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
          <div className="grid gap-3 lg:grid-cols-[1fr_340px]">
            <form
              action={createOrder}
              className="overflow-hidden rounded-[30px] border border-[#d8b66a]/18 bg-black/40 shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
            >
              <input
                type="hidden"
                name="checkoutToken"
                value={checkoutToken}
              />

              <div className="border-b border-[#d8b66a]/12 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <UserRound className="size-5" />
                  </div>

                  <div>
                    <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                      Данные клиента
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      Контактные данные
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <CheckoutTextField
                  icon={UserRound}
                  label="Имя"
                  name="customerName"
                  required
                  defaultValue={user.name || ""}
                  placeholder="Ваше имя"
                />

                <PhoneCountryField />

                <CheckoutTextField
                  icon={Mail}
                  label="Email"
                  name="customerEmail"
                  type="email"
                  defaultValue={user.email || ""}
                  placeholder="example@mail.ru"
                />

                <CheckoutTextarea
                  icon={MapPin}
                  label="Адрес / способ получения"
                  name="deliveryAddress"
                  rows={3}
                  placeholder="Адрес доставки или комментарий по получению"
                />

                <CheckoutTextarea
                  icon={MessageSquareText}
                  label="Комментарий"
                  name="comment"
                  rows={4}
                  placeholder="Дополнительные пожелания к заказу"
                />

                <div className="flex justify-center pt-1">
                  <CheckoutSubmitButton />
                </div>
              </div>
            </form>

            <aside className="h-fit overflow-hidden rounded-[30px] border border-[#d8b66a]/18 bg-black/40 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
              <div className="border-b border-[#d8b66a]/12 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                    <PackageCheck className="size-5" />
                  </div>

                  <div>
                    <p className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]/78">
                      Состав заказа
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                      Товары
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-[#d8b66a]/14 bg-black/24 p-4"
                  >
                    <div className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#d8b66a]/16 bg-black/28">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#f3d98d]">
                            <PackageCheck className="size-5" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-sm font-bold text-[#f3d98d]">
                          {item.product.title}
                        </p>

                        <p className="mt-2 flex items-center gap-2 text-sm leading-6 text-[#f3efe5]/62">
                          <BadgeRussianRuble className="size-4 shrink-0 text-[#d8b66a]/72" />

                          {item.quantity} ×{" "}
                          {formatPriceFromKopecks(
                            item.product.priceKopecks
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-[#d8b66a]/16 pt-5">
                  <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                    Итого
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                    {formatPriceFromKopecks(
                      totalKopecks
                    )}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}