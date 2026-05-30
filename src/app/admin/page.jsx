import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guards";

export default async function AdminPage() {
  const user = await requireAdmin();

  return (
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-5xl items-center justify-center">
        <div className="w-full rounded-[30px] border border-[#d8b66a]/24 bg-black/28 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
            Административная панель
          </p>

          <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d]">
            Управление сайтом
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72">
            Здесь собраны основные разделы управления товарами, заказами и
            доступом администратора.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link
              href="/admin/products"
              className="group rounded-3xl border border-[#d8b66a]/16 bg-black/24 p-5 transition hover:border-[#d8b66a]/48 hover:bg-black/34"
            >
              <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                Товары
              </p>

              <h2 className="mt-3 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                Каталог
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#f3efe5]/72">
                Добавление, обновление, скрытие и контроль остатков товаров.
              </p>

              <span className="mt-5 inline-flex text-sm font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition group-hover:text-[#f3d98d]">
                Открыть
              </span>
            </Link>

            <Link
              href="/admin/orders"
              className="group rounded-3xl border border-[#d8b66a]/16 bg-black/24 p-5 transition hover:border-[#d8b66a]/48 hover:bg-black/34"
            >
              <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                Заказы
              </p>

              <h2 className="mt-3 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                Заявки
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#f3efe5]/72">
                Просмотр заказов, контактов клиентов, состава и статусов.
              </p>

              <span className="mt-5 inline-flex text-sm font-bold uppercase tracking-[0.2em] text-[#d8b66a] transition group-hover:text-[#f3d98d]">
                Открыть
              </span>
            </Link>

            <div className="rounded-3xl border border-[#d8b66a]/16 bg-black/24 p-5">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
                Доступ
              </p>

              <h2 className="mt-3 text-xl font-bold tracking-[-0.05em] text-[#f3d98d]">
                ADMIN
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#f3efe5]/72">
                Страница доступна только пользователям с ролью администратора.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[#d8b66a]/16 bg-black/24 p-5">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
              Текущий администратор
            </p>

            <div className="mt-4 space-y-3 text-sm leading-6 text-[#f3efe5]/82">
              <p className="m-0">
                <span className="text-[#d8b66a]/82">Имя:</span>{" "}
                {user.name || "Не указано"}
              </p>

              <p className="m-0">
                <span className="text-[#d8b66a]/82">Email:</span> {user.email}
              </p>

              <p className="m-0">
                <span className="text-[#d8b66a]/82">Роль:</span> {user.role}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}