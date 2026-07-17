"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { authClient } from "@/lib/auth-client";
import HeroMenuOverlay from "./HeroMenuOverlay";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { useFooterFade } from "./useFooterFade";

const HIVE_CLOSED_SRC = "/images/hero/hive11.webp";
const HIVE_OPEN_SRC = "/images/hero/hiveOpen2.webp";
const TEXTURE_PATH = "/textures/suede-green.webp";

const subscribeToClientReady = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const baseMenuItems = [
  { id: "home", label: "Главная", href: "/", top: "39.3%", isArc: true },
  {
    id: "about",
    label: "О специалисте",
    href: "/about",
    top: "45.3%",
    isArc: true,
  },
  { id: "services", label: "Услуги", href: "/services", top: "50.7%" },
  {
    id: "products",
    label: "Пчелопродукты",
    href: "/products",
    top: "57.9%",
  },
  { id: "training", label: "Обучение", href: "/training", top: "65%" },
  { id: "contacts", label: "Контакты", href: "/contacts", top: "70.8%" },
];

function MenuDockToggleButton({ isVisible, isDisabled, onClick }) {
  return (
    <button
      type="button"
      aria-label={isVisible ? "Скрыть меню" : "Показать меню"}
      aria-expanded={isVisible}
      onClick={onClick}
      disabled={isDisabled}
      className={`group pointer-events-auto absolute right-[-44px] top-1/2 z-[1004] h-[88px] w-[88px] -translate-y-1/2 rounded-full border border-[#d8b66a]/80 shadow-[0_12px_34px_rgba(0,0,0,0.45)] transition-[right,opacity,transform] duration-500 hover:right-[-38px] ${
        isDisabled
          ? "pointer-events-none translate-x-3 opacity-0"
          : "translate-x-0 opacity-100"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-[#063829]" />

      <span
        className="absolute inset-[3px] rounded-full opacity-95"
        style={{
          backgroundImage: `url(${TEXTURE_PATH})`,
          backgroundSize: "220% auto",
          backgroundPosition: "center",
          filter: "saturate(1.15) contrast(1.08) brightness(0.78)",
        }}
      />

      <span className="absolute inset-0 rounded-full border border-[#f0c76d]/75 shadow-[inset_0_0_14px_rgba(255,232,170,0.16),0_0_10px_rgba(216,182,106,0.18)] transition duration-500 group-hover:border-[#fff0b9]" />

      <span className="absolute left-[13px] top-1/2 flex -translate-y-1/2 items-center justify-center drop-shadow-[0_0_9px_rgba(240,199,109,0.36)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className={`h-7 w-7 transition duration-500 ${
            isVisible ? "rotate-0" : "rotate-180"
          }`}
          fill="none"
        >
          <defs>
            <linearGradient
              id="hero-menu-dock-toggle-arrow-gold"
              x1="0"
              y1="0"
              x2="32"
              y2="0"
              gradientUnits="userSpaceOnUse"
              spreadMethod="repeat"
            >
              <stop offset="0%" stopColor="#7e551d" />
              <stop offset="18%" stopColor="#c28b37" />
              <stop offset="34%" stopColor="#fff2c7" />
              <stop offset="50%" stopColor="#aa6d25" />
              <stop offset="68%" stopColor="#f4d88f" />
              <stop offset="100%" stopColor="#7e551d" />

              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="0 0"
                to="32 0"
                dur="2.8s"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          <path
            d="M12 7 21 16l-9 9"
            stroke="url(#hero-menu-dock-toggle-arrow-gold)"
            strokeWidth="2.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export default function HeroMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const isAuthenticated = Boolean(session?.user);

  const isClientReady = useSyncExternalStore(
    subscribeToClientReady,
    getClientSnapshot,
    getServerSnapshot
  );

  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDockVisible, setIsDockVisible] = useState(true);
  const [hasDockInteracted, setHasDockInteracted] = useState(false);

  const { footerFadeProgress, footerFadeOpacity, menuHiddenByFooter } =
    useFooterFade(isClientReady && isDesktopViewport);

  const renderedItems = useMemo(
    () => [
      ...baseMenuItems,
      {
        id: "auth",
        label: isAuthenticated ? "Кабинет" : "Вход",
        href: isAuthenticated ? "/profile" : "/login",
        top: "77%",
      },
    ],
    [isAuthenticated]
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useBodyScrollLock(isOpen && isDockVisible, closeMenu);

  useEffect(() => {
    if (!isClientReady) return;

    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const updateViewportState = () => {
      const nextIsDesktop = mediaQuery.matches;

      setIsDesktopViewport(nextIsDesktop);

      if (!nextIsDesktop) {
        closeMenu();
      }
    };

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => {
      mediaQuery.removeEventListener("change", updateViewportState);
    };
  }, [closeMenu, isClientReady]);

  useEffect(() => {
    if (!isOpen || footerFadeProgress < 0.18) return;

    const closeFrameId = window.requestAnimationFrame(() => {
      closeMenu();
    });

    return () => {
      window.cancelAnimationFrame(closeFrameId);
    };
  }, [closeMenu, footerFadeProgress, isOpen]);

  const handleOpen = useCallback(() => {
    if (menuHiddenByFooter || !isDockVisible) return;

    setIsOpen(true);
  }, [isDockVisible, menuHiddenByFooter]);

  const handleToggleDock = useCallback(() => {
    if (isDockVisible) {
      closeMenu();
    }

    setHasDockInteracted(true);
    setIsDockVisible((current) => !current);
  }, [closeMenu, isDockVisible]);

  const handleNavClick = useCallback(
    (href) => {
      closeMenu();

      if (href === "/") {
        if (pathname === "/") {
          const homeTarget = document.getElementById("home");

          if (homeTarget) {
            homeTarget.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            window.history.replaceState(null, "", "/");
            return;
          }

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          window.history.replaceState(null, "", "/");
          return;
        }

        router.push("/");
        return;
      }

      if (href.startsWith("/#")) {
        const id = href.replace("/#", "");

        if (pathname === "/") {
          const target = document.getElementById(id);

          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            window.history.replaceState(null, "", href);
            return;
          }
        }

        router.push(href);
        return;
      }

      router.push(href);
    },
    [closeMenu, pathname, router]
  );

  if (!isClientReady || !isDesktopViewport) {
    return null;
  }

  const menu = (
    <>
      <HeroMenuOverlay
        isOpen={isOpen && isDockVisible}
        onClose={closeMenu}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[999]"
        style={{
          opacity: footerFadeOpacity,
          transform: `translate3d(0, ${footerFadeProgress * -22}px, 0)`,
          transition:
            "opacity 320ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <MenuDockToggleButton
          isVisible={isDockVisible}
          isDisabled={menuHiddenByFooter}
          onClick={handleToggleDock}
        />

        <div
          className={`hero-menu-dock pointer-events-none absolute inset-0 ${
            isDockVisible
              ? hasDockInteracted
                ? "hero-menu-dock--open"
                : ""
              : "hero-menu-dock--closed"
          }`}
        >
          <div
            className={`absolute right-[-45px] top-[70px] z-[1002] h-[310px] w-[280px] transition duration-300 ${
              isOpen ? "pointer-events-none opacity-0" : "opacity-100"
            } ${
              menuHiddenByFooter || !isDockVisible
                ? "pointer-events-none"
                : ""
            }`}
          >
            <button
              type="button"
              aria-label="Открыть меню"
              onClick={handleOpen}
              disabled={menuHiddenByFooter || !isDockVisible}
              className="hero-hive-hitbox absolute left-[42px] top-[105px] z-[5] h-[210px] w-[210px] border-0 bg-transparent p-0"
            />

            <span className="hero-hive-preview pointer-events-none absolute inset-0 block h-full w-full">
              <Image
                src={HIVE_CLOSED_SRC}
                alt=""
                fill
                priority
                sizes="250px"
                className="pointer-events-none select-none object-cover object-left drop-shadow-[0_18px_34px_rgba(0,0,0,0.34)] transition duration-300"
              />

              <span className="absolute left-[47%] top-[55.5%] z-[2] flex w-[112px] -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
                <span className="hero-hive-menu-text">menu</span>
              </span>
            </span>
          </div>

          <div
            className={`pointer-events-auto absolute right-[-8px] top-[-16px] z-[1003] h-[760px] w-[490px] origin-top-right transition duration-500 ${
              isOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none translate-y-6 scale-[0.94] opacity-0"
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={HIVE_OPEN_SRC}
                alt=""
                fill
                priority
                sizes="490px"
                className="pointer-events-none select-none object-contain drop-shadow-[0_20px_42px_rgba(0,0,0,0.34)]"
              />

              <div className="hero-hive-falling-spark" aria-hidden="true" />

              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={closeMenu}
                className="hero-hive-close-button absolute left-[48%] top-[25.8%] z-[5] flex h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-0 bg-transparent"
              >
                <span className="hero-hive-close-bg" />

                <svg
                  className="hero-hive-close-svg"
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="heroHiveCloseGold"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8f5f18" />
                      <stop offset="22%" stopColor="#d9a33b" />
                      <stop offset="45%" stopColor="#fff0ae" />
                      <stop offset="68%" stopColor="#c98924" />
                      <stop offset="100%" stopColor="#7d4d12" />
                    </linearGradient>
                  </defs>

                  <g className="hero-hive-close-cross">
                    <path
                      d="M18 18 C25 27 39 37 46 46"
                      fill="none"
                      stroke="url(#heroHiveCloseGold)"
                      strokeWidth="4.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M46 18 C37 25 27 39 18 46"
                      fill="none"
                      stroke="url(#heroHiveCloseGold)"
                      strokeWidth="4.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M18 18 C14 15 12 12 12 8"
                      fill="none"
                      stroke="url(#heroHiveCloseGold)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M46 18 C50 15 52 12 52 8"
                      fill="none"
                      stroke="url(#heroHiveCloseGold)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M46 46 C50 49 52 52 52 56"
                      fill="none"
                      stroke="url(#heroHiveCloseGold)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M18 46 C14 49 12 52 12 56"
                      fill="none"
                      stroke="url(#heroHiveCloseGold)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </button>

              <nav
                className="absolute inset-0 z-[3]"
                aria-label="Главное меню"
              >
                {renderedItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className="hero-hive-text-button absolute left-1/2 flex h-[42px] w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-0 bg-transparent"
                    style={{ top: item.top }}
                  >
                    {item.isArc ? (
                      <svg
                        className="hero-hive-arc-svg"
                        viewBox="0 0 300 48"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id={`heroHiveTextGold-${item.id}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#8f6420" />
                            <stop offset="14%" stopColor="#d6a33c" />
                            <stop offset="32%" stopColor="#fff1b5" />
                            <stop offset="50%" stopColor="#d19b39" />
                            <stop offset="68%" stopColor="#fff7cf" />
                            <stop offset="84%" stopColor="#bd8228" />
                            <stop offset="100%" stopColor="#8f6420" />
                          </linearGradient>

                          <path
                            id={`heroHiveArcPath-${item.id}`}
                            d="M34 29 Q150 24.5 266 29"
                          />
                        </defs>

                        <text
                          className="hero-hive-arc-text"
                          fill={`url(#heroHiveTextGold-${item.id})`}
                        >
                          <textPath
                            href={`#heroHiveArcPath-${item.id}`}
                            startOffset="50%"
                            textAnchor="middle"
                          >
                            {item.label}
                          </textPath>
                        </text>
                      </svg>
                    ) : (
                      <span className="hero-hive-strip-text">
                        {item.label}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-menu-dock {
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        .hero-menu-dock--open {
          animation: heroMenuDockBrakeIn 920ms
            cubic-bezier(0.18, 0.95, 0.2, 1) both;
        }

        .hero-menu-dock--closed {
          animation: heroMenuDockSlideOut 620ms
            cubic-bezier(0.76, 0, 0.24, 1) both;
        }

        .hero-hive-hitbox {
          cursor: pointer;
          pointer-events: auto;
          clip-path: ellipse(50% 49% at 50% 52%);
        }

        .hero-hive-hitbox:disabled {
          cursor: default;
          pointer-events: none;
        }

        .hero-hive-preview {
          transform-origin: 62% 10%;
        }

        .hero-hive-hitbox:hover + .hero-hive-preview {
          animation: heroHiveSingleShake 620ms ease-in-out 1;
        }

        .hero-hive-hitbox:hover + .hero-hive-preview :global(img) {
          filter: brightness(1.07)
            drop-shadow(0 24px 44px rgba(0, 0, 0, 0.42));
        }

        .hero-hive-falling-spark {
          position: absolute;
          left: 24.9%;
          top: 79.1%;
          z-index: 4;
          width: 4px;
          height: 4px;
          pointer-events: none;
          border-radius: 999px;
          background: #fff8d8;
          box-shadow:
            0 0 4px rgba(255, 248, 216, 0.98),
            0 0 8px rgba(255, 220, 120, 0.72),
            0 0 14px rgba(232, 164, 44, 0.42);
          opacity: 0;
          transform: translate3d(0, -6px, 0) scale(1);
          animation: heroHiveSparkFall 3s linear infinite;
        }

        .hero-hive-falling-spark::before,
        .hero-hive-falling-spark::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: #fffefa;
          transform: translate(-50%, -50%);
          opacity: 0.95;
          box-shadow:
            0 0 5px rgba(255, 250, 210, 0.9),
            0 0 9px rgba(255, 210, 90, 0.5);
        }

        .hero-hive-falling-spark::after {
          transform: translate(-50%, -50%) rotate(45deg);
          opacity: 0.7;
        }

        .hero-hive-close-button {
          cursor: pointer;
          filter:
            drop-shadow(0 0 6px rgba(222, 174, 72, 0.32))
            drop-shadow(0 0 14px rgba(222, 174, 72, 0.14));
        }

        .hero-hive-close-bg {
          position: absolute;
          inset: 1px;
          z-index: 0;
          border: 1px solid rgba(222, 174, 72, 0.68);
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 35% 22%,
              rgba(255, 237, 170, 0.18),
              transparent 42%
            ),
            linear-gradient(
              180deg,
              rgba(4, 54, 39, 0.9),
              rgba(1, 26, 19, 0.96)
            );
          box-shadow:
            inset 0 0 0 1px rgba(255, 235, 172, 0.08),
            inset 0 -8px 14px rgba(0, 0, 0, 0.26),
            0 0 18px rgba(216, 170, 73, 0.18);
          transition:
            transform 260ms ease,
            border-color 260ms ease,
            box-shadow 260ms ease;
        }

        .hero-hive-close-button:hover .hero-hive-close-bg {
          transform: scale(1.07);
          border-color: rgba(255, 224, 137, 0.92);
          box-shadow:
            inset 0 0 0 1px rgba(255, 235, 172, 0.14),
            inset 0 -8px 14px rgba(0, 0, 0, 0.22),
            0 0 26px rgba(216, 170, 73, 0.32);
        }

        .hero-hive-close-svg {
          position: relative;
          z-index: 1;
          display: block;
          width: 28px;
          height: 28px;
          overflow: visible;
        }

        .hero-hive-close-cross {
          transform-box: fill-box;
          transform-origin: center;
          transition: filter 260ms ease;
        }

        .hero-hive-close-button:hover .hero-hive-close-cross {
          animation: heroHiveCloseFan 720ms
            cubic-bezier(0.2, 0.95, 0.34, 1) 1;
          filter:
            drop-shadow(0 0 7px rgba(255, 229, 145, 0.72))
            drop-shadow(0 0 16px rgba(214, 167, 70, 0.4));
        }

        .hero-hive-text-button {
          cursor: pointer;
        }

        .hero-hive-text-button:hover .hero-hive-strip-text,
        .hero-hive-text-button:hover .hero-hive-arc-text {
          filter:
            drop-shadow(0 0 8px rgba(255, 229, 145, 0.62))
            drop-shadow(0 0 18px rgba(214, 167, 70, 0.36));
        }

        .hero-hive-menu-text,
        .hero-hive-strip-text {
          display: inline-block;
          font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.03em;
          background-image: linear-gradient(
            90deg,
            #8f6420 0%,
            #d6a33c 14%,
            #fff1b5 32%,
            #d19b39 50%,
            #fff7cf 68%,
            #bd8228 84%,
            #8f6420 100%
          );
          background-size: 240% 100%;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          white-space: nowrap;
          filter: drop-shadow(0 0 6px rgba(223, 174, 72, 0.42));
          animation:
            heroHiveGoldShimmer 4.8s ease-in-out infinite,
            heroHiveGoldGlow 2.6s ease-in-out infinite;
        }

        .hero-hive-menu-text {
          font-size: 25px;
        }

        .hero-hive-strip-text {
          font-size: 22px;
        }

        .hero-hive-arc-svg {
          display: block;
          width: 300px;
          height: 48px;
          overflow: visible;
          pointer-events: none;
        }

        .hero-hive-arc-text {
          font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
          font-size: 22px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.03em;
          filter: drop-shadow(0 0 6px rgba(223, 174, 72, 0.42));
          transition: filter 260ms ease;
        }

        @keyframes heroMenuDockBrakeIn {
          0% {
            transform: translate3d(620px, 0, 0);
          }

          62% {
            transform: translate3d(-18px, 0, 0);
          }

          76% {
            transform: translate3d(9px, 0, 0);
          }

          88% {
            transform: translate3d(-4px, 0, 0);
          }

          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes heroMenuDockSlideOut {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(620px, 0, 0);
          }
        }

        @keyframes heroHiveSingleShake {
          0% {
            transform: rotate(0deg);
          }

          18% {
            transform: rotate(-2deg);
          }

          38% {
            transform: rotate(1.55deg);
          }

          58% {
            transform: rotate(-0.95deg);
          }

          78% {
            transform: rotate(0.45deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes heroHiveSparkFall {
          0% {
            opacity: 0;
            transform: translate3d(0, -6px, 0) scale(1);
          }

          4% {
            opacity: 1;
            transform: translate3d(0, -2px, 0) scale(1);
          }

          18% {
            opacity: 1;
            transform: translate3d(0, 44px, 0) scale(1);
          }

          24% {
            opacity: 0;
            transform: translate3d(0, 52px, 0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translate3d(0, 52px, 0) scale(1);
          }
        }

        @keyframes heroHiveCloseFan {
          0% {
            transform: rotate(0deg) scale(1);
          }

          45% {
            transform: rotate(260deg) scale(1.12);
          }

          72% {
            transform: rotate(340deg) scale(1.04);
          }

          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes heroHiveGoldShimmer {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes heroHiveGoldGlow {
          0%,
          100% {
            text-shadow:
              0 0 7px rgba(231, 197, 106, 0.22),
              0 0 14px rgba(231, 197, 106, 0.12);
          }

          50% {
            text-shadow:
              0 0 12px rgba(255, 233, 158, 0.42),
              0 0 22px rgba(214, 167, 70, 0.24);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-menu-dock--open,
          .hero-menu-dock--closed {
            animation-duration: 1ms;
          }
        }
      `}</style>
    </>
  );

  return createPortal(menu, document.body);
}