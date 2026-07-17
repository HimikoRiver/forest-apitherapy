"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PageLogo } from "@/components/shared/PageLogo";

const TEXTURE_PATH = "/textures/suede-green.webp";

function BeeIcon({ className = "size-6" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
    >
      <path
        d="M16 13.2c2.2 0 4 2 4 4.6 0 3.6-1.8 6.3-4 6.3s-4-2.7-4-6.3c0-2.6 1.8-4.6 4-4.6Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />

      <path
        d="M13.2 16.8h5.6M12.8 19.6h6.4M16 13.1v-3.6M13.8 9.5h4.4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      <path
        d="M12.5 13.9C8.8 10.4 5 10.2 4.2 12.3c-.8 2.2 1.8 5.3 7.2 5.1M19.5 13.9c3.7-3.5 7.5-3.7 8.3-1.6.8 2.2-1.8 5.3-7.2 5.1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M13.9 23.2 16 26l2.1-2.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoldArc() {
  const arcPath = "M165 0 H252.5 A247.5 247.5 0 0 1 386 456";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 495"
      className="pointer-events-none absolute left-0 top-0 z-[4] hidden h-[495px] w-[500px] lg:block"
      fill="none"
    >
      <defs>
        <linearGradient
          id="hero-panel-arc"
          x1="252.5"
          y1="0"
          x2="500"
          y2="495"
        >
          <stop offset="0%" stopColor="#fff4c2" stopOpacity="0.28" />
          <stop offset="18%" stopColor="#f6cf6b" stopOpacity="1" />
          <stop offset="42%" stopColor="#fff1b7" stopOpacity="1" />
          <stop offset="62%" stopColor="#d79a2a" stopOpacity="0.96" />
          <stop offset="82%" stopColor="#ffe59b" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b87318" stopOpacity="0.56" />
        </linearGradient>

        <linearGradient
          id="hero-panel-arc-shine"
          x1="252.5"
          y1="0"
          x2="500"
          y2="495"
        >
          <stop offset="0%" stopColor="#fff9df" stopOpacity="0" />
          <stop offset="38%" stopColor="#fff9df" stopOpacity="1" />
          <stop offset="50%" stopColor="#ffd76d" stopOpacity="1" />
          <stop offset="62%" stopColor="#fff9df" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff9df" stopOpacity="0" />
        </linearGradient>

        <filter
          id="hero-panel-arc-glow"
          x="-40%"
          y="-20%"
          width="180%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="4.5" result="blur" />

          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0.95
              0 1 0 0 0.62
              0 0 1 0 0.12
              0 0 0 1 0
            "
            result="goldGlow"
          />

          <feMerge>
            <feMergeNode in="goldGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id="hero-panel-arc-soft-glow"
          x="-45%"
          y="-25%"
          width="190%"
          height="150%"
        >
          <feGaussianBlur stdDeviation="8" result="blur" />

          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0.92
              0 1 0 0 0.58
              0 0 1 0 0.1
              0 0 0 0.62 0
            "
          />
        </filter>
      </defs>

      <path
        d={arcPath}
        stroke="#f0c76d"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.34"
        filter="url(#hero-panel-arc-soft-glow)"
      >
        <animate
          attributeName="opacity"
          values="0.18;0.48;0.24;0.42;0.18"
          dur="4.8s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d={arcPath}
        stroke="url(#hero-panel-arc)"
        strokeWidth="2.35"
        strokeLinecap="round"
        filter="url(#hero-panel-arc-glow)"
      >
        <animate
          attributeName="stroke-width"
          values="2.1;2.75;2.25;2.55;2.1"
          dur="4.8s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d={arcPath}
        stroke="url(#hero-panel-arc-shine)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeDasharray="92 690"
        strokeDashoffset="690"
        opacity="0.95"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="690;-690"
          dur="3.6s"
          repeatCount="indefinite"
        />

        <animate
          attributeName="opacity"
          values="0;0.95;0.55;0"
          dur="3.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function HoneycombsImage() {
  return (
    <div className="pointer-events-none absolute left-[410px] top-[330px] z-[0] hidden h-[170px] w-[170px] lg:block">
      <Image
        src="/images/hero/honeycombs.webp"
        alt=""
        fill
        sizes="170px"
        className="object-contain opacity-90"
        priority
      />
    </div>
  );
}

function PanelToggleButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Скрыть панель" : "Открыть панель"}
      onClick={onClick}
      className="group pointer-events-auto absolute left-[-44px] top-[328px] z-[8] hidden h-[88px] w-[88px] rounded-full border border-[#d8b66a]/80 shadow-[0_12px_34px_rgba(0,0,0,0.45)] transition duration-500 hover:left-[-38px] lg:block"
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

      <span className="absolute right-[13px] top-1/2 flex -translate-y-1/2 items-center justify-center drop-shadow-[0_0_9px_rgba(240,199,109,0.36)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className={`h-7 w-7 transition duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
        >
          <defs>
            <linearGradient
              id="hero-panel-toggle-arrow-gold"
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
            stroke="url(#hero-panel-toggle-arrow-gold)"
            strokeWidth="2.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export default function HeroIntroPanel() {
  const autoCloseTimeoutRef = useRef(null);

  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    autoCloseTimeoutRef.current = window.setTimeout(() => {
      setHasInteracted(true);
      setIsOpen(false);
      autoCloseTimeoutRef.current = null;
    }, 5000);

    return () => {
      if (autoCloseTimeoutRef.current) {
        window.clearTimeout(autoCloseTimeoutRef.current);
      }
    };
  }, []);

  const handleTogglePanel = () => {
    if (autoCloseTimeoutRef.current) {
      window.clearTimeout(autoCloseTimeoutRef.current);
      autoCloseTimeoutRef.current = null;
    }

    setHasInteracted(true);
    setIsOpen((current) => !current);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes heroIntroPanelBrakeIn {
          0% {
            transform: translateX(-1120px);
          }

          62% {
            transform: translateX(26px);
          }

          76% {
            transform: translateX(-12px);
          }

          88% {
            transform: translateX(5px);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes heroIntroPanelSlideOut {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-1120px);
          }
        }

        .hero-intro-panel {
          transform: translateX(-1120px);
          will-change: transform;
        }

        .hero-intro-panel--open {
          animation: heroIntroPanelBrakeIn 920ms
            cubic-bezier(0.18, 0.95, 0.2, 1) both;
        }

        .hero-intro-panel--closed {
          animation: heroIntroPanelSlideOut 620ms
            cubic-bezier(0.76, 0, 0.24, 1) both;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
        <PanelToggleButton
          isOpen={isOpen}
          onClick={handleTogglePanel}
        />

        <div
          className={`hero-intro-panel absolute left-0 top-[88px] z-[1] hidden h-[495px] w-[500px] overflow-visible lg:block ${
            isOpen
              ? "hero-intro-panel--open"
              : hasInteracted
                ? "hero-intro-panel--closed"
                : ""
          }`}
          style={{
            transform:
              !isOpen && !hasInteracted
                ? "translate3d(-1120px, 0, 0)"
                : undefined,
          }}
        >
          <HoneycombsImage />

          <div className="absolute inset-0 z-[1] rounded-r-[247.5px] bg-[linear-gradient(90deg,rgba(4,16,13,0.12)_0%,rgba(4,16,13,0.34)_18%,rgba(4,16,13,0.68)_50%,rgba(3,15,12,0.88)_78%,rgba(2,13,10,0.92)_100%)] shadow-[0_32px_90px_rgba(0,0,0,0.34),inset_0_0_90px_rgba(0,0,0,0.18)]" />

          <GoldArc />

          <div className="relative z-[5] flex h-full flex-col px-[84px] pt-[28px]">
            <div className="relative mb-5 flex w-[332px] -translate-y-[14px] flex-col items-center">
              <div className="mb-1 text-[#f0c76d] drop-shadow-[0_0_18px_rgba(240,199,109,0.32)]">
                <BeeIcon className="size-7" />
              </div>

              <PageLogo variant="hero" />

              <p
                className="mt-4 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.34em] text-[#f0c76d] drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
                style={{
                  fontFamily: "var(--font-comfortaa), Arial, sans-serif",
                }}
              >
                Природа. Наука. Гармония.
              </p>
            </div>

            <div className="overflow-visible">
              <h1 className="apitherapy-custom-title w-[980px] text-[clamp(5.8rem,9.6vw,11.2rem)] font-normal leading-[0.74] tracking-[0.5px] text-[#f5efe2] drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
                Апи
                <br />
                терапия
              </h1>
            </div>

            <div className="mt-[24px] grid max-w-[340px] grid-cols-[2px_1fr] gap-5">
              <span className="block h-[110px] -translate-y-5 rounded-full bg-gradient-to-b from-[#f0c76d]/0 via-[#fff0b9] to-[#f0c76d]/0 shadow-[0_0_20px_rgba(240,199,109,0.24)]" />

              <p className="font-comfortaa m-0 text-[13px] font-medium leading-[1.55] tracking-[-0.03em] text-[#f5efe2]/90 drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]">
                Целебная сила пчёл,
                <br />
                проверенная временем.
                <br />
                В окружении первозданной природы.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}