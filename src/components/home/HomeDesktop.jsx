"use client";

import { useEffect, useRef, useState } from "react";
import FooterDesktop from "@/components/home/footer/FooterDesktop";
import AboutDesktop from "@/components/home/about/AboutDesktop";
import BeeIcon from "@/components/home/shared/BeeIcon";
import LuxuryButton from "@/components/home/shared/LuxuryButton";
import HeroInsects from "@/components/home/hero/HeroInsects";
import HeroIntroPanel from "@/components/home/hero/HeroIntroPanel";
import ParallaxScene from "@/components/home/hero/ParallaxScene";

const PARALLAX_SCROLL_DISTANCE = 1050;
const PROGRESS_UPDATE_THRESHOLD = 0.002;
const CENTER_STORY_SCROLL_LIFT = 500;
const HERO_UI_SCROLL_LIFT = 1050;

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

      const rawProgress = clamp(
        -rect.top / PARALLAX_SCROLL_DISTANCE,
        0,
        1
      );

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

            <div
              className="pointer-events-none absolute inset-0 z-30"
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

      <div
        data-hero-menu-footer-anchor
        className="relative"
      >
        <FooterDesktop />
      </div>
    </section>
  );
}