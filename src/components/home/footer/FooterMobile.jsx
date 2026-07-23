"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeContent } from "@/data/homeContent";

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

function FooterHoneycombRow() {
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
    <div className="flex justify-center px-3 pt-5">
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
            id="footer-honey-stroke"
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
            id="footer-honey-fill"
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

          <filter
            id="footer-honey-glow"
            x="-20%"
            y="-80%"
            width="140%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="1.6" result="blur" />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0.84
                0 1 0 0 0.71
                0 0 1 0 0.41
                0 0 0 0.58 0
              "
            />

            <feBlend in="SourceGraphic" mode="screen" />
          </filter>
        </defs>

        <g
          stroke="url(#footer-honey-stroke)"
          strokeWidth="1.55"
          strokeLinejoin="round"
          fill="url(#footer-honey-fill)"
          filter="url(#footer-honey-glow)"
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
      className="relative h-full w-full overflow-hidden rounded-[26px] border border-[#d8b66a]/28 shadow-[0_18px_46px_rgba(0,0,0,0.44)]"
      style={{
        backgroundColor: "#041813",
        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(4, 24, 19, 0.18) 0%,
            rgba(2, 11, 9, 0.34) 100%
          ),
          url("${PANEL_TEXTURE_PATH}")
        `,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,106,0.1),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_26%,rgba(0,0,0,0.12)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[25px] border border-black/45"
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
                className="object-contain drop-shadow-[0_0_14px_rgba(216,182,106,0.28)]"
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

  const year = new Date().getFullYear();
  const tagline = homeContent.footer.tagline;
  const copyright = homeContent.footer.copyright.replace(
    "{year}",
    String(year)
  );

  return (
    <footer
      className="relative overflow-hidden bg-[#020908] text-[#f3efe5]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <div
        data-menu-hide-start
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-0 h-px w-px"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(13,82,43,0.5),rgba(4,28,19,0.72)_42%,rgba(1,7,6,0.98)_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.18)_28%,rgba(0,0,0,0.94)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[440px] px-4 pb-8 pt-8 md:max-w-[960px] md:px-7 md:pb-10 md:pt-10">
        <p className="m-0 mb-7 text-center text-[0.96rem] font-medium leading-[1.75] tracking-[-0.035em] text-[#f3d98d] drop-shadow-[0_0_14px_rgba(216,182,106,0.18)] md:mb-9">
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
                        ? "border-[#d8b66a]/38 bg-[#d8b66a]/10 text-[#ffe6a2]"
                        : "border-[#d8b66a]/12 bg-black/18 text-[#f3efe5]/88 hover:border-[#d8b66a]/28 hover:text-[#f6d98d]"
                    }`}
                  >
                    <span className="relative z-10 block size-9 transition duration-300 group-hover:-translate-y-0.5 group-hover:brightness-125">
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-contain drop-shadow-[0_0_12px_rgba(216,182,106,0.18)]"
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
                    className="group grid min-h-[66px] grid-cols-[48px_1fr] items-center gap-3 rounded-2xl border border-[#d8b66a]/12 bg-black/18 px-3 transition duration-300 hover:border-[#d8b66a]/28"
                  >
                    <span className="relative block size-11 transition duration-300 group-hover:-translate-y-0.5 group-hover:brightness-125">
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-contain drop-shadow-[0_0_14px_rgba(216,182,106,0.18)]"
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

        <div className="mt-7 grid grid-cols-[1fr_38px_1fr] items-center gap-3 md:mt-9">
          <span className="h-px bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-[#d8b66a]/20" />

          <span className="mx-auto size-1.5 rounded-full bg-[#d8b66a] shadow-[0_0_12px_rgba(216,182,106,0.66)]" />

          <span className="h-px bg-gradient-to-r from-[#d8b66a]/20 via-[#d8b66a]/70 to-transparent" />
        </div>

        <p className="m-0 mt-5 text-center text-[0.64rem] font-medium leading-[1.65] tracking-[-0.02em] text-[#d8b66a]/72">
          {copyright}
        </p>
      </div>
    </footer>
  );
}