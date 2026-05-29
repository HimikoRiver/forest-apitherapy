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

function FooterTabletPanel({ title, icon, children }) {
  return (
    <section className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[30px] border border-[#d8b66a]/24 bg-black/24 px-5 py-6 shadow-[0_20px_56px_rgba(0,0,0,0.44)] backdrop-blur-[2px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,106,0.12),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-black/58" />

      <div className="relative z-10 flex h-full flex-1 flex-col">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex w-full items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-[#d8b66a]/80" />

            <span className="relative block size-12 shrink-0">
              <Image
                src={icon}
                alt=""
                fill
                sizes="48px"
                className="object-contain drop-shadow-[0_0_15px_rgba(216,182,106,0.28)]"
              />
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/80 via-[#d8b66a]/70 to-transparent" />
          </div>

          <h3 className="m-0 text-center text-[0.86rem] font-bold uppercase tracking-[0.44em] text-[#d8b66a]">
            {title}
          </h3>
        </div>

        {children}
      </div>
    </section>
  );
}

export default function FooterTablet() {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);
  const orderedNavItems = getOrderedNavItems(pathname);
  const year = new Date().getFullYear();
  const tagline = homeContent.footer.tagline;
  const disclaimer = homeContent.footer.disclaimer;
  const copyright = homeContent.footer.copyright.replace("{year}", String(year));

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

      <Image
        src="/images/footer/footerFon222.webp"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center opacity-[0.46]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,106,0.13),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.54)_0%,rgba(0,0,0,0.7)_48%,rgba(0,0,0,0.94)_100%)]" />

      <div className="relative z-10 mx-auto max-w-[980px] px-8 pb-10 pt-12">
        <div className="mb-9 grid grid-cols-[minmax(0,300px)_1fr] items-center gap-8">
          <div className="flex flex-col items-start">
            <ApidarbLogo />

            <div className="mt-4 w-full max-w-[260px]">
              <GoldDivider />
            </div>
          </div>

          <p className="m-0 justify-self-end text-right text-[1.05rem] font-medium leading-[1.7] tracking-[-0.035em] text-[#f3d98d] drop-shadow-[0_0_14px_rgba(216,182,106,0.18)]">
            {tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-5">
          <FooterTabletPanel
            title="Разделы"
            icon="/images/footer/cardIcons/sections.webp"
          >
            <nav
              aria-label="Навигация по сайту"
              className="flex flex-1 flex-col justify-between gap-2"
            >
              {orderedNavItems.map((item) => {
                const isActive = item.key === activeItem.key;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`group relative grid min-h-[54px] grid-cols-[42px_1fr_18px] items-center gap-3 overflow-hidden rounded-2xl border px-3 transition duration-300 ${
                      isActive
                        ? "border-[#d8b66a]/38 bg-[#d8b66a]/10 text-[#ffe6a2]"
                        : "border-[#d8b66a]/12 bg-black/12 text-[#f3efe5]/88 hover:border-[#d8b66a]/28 hover:text-[#f6d98d]"
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,182,106,0.16),transparent_68%)] opacity-0 transition duration-300 group-hover:opacity-100" />

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
          </FooterTabletPanel>

          <FooterTabletPanel
            title="Связь"
            icon="/images/footer/cardIcons/connection.webp"
          >
            <div className="flex flex-1 flex-col justify-between gap-3">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group grid min-h-[76px] grid-cols-[52px_1fr] items-center gap-4 rounded-2xl border border-[#d8b66a]/12 bg-black/12 px-4 transition duration-300 hover:border-[#d8b66a]/28"
                >
                  <span className="relative block size-12 transition duration-300 group-hover:-translate-y-0.5 group-hover:brightness-125">
                    <Image
                      src={item.icon}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-contain drop-shadow-[0_0_15px_rgba(216,182,106,0.18)]"
                    />
                  </span>

                  <span className="block">
                    <span className="block text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#d8b66a]">
                      {item.label}
                    </span>

                    <span className="mt-1.5 block text-[0.9rem] font-medium leading-snug text-[#f3efe5]/86 transition group-hover:text-[#f6d98d]">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </FooterTabletPanel>
        </div>

        <div className="mt-8 grid grid-cols-[1fr_80px_1fr] items-center gap-5">
          <span className="h-px bg-gradient-to-r from-transparent via-[#d8b66a]/76 to-[#d8b66a]/20 shadow-[0_0_12px_rgba(216,182,106,0.28)]" />
          <span className="mx-auto size-2 rounded-full bg-[#d8b66a] shadow-[0_0_14px_rgba(216,182,106,0.66)]" />
          <span className="h-px bg-gradient-to-r from-[#d8b66a]/20 via-[#d8b66a]/76 to-transparent shadow-[0_0_12px_rgba(216,182,106,0.28)]" />
        </div>

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-8 text-[0.64rem] font-medium leading-[1.55] tracking-[-0.02em] text-[#c5b894]/76">
          <p className="m-0 max-w-[620px] text-left">{disclaimer}</p>
          <p className="m-0 whitespace-nowrap text-right text-[#d8b66a]/72">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}