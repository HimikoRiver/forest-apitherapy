"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { usePathname } from "next/navigation";
import { homeContent } from "@/data/homeContent";
import { legalLinks } from "@/data/legalLinks";

const menuItems = homeContent.menuItems;
const contactItems = homeContent.contactItems;

const PANEL_TEXTURE_PATH = "/textures/suede-green.webp";

function getActiveNavItem(pathname) {
  if (pathname === "/") {
    return menuItems[0];
  }

  return (
    menuItems.find(
      (item) => item.href !== "/" && pathname.startsWith(item.href)
    ) || menuItems[0]
  );
}

function getOrderedNavItems(pathname) {
  const activeItem = getActiveNavItem(pathname);

  return [
    activeItem,
    ...menuItems.filter((item) => item.key !== activeItem.key),
  ];
}

function FooterHoneycombRow({ compact = false }) {
  const gradientId = useId().replaceAll(":", "");

  const strokeGradientId = `footer-honey-stroke-${gradientId}`;
  const fillGradientId = `footer-honey-fill-${gradientId}`;

  const hexagons = [
    "10,2 16,5.5 16,12.5 10,16 4,12.5 4,5.5",
    "31,2 37,5.5 37,12.5 31,16 25,12.5 25,5.5",
    "52,2 58,5.5 58,12.5 52,16 46,12.5 46,5.5",
    "73,2 79,5.5 79,12.5 73,16 67,12.5 67,5.5",
    "94,2 100,5.5 100,12.5 94,16 88,12.5 88,5.5",
    "115,2 121,5.5 121,12.5 115,16 109,12.5 109,5.5",
    "136,2 142,5.5 142,12.5 136,16 130,12.5 130,5.5",
    "157,2 163,5.5 163,12.5 157,16 151,12.5 151,5.5",
    "178,2 184,5.5 184,12.5 178,16 172,12.5 172,5.5",
    "199,2 205,5.5 205,12.5 199,16 193,12.5 193,5.5",
  ];

  return (
    <div
      className={
        compact
          ? "flex justify-center"
          : "flex justify-center px-3 pt-5"
      }
    >
      <svg
        viewBox="0 0 209 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-[18px] w-full max-w-[220px] sm:h-[19px] sm:max-w-[230px] md:h-[20px] md:max-w-[240px]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={strokeGradientId}
            x1="0"
            y1="9"
            x2="209"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7f6224" />
            <stop offset="14%" stopColor="#d5a94a" />
            <stop offset="28%" stopColor="#fff1b8" />
            <stop offset="42%" stopColor="#e9be62" />
            <stop offset="58%" stopColor="#fff6d0" />
            <stop offset="74%" stopColor="#c99735" />
            <stop offset="100%" stopColor="#7f6224" />

            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-140 0; 140 0; -140 0"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </linearGradient>

          <linearGradient
            id={fillGradientId}
            x1="0"
            y1="0"
            x2="209"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#d8b66a" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#d8b66a" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#d8b66a" stopOpacity="0.03" />

            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0; 100 0; -100 0"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        <g
          stroke={`url(#${strokeGradientId})`}
          strokeWidth="1.55"
          strokeLinejoin="round"
          fill={`url(#${fillGradientId})`}
        >
          {hexagons.map((points, index) => (
            <polygon key={index} points={points} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function FooterMobilePanel({ title, icon, children }) {
  return (
    <section
      className="relative h-full w-full overflow-hidden rounded-[26px] border border-[#d8b66a]/32 bg-[#03130f]"
      style={{
        backgroundImage: `url("${PANEL_TEXTURE_PATH}")`,
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[25px] border border-black/60"
      />

      <div className="relative z-10 flex h-full flex-col px-4 py-5">
        <div className="mb-5 flex flex-col items-center">
          <div className="mb-2 flex w-full items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-[#d8b66a]/80" />

            <span className="relative block size-11 shrink-0">
              <Image
                src={icon}
                alt=""
                fill
                sizes="44px"
                className="object-contain"
              />
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/80 via-[#d8b66a]/70 to-transparent" />
          </div>

          <h3 className="m-0 text-center text-[0.8rem] font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
            {title}
          </h3>
        </div>

        {children}
      </div>
    </section>
  );
}

export default function FooterMobile() {
  const pathname = usePathname();

  const activeItem = getActiveNavItem(pathname);
  const orderedNavItems = getOrderedNavItems(pathname);

  const isAboutPage =
    pathname.startsWith("/about") || pathname.startsWith("/specialist");

  const year = new Date().getFullYear();
  const tagline = homeContent.footer.tagline;
  const copyright = homeContent.footer.copyright.replace(
    "{year}",
    String(year)
  );

  return (
    <footer
      className="relative overflow-hidden bg-black text-[#f3efe5]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <div
        data-menu-hide-start
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-0 h-px w-px"
      />

      <div className="relative z-10 mx-auto w-full max-w-[440px] px-4 pb-8 pt-8 md:max-w-[960px] md:px-7 md:pb-10 md:pt-10">
        {isAboutPage && (
          <div className="mb-7 md:mb-9">
            <FooterHoneycombRow compact />
          </div>
        )}

        <p className="m-0 mb-7 text-center text-[0.96rem] font-medium leading-[1.75] tracking-[-0.035em] text-[#f3d98d] md:mb-9">
          {tagline}
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-stretch md:gap-6">
          <FooterMobilePanel
            title="Разделы"
            icon="/images/footer/cardIcons/sections.webp"
          >
            <nav aria-label="Навигация по сайту" className="space-y-2">
              {orderedNavItems.map((item) => {
                const isActive = item.key === activeItem.key;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`group relative grid min-h-[52px] grid-cols-[42px_1fr_18px] items-center gap-3 overflow-hidden rounded-2xl border px-3 transition duration-300 ${
                      isActive
                        ? "border-[#d8b66a]/42 bg-[#d8b66a]/10 text-[#ffe6a2]"
                        : "border-[#d8b66a]/18 bg-black/45 text-[#f3efe5]/88 hover:border-[#d8b66a]/34 hover:text-[#f6d98d]"
                    }`}
                  >
                    <span className="relative z-10 block size-9 transition duration-300 group-hover:-translate-y-0.5 group-hover:brightness-125">
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-contain"
                      />
                    </span>

                    <span className="relative z-10 text-[0.92rem] font-semibold tracking-[-0.04em]">
                      {item.label}
                    </span>

                    <span className="relative z-10 text-center text-xl leading-none text-[#d8b66a] transition duration-300 group-hover:translate-x-0.5">
                      ›
                    </span>
                  </Link>
                );
              })}
            </nav>
          </FooterMobilePanel>

          <FooterMobilePanel
            title="Связь"
            icon="/images/footer/cardIcons/connection.webp"
          >
            <div className="flex h-full flex-col">
              <div className="space-y-3">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group grid min-h-[66px] grid-cols-[48px_1fr] items-center gap-3 rounded-2xl border border-[#d8b66a]/18 bg-black/45 px-3 transition duration-300 hover:border-[#d8b66a]/34"
                  >
                    <span className="relative block size-11 transition duration-300 group-hover:-translate-y-0.5 group-hover:brightness-125">
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-contain"
                      />
                    </span>

                    <span className="block">
                      <span className="block text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#d8b66a]">
                        {item.label}
                      </span>

                      <span className="mt-1 block text-[0.88rem] font-medium leading-snug text-[#f3efe5]/86 transition group-hover:text-[#f6d98d]">
                        {item.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-auto">
                <FooterHoneycombRow />
              </div>
            </div>
          </FooterMobilePanel>
        </div>

        <nav
          aria-label="Юридические документы"
          className="mt-5 rounded-[24px] border border-[#d8b66a]/20 bg-[#03130f] p-3 md:mt-6 md:p-4"
          style={{
            backgroundImage: `url("${PANEL_TEXTURE_PATH}")`,
            backgroundPosition: "center top",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        >
          <p className="m-0 px-2 pb-2 text-center text-[0.66rem] font-bold uppercase tracking-[0.3em] text-[#d8b66a]/82">
            Документы
          </p>

          <div className="grid gap-2 md:grid-cols-2">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[48px] items-center justify-between gap-3 rounded-2xl border border-[#d8b66a]/16 bg-black/44 px-4 text-[0.78rem] font-medium text-[#f3efe5]/76 transition duration-300 hover:border-[#d8b66a]/36 hover:bg-[#d8b66a]/8 hover:text-[#f3d98d]"
              >
                <span>{item.label}</span>
                <span className="text-lg leading-none text-[#d8b66a] transition group-hover:translate-x-0.5">
                  ›
                </span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-7 grid grid-cols-[1fr_38px_1fr] items-center gap-3 md:mt-9">
          <span className="h-px bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-[#d8b66a]/20" />

          <span className="mx-auto size-1.5 rounded-full bg-[#d8b66a]" />

          <span className="h-px bg-gradient-to-r from-[#d8b66a]/20 via-[#d8b66a]/70 to-transparent" />
        </div>

        <p className="m-0 mt-5 text-center text-[0.64rem] font-medium leading-[1.65] tracking-[-0.02em] text-[#d8b66a]/72">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
