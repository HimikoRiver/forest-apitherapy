import {
  LayoutDashboard,
  Mail,
  UserRound,
} from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";
import ProfileOrdersList from "@/components/profile/ProfileOrdersList";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import CabinetTopNav from "@/components/shared/CabinetTopNav";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

function formatOrderDate(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  }).format(date);
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

  const preparedOrders = orders.map((order) => ({
    id: order.id,
    status: order.status,
    totalKopecks: order.totalKopecks,
    createdAtLabel: formatOrderDate(order.createdAt),
    items: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      priceKopecks: item.priceKopecks,
      productTitle: item.productTitle,
      productSlug: item.productSlug,
      product: item.product
        ? {
            image: item.product.image,
          }
        : null,
    })),
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-3 text-[#f3efe5] sm:px-6 sm:py-4 lg:px-8">
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

        <div className="grid gap-3 lg:grid-cols-[360px_minmax(0,1fr)]">
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

          <ProfileOrdersList initialOrders={preparedOrders} />
        </div>
      </section>
    </main>
  );
}