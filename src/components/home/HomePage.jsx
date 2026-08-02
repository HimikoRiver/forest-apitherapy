"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 1280px)";
const TABLET_QUERY =
  "(min-width: 768px) and (max-width: 1279px)";

function HomeLoadingScreen() {
  return (
    <div
      role="status"
      aria-label="Загрузка главной страницы"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#051f20]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,182,106,0.12),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(21,82,59,0.2),transparent_40%)]"
      />

      <div className="relative flex flex-col items-center">
        <div className="relative flex size-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#d8b66a]/18" />

          <div className="absolute inset-[6px] animate-spin rounded-full border-2 border-transparent border-r-[#d8b66a]/45 border-t-[#f3d98d]" />

          <div className="size-2 rounded-full bg-[#f3d98d] shadow-[0_0_18px_rgba(243,217,141,0.6)]" />
        </div>

        <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]/82">
          APIDARB
        </p>
      </div>
    </div>
  );
}

const HomeDesktop = dynamic(
  () => import("@/components/home/HomeDesktop"),
  {
    ssr: false,
    loading: HomeLoadingScreen,
  }
);

const HomeTablet = dynamic(
  () => import("@/components/home/HomeTablet"),
  {
    ssr: false,
    loading: HomeLoadingScreen,
  }
);

const HomeMobile = dynamic(
  () => import("@/components/home/HomeMobile"),
  {
    ssr: false,
    loading: HomeLoadingScreen,
  }
);

function getDeviceSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  if (window.matchMedia(DESKTOP_QUERY).matches) {
    return "desktop";
  }

  if (window.matchMedia(TABLET_QUERY).matches) {
    return "tablet";
  }

  return "mobile";
}

function getServerDeviceSnapshot() {
  return null;
}

function subscribeToDeviceChanges(callback) {
  const desktopMediaQuery =
    window.matchMedia(DESKTOP_QUERY);

  const tabletMediaQuery =
    window.matchMedia(TABLET_QUERY);

  desktopMediaQuery.addEventListener(
    "change",
    callback
  );

  tabletMediaQuery.addEventListener(
    "change",
    callback
  );

  return () => {
    desktopMediaQuery.removeEventListener(
      "change",
      callback
    );

    tabletMediaQuery.removeEventListener(
      "change",
      callback
    );
  };
}

export default function HomePage() {
  const deviceType = useSyncExternalStore(
    subscribeToDeviceChanges,
    getDeviceSnapshot,
    getServerDeviceSnapshot
  );

  let content = <HomeLoadingScreen />;

  if (deviceType === "desktop") {
    content = <HomeDesktop />;
  }

  if (deviceType === "tablet") {
    content = <HomeTablet />;
  }

  if (deviceType === "mobile") {
    content = <HomeMobile />;
  }

  return (
    <main className="min-h-screen bg-[#051f20] text-[#daf1de]">
      {content}
    </main>
  );
}