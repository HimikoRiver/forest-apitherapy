"use client";

import { useEffect, useRef, useState } from "react";
import FooterDesktop from "@/components/home/footer/FooterDesktop";
import AboutDesktop from "@/components/home/about/AboutDesktop";
import LuxuryButton from "@/components/home/shared/LuxuryButton";
import HeroInsects from "@/components/home/hero/HeroInsects";
import HeroIntroPanel from "@/components/home/hero/HeroIntroPanel";
import HeroMenu from "@/components/home/hero-menu/HeroMenu";
import ParallaxScene from "@/components/home/hero/ParallaxScene";

const PARALLAX_SCROLL_DISTANCE = 1050;
const PROGRESS_UPDATE_THRESHOLD = 0.002;
const CENTER_STORY_SCROLL_LIFT = 500;
const HERO_UI_SCROLL_LIFT = 1050;

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

export default function HomeDesktop() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const frameIdRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const centerStoryLift = Math.round(progress * CENTER_STORY_SCROLL_LIFT);
  const heroUiTranslateY = Math.round(progress * -HERO_UI_SCROLL_LIFT);

  useEffect(() => {
    const updateProgress = () => {
      frameIdRef.current = null;

      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        return;
      }

      const rawProgress = clamp(-rect.top / PARALLAX_SCROLL_DISTANCE, 0, 1);
      const nextProgress = Math.round(rawProgress * 1000) / 1000;

      if (
        Math.abs(progressRef.current - nextProgress) <
        PROGRESS_UPDATE_THRESHOLD
      ) {
        return;
      }

      progressRef.current = nextProgress;
      setProgress(nextProgress);
    };

    const requestProgressUpdate = () => {
      if (frameIdRef.current !== null) return;

      frameIdRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", requestProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);

      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative bg-black">
      <div
        ref={sectionRef}
        className="relative h-[210svh] overflow-visible bg-[#051f20]"
      >
        <div className="sticky top-0 h-[112svh] overflow-hidden">
          <div className="absolute left-0 top-0 h-[1160px] w-full overflow-hidden">
            <ParallaxScene progress={progress} />

            <HeroInsects />

            <HeroMenu />

            <div
              className="absolute inset-0 z-30 pointer-events-none"
              style={{
                transform: `translate3d(0, ${heroUiTranslateY}px, 0)`,
                willChange: "transform",
              }}
            >
              <HeroIntroPanel />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-40 -translate-y-[7%] overflow-hidden"
              style={{
                transform: `translate3d(0, ${heroUiTranslateY}px, 0) translateY(-7%)`,
                willChange: "transform",
              }}
            >
              <div className="relative flex h-full items-center px-6 py-24 sm:px-10 lg:px-16">
                <div className="pointer-events-auto max-w-4xl -translate-y-[120px] lg:pl-10">
                  <LuxuryButton
                    className="relative top-69 min-w-[330px]"
                    icon={<BeeIcon />}
                  >
                    Записаться на консультацию
                  </LuxuryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative z-50 will-change-transform"
        style={{
          transform: `translate3d(0, -${centerStoryLift}px, 0)`,
          marginBottom: `-${centerStoryLift}px`,
        }}
      >
        <AboutDesktop />
      </div>

      <FooterDesktop />
    </section>
  );
}
