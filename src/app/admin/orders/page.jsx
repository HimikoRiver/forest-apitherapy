import Link from "next/link";
import { ArrowLeft, ClipboardList, PackageCheck } from "lucide-react";
import AdminOrdersManager from "@/components/admin/AdminOrdersManager";
import { requireAdmin } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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
  });

  const preparedOrders = orders.map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  }));

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

        <AdminOrdersManager initialOrders={preparedOrders} />
      </section>
    </main>
  );
}