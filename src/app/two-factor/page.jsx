"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  KeyRound,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import BeesPageBackground from "@/components/shared/BeesPageBackground";
import { PageLogo } from "@/components/shared/PageLogo";
import { authClient } from "@/lib/auth-client";

export default function TwoFactorPage() {
  const router = useRouter();
  const [mode, setMode] = useState("totp");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const normalizedCode = code.trim();

    if (!normalizedCode) {
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response =
        mode === "totp"
          ? await authClient.twoFactor.verifyTotp({
              code: normalizedCode,
              trustDevice: false,
            })
          : await authClient.twoFactor.verifyBackupCode({
              code: normalizedCode,
              trustDevice: false,
            });

      if (response?.error) {
        setErrorMessage(
          response.error.status === 429
            ? "Слишком много попыток. Повторите позже."
            : "Код не подошёл. Проверьте его и попробуйте снова."
        );
        return;
      }

      router.replace("/profile");
      router.refresh();
    } catch {
      setErrorMessage(
        "Не удалось проверить код. Попробуйте ещё раз."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030b0c] px-3 py-4 text-[#f3efe5] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <BeesPageBackground />

      <div className="relative z-20 mb-3 flex justify-center sm:mb-4 lg:absolute lg:left-8 lg:top-8 lg:mb-0">
        <PageLogo variant="auth" />
      </div>

      <section className="relative z-10 mx-auto flex w-full max-w-md items-start justify-center pb-4 lg:min-h-[calc(100vh-64px)] lg:items-center lg:pb-0">
        <div className="w-full overflow-hidden rounded-[28px] border border-[#d8b66a]/20 bg-black/44 shadow-[0_28px_80px_rgba(0,0,0,0.5)] sm:rounded-[32px]">
          <div className="relative border-b border-[#d8b66a]/12 px-4 py-6 text-center sm:px-5 sm:py-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,182,106,0.14),transparent_42%)]" />

            <div className="relative mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border border-[#d8b66a]/20 bg-[#d8b66a]/10 text-[#f3d98d] sm:size-14">
              <ShieldCheck className="size-5 sm:size-6" />
            </div>

            <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8b66a]/18 bg-black/24 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
              <KeyRound className="size-4" />
              Защищённый вход
            </div>

            <h1 className="relative m-0 text-[1.35rem] font-bold tracking-[-0.05em] text-[#f3d98d] sm:text-2xl">
              Двухфакторная проверка
            </h1>

            <p className="relative mx-auto mt-3 max-w-sm text-[0.8rem] leading-6 text-[#f3efe5]/72 sm:text-sm">
              {mode === "totp"
                ? "Введите шестизначный код из приложения-аутентификатора."
                : "Введите один из резервных кодов, сохранённых при подключении защиты."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 px-4 py-5 sm:px-5 sm:py-6"
          >
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#d8b66a]/90 sm:text-xs sm:tracking-[0.24em]">
                {mode === "totp" ? (
                  <KeyRound className="size-4" />
                ) : (
                  <LifeBuoy className="size-4" />
                )}
                {mode === "totp" ? "Код" : "Резервный код"}
              </span>

              <input
                type="text"
                inputMode={mode === "totp" ? "numeric" : "text"}
                autoComplete="one-time-code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
                maxLength={mode === "totp" ? 6 : 64}
                className="w-full rounded-2xl border border-[#d8b66a]/18 bg-black/34 px-4 py-3 text-center text-lg tracking-[0.22em] text-[#f3efe5] outline-none transition duration-300 placeholder:text-[#f3efe5]/34 focus:border-[#d8b66a]/60 focus:bg-black/48 focus:shadow-[0_0_0_3px_rgba(216,182,106,0.08)]"
                placeholder={mode === "totp" ? "000000" : "Резервный код"}
              />
            </label>

            {errorMessage && (
              <p className="rounded-2xl border border-red-400/24 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/40 bg-[#d8b66a] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm sm:tracking-[0.22em]"
            >
              <ShieldCheck className="size-4 transition group-hover:scale-110" />
              {isLoading ? "Проверяем..." : "Подтвердить"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode(mode === "totp" ? "backup" : "totp");
                setCode("");
                setErrorMessage("");
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/18 bg-black/24 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#d8b66a] transition hover:border-[#d8b66a]/42 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
            >
              <LifeBuoy className="size-4" />
              {mode === "totp"
                ? "Использовать резервный код"
                : "Вернуться к коду приложения"}
            </button>
          </form>

          <div className="border-t border-[#d8b66a]/12 px-4 py-4 sm:px-5">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center gap-2 text-sm text-[#f3efe5]/60 transition hover:text-[#f3d98d]"
            >
              <ArrowLeft className="size-4" />
              Вернуться ко входу
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
