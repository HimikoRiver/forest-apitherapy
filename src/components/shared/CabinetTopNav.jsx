"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  LayoutGrid,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  UserRound,
} from "lucide-react";

const baseLinks = [
  {
    href: "/products",
    label: "Каталог",
    icon: LayoutGrid,
  },
  {
    href: "/cart",
    label: "Корзина",
    icon: ShoppingCart,
  },
  {
    href: "/profile",
    label: "Профиль",
    icon: UserRound,
  },
];

const adminLinks = [
  {
    href: "/admin",
    label: "Панель",
    icon: ShieldCheck,
  },
  {
    href: "/admin/products",
    label: "Товары",
    icon: PackageCheck,
  },
  {
    href: "/admin/orders",
    label: "Заказы",
    icon: ClipboardList,
  },
];

function isActiveLink(pathname, href) {
  if (href === "/products") {
    return pathname === "/products" || pathname.startsWith("/products/");
  }

  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, label, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] transition duration-300 ${
        active
          ? "border-[#d8b66a]/64 bg-[#d8b66a] text-[#07110f] shadow-[0_14px_34px_rgba(216,182,106,0.16)]"
          : "border-[#d8b66a]/24 bg-[#030b0c] text-[#d8b66a] hover:-translate-y-0.5 hover:border-[#d8b66a]/60 hover:bg-[#071b18] hover:text-[#f3d98d] hover:shadow-[0_12px_34px_rgba(216,182,106,0.12)]"
      }`}
    >
      <Icon className="size-4 shrink-0 transition duration-300 group-hover:scale-110" />
      {label}
    </Link>
  );
}

export default function CabinetTopNav({ showAdminLinks = false }) {
  const pathname = usePathname();
  const links = showAdminLinks ? [...baseLinks, ...adminLinks] : baseLinks;

  return (
    <nav className="relative z-20 mx-auto mb-5 w-full max-w-7xl">
      <div className="hidden items-center justify-between gap-4 rounded-[28px] border border-[#d8b66a]/16 bg-[#030b0c] px-4 py-3 shadow-[0_18px_54px_rgba(0,0,0,0.34)] lg:flex">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-[#d8b66a]/16 bg-[#071b18] px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a]">
          <LayoutDashboard className="size-4" />
          Навигация
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {links.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              active={isActiveLink(pathname, link.href)}
            />
          ))}
        </div>
      </div>

      <details className="group rounded-[26px] border border-[#d8b66a]/16 bg-[#030b0c] shadow-[0_18px_54px_rgba(0,0,0,0.34)] lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#d8b66a] [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            <LayoutDashboard className="size-4" />
            Меню
          </span>

          <ChevronDown className="size-4 transition duration-300 group-open:rotate-180" />
        </summary>

        <div className="grid gap-2 border-t border-[#d8b66a]/12 px-4 pb-4 pt-3 sm:grid-cols-2">
          {links.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              active={isActiveLink(pathname, link.href)}
            />
          ))}
        </div>
      </details>
    </nav>
  );
}