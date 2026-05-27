"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MobileHeroMenu from "./MobileHeroMenu";
import LuxuryButton from "@/components/home/shared/LuxuryButton";

const HERO_BACKGROUND = "/images/home/hero/mobile/hero-bg6.webp";
const LOGO_IMAGE = "/images/logo.webp";
const BEE_LOGO_IMAGE = "/images/home/hero/mobile/beelogo.webp";

const BEE_LOGO_IMAGE_WIDTH = 2048;
const BEE_LOGO_IMAGE_HEIGHT = 620;

const BEE_LOGO_SCROLL_DISTANCE = 520;
const BEE_LOGO_INITIAL_VISIBLE_PART = 0.5;
const BEE_LOGO_MAX_VISIBLE_PART = 0.78;
const BEE_LOGO_SCREEN_WIDTH_MULTIPLIER = 1.28;
const BEE_LOGO_BOTTOM_OFFSET = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function HeroMobile() {
  const sectionRef = useRef(null);
  const frameIdRef = useRef(null);
  const progressRef = useRef(0);

  const [beeLogoProgress, setBeeLogoProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const beeLogoRenderWidth =
    viewportWidth > 0
      ? Math.round(viewportWidth * BEE_LOGO_SCREEN_WIDTH_MULTIPLIER)
      : 0;

  const beeLogoFullHeight =
    beeLogoRenderWidth > 0
      ? Math.round(
          (beeLogoRenderWidth / BEE_LOGO_IMAGE_WIDTH) * BEE_LOGO_IMAGE_HEIGHT
        )
      : 0;

  const beeLogoInitialVisibleHeight = Math.round(
    beeLogoFullHeight * BEE_LOGO_INITIAL_VISIBLE_PART
  );

  const beeLogoMaxVisibleHeight = Math.round(
    beeLogoFullHeight * BEE_LOGO_MAX_VISIBLE_PART
  );

  const beeLogoCurrentVisibleHeight = Math.round(
    beeLogoInitialVisibleHeight +
      (beeLogoMaxVisibleHeight - beeLogoInitialVisibleHeight) * beeLogoProgress
  );

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();

    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    const updateBeeLogoProgress = () => {
      frameIdRef.current = null;

      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const rawProgress = clamp(-rect.top / BEE_LOGO_SCROLL_DISTANCE, 0, 1);
      const nextProgress = Math.round(rawProgress * 1000) / 1000;

      if (Math.abs(progressRef.current - nextProgress) < 0.002) {
        return;
      }

      progressRef.current = nextProgress;
      setBeeLogoProgress(nextProgress);
    };

    const requestBeeLogoProgressUpdate = () => {
      if (frameIdRef.current !== null) return;

      frameIdRef.current = window.requestAnimationFrame(updateBeeLogoProgress);
    };

    updateBeeLogoProgress();

    window.addEventListener("scroll", requestBeeLogoProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestBeeLogoProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestBeeLogoProgressUpdate);
      window.removeEventListener("resize", requestBeeLogoProgressUpdate);

      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate h-[135svh] overflow-visible bg-[#020b0b] text-[#f3efe5]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Image
          src={HERO_BACKGROUND}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-top"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_34%,rgba(0,0,0,0.1)_100%)]"
        />

        <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 pt-[calc(env(safe-area-inset-top)+16px)]">
          <div className="flex items-center gap-3">
            <span className="relative block size-[62px] shrink-0 overflow-hidden rounded-full shadow-[0_0_20px_rgba(216,182,106,0.2)]">
              <Image
                src={LOGO_IMAGE}
                alt="APIDARB"
                fill
                sizes="62px"
                className="object-cover"
              />
            </span>

            <span className="block pt-1">
              <span className="block text-[1.32rem] font-semibold uppercase leading-none tracking-[0.14em] text-[#e5c56f] drop-shadow-[0_0_12px_rgba(216,182,106,0.25)]">
                APIDARB
              </span>

              <span className="mt-1 block text-[0.5rem] font-semibold uppercase tracking-[0.24em] text-[#d8b66a]/90">
                Центр апитерапии
              </span>
            </span>
          </div>
        </header>

        <MobileHeroMenu />

        <div className="absolute inset-x-0 bottom-[18%] z-20 px-5">
          <div className="mx-auto w-full max-w-[350px] text-center">
            <h1
              className="m-0 translate-y-[5px] text-[clamp(3rem,14vw,4.35rem)] font-normal leading-[0.9] tracking-[0.01em] text-[#e7cb78] drop-shadow-[0_0_18px_rgba(0,0,0,0.68)]"
              style={{
                fontFamily:
                  '"ApitherapyCustom", var(--font-comfortaa), Arial, Helvetica, sans-serif',
              }}
            >
              Апитерапия
            </h1>

            <p className="mobile-hero-subtitle m-0 mt-4 text-[clamp(1.1rem,4.8vw,1.42rem)] font-semibold leading-[1.22] tracking-[-0.045em]">
              Природа. Наука. Гармония.
            </p>

            <div className="mx-auto mt-7 max-w-[330px] -translate-y-[5px]">
              <LuxuryButton className="min-h-[58px] w-full justify-center text-[0.9rem]">
                Записаться на консультацию
              </LuxuryButton>
            </div>
          </div>
        </div>

        {beeLogoRenderWidth > 0 && beeLogoFullHeight > 0 ? (
          <div
            className="pointer-events-none absolute z-40 overflow-hidden"
            style={{
              left: "50%",
              bottom: `${BEE_LOGO_BOTTOM_OFFSET}px`,
              width: `${beeLogoRenderWidth}px`,
              height: `${beeLogoCurrentVisibleHeight}px`,
              marginLeft: `${beeLogoRenderWidth / -2}px`,
              willChange: "height",
            }}
          >
            <div
              className="absolute left-0 top-0"
              style={{
                width: `${beeLogoRenderWidth}px`,
                height: `${beeLogoFullHeight}px`,
              }}
            >
              <Image
                src={BEE_LOGO_IMAGE}
                alt=""
                fill
                priority
                sizes="128vw"
                className="select-none object-fill object-top"
              />
            </div>
          </div>
        ) : null}
      </div>

      <style jsx>{`
        .mobile-hero-subtitle {
          color: #a8cf98;
          text-shadow:
            0 0 7px rgba(216, 182, 106, 0.42),
            0 0 16px rgba(216, 182, 106, 0.28),
            0 0 28px rgba(216, 182, 106, 0.16);
          animation: mobileHeroSubtitleGlow 3.4s ease-in-out infinite;
        }

        @keyframes mobileHeroSubtitleGlow {
          0%,
          100% {
            color: #a8cf98;
            text-shadow:
              0 0 7px rgba(216, 182, 106, 0.34),
              0 0 15px rgba(216, 182, 106, 0.2),
              0 0 26px rgba(216, 182, 106, 0.12);
          }

          50% {
            color: #d8efc8;
            text-shadow:
              0 0 10px rgba(216, 182, 106, 0.72),
              0 0 22px rgba(216, 182, 106, 0.48),
              0 0 38px rgba(216, 182, 106, 0.24);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-hero-subtitle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}