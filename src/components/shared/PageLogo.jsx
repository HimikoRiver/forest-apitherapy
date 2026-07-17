"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DecorativeDivider from "@/components/services/shared/DecorativeDivider";

const LOGO_ROUTES = {
  "/":
    "left-5 top-[clamp(18px,2.6vh,30px)] sm:left-8 lg:left-14 xl:hidden",
  "/about":
    "left-5 top-[clamp(18px,2.6vh,30px)] sm:left-8 lg:left-14 xl:left-20",
  "/contacts":
    "left-5 top-[clamp(18px,2.6vh,30px)] sm:left-8 lg:left-14 xl:left-20",
};

const LOGO_VARIANTS = {
  default: {
    text: "text-[clamp(1.55rem,3.2vh,2.8rem)] tracking-[0.12em]",
    divider: "mt-3",
  },
  hero: {
    text: "text-[30px] tracking-[0.18em]",
    divider: "mt-2 scale-[0.82]",
  },
};

export function PageLogo({ className = "", variant = "default" }) {
  const variantClasses =
    LOGO_VARIANTS[variant] ?? LOGO_VARIANTS.default;

  return (
    <Link
      href="/"
      aria-label="Перейти на главную страницу"
      className={`group inline-flex w-fit flex-col items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ad56]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${className}`}
    >
      <span
        className={`${variantClasses.text} text-[#e0b45b] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition duration-300 group-hover:text-[#f0c978]`}
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        APIDARB
      </span>

      <span
        className={`${variantClasses.divider} transition duration-300 group-hover:brightness-125`}
      >
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