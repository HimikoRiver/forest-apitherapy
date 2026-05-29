import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/auth/SignOutButton";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#030b0c] px-4 py-10 text-[#f3efe5]">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-3xl items-center justify-center">
        <div className="w-full rounded-[30px] border border-[#d8b66a]/24 bg-black/28 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
            Личный кабинет
          </p>

          <h1 className="m-0 text-3xl font-bold tracking-[-0.05em] text-[#f3d98d]">
            Добро пожаловать
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#f3efe5]/72">
            Здесь позже будут данные профиля, корзина, история заказов и
            настройки аккаунта.
          </p>

          <div className="mt-7 rounded-3xl border border-[#d8b66a]/16 bg-black/24 p-5">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b66a]/88">
              Пользователь
            </p>

            <div className="mt-4 space-y-3 text-sm leading-6 text-[#f3efe5]/82">
              <p className="m-0">
                <span className="text-[#d8b66a]/82">Имя:</span>{" "}
                {user.name || "Не указано"}
              </p>

              <p className="m-0">
                <span className="text-[#d8b66a]/82">Email:</span>{" "}
                {user.email}
              </p>
            </div>
          </div>

          <SignOutButton />
        </div>
      </section>
    </main>
  );
}