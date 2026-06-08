"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeContent } from "@/data/homeContent";

const menuItems = homeContent.menuItems;
const contactItems = homeContent.contactItems;

function getSafeHref(item) {
  if (item.key === "about" || item.key === "specialist" || item.href === "/specialist") {
    return "/about";
  }

  if (!item.href) {
    return "/";
  }

  if (item.href.startsWith("/")) {
    return item.href;
  }

  if (item.href.startsWith("#")) {
    return `/${item.href}`;
  }

  return `/${item.href}`;
}

function getActiveNavItem(pathname) {
  if (pathname === "/") {
    return menuItems[0];
  }

  return (
    menuItems.find((item) => {
      const href = getSafeHref(item);

      return href !== "/" && pathname.startsWith(href);
    }) || menuItems[0]
  );
}

function getOrderedNavItems(pathname) {
  const activeItem = getActiveNavItem(pathname);

  return [
    activeItem,
    ...menuItems.filter((item) => item.key !== activeItem.key),
  ];
}

function FooterCardShell({ children, className = "" }) {
  return (
    <section
      className={`relative z-10 flex h-[clamp(29rem,32vw,31.8rem)] w-full max-w-[clamp(324px,22.3vw,425px)] flex-col overflow-hidden rounded-[clamp(1rem,1.44vw,1.68rem)] border border-[#d8b66a]/26 bg-transparent px-[clamp(1rem,1.4vw,1.64rem)] py-[clamp(1rem,1.4vw,1.64rem)] shadow-[0_0_30px_rgba(0,0,0,0.42)] backdrop-blur-[1px] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,106,0.07),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.17),rgba(0,0,0,0.06))]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-[#050f0b]/68" />

      <div className="relative z-10 flex h-full flex-1 flex-col">{children}</div>
    </section>
  );
}

function CardHeader({ title, icon }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-[clamp(0.5rem,0.68vw,0.78rem)] flex w-full items-center justify-center gap-[clamp(0.46rem,0.66vw,0.72rem)]">
        <span className="h-px w-[28%] bg-gradient-to-r from-transparent via-[#d8b66a]/72 to-[#d8b66a]" />

        <span className="relative size-[clamp(2.2rem,2.95vw,3.28rem)] shrink-0">
          <Image
            src={icon}
            alt=""
            fill
            sizes="52px"
            className="object-contain drop-shadow-[0_0_14px_rgba(216,182,106,0.22)]"
          />
        </span>

        <span className="h-px w-[28%] bg-gradient-to-r from-[#d8b66a] via-[#d8b66a]/72 to-transparent" />
      </div>

      <h3 className="m-0 text-center text-[clamp(0.86rem,1.05vw,1.2rem)] font-bold uppercase tracking-[0.44em] text-[#d8b66a] drop-shadow-[0_0_10px_rgba(216,182,106,0.22)]">
        {title}
      </h3>
    </div>
  );
}

function MenuCard() {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);
  const orderedNavItems = getOrderedNavItems(pathname);

  return (
    <FooterCardShell>
      <CardHeader
        title="Разделы"
        icon="/images/footer/cardIcons/sections.webp"
      />

      <nav
        aria-label="Навигация по сайту"
        className="mt-[clamp(1rem,1.35vw,1.5rem)] flex flex-1 flex-col justify-between"
      >
        {orderedNavItems.map((item) => {
          const isActive = item.key === activeItem.key;
          const href = getSafeHref(item);

          return (
            <Link
              key={item.key}
              href={href}
              className={`footer-card-row group relative grid min-h-[clamp(2.5rem,3.18vw,3.62rem)] grid-cols-[clamp(2.7rem,3.35vw,3.75rem)_1fr_clamp(0.82rem,0.96vw,1.1rem)] items-center gap-[clamp(0.68rem,0.9vw,1rem)] border-b border-[#d8b66a]/14 transition duration-300 ${
                isActive
                  ? "is-active text-[#ffe6a2]"
                  : "text-[#f3efe5]/90 hover:text-[#f6d98d]"
              }`}
            >
              <span className="relative block size-[clamp(2.55rem,3.2vw,3.55rem)] transition duration-300 group-hover:-translate-y-0.5 group-hover:brightness-125">
                <Image
                  src={item.icon}
                  alt=""
                  fill
                  sizes="58px"
                  className="object-contain drop-shadow-[0_0_16px_rgba(216,182,106,0.22)]"
                />
              </span>

              <span className="relative z-10 text-[clamp(0.92rem,1.1vw,1.22rem)] font-semibold tracking-[-0.035em]">
                {item.label}
              </span>

              <span className="text-center text-[clamp(1rem,1.16vw,1.3rem)] leading-none text-[#d8b66a] transition duration-300 group-hover:translate-x-1 group-hover:text-[#ffe6a2]">
                ›
              </span>
            </Link>
          );
        })}
      </nav>
    </FooterCardShell>
  );
}

function ContactCard() {
  return (
    <FooterCardShell>
      <CardHeader
        title="Связь"
        icon="/images/footer/cardIcons/connection.webp"
      />

      <div className="mt-[clamp(1rem,1.35vw,1.5rem)] flex flex-1 flex-col justify-between">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group grid min-h-[clamp(4.1rem,5vw,5.55rem)] grid-cols-[clamp(2.72rem,3.42vw,3.86rem)_1fr] items-center gap-[clamp(0.76rem,0.98vw,1.12rem)] border-b border-[#d8b66a]/14 transition duration-300"
          >
            <span className="relative block size-[clamp(2.55rem,3.25vw,3.62rem)] transition duration-300 group-hover:-translate-y-1 group-hover:brightness-125">
              <Image
                src={item.icon}
                alt=""
                fill
                sizes="58px"
                className="object-contain drop-shadow-[0_0_16px_rgba(216,182,106,0.18)]"
              />
            </span>

            <span className="block">
              <span className="block text-[clamp(0.66rem,0.78vw,0.86rem)] font-bold uppercase tracking-[0.3em] text-[#d8b66a]">
                {item.label}
              </span>

              <span className="mt-[0.28rem] block text-[clamp(0.86rem,1vw,1.1rem)] font-medium leading-snug text-[#f3efe5]/88 transition group-hover:text-[#f6d98d]">
                {item.value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </FooterCardShell>
  );
}

export default function FooterCards() {
  return (
    <>
      <div className="footer-cards-scale relative z-10">
        <div className="footer-cards-layout relative z-10 flex w-full items-stretch justify-center gap-[16px]">
          <MenuCard />
          <ContactCard />
        </div>
      </div>

      <style jsx global>{`
        .footer-cards-scale {
          transform: scale(0.72);
          transform-origin: top center;
        }

        .footer-card-row::before {
          content: "";
          position: absolute;
          inset: 3px 6px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(216, 182, 106, 0.18),
            transparent 68%
          );
          opacity: 0;
          transform: scale(0.94);
          transition:
            opacity 260ms ease,
            transform 260ms ease;
        }

        .footer-card-row:hover::before {
          opacity: 0.45;
          transform: scale(1);
        }

        .footer-card-row.is-active::before {
          opacity: 0.76;
          animation: footerActiveNavPulse 2.3s ease-in-out infinite;
        }

        .footer-card-row.is-active::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -1px;
          width: 54%;
          height: 1px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 230, 162, 0.95),
            transparent
          );
          transform: translateX(-50%);
          box-shadow: 0 0 12px rgba(216, 182, 106, 0.42);
        }

        @keyframes footerActiveNavPulse {
          0%,
          100% {
            transform: scale(0.96);
            filter: brightness(1);
          }

          50% {
            transform: scale(1.04);
            filter: brightness(1.22);
          }
        }

        @media (max-width: 1200px) {
          .footer-cards-layout {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-card-row.is-active::before {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}