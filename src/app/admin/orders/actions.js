"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

const ORDER_STATUSES = new Set([
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELED",
]);

const STOCK_RESERVATION_ERROR =
  "ORDER_STOCK_RESERVATION_ERROR";

const STATUS_CONFLICT_ERROR =
  "ORDER_STATUS_CONFLICT_ERROR";

export async function updateOrderStatus(orderId, status) {
  await requireAdmin();

  const normalizedOrderId = String(orderId || "").trim();
  const normalizedStatus = String(status || "").trim();

  if (
    !normalizedOrderId ||
    !ORDER_STATUSES.has(normalizedStatus)
  ) {
    return {
      ok: false,
      message: "Не удалось сохранить статус заказа.",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: normalizedOrderId,
        },
        select: {
          id: true,
          status: true,

          items: {
            select: {
              quantity: true,
              productId: true,
              productSlug: true,
            },
          },
        },
      });

      if (!order) {
        return {
          type: "NOT_FOUND",
        };
      }

      if (order.status === normalizedStatus) {
        return {
          type: "UNCHANGED",
          productSlugs: order.items
            .map((item) => item.productSlug)
            .filter(Boolean),
        };
      }

      const previousStatus = order.status;
      const isCanceling =
        previousStatus !== "CANCELED" &&
        normalizedStatus === "CANCELED";

      const isRestoring =
        previousStatus === "CANCELED" &&
        normalizedStatus !== "CANCELED";

      /*
       * Меняем статус с проверкой предыдущего значения.
       * Это защищает от одновременного изменения заказа
       * в двух открытых окнах администратора.
       */
      const updatedOrder = await tx.order.updateMany({
        where: {
          id: normalizedOrderId,
          status: previousStatus,
        },
        data: {
          status: normalizedStatus,
        },
      });

      if (updatedOrder.count !== 1) {
        throw new Error(STATUS_CONFLICT_ERROR);
      }

      /*
       * При отмене возвращаем каждую позицию заказа
       * обратно в остаток товара.
       */
      if (isCanceling) {
        for (const item of order.items) {
          if (!item.productId) {
            continue;
          }

          await tx.product.updateMany({
            where: {
              id: item.productId,
            },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      }

      /*
       * Если отменённый заказ снова возвращают в работу,
       * товары необходимо повторно зарезервировать.
       */
      if (isRestoring) {
        for (const item of order.items) {
          if (!item.productId) {
            throw new Error(STOCK_RESERVATION_ERROR);
          }

          const updatedProduct =
            await tx.product.updateMany({
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
            throw new Error(STOCK_RESERVATION_ERROR);
          }
        }
      }

      return {
        type: "UPDATED",
        previousStatus,
        productSlugs: order.items
          .map((item) => item.productSlug)
          .filter(Boolean),
      };
    });

    if (result.type === "NOT_FOUND") {
      return {
        ok: false,
        message: "Заказ не найден.",
      };
    }

    revalidatePath("/admin/orders");
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidatePath("/profile");
    revalidatePath(
      `/profile/orders/${normalizedOrderId}`
    );

    for (const productSlug of result.productSlugs) {
      revalidatePath(`/products/${productSlug}`);
    }

    return {
      ok: true,
      orderId: normalizedOrderId,
      status: normalizedStatus,

      message:
        result.type === "UNCHANGED"
          ? "Этот статус уже был установлен."
          : normalizedStatus === "CANCELED"
            ? "Заказ отменён, товары возвращены на склад."
            : result.previousStatus === "CANCELED"
              ? "Заказ возвращён в работу, товары повторно зарезервированы."
              : "Статус заказа изменён.",
    };
  } catch (error) {
    console.error("Failed to update order status:", error);

    if (error?.message === STOCK_RESERVATION_ERROR) {
      return {
        ok: false,
        message:
          "Не удалось вернуть заказ в работу: одного из товаров уже нет или его остатка недостаточно.",
      };
    }

    if (error?.message === STATUS_CONFLICT_ERROR) {
      return {
        ok: false,
        message:
          "Статус заказа уже изменился в другом окне. Обновите страницу.",
      };
    }

    return {
      ok: false,
      message:
        "Не удалось сохранить статус. Попробуйте ещё раз.",
    };
  }
}