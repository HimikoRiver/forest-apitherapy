"use client";

import Image from "next/image";
import LuxuryButton from "@/components/home/shared/LuxuryButton";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const baseNavItems = [
  {
    id: "home",
    label: "Главная",
    href: "/",
    icon: "/images/footer/cardIcons/home.webp",
  },
  {
    id: "about",
    label: "О специалисте",
    href: "/about",
    icon: "/images/footer/cardIcons/about.webp",
  },
  {
    id: "services",
    label: "Услуги",
    href: "/services",
    icon: "/images/footer/cardIcons/services.webp",
  },
  {
    id: "products",
    label: "Пчелопродукты",
    href: "/products",
    icon: "/images/footer/cardIcons/beeProducts.webp",
  },
  {
    id: "education",
    label: "Обучение",
    href: "/training",
    icon: "/images/footer/cardIcons/education.webp",
  },
  {
    id: "contacts",
    label: "Контакты",
    href: "/contacts",
    icon: "/images/footer/cardIcons/contacts.webp",
  },
];

const goldItems = new Set(["about", "products", "contacts"]);

export default function MobileHeroMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = Boolean(session?.user);

  const isCabinetRoute =
    pathname === "/profile" || pathname.startsWith("/profile/");

  const navItems = useMemo(
    () => [
      ...baseNavItems,
      {
        id: "auth",
        label: isAuthenticated ? "Кабинет" : "Вход",
        href: isAuthenticated ? "/profile" : "/login",
        icon: isAuthenticated
          ? "/images/footer/cardIcons/cabinet.webp"
          : "/images/footer/cardIcons/exit.webp",
      },
    ],
    [isAuthenticated]
  );

  useEffect(() => {
    if (!isCabinetRoute || !isOpen) return;

    setIsOpen(false);
  }, [isCabinetRoute, isOpen]);

  useEffect(() => {
    if (!isOpen || isCabinetRoute) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCabinetRoute, isOpen]);

  const handleNavClick = (href) => {
    setIsOpen(false);

    window.requestAnimationFrame(() => {
      router.push(href);
    });
  };

  if (isCabinetRoute) {
    return null;
  }

  return (
    <div
      className={`mobile-hero-menu ${
        isOpen ? "mobile-hero-menu--open" : ""
      }`}
      aria-expanded={isOpen}
    >
      <LuxuryButton
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        className="mobile-hero-menu__button !min-h-0 !translate-y-0 !rounded-full !p-0"
        onClick={() => setIsOpen((current) => !current)}
        icon={
          <span className="mobile-hero-menu__morph" aria-hidden="true">
            <span className="mobile-hero-menu__morph-line mobile-hero-menu__morph-line--top" />
            <span className="mobile-hero-menu__morph-line mobile-hero-menu__morph-line--middle" />
            <span className="mobile-hero-menu__morph-line mobile-hero-menu__morph-line--bottom" />
          </span>
        }
      />

      {isOpen ? (
        <>
          <div
            className="mobile-hero-menu__backdrop"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          <nav className="mobile-hero-menu__panel" aria-label="Мобильное меню">
            <div className="mobile-hero-menu__panel-head">
              <span className="mobile-hero-menu__panel-title">menu</span>

              <div
                className="mobile-hero-menu__panel-divider"
                aria-hidden="true"
              >
                <span className="mobile-hero-menu__panel-line" />
                <span className="mobile-hero-menu__panel-dot" />
                <span className="mobile-hero-menu__panel-line" />
              </div>
            </div>

            <div className="mobile-hero-menu__list">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-hero-menu__link ${
                    goldItems.has(item.id)
                      ? "mobile-hero-menu__link--gold"
                      : ""
                  }`}
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="mobile-hero-menu__icon" aria-hidden="true">
                    <Image
                      src={item.icon}
                      alt=""
                      width={38}
                      height={38}
                      className="mobile-hero-menu__icon-image"
                    />
                  </span>

                  <span className="mobile-hero-menu__label">{item.label}</span>

                  <span className="mobile-hero-menu__arrow" aria-hidden="true">
                    ›
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </>
      ) : null}

      <style jsx>{`
        .mobile-hero-menu {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 80;
          display: block;
        }

        :global(.mobile-hero-menu__button) {
          pointer-events: auto;
          position: absolute;
          top: calc(env(safe-area-inset-top) + 12px);
          right: 12px;
          z-index: 84;
          display: grid;
          width: 58px;
          height: 58px;
          min-height: 58px;
          place-items: center;
          margin: 0;
          padding: 0;
          overflow: hidden;
          border-radius: 999px;
          opacity: 1;
          visibility: visible;
          transform: translate3d(0, 0, 0);
          transition:
            transform 260ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease;
        }

        :global(.mobile-hero-menu__button .luxury-button__base) {
          background: linear-gradient(
            180deg,
            #123512 0%,
            #081e08 56%,
            #041004 100%
          );
        }

        :global(.mobile-hero-menu__button .luxury-button__texture),
        :global(.mobile-hero-menu__button .luxury-button__velvet-light),
        :global(.mobile-hero-menu__button .luxury-button__gold-fill),
        :global(.mobile-hero-menu__button .luxury-button__shine),
        :global(.mobile-hero-menu__button .luxury-button__border) {
          border-radius: 999px;
        }

        :global(.mobile-hero-menu__button .luxury-button__texture) {
          background:
            linear-gradient(
              180deg,
              rgba(8, 30, 8, 0.04),
              rgba(0, 0, 0, 0.26)
            ),
            url("/textures/suede-green.webp");
          background-position: center;
          background-size: 190% auto;
          filter: saturate(0.88) contrast(1.08) brightness(0.72);
          opacity: 0.98;
        }

        :global(.mobile-hero-menu__button .luxury-button__velvet-light) {
          opacity: 0.22;
        }

        :global(.mobile-hero-menu__button .luxury-button__gold-fill) {
          opacity: 0;
          transform: translateX(-42%) skewX(-12deg);
          transition: none;
        }

        :global(.mobile-hero-menu__button .luxury-button__shine) {
          opacity: 0;
          animation: none;
        }

        :global(.mobile-hero-menu__button .luxury-button__content) {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 0;
        }

        :global(.mobile-hero-menu__button .luxury-button__icon) {
          display: grid;
          width: 30px;
          height: 24px;
          place-items: center;
          margin: 0;
          color: inherit;
          filter: none;
          animation: none;
        }

        :global(.mobile-hero-menu__button:hover) {
          border-color: rgba(190, 137, 52, 0.88);
          transform: translate3d(0, 0, 0);
          box-shadow:
            0 18px 58px rgba(0, 0, 0, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        :global(.mobile-hero-menu__button:hover .luxury-button__texture) {
          opacity: 0.98;
          filter: saturate(0.88) contrast(1.08) brightness(0.72);
        }

        :global(
          .mobile-hero-menu__button:hover .luxury-button__velvet-light
        ) {
          opacity: 0.22;
        }

        :global(.mobile-hero-menu__button:hover .luxury-button__gold-fill) {
          opacity: 0;
          transform: translateX(-42%) skewX(-12deg);
        }

        :global(.mobile-hero-menu__button:hover .luxury-button__shine) {
          opacity: 0;
          animation: none;
        }

        :global(.mobile-hero-menu__button:hover .luxury-button__icon) {
          color: inherit;
          filter: none;
          animation: none;
        }

        :global(.mobile-hero-menu__button:active) {
          transform: scale(0.96);
        }

        .mobile-hero-menu--open :global(.mobile-hero-menu__button) {
          border-color: rgba(255, 232, 170, 0.98);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.46),
            0 0 22px rgba(240, 195, 101, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .mobile-hero-menu--open :global(.mobile-hero-menu__button:hover) {
          border-color: rgba(255, 232, 170, 0.98);
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.46),
            0 0 22px rgba(240, 195, 101, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .mobile-hero-menu__morph {
          position: relative;
          z-index: 2;
          display: block;
          width: 30px;
          height: 24px;
        }

        .mobile-hero-menu__morph-line {
          position: absolute;
          left: 50%;
          top: 50%;
          display: block;
          width: 27px;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #8a5d20 0%,
            #d8b66a 24%,
            #fff2c3 50%,
            #c18a32 74%,
            #f4d88f 100%
          );
          background-size: 190% 100%;
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.34),
            0 0 8px rgba(216, 182, 106, 0.24);
          transform-origin: center;
          transition:
            transform 520ms cubic-bezier(0.22, 1.2, 0.36, 1),
            opacity 260ms ease,
            width 420ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 320ms ease;
          animation:
            mobileHeroMenuGoldSoftShift 3.8s ease-in-out infinite alternate,
            mobileHeroMenuLineGlow 3.2s ease-in-out infinite;
        }

        .mobile-hero-menu__morph-line--top {
          transform: translate(-50%, -10px) rotate(0deg) scaleX(1);
        }

        .mobile-hero-menu__morph-line--middle {
          width: 23px;
          opacity: 1;
          transform: translate(-50%, -50%) rotate(0deg) scaleX(1);
        }

        .mobile-hero-menu__morph-line--bottom {
          transform: translate(-50%, 7px) rotate(0deg) scaleX(1);
        }

        .mobile-hero-menu--open .mobile-hero-menu__morph-line {
          width: 31px;
          filter: brightness(1.12);
        }

        .mobile-hero-menu--open .mobile-hero-menu__morph-line--top {
          transform: translate(-50%, -50%) rotate(45deg) scaleX(1.04);
        }

        .mobile-hero-menu--open .mobile-hero-menu__morph-line--middle {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(0deg) scaleX(0.08);
        }

        .mobile-hero-menu--open .mobile-hero-menu__morph-line--bottom {
          transform: translate(-50%, -50%) rotate(-45deg) scaleX(1.04);
        }

        .mobile-hero-menu__backdrop {
          pointer-events: auto;
          position: absolute;
          inset: 0;
          z-index: 81;
          background: rgba(2, 13, 10, 0.38);
          -webkit-backdrop-filter: blur(12px) saturate(0.82);
          backdrop-filter: blur(12px) saturate(0.82);
          opacity: 1;
          animation: mobileHeroMenuBackdropIn 220ms ease both;
        }

        .mobile-hero-menu__panel {
          pointer-events: auto;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 83;
          display: flex;
          width: 100%;
          overflow: hidden;
          flex-direction: column;
          border: 0;
          border-radius: 0 0 30px 30px;
          background-color: #081e08;
          background-image:
            linear-gradient(
              180deg,
              rgba(8, 30, 8, 0.94),
              rgba(8, 30, 8, 0.985)
            ),
            url("/textures/suede-green.webp");
          background-position: center;
          background-size: auto, 260px 260px;
          box-shadow:
            0 18px 34px rgba(0, 0, 0, 0.42),
            inset 0 0 0 1px rgba(255, 235, 180, 0.1),
            0 0 22px rgba(216, 182, 106, 0.1);
          transform-origin: top center;
          animation: mobileHeroMenuPanelIn 260ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .mobile-hero-menu__panel::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(
            135deg,
            #7b4d16 0%,
            #b9822d 16%,
            #f6d991 34%,
            #fff4c8 50%,
            #d8b66a 66%,
            #8a5d20 100%
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.82;
          filter: drop-shadow(0 0 5px rgba(216, 182, 106, 0.2));
          animation: mobileHeroMenuGoldBreath 4.8s ease-in-out infinite;
        }

        .mobile-hero-menu__panel-head {
          position: relative;
          z-index: 1;
          display: flex;
          height: calc(env(safe-area-inset-top) + 96px);
          min-height: 96px;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          padding-bottom: 11px;
          border-bottom: 1px solid rgba(216, 182, 106, 0.26);
          background: rgba(0, 0, 0, 0.12);
        }

        .mobile-hero-menu__panel-title {
          display: block;
          padding-left: 0.28em;
          background: linear-gradient(
            90deg,
            #8a5d20 0%,
            #d8b66a 25%,
            #fff2c3 50%,
            #c18a32 75%,
            #f4d88f 100%
          );
          background-size: 180% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.28em;
          text-transform: lowercase;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 7px rgba(216, 182, 106, 0.2));
          transform: translateY(-8px);
          animation: mobileHeroMenuGoldSoftShift 5.4s ease-in-out infinite
            alternate;
        }

        .mobile-hero-menu__panel-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .mobile-hero-menu__panel-line {
          display: block;
          width: 48px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(216, 182, 106, 0.78),
            transparent
          );
        }

        .mobile-hero-menu__panel-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #d8b66a;
          box-shadow:
            0 0 10px rgba(216, 182, 106, 0.44),
            0 0 18px rgba(216, 182, 106, 0.22);
        }

        .mobile-hero-menu__list {
          position: relative;
          z-index: 1;
          display: flex;
          width: 100%;
          flex-direction: column;
        }

        .mobile-hero-menu__link {
          display: grid;
          min-height: 56px;
          width: 100%;
          grid-template-columns: 46px minmax(0, 1fr) 42px;
          align-items: center;
          margin: 0;
          padding: 0 18px;
          border: 0;
          border-bottom: 1px solid rgba(216, 182, 106, 0.24);
          background: transparent;
          color: #f3efe5;
          font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
          font-size: 0.98rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.035em;
          text-align: left;
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.36),
            0 0 8px rgba(216, 182, 106, 0.08);
          cursor: pointer;
        }

        .mobile-hero-menu__link:last-child {
          border-bottom: 0;
        }

        .mobile-hero-menu__icon {
          position: relative;
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          justify-self: start;
          transform: translateY(-1px);
        }

        .mobile-hero-menu__icon-image {
          display: block;
          width: 38px;
          height: 38px;
          object-fit: contain;
          filter:
            drop-shadow(0 0 6px rgba(216, 182, 106, 0.26))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.22));
        }

        .mobile-hero-menu__label {
          justify-self: start;
          text-align: left;
          white-space: nowrap;
        }

        .mobile-hero-menu__link--gold {
          color: #e1bc63;
        }

        .mobile-hero-menu__link--gold .mobile-hero-menu__label {
          background: linear-gradient(
            90deg,
            #8a5d20 0%,
            #d8b66a 28%,
            #fff2c3 50%,
            #c18a32 72%,
            #f4d88f 100%
          );
          background-size: 180% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 0 6px rgba(216, 182, 106, 0.18))
            drop-shadow(0 1px 2px rgba(0, 0, 0, 0.22));
          animation: mobileHeroMenuGoldSoftShift 5.4s ease-in-out infinite
            alternate;
        }

        .mobile-hero-menu__arrow {
          justify-self: end;
          color: #d8b66a;
          font-size: 1.9rem;
          font-weight: 400;
          line-height: 1;
          text-shadow:
            0 0 8px rgba(216, 182, 106, 0.26),
            0 1px 2px rgba(0, 0, 0, 0.24);
          transform: translateY(-1px);
        }

        @media (min-width: 768px) and (max-width: 1279px) {
          :global(.mobile-hero-menu__button) {
            top: calc(env(safe-area-inset-top) + 24px);
            right: 28px;
            width: 82px;
            height: 82px;
            min-height: 82px;
            box-shadow:
              0 16px 38px rgba(0, 0, 0, 0.44),
              0 0 26px rgba(240, 195, 101, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
          }

          :global(.mobile-hero-menu__button:hover) {
            border-color: rgba(190, 137, 52, 0.88);
            transform: translate3d(0, 0, 0);
            box-shadow:
              0 16px 38px rgba(0, 0, 0, 0.44),
              0 0 26px rgba(240, 195, 101, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
          }

          :global(.mobile-hero-menu__button .luxury-button__icon) {
            width: 42px;
            height: 34px;
          }

          .mobile-hero-menu__morph {
            width: 42px;
            height: 34px;
          }

          .mobile-hero-menu__morph-line {
            width: 38px;
            height: 4px;
          }

          .mobile-hero-menu__morph-line--top {
            transform: translate(-50%, -13px) rotate(0deg) scaleX(1);
          }

          .mobile-hero-menu__morph-line--middle {
            width: 32px;
          }

          .mobile-hero-menu__morph-line--bottom {
            transform: translate(-50%, 9px) rotate(0deg) scaleX(1);
          }

          .mobile-hero-menu--open .mobile-hero-menu__morph-line {
            width: 44px;
          }

          .mobile-hero-menu__panel {
            border-radius: 0 0 46px 46px;
          }

          .mobile-hero-menu__panel::before {
            padding: 2px;
          }

          .mobile-hero-menu__panel-head {
            height: calc(env(safe-area-inset-top) + 152px);
            min-height: 152px;
            gap: 13px;
            padding-bottom: 18px;
          }

          .mobile-hero-menu__panel-title {
            font-size: 1.75rem;
            font-weight: 600;
            letter-spacing: 0.32em;
            transform: translateY(-14px);
          }

          .mobile-hero-menu__panel-divider {
            gap: 18px;
          }

          .mobile-hero-menu__panel-line {
            width: 92px;
          }

          .mobile-hero-menu__panel-dot {
            width: 9px;
            height: 9px;
          }

          .mobile-hero-menu__link {
            min-height: 82px;
            grid-template-columns: 76px minmax(0, 1fr) 68px;
            padding: 0 42px;
            font-size: 1.3rem;
            letter-spacing: -0.045em;
          }

          .mobile-hero-menu__icon {
            width: 58px;
            height: 58px;
          }

          .mobile-hero-menu__icon-image {
            width: 54px;
            height: 54px;
          }

          .mobile-hero-menu__arrow {
            font-size: 2.55rem;
          }
        }

        @keyframes mobileHeroMenuPanelIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobileHeroMenuBackdropIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes mobileHeroMenuGoldBreath {
          0%,
          100% {
            opacity: 0.72;
            filter: drop-shadow(0 0 4px rgba(216, 182, 106, 0.18));
          }

          50% {
            opacity: 0.96;
            filter:
              drop-shadow(0 0 7px rgba(216, 182, 106, 0.34))
              drop-shadow(0 0 14px rgba(244, 216, 143, 0.14));
          }
        }

        @keyframes mobileHeroMenuGoldSoftShift {
          0% {
            background-position: 38% 50%;
          }

          100% {
            background-position: 62% 50%;
          }
        }

        @keyframes mobileHeroMenuLineGlow {
          0%,
          100% {
            box-shadow:
              0 1px 3px rgba(0, 0, 0, 0.34),
              0 0 6px rgba(216, 182, 106, 0.18);
            filter: brightness(0.95);
          }

          50% {
            box-shadow:
              0 1px 3px rgba(0, 0, 0, 0.34),
              0 0 12px rgba(244, 216, 143, 0.48),
              0 0 20px rgba(216, 182, 106, 0.18);
            filter: brightness(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.mobile-hero-menu__button .luxury-button__border),
          :global(.mobile-hero-menu__button .luxury-button__gold-fill),
          .mobile-hero-menu__panel::before,
          .mobile-hero-menu__panel-title,
          .mobile-hero-menu__morph-line,
          .mobile-hero-menu__link--gold .mobile-hero-menu__label {
            animation: none;
            transition: none;
          }
        }

        @media (min-width: 1280px) {
          .mobile-hero-menu {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}