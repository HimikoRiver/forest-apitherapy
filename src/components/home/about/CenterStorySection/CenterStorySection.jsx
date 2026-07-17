"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import StoryCopy from "./StoryCopy";
import StoryLogoCluster from "./StoryLogoCluster";

const LOGO_TEXT_DELAY_MS = 3500;

export default function CenterStorySection() {
  const sectionRef = useRef(null);
  const textTimeoutRef = useRef(null);

  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isRingVisible, setIsRingVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsLogoVisible(true);

        textTimeoutRef.current = window.setTimeout(() => {
          setIsRingVisible(true);
        }, LOGO_TEXT_DELAY_MS);

        observer.disconnect();
      },
      {
        threshold: 0.22,
      },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();

      if (textTimeoutRef.current) {
        window.clearTimeout(textTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`center-story-section relative z-50 overflow-hidden bg-transparent text-[#f3efe5] ${
        isRingVisible ? "is-story-ring-visible" : ""
      }`}
    >
      <div
        data-menu-hide-start
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 h-px w-px"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-col px-6 pb-8 pt-[320px] sm:px-10 md:px-14 lg:px-20 lg:pt-[350px]">
        <StoryLogoCluster isLogoVisible={isLogoVisible} />

        <div className="story-content-grid relative grid flex-1 items-start gap-10 overflow-hidden md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-18">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/images/beesHome11.webp"
              alt=""
              fill
              draggable={false}
              sizes="(max-width: 767px) 100vw, 1310px"
              className="object-cover object-[63%_center]"
            />

            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: "41%",
                backgroundColor: "#000",
              }}
            />

            <div
              className="absolute inset-y-0"
              style={{
                left: "41%",
                width: "22%",
                background:
                  "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 22%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.42) 72%, rgba(0,0,0,0.16) 88%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div
              className="absolute inset-x-0 top-0"
              style={{
                height: "24%",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.82) 24%, rgba(0,0,0,0.54) 52%, rgba(0,0,0,0.22) 76%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: "12%",
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.46) 48%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div
              className="absolute inset-y-0 right-0"
              style={{
                width: "8%",
                background:
                  "linear-gradient(270deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 52%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div
              className="absolute left-0 top-0"
              style={{
                width: "18%",
                height: "22%",
                background:
                  "radial-gradient(circle at top left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.58) 48%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div
              className="absolute bottom-0 left-0"
              style={{
                width: "18%",
                height: "20%",
                background:
                  "radial-gradient(circle at bottom left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.58) 48%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div
              className="absolute right-0 top-0"
              style={{
                width: "12%",
                height: "18%",
                background:
                  "radial-gradient(circle at top right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.24) 46%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div
              className="absolute bottom-0 right-0"
              style={{
                width: "12%",
                height: "16%",
                background:
                  "radial-gradient(circle at bottom right, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.24) 46%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>

          <StoryCopy />
        </div>
      </div>

      <style jsx global>{`
        .center-story-section,
        .center-story-section * {
          font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
        }

        .story-content-grid {
          isolation: isolate;
        }

        .story-copy {
          position: relative;
        }

        .story-logo-row {
          isolation: isolate;
        }

        .story-gold-line {
          position: absolute;
          top: 50%;
          height: 1px;
          pointer-events: none;
          overflow: visible;
          background: linear-gradient(
            90deg,
            rgba(216, 182, 106, 0),
            rgba(216, 182, 106, 0.72),
            rgba(255, 236, 174, 0.88),
            rgba(216, 182, 106, 0.72),
            rgba(216, 182, 106, 0)
          );
          box-shadow: 0 0 10px rgba(216, 182, 106, 0.22);
        }

        .story-gold-line::before,
        .story-gold-line::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 35% 35%,
            #fff2bf 0%,
            #e1ba62 46%,
            #b17924 100%
          );
          box-shadow:
            0 0 10px rgba(255, 229, 149, 0.4),
            0 0 18px rgba(216, 182, 106, 0.3);
          transform: translateY(-50%);
        }

        .story-gold-line-left {
          left: 0;
          right: calc(50% + 160px);
        }

        .story-gold-line-left::before {
          left: 0;
        }

        .story-gold-line-left::after {
          display: none;
        }

        .story-gold-line-right {
          left: calc(50% + 160px);
          right: 0;
        }

        .story-gold-line-right::before {
          display: none;
        }

        .story-gold-line-right::after {
          right: 0;
        }

        .story-honeycomb-row {
          position: absolute;
          left: 18px;
          right: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
        }

        .story-honeycomb-row-top {
          bottom: 12px;
        }

        .story-honeycomb-row-bottom {
          top: 12px;
        }

        .story-honeycomb-hit {
          --cell-rest-y: 0px;
          --cell-rest-scale: 1;
          --cell-jump-y: -13px;
          --cell-land-y: 2px;
          --cell-hover-scale: 1.08;
          --cell-land-scale: 0.97;

          position: relative;
          display: flex;
          width: 54px;
          height: 48px;
          flex: 0 0 54px;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          cursor: default;
        }

        .story-honeycomb-row-bottom .story-honeycomb-hit {
          --cell-jump-y: 13px;
          --cell-land-y: -2px;
        }

        .story-honeycomb-cell {
          --cell-size: 26px;

          position: relative;
          display: block;
          width: var(--cell-size);
          height: calc(var(--cell-size) * 0.88);
          flex: 0 0 auto;
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
          border: 1px solid rgba(255, 232, 166, 0.58);
          background:
            radial-gradient(
              circle at 34% 28%,
              rgba(255, 251, 235, 0.95) 0%,
              rgba(255, 232, 167, 0.92) 12%,
              rgba(245, 192, 80, 0.76) 32%,
              rgba(210, 137, 24, 0.88) 62%,
              rgba(122, 66, 8, 0.92) 100%
            ),
            linear-gradient(
              135deg,
              rgba(255, 243, 191, 0.9) 0%,
              rgba(244, 191, 67, 0.72) 36%,
              rgba(160, 95, 14, 0.85) 100%
            );
          box-shadow:
            0 0 12px rgba(216, 182, 106, 0.14),
            0 0 22px rgba(216, 182, 106, 0.08),
            inset 0 1px 0 rgba(255, 251, 236, 0.85),
            inset 0 -7px 10px rgba(101, 54, 8, 0.28);
          opacity: 0.95;
          transform: translateY(var(--cell-rest-y))
            scale(var(--cell-rest-scale));
          transition:
            filter 180ms ease,
            box-shadow 180ms ease;
          will-change: transform, filter;
        }

        .story-honeycomb-cell::before {
          content: "";
          position: absolute;
          inset: 2px;
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
          background:
            linear-gradient(
              118deg,
              transparent 0%,
              rgba(255, 248, 220, 0.08) 24%,
              rgba(255, 253, 244, 0.82) 44%,
              rgba(255, 224, 130, 0.24) 56%,
              transparent 72%
            ),
            radial-gradient(
              circle at 30% 24%,
              rgba(255, 251, 237, 0.62) 0%,
              rgba(255, 243, 191, 0.16) 30%,
              transparent 68%
            );
          opacity: 0;
          transform: translateX(-125%) rotate(8deg);
        }

        .story-honeycomb-cell::after {
          content: "";
          position: absolute;
          inset: 3px 4px 5px;
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
          background: radial-gradient(
            circle at 34% 28%,
            rgba(255, 250, 228, 0.45) 0%,
            rgba(255, 212, 112, 0.16) 28%,
            rgba(165, 95, 14, 0.14) 100%
          );
          opacity: 0.88;
        }

        .story-honeycomb-hit:hover .story-honeycomb-cell {
          z-index: 5;
          filter: brightness(1.14) saturate(1.16);
          box-shadow:
            0 0 16px rgba(255, 229, 149, 0.32),
            0 0 30px rgba(216, 182, 106, 0.16),
            inset 0 1px 0 rgba(255, 251, 236, 0.92),
            inset 0 -7px 10px rgba(101, 54, 8, 0.22);
          animation: storyHoneyJump 520ms cubic-bezier(0.22, 1.16, 0.34, 1)
            1;
        }

        .story-honeycomb-hit:hover .story-honeycomb-cell::before {
          animation: storyHoneySweepOnce 620ms ease-out 1;
        }

        .story-honeycomb-row-top .story-honeycomb-hit:nth-child(even) {
          --cell-rest-y: -2px;
          --cell-rest-scale: 0.95;
          --cell-hover-scale: 1.03;
          --cell-land-scale: 0.93;
        }

        .story-honeycomb-row-bottom .story-honeycomb-hit:nth-child(odd) {
          --cell-rest-y: 2px;
          --cell-rest-scale: 0.95;
          --cell-hover-scale: 1.03;
          --cell-land-scale: 0.93;
        }

        .story-honeycomb-row-top
          .story-honeycomb-hit:nth-child(even)
          .story-honeycomb-cell,
        .story-honeycomb-row-bottom
          .story-honeycomb-hit:nth-child(odd)
          .story-honeycomb-cell {
          opacity: 0.82;
        }

        .story-cluster {
          --story-logo-size: clamp(170px, 16vw, 260px);
          --story-ring-size: calc(
            var(--story-logo-size) + clamp(64px, 5.5vw, 94px)
          );

          min-height: var(--story-ring-size);
          width: var(--story-ring-size);
        }

        .apidarb-logo-wheel {
          transform: translate3d(68vw, 0, 0) rotate(0deg);
          transform-origin: center center;
          will-change: transform;
        }

        .apidarb-logo-wheel.is-visible {
          animation: apidarbLogoWheelRoll 3.4s forwards;
        }

        .story-ring {
          width: var(--story-ring-size);
          height: var(--story-ring-size);
          opacity: 0;
          transform: translate3d(-50%, -50%, 0) scale(0.96);
          transition:
            opacity 900ms ease,
            transform 1100ms cubic-bezier(0.19, 1, 0.22, 1);
          will-change: transform, opacity;
        }

        .is-story-ring-visible .story-ring {
          opacity: 1;
          transform: translate3d(-50%, -50%, 0) scale(1);
        }

        .story-ring-spin {
          transform-origin: 310px 310px;
          animation: apidarbStoryRingSpin 20s linear infinite;
        }

        .story-ring-text {
          fill: url(#apidarb-story-ring-gold);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.055em;
          text-transform: uppercase;
          filter: drop-shadow(0 2px 9px rgba(216, 182, 106, 0.28))
            drop-shadow(0 2px 8px rgba(0, 0, 0, 0.75));
        }

        @keyframes storyHoneyJump {
          0% {
            transform: translateY(var(--cell-rest-y))
              scale(var(--cell-rest-scale));
          }

          38% {
            transform: translateY(calc(var(--cell-rest-y) + var(--cell-jump-y)))
              scale(var(--cell-hover-scale));
          }

          64% {
            transform: translateY(calc(var(--cell-rest-y) + var(--cell-land-y)))
              scale(var(--cell-land-scale));
          }

          84% {
            transform: translateY(
                calc(var(--cell-rest-y) + (var(--cell-jump-y) * 0.28))
              )
              scale(var(--cell-rest-scale));
          }

          100% {
            transform: translateY(var(--cell-rest-y))
              scale(var(--cell-rest-scale));
          }
        }

        @keyframes storyHoneySweepOnce {
          0% {
            transform: translateX(-125%) rotate(8deg);
            opacity: 0;
          }

          30% {
            opacity: 0.8;
          }

          72% {
            transform: translateX(82%) rotate(8deg);
            opacity: 0.42;
          }

          100% {
            transform: translateX(125%) rotate(8deg);
            opacity: 0;
          }
        }

        @keyframes apidarbLogoWheelRoll {
          0% {
            transform: translate3d(68vw, 0, 0) rotate(0deg);
            animation-timing-function: cubic-bezier(0.2, 0.78, 0.18, 1);
          }

          82% {
            transform: translate3d(-0.5vw, 0, 0) rotate(-730deg);
            animation-timing-function: cubic-bezier(0.12, 0.78, 0.18, 1);
          }

          90% {
            transform: translate3d(0, 0, 0) rotate(-720deg);
          }

          100% {
            transform: translate3d(0, 0, 0) rotate(-720deg);
          }
        }

        @keyframes apidarbStoryRingSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 767px) {
          .story-gold-line {
            display: none;
          }

          .story-cluster {
            --story-logo-size: clamp(160px, 36vw, 230px);
            --story-ring-size: calc(var(--story-logo-size) + 82px);
          }

          .story-ring-text {
            font-size: 14px;
            letter-spacing: 0.035em;
          }

          .apidarb-logo-wheel,
          .apidarb-logo-wheel.is-visible {
            animation: none;
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .apidarb-logo-wheel,
          .apidarb-logo-wheel.is-visible {
            animation: none;
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          .story-ring {
            opacity: 1;
            transform: translate3d(-50%, -50%, 0) scale(1);
            transition: none;
          }

          .story-ring-spin,
          .story-honeycomb-hit:hover .story-honeycomb-cell,
          .story-honeycomb-hit:hover .story-honeycomb-cell::before {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}