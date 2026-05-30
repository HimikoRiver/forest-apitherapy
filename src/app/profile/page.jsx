import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import { requireUser } from "@/lib/auth-guards";
import { formatPriceFromKopecks } from "@/lib/money";
import { prisma } from "@/lib/prisma";

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
          items: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
              Личный кабинет
            </p>

            <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d] md:text-4xl">
              Добро пожаловать
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
              Здесь хранятся данные профиля, история заказов и быстрые переходы
              к покупкам.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Каталог
            </Link>

            <Link
              href="/cart"
              className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
            >
              Корзина
            </Link>

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
              >
                Админка
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="h-fit rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
              Пользователь
            </p>

            <div className="mt-4 space-y-3 text-sm leading-6 text-[#f3efe5]/82">
              <p className="m-0">
                <span className="text-[#d8b66a]/82">Имя:</span>{" "}
                {user?.name || "Не указано"}
              </p>

              <p className="m-0">
                <span className="text-[#d8b66a]/82">Email:</span>{" "}
                {user?.email || sessionUser.email}
              </p>

              <p className="m-0">
                <span className="text-[#d8b66a]/82">Роль:</span>{" "}
                {user?.role || "USER"}
              </p>
            </div>

            <SignOutButton />
          </aside>

          <section className="rounded-[30px] border border-[#d8b66a]/18 bg-black/28 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                  История заказов
                </p>

                <h2 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                  Ваши заказы
                </h2>
              </div>

              <p className="m-0 text-sm text-[#f3efe5]/54">
                Всего: {user?.orders.length || 0}
              </p>
            </div>

            {!user?.orders.length ? (
              <div className="mt-5 rounded-3xl border border-[#d8b66a]/14 bg-black/22 p-5">
                <p className="m-0 text-sm leading-7 text-[#f3efe5]/72">
                  Заказов пока нет. Добавьте товар в корзину и оформите первый
                  заказ.
                </p>

                <Link
                  href="/products"
                  className="mt-5 inline-flex rounded-2xl border border-[#d8b66a]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#d8b66a] transition hover:border-[#d8b66a]/70 hover:text-[#f3d98d]"
                >
                  Смотреть товары
                </Link>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {user.orders.map((order) => (
                  <article
                    key={order.id}
                    className="rounded-3xl border border-[#d8b66a]/14 bg-black/22 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/76">
                          {order.status}
                        </p>

                        <h3 className="mt-2 text-lg font-bold tracking-[-0.04em] text-[#f3d98d]">
                          Заказ от{" "}
                          {new Intl.DateTimeFormat("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(order.createdAt)}
                        </h3>
                      </div>

                      <p className="m-0 text-xl font-bold text-[#d8b66a]">
                        {formatPriceFromKopecks(order.totalKopecks)}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-[#d8b66a]/10 bg-black/18 px-4 py-3 text-sm"
                        >
                          <span className="text-[#f3efe5]/78">
                            {item.productTitle}
                          </span>

                          <span className="shrink-0 text-[#f3efe5]/58">
                            {item.quantity} ×{" "}
                            {formatPriceFromKopecks(item.priceKopecks)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}