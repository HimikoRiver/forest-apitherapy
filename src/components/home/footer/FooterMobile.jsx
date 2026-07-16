"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ApidarbLogo from "@/components/home/shared/ApidarbLogo";
import GoldDivider from "@/components/home/shared/GoldDivider";
import { homeContent } from "@/data/homeContent";

const menuItems = homeContent.menuItems;
const contactItems = homeContent.contactItems;

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

function FooterMobilePanel({ title, icon, children }) {
  return (
    <section className="relative overflow-hidden rounded-[26px] border border-[#d8b66a]/22 bg-[#03110d]/42 px-4 py-5 shadow-[0_18px_46px_rgba(0,0,0,0.44)] backdrop-blur-[1.5px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,106,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[25px] border border-black/56" />

      <div className="relative z-10">
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
  const disclaimer = homeContent.footer.disclaimer;
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[10px] bg-[linear-gradient(180deg,#000000_0%,rgba(0,0,0,0.9)_28%,rgba(0,0,0,0.55)_62%,rgba(0,0,0,0)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4"
      >
        <div className="grid w-full grid-cols-[1fr_54px_1fr] items-center gap-3">
          <span className="h-px bg-gradient-to-r from-transparent via-[#d8b66a]/78 to-[#d8b66a]/24 shadow-[0_0_12px_rgba(216,182,106,0.3)]" />

          <span className="relative flex items-center justify-center">
            <span className="h-[5px] w-[5px] rounded-full bg-[#d8b66a] shadow-[0_0_12px_rgba(216,182,106,0.6)]" />
            <span className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-transparent" />
          </span>

          <span className="h-px bg-gradient-to-r from-[#d8b66a]/24 via-[#d8b66a]/78 to-transparent shadow-[0_0_12px_rgba(216,182,106,0.3)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[440px] px-4 pb-8 pt-0">
        <div className="mb-7 flex flex-col items-center text-center">
          <ApidarbLogo />

          <div className="mt-4 w-full max-w-[240px]">
            <GoldDivider />
          </div>

          <p className="m-0 mt-5 text-[0.96rem] font-medium leading-[1.75] tracking-[-0.035em] text-[#f3d98d] drop-shadow-[0_0_14px_rgba(216,182,106,0.18)]">
            {tagline}
          </p>
        </div>

        <div className="space-y-5">
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
                        : "border-[#d8b66a]/12 bg-black/12 text-[#f3efe5]/88 hover:border-[#d8b66a]/28 hover:text-[#f6d98d]"
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
            <div className="space-y-3">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group grid min-h-[66px] grid-cols-[48px_1fr] items-center gap-3 rounded-2xl border border-[#d8b66a]/12 bg-black/12 px-3 transition duration-300 hover:border-[#d8b66a]/28"
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
          </FooterMobilePanel>
        </div>

        <div className="mt-7 grid grid-cols-[1fr_38px_1fr] items-center gap-3">
          <span className="h-px bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-[#d8b66a]/20" />
          <span className="mx-auto size-1.5 rounded-full bg-[#d8b66a] shadow-[0_0_12px_rgba(216,182,106,0.66)]" />
          <span className="h-px bg-gradient-to-r from-[#d8b66a]/20 via-[#d8b66a]/70 to-transparent" />
        </div>

        <div className="mt-5 space-y-3 text-center text-[0.64rem] font-medium leading-[1.65] tracking-[-0.02em] text-[#c5b894]/76">
          <p className="m-0">{disclaimer}</p>
          <p className="m-0 text-[#d8b66a]/72">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}