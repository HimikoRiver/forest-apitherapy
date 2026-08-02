import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ClipboardList,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth-guards";

const adminCards = [
  {
    title: "Каталог",
    label: "Товары",
    description:
      "Добавление, редактирование, фото, статусы и контроль остатков.",
    href: "/admin/products",
    icon: Boxes,
  },
  {
    title: "Заявки",
    label: "Заказы",
    description:
      "Просмотр заказов, контактов клиентов, состава и статусов.",
    href: "/admin/orders",
    icon: ClipboardList,
  },
];

export default async function AdminPage() {
  const user = await requireAdmin();

  return (
    <main className="min-h-screen px-4 py-8 text-[#f3efe5] sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[34px] border border-[#d8b66a]/18 bg-[#030b0c]/72 shadow-[0_30px_90px_rgba(0,0,0,0.52)] backdrop-blur-md">
          <div className="relative border-b border-[#d8b66a]/12 px-5 py-7 sm:px-7 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.16),transparent_34%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
                  <ShieldCheck className="size-4" />
                  Административная панель
                </div>

                <h1 className="m-0 max-w-3xl text-3xl font-bold tracking-[-0.06em] text-[#f3d98d] sm:text-4xl lg:text-5xl">
                  Управление сайтом
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72 sm:text-base">
                  Здесь собраны основные разделы управления товарами, заказами и
                  доступом администратора.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_12px_34px_rgba(216,182,106,0.12)]"
                >
                  <LayoutGrid className="size-4 transition group-hover:scale-110" />
                  Каталог
                </Link>

                <Link
                  href="/profile"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/24 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] hover:shadow-[0_12px_34px_rgba(216,182,106,0.12)]"
                >
                  <UserRoundCheck className="size-4 transition group-hover:scale-110" />
                  Профиль
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 px-5 py-6 sm:px-7 lg:grid-cols-3 lg:px-8">
            {adminCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative overflow-hidden rounded-[28px] border border-[#d8b66a]/14 bg-black/26 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d8b66a]/50 hover:bg-black/36 hover:shadow-[0_24px_70px_rgba(216,182,106,0.12)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="absolute -right-12 -top-12 size-36 rounded-full bg-[#d8b66a]/12 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d8b66a]/50 to-transparent" />
                  </div>

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/20 bg-[#d8b66a]/10 text-[#f3d98d] shadow-[0_12px_34px_rgba(216,182,106,0.08)]">
                      <Icon className="size-5 transition duration-300 group-hover:scale-110" />
                    </div>

                    <ArrowRight className="mt-2 size-5 text-[#d8b66a]/46 transition duration-300 group-hover:translate-x-1 group-hover:text-[#f3d98d]" />
                  </div>

                  <p className="relative mt-5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/80">
                    {card.label}
                  </p>

                  <h2 className="relative mt-2 text-2xl font-bold tracking-[-0.06em] text-[#f3d98d]">
                    {card.title}
                  </h2>

                  <p className="relative mt-3 text-sm leading-6 text-[#f3efe5]/68">
                    {card.description}
                  </p>
                </Link>
              );
            })}

            <div className="relative overflow-hidden rounded-[28px] border border-[#d8b66a]/14 bg-black/26 p-5">
              <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-[#d8b66a]/10 blur-3xl" />

              <div className="relative flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/20 bg-[#d8b66a]/10 text-[#f3d98d]">
                <Sparkles className="size-5" />
              </div>

              <p className="relative mt-5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/80">
                Доступ
              </p>

              <h2 className="relative mt-2 text-2xl font-bold tracking-[-0.06em] text-[#f3d98d]">
                ADMIN
              </h2>

              <p className="relative mt-3 text-sm leading-6 text-[#f3efe5]/68">
                Страница доступна только пользователям с ролью администратора.
              </p>
            </div>
          </div>

          <div className="border-t border-[#d8b66a]/12 px-5 py-5 sm:px-7 lg:px-8">
            <div className="rounded-[26px] border border-[#d8b66a]/12 bg-black/22 p-5">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                Текущий администратор
              </p>

              <div className="mt-4 grid gap-3 text-sm leading-6 text-[#f3efe5]/82 md:grid-cols-3">
                <p className="m-0">
                  <span className="text-[#d8b66a]/82">Имя:</span>{" "}
                  {user.name || "Не указано"}
                </p>

                <p className="m-0">
                  <span className="text-[#d8b66a]/82">Email:</span>{" "}
                  {user.email}
                </p>

                <p className="m-0">
                  <span className="text-[#d8b66a]/82">Роль:</span> {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}