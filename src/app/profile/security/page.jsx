import Link from "next/link";
import {
  ArrowLeft,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import ProfileSecurityPanel from "@/components/profile/ProfileSecurityPanel";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import CabinetTopNav from "@/components/shared/CabinetTopNav";
import { requireUser } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export default async function ProfileSecurityPage({ searchParams }) {
  const sessionUser = await requireUser();
  const resolvedSearchParams = (await searchParams) || {};
  const requiredValue = Array.isArray(resolvedSearchParams.required)
    ? resolvedSearchParams.required[0]
    : resolvedSearchParams.required;

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    select: {
      name: true,
      email: true,
      role: true,
      twoFactorEnabled: true,
    },
  });

  const isAdmin = user?.role === "ADMIN";
  const twoFactorEnabled = Boolean(user?.twoFactorEnabled);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030b0c] px-4 py-3 text-[#f3efe5] sm:px-6 sm:py-4 lg:px-8">
      <BeesPageBackground />

      <section className="relative z-10 mx-auto w-full max-w-5xl">
        <CabinetTopNav showAdminLinks={isAdmin && twoFactorEnabled} />

        {requiredValue === "admin" && !twoFactorEnabled && (
          <div className="mb-3 rounded-[22px] border border-amber-300/24 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
            Для доступа к административной панели сначала подключите двухфакторную защиту.
          </div>
        )}

        <div className="overflow-hidden rounded-[34px] border border-[#d8b66a]/16 bg-[#030b0c]/86 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
          <div className="relative border-b border-[#d8b66a]/12 px-5 py-7 sm:px-7 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.14),transparent_34%)]" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
                  <KeyRound className="size-4" />
                  Безопасность аккаунта
                </div>

                <h1 className="m-0 text-3xl font-bold tracking-[-0.06em] text-[#f3d98d] sm:text-4xl">
                  Защита входа
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f3efe5]/72 sm:text-base">
                  Двухфакторная аутентификация защищает аккаунт, даже если пароль станет известен постороннему.
                </p>
              </div>

              <Link
                href="/profile"
                aria-label="Вернуться в профиль"
                className="group inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#d8b66a]/28 bg-black/24 text-[#d8b66a] transition hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
              >
                <ArrowLeft className="size-5 transition group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_260px] lg:p-8">
            <ProfileSecurityPanel
              initialEnabled={twoFactorEnabled}
              isAdmin={isAdmin}
            />

            <aside className="h-fit rounded-[26px] border border-[#d8b66a]/14 bg-black/24 p-5">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-[#d8b66a]/18 bg-[#d8b66a]/10 text-[#f3d98d]">
                <ShieldCheck className="size-5" />
              </div>

              <p className="m-0 text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66a]/82">
                Рекомендации
              </p>

              <div className="mt-4 space-y-3 text-xs leading-6 text-[#f3efe5]/66">
                <p className="m-0">Используйте уникальный пароль длиной не менее 12 символов.</p>
                <p className="m-0">Не храните резервные коды в том же устройстве, где находится приложение-аутентификатор.</p>
                <p className="m-0">Никому не передавайте одноразовые коды и резервные коды.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
