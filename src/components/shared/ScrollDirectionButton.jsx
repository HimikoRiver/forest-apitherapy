"use client";

import { useEffect, useRef, useState } from "react";

const TOP_THRESHOLD = 96;
const SCROLLABLE_THRESHOLD = 120;

export default function ScrollDirectionButton() {
  const animationFrameRef = useRef(null);

  const [scrollState, setScrollState] = useState({
    isAtTop: true,
    canScroll: false,
  });

  useEffect(() => {
    const updateScrollState = () => {
      animationFrameRef.current = null;

      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      const nextState = {
        isAtTop: window.scrollY <= TOP_THRESHOLD,
        canScroll: scrollHeight - viewportHeight > SCROLLABLE_THRESHOLD,
      };

      setScrollState((currentState) => {
        if (
          currentState.isAtTop === nextState.isAtTop &&
          currentState.canScroll === nextState.canScroll
        ) {
          return currentState;
        }

        return nextState;
      });
    };

    const scheduleUpdate = () => {
      if (animationFrameRef.current !== null) return;

      animationFrameRef.current =
        window.requestAnimationFrame(updateScrollState);
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleUpdate)
        : null;

    resizeObserver?.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      resizeObserver?.disconnect();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!scrollState.canScroll) {
    return null;
  }

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: scrollState.isAtTop
        ? document.documentElement.scrollHeight
        : 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className="scroll-direction-button xl:hidden"
      aria-label={
        scrollState.isAtTop
          ? "Прокрутить страницу вниз"
          : "Вернуться наверх"
      }
      title={
        scrollState.isAtTop
          ? "Прокрутить вниз"
          : "Вернуться наверх"
      }
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 24 24"
        className={`scroll-direction-button__icon ${
          scrollState.isAtTop
            ? "scroll-direction-button__icon--down"
            : ""
        }`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5.5 14.5 12 8l6.5 6.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M8 17.5 12 13.5l4 4"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.58"
        />
      </svg>

      <style jsx>{`
        .scroll-direction-button {
          position: fixed;
          right: max(12px, env(safe-area-inset-right));
          bottom: max(14px, env(safe-area-inset-bottom));
          z-index: 70;
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          margin: 0;
          padding: 0;
          border: 1px solid rgba(216, 182, 106, 0.2);
          border-radius: 999px;
          background: rgba(2, 18, 10, 0.16);
          color: rgba(235, 198, 107, 0.58);
          box-shadow:
            0 4px 14px rgba(0, 0, 0, 0.16),
            inset 0 0 8px rgba(216, 182, 106, 0.025);
          opacity: 0.46;
          cursor: pointer;
          -webkit-backdrop-filter: blur(3px);
          backdrop-filter: blur(3px);
          transition:
            opacity 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            box-shadow 220ms ease,
            transform 180ms ease;
        }

        .scroll-direction-button:hover,
        .scroll-direction-button:focus-visible {
          border-color: rgba(230, 193, 101, 0.48);
          background: rgba(3, 24, 13, 0.34);
          color: rgba(246, 211, 126, 0.92);
          box-shadow:
            0 6px 18px rgba(0, 0, 0, 0.26),
            0 0 12px rgba(216, 182, 106, 0.09);
          opacity: 0.92;
        }

        .scroll-direction-button:focus-visible {
          outline: 1px solid rgba(235, 198, 107, 0.65);
          outline-offset: 3px;
        }

        .scroll-direction-button:active {
          transform: scale(0.92);
        }

        .scroll-direction-button__icon {
          width: 18px;
          height: 18px;
          transform: rotate(0deg);
          filter: drop-shadow(0 0 4px rgba(216, 182, 106, 0.18));
          transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-direction-button__icon--down {
          transform: rotate(180deg);
        }

        @media (min-width: 768px) and (max-width: 1279px) {
          .scroll-direction-button {
            right: max(18px, env(safe-area-inset-right));
            bottom: max(18px, env(safe-area-inset-bottom));
            width: 38px;
            height: 38px;
          }

          .scroll-direction-button__icon {
            width: 20px;
            height: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-direction-button,
          .scroll-direction-button__icon {
            transition: none;
          }
        }
      `}</style>
    </button>
  );
}