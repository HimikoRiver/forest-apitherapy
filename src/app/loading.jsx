export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="Загрузка страницы"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#030b0c] px-4 text-[#f3efe5]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,182,106,0.12),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(21,82,59,0.16),transparent_38%)]"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex size-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#d8b66a]/16" />

          <div className="absolute inset-[7px] animate-spin rounded-full border-2 border-transparent border-t-[#f3d98d] border-r-[#d8b66a]/52" />

          <div className="flex size-10 items-center justify-center rounded-full border border-[#d8b66a]/24 bg-[#d8b66a]/10 text-xl text-[#f3d98d] shadow-[0_0_24px_rgba(216,182,106,0.16)]">
            ✦
          </div>
        </div>

        <p className="mt-6 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/82">
          APIDARB
        </p>

        <p className="mt-3 text-sm text-[#f3efe5]/54">
          Загружаем страницу...
        </p>
      </div>

      <span className="sr-only">
        Пожалуйста, подождите. Страница загружается.
      </span>
    </main>
  );
}