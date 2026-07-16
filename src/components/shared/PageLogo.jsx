"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DecorativeDivider from "@/components/services/shared/DecorativeDivider";

const LOGO_ROUTES = {
  "/":
    "left-5 top-[clamp(18px,2.6vh,30px)] sm:left-8 lg:left-14 xl:left-20",
  "/about":
    "left-5 top-[clamp(18px,2.6vh,30px)] sm:left-8 lg:left-14 xl:left-20",
  "/contacts":
    "right-4 top-[clamp(18px,2.6vh,30px)] origin-top-right scale-75 sm:right-7 sm:scale-90 lg:right-10 lg:scale-100 xl:right-[4vw]",
};

export function PageLogo({ className = "" }) {
  return (
    <Link
      href="/"
      aria-label="Перейти на главную страницу"
      className={`group inline-flex w-fit flex-col items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ad56]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${className}`}
    >
      <span
        className="text-[clamp(1.55rem,3.2vh,2.8rem)] tracking-[0.12em] text-[#e0b45b] transition duration-300 group-hover:text-[#f0c978]"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        APIDARB
      </span>

      <span className="mt-3 transition duration-300 group-hover:brightness-125">
        <DecorativeDivider compact />
      </span>
    </Link>
  );
}

export default function RoutePageLogo() {
  const pathname = usePathname();
  const positionClassName = LOGO_ROUTES[pathname];

  if (!positionClassName) return null;

  return (
    <div className={`absolute z-[999] ${positionClassName}`}>
      <PageLogo />
    </div>
  );
}
