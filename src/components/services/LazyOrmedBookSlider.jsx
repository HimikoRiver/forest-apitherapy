"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function OrmedBookSliderPlaceholder({ loading = false }) {
  return (
    <section
      role={loading ? "status" : undefined}
      aria-live={loading ? "polite" : undefined}
      aria-label={loading ? "Загрузка фотогалереи" : undefined}
      className="relative flex min-h-[430px] w-full items-center justify-center overflow-hidden sm:min-h-[590px] lg:min-h-[680px] xl:min-h-[760px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,173,86,0.08),transparent_42%)]"
      />

      <div className="relative flex flex-col items-center px-5 text-center">
        <div className="flex w-full max-w-[420px] items-center justify-center gap-3 sm:gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b98736]/45 to-[#d7aa51]/70" />

          <div className="h-[7px] w-[7px] rotate-45 border border-[#d7aa51]/70 bg-[#061a13] shadow-[0_0_12px_rgba(215,170,81,0.24)]" />

          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#b98736]/45 to-[#d7aa51]/70" />
        </div>

        <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.4em] text-[#d7aa51]/60 sm:text-[10px]">
          Центр, кабинеты и рабочие моменты
        </p>

        <h2
          className="mt-3 text-[clamp(1.45rem,2.4vw,2.5rem)] font-normal uppercase leading-none tracking-[0.08em] text-[#e2b45b]/72"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Фотогалерея
        </h2>

        {loading && (
          <>
            <div className="relative mt-10 flex size-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#d8ad56]/18" />

              <div className="absolute inset-[6px] animate-spin rounded-full border-2 border-transparent border-r-[#d8ad56]/40 border-t-[#f3d17f]" />

              <div className="size-2 rounded-full bg-[#f3d17f] shadow-[0_0_16px_rgba(243,209,127,0.55)]" />
            </div>

            <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#d8ad56]/58">
              Загружаем галерею
            </p>
          </>
        )}
      </div>
    </section>
  );
}

const OrmedBookSlider = dynamic(
  () => import("@/components/services/OrmedBookSlider"),
  {
    ssr: false,
    loading: () => (
      <OrmedBookSliderPlaceholder loading />
    ),
  }
);

export default function LazyOrmedBookSlider() {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || shouldLoad) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: "900px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad ? (
        <OrmedBookSlider />
      ) : (
        <OrmedBookSliderPlaceholder />
      )}
    </div>
  );
}