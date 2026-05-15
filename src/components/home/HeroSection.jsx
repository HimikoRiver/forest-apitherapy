"use client";

import { useEffect, useRef, useState } from "react";

import Button from "@/components/ui/Button";
import Fireflies from "./Fireflies";
import HeroIntroPanel from "./HeroIntroPanel";
import HeroMenu from "./HeroMenu";
import ParallaxScene from "./ParallaxScene";

const PARALLAX_SCROLL_DISTANCE = 1400;

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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = null;

    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const nextProgress = clamp(
        -rect.top / PARALLAX_SCROLL_DISTANCE,
        0,
        1
      );

      setProgress(nextProgress);
    };

    const handleScroll = () => {
      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        updateProgress();
        frameId = null;
      });
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[280svh] overflow-visible bg-[#051f20]"
    >
      <div className="sticky top-0 h-[100svh] min-h-[1160px] overflow-hidden">
        <ParallaxScene progress={progress} />

        <Fireflies />

        <HeroMenu />

        <HeroIntroPanel />

        <div className="pointer-events-none absolute inset-0 z-40 -translate-y-[7%] overflow-hidden">
          <div className="relative flex h-full items-center px-6 py-24 sm:px-10 lg:px-16">
            <div className="pointer-events-auto max-w-4xl -translate-y-[120px] lg:pl-10">
              <Button
                className="relative top-69 min-w-[330px]"
                icon={<BeeIcon />}
              >
                Записаться на консультацию
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}