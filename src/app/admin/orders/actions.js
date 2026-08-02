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

export async function updateOrderStatus(orderId, status) {
  await requireAdmin();

  const normalizedOrderId = String(orderId || "").trim();
  const normalizedStatus = String(status || "").trim();

  if (!normalizedOrderId || !ORDER_STATUSES.has(normalizedStatus)) {
    return {
      ok: false,
      message: "Не удалось сохранить статус заказа.",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: normalizedOrderId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: "Заказ не найден.",
      };
    }

    if (order.status !== normalizedStatus) {
      await prisma.order.update({
        where: {
          id: normalizedOrderId,
        },
        data: {
          status: normalizedStatus,
        },
      });
    }

    revalidatePath("/admin/orders");
    revalidatePath("/profile");
    revalidatePath(`/profile/orders/${normalizedOrderId}`);

    return {
      ok: true,
      orderId: normalizedOrderId,
      status: normalizedStatus,
      message:
        order.status === normalizedStatus
          ? "Этот статус уже был установлен."
          : "Статус заказа изменён.",
    };
  } catch (error) {
    console.error("Failed to update order status:", error);

    return {
      ok: false,
      message: "Не удалось сохранить статус. Попробуйте ещё раз.",
    };
  }
}