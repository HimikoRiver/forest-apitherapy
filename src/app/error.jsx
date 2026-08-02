"use client";

import { useEffect } from "react";
import {
  AlertTriangle,
  Home,
  RefreshCw,
} from "lucide-react";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error("Application route error:", error);
  }, [error]);

  function handleReload() {
    window.location.reload();
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#030b0c] px-4 py-10 text-[#f3efe5] sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,182,106,0.12),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(21,82,59,0.18),transparent_38%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-[18%] size-2 rounded-full bg-[#f3d98d]/50 shadow-[0_0_24px_rgba(243,217,141,0.56)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[16%] right-[12%] size-1.5 rounded-full bg-[#f3d98d]/40 shadow-[0_0_20px_rgba(243,217,141,0.5)]"
      />

      <section className="relative z-10 w-full max-w-xl overflow-hidden rounded-[30px] border border-[#d8b66a]/20 bg-[#030b0c]/94 shadow-[0_32px_100px_rgba(0,0,0,0.62)]">
        <div className="relative border-b border-[#d8b66a]/12 px-5 py-7 text-center sm:px-8 sm:py-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,182,106,0.12),transparent_48%)]"
          />

          <div className="relative mx-auto flex size-14 items-center justify-center rounded-2xl border border-amber-300/24 bg-amber-300/10 text-[#f3d98d]">
            <AlertTriangle className="size-6" />
          </div>

          <p className="relative mt-5 text-[0.64rem] font-bold uppercase tracking-[0.26em] text-[#d8b66a]/78">
            Ошибка загрузки
          </p>

          <h1 className="relative mt-3 text-2xl font-bold tracking-[-0.05em] text-[#f3d98d] sm:text-3xl">
            Страница временно недоступна
          </h1>

          <p className="relative mx-auto mt-4 max-w-md text-sm leading-7 text-[#f3efe5]/68">
            Не удалось получить необходимые данные. Это может быть временная
            ошибка соединения. Повторите загрузку страницы.
          </p>

          {error?.digest && (
            <p className="relative mt-4 break-all text-[0.62rem] uppercase tracking-[0.14em] text-[#f3efe5]/34">
              Код ошибки: {error.digest}
            </p>
          )}
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/44 bg-[#d8b66a] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#07110f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <RefreshCw className="size-4 transition duration-300 group-hover:rotate-45" />
            Попробовать снова
          </button>

          <button
            type="button"
            onClick={handleReload}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/20 bg-black/24 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/52 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d]"
          >
            <RefreshCw className="size-4 transition duration-300 group-hover:rotate-180" />
            Обновить страницу
          </button>

          <a
            href="/"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#d8b66a]/20 bg-black/24 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:border-[#d8b66a]/52 hover:bg-[#d8b66a]/10 hover:text-[#f3d98d] sm:col-span-2"
          >
            <Home className="size-4 transition duration-300 group-hover:scale-110" />
            Вернуться на главную
          </a>
        </div>
      </section>
    </main>
  );
}