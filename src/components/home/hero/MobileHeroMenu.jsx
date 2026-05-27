"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  {
    id: "home",
    label: "Главная",
    href: "/",
    icon: "/images/footer/cardIcons/home.webp",
  },
  {
    id: "about",
    label: "О специалисте",
    href: "/specialist",
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  const handleNavClick = (href) => {
    setIsOpen(false);

    window.requestAnimationFrame(() => {
      router.push(href);
    });
  };

  return (
    <div
      className={`mobile-hero-menu ${isOpen ? "mobile-hero-menu--open" : ""}`}
      aria-expanded={isOpen}
    >
      <button
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        className="mobile-hero-menu__button"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="mobile-hero-menu__morph" aria-hidden="true">
          <span className="mobile-hero-menu__morph-line mobile-hero-menu__morph-line--top" />
          <span className="mobile-hero-menu__morph-line mobile-hero-menu__morph-line--middle" />
          <span className="mobile-hero-menu__morph-line mobile-hero-menu__morph-line--bottom" />
        </span>
      </button>

      {isOpen ? (
        <>
          <div
            className="mobile-hero-menu__backdrop"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          <nav className="mobile-hero-menu__panel" aria-label="Мобильное меню">
            <div className="mobile-hero-menu__panel-head">
              <span className="mobile-hero-menu__panel-line" />
              <span className="mobile-hero-menu__panel-dot" />
              <span className="mobile-hero-menu__panel-line" />
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

        .mobile-hero-menu__button {
          pointer-events: auto;
          position: absolute;
          top: calc(env(safe-area-inset-top) + 12px);
          right: 12px;
          z-index: 84;
          display: grid;
          width: 58px;
          height: 58px;
          place-items: center;
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: 999px;
          cursor: pointer;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 28%,
              rgba(255, 235, 170, 0.18),
              rgba(8, 62, 43, 0.96) 54%,
              rgba(2, 22, 17, 0.98) 100%
            ),
            url("/textures/suede-green.webp");
          background-size: cover;
          box-shadow:
            0 10px 22px rgba(0, 0, 0, 0.38),
            inset 0 0 16px rgba(216, 182, 106, 0.12),
            0 0 16px rgba(216, 182, 106, 0.24);
          transform: translate3d(0, 0, 0);
          opacity: 1;
          visibility: visible;
          transition:
            transform 260ms ease,
            box-shadow 260ms ease;
        }

        .mobile-hero-menu__button::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(
            135deg,
            #7a4d17 0%,
            #d8b66a 22%,
            #fff3c4 48%,
            #b87928 70%,
            #f4d88f 100%
          );
          background-size: 180% 180%;
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: mobileHeroMenuButtonGoldBreath 3.2s ease-in-out infinite;
        }

        .mobile-hero-menu__button::after {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 8px;
          z-index: 1;
          border-radius: inherit;
          background: radial-gradient(
            circle at 50% 35%,
            rgba(244, 216, 143, 0.18),
            transparent 62%
          );
          opacity: 0.42;
          animation: mobileHeroMenuButtonInnerGlow 3.2s ease-in-out infinite;
        }

        .mobile-hero-menu__button:active {
          transform: scale(0.96);
        }

        .mobile-hero-menu--open .mobile-hero-menu__button {
          box-shadow:
            0 12px 26px rgba(0, 0, 0, 0.42),
            inset 0 0 18px rgba(216, 182, 106, 0.14),
            0 0 24px rgba(216, 182, 106, 0.32);
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
          transform: translate(-50%, -50%) rotate(0deg) scaleX(1);
          opacity: 1;
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
          transform: translate(-50%, -50%) rotate(0deg) scaleX(0.08);
          opacity: 0;
        }

        .mobile-hero-menu--open .mobile-hero-menu__morph-line--bottom {
          transform: translate(-50%, -50%) rotate(-45deg) scaleX(1.04);
        }

        .mobile-hero-menu__backdrop {
          pointer-events: auto;
          position: absolute;
          inset: 0;
          z-index: 81;
          background: rgba(2, 13, 10, 0.22);
          opacity: 1;
          animation: mobileHeroMenuBackdropIn 180ms ease both;
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
          border: 0;
          border-radius: 0 0 30px 30px;
          background:
            linear-gradient(
              180deg,
              rgba(5, 48, 36, 0.97),
              rgba(2, 24, 19, 0.985)
            ),
            url("/textures/suede-green.webp");
          background-size: auto, 260px 260px;
          box-shadow:
            0 18px 34px rgba(0, 0, 0, 0.42),
            inset 0 0 0 1px rgba(255, 235, 180, 0.1),
            0 0 22px rgba(216, 182, 106, 0.1);
          flex-direction: column;
          transform-origin: top center;
          animation: mobileHeroMenuPanelIn 260ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
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
          height: calc(env(safe-area-inset-top) + 74px);
          min-height: 74px;
          align-items: flex-end;
          justify-content: center;
          gap: 10px;
          padding-bottom: 13px;
          border-bottom: 1px solid rgba(216, 182, 106, 0.26);
          background: rgba(1, 15, 12, 0.08);
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
          flex-direction: column;
          width: 100%;
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

        @keyframes mobileHeroMenuButtonGoldBreath {
          0%,
          100% {
            opacity: 0.74;
            background-position: 42% 50%;
            filter:
              drop-shadow(0 0 3px rgba(216, 182, 106, 0.18))
              brightness(0.96);
          }

          50% {
            opacity: 1;
            background-position: 58% 50%;
            filter:
              drop-shadow(0 0 8px rgba(244, 216, 143, 0.42))
              drop-shadow(0 0 16px rgba(216, 182, 106, 0.2))
              brightness(1.08);
          }
        }

        @keyframes mobileHeroMenuButtonInnerGlow {
          0%,
          100% {
            opacity: 0.26;
            transform: scale(0.92);
          }

          50% {
            opacity: 0.56;
            transform: scale(1.04);
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
          .mobile-hero-menu__button::before,
          .mobile-hero-menu__button::after,
          .mobile-hero-menu__panel::before,
          .mobile-hero-menu__morph-line,
          .mobile-hero-menu__link--gold .mobile-hero-menu__label {
            animation: none;
          }
        }

        @media (min-width: 768px) {
          .mobile-hero-menu {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}