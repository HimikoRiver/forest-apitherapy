"use client";

import { useEffect, useRef, useState } from "react";
import StoryCopy from "./StoryCopy";
import StoryHomeImage from "./StoryHomeImage";
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
      }
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
      className={`center-story-section relative z-50 min-h-[100svh] overflow-hidden bg-black text-[#f3efe5] ${
        isRingVisible ? "is-story-ring-visible" : ""
      }`}
    >
      <div
        data-menu-hide-start
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(216,182,106,0.13),transparent_34%),radial-gradient(circle_at_24%_34%,rgba(3,56,41,0.26),transparent_38%)]" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1680px] flex-col px-6 pb-10 pt-6 sm:px-10 md:px-14 lg:px-20 lg:pt-8">
        <StoryLogoCluster isLogoVisible={isLogoVisible} />

        <div className="grid flex-1 items-start gap-10 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-18">
          <StoryCopy />
          <StoryHomeImage />
        </div>
      </div>

      <style jsx global>{`
        .center-story-section,
        .center-story-section * {
          font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
        }

        .story-copy {
          position: relative;
        }

        .story-home-image {
          transform: translate3d(1vw, 0, 0);
        }

        .story-logo-row {
          isolation: isolate;
        }

        .story-gold-line {
          position: absolute;
          top: 50%;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(216, 182, 106, 0),
            rgba(216, 182, 106, 0.78),
            rgba(216, 182, 106, 0)
          );
        }

        .story-gold-line::before,
        .story-gold-line::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #d8b66a;
          box-shadow: 0 0 14px rgba(216, 182, 106, 0.65);
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

          .story-home-image {
            transform: none;
            min-height: 340px;
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

          .story-ring-spin {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}