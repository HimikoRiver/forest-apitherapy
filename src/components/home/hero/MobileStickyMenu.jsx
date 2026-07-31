"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MobileHeroMenu from "./MobileHeroMenu";

const hiddenMenuRoutePrefixes = [
  "/products",
  "/profile",
  "/cart",
  "/checkout",
  "/admin",
];

function isHiddenMenuRoute(pathname) {
  return hiddenMenuRoutePrefixes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function MobileStickyMenu() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const shouldHideMenu = isHiddenMenuRoute(pathname);

  useEffect(() => {
    let animationFrameId = null;

    const updateScrollState = () => {
      animationFrameId = null;

      const nextIsScrolled = window.scrollY > 12;

      setIsScrolled((currentIsScrolled) =>
        currentIsScrolled === nextIsScrolled
          ? currentIsScrolled
          : nextIsScrolled
      );
    };

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  if (shouldHideMenu) {
    return null;
  }

  return (
    <div
      className={`mobile-sticky-menu pointer-events-none inset-x-0 top-0 z-[80] h-[calc(env(safe-area-inset-top)+70px)] md:h-[calc(env(safe-area-inset-top)+92px)] xl:hidden ${
        isScrolled ? "fixed" : "absolute"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b transition-[opacity,box-shadow,border-color] duration-300 ease-out ${
          isScrolled
            ? "border-[#d8b66a]/30 opacity-100 shadow-[0_10px_24px_rgba(0,0,0,0.34)]"
            : "border-transparent opacity-0 shadow-none"
        }`}
        style={{
          backgroundColor: "#061707",
          backgroundImage:
            'linear-gradient(180deg, rgba(10, 43, 14, 0.97) 0%, rgba(3, 20, 7, 0.99) 100%), url("/textures/suede-green.webp")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <MobileHeroMenu />

      <style jsx global>{`
        @media (max-width: 767px) {
          .mobile-sticky-menu .mobile-hero-menu__button {
            top: calc(env(safe-area-inset-top) + 10px) !important;
            right: 10px !important;
            width: 50px !important;
            height: 50px !important;
            min-height: 50px !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu__button
            .luxury-button__icon {
            width: 26px !important;
            height: 21px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph {
            width: 26px !important;
            height: 21px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line {
            width: 23px !important;
            height: 2.5px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line--top {
            transform: translate(-50%, -8px) !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line--middle {
            width: 20px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line--bottom {
            transform: translate(-50%, 5.5px) !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line {
            width: 27px !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line--top {
            transform: translate(-50%, -50%) rotate(45deg) !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line--middle {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scaleX(0.08) !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line--bottom {
            transform: translate(-50%, -50%) rotate(-45deg) !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1279px) {
          .mobile-sticky-menu .mobile-hero-menu__button {
            top: calc(env(safe-area-inset-top) + 14px) !important;
            right: 18px !important;
            width: 64px !important;
            height: 64px !important;
            min-height: 64px !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu__button
            .luxury-button__icon {
            width: 34px !important;
            height: 28px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph {
            width: 34px !important;
            height: 28px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line {
            width: 31px !important;
            height: 3px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line--top {
            transform: translate(-50%, -10px) !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line--middle {
            width: 27px !important;
          }

          .mobile-sticky-menu .mobile-hero-menu__morph-line--bottom {
            transform: translate(-50%, 7px) !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line {
            width: 35px !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line--top {
            transform: translate(-50%, -50%) rotate(45deg) !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line--middle {
            opacity: 0 !important;
            transform: translate(-50%, -50%) scaleX(0.08) !important;
          }

          .mobile-sticky-menu
            .mobile-hero-menu--open
            .mobile-hero-menu__morph-line--bottom {
            transform: translate(-50%, -50%) rotate(-45deg) !important;
          }
        }
      `}</style>
    </div>
  );
}