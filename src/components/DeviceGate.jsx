"use client";

import { useEffect, useState } from "react";

const DESKTOP_MIN_WIDTH = 1280;

export default function DeviceGate({ children }) {
  const [canShowDesktopSite, setCanShowDesktopSite] = useState(null);

  useEffect(() => {
    const updateDeviceState = () => {
      const isWideEnough = window.innerWidth >= DESKTOP_MIN_WIDTH;
      const isTouchDevice =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0;

      setCanShowDesktopSite(isWideEnough && !isTouchDevice);
    };

    updateDeviceState();

    window.addEventListener("resize", updateDeviceState);
    window.addEventListener("orientationchange", updateDeviceState);

    return () => {
      window.removeEventListener("resize", updateDeviceState);
      window.removeEventListener("orientationchange", updateDeviceState);
    };
  }, []);

  if (canShowDesktopSite === null) {
    return <main className="min-h-svh bg-[#051f20]" />;
  }

  if (!canShowDesktopSite) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#051f20] px-6 text-center text-[#f4df9b]">
        <div className="max-w-md rounded-[2rem] border border-[#d6ad55]/35 bg-[#061f1a]/90 px-7 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-[#d6ad55]/80">
            Скоро
          </p>

          <h1 className="mb-5 text-3xl font-semibold leading-tight text-[#ffe8a3]">
            Мобильная и планшетная версии пока в разработке
          </h1>

          <p className="text-base leading-7 text-[#f4df9b]/82">
            Сейчас сайт временно доступен только с компьютера. Мы подготавливаем
            адаптацию для телефона и планшета. И вообще, что вы себе позволяете?! :(
          </p>
        </div>
      </main>
    );
  }

  return children;
}