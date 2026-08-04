"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import AboutDesktop from "@/components/home/about/AboutDesktop";
import FooterDesktop from "@/components/home/footer/FooterDesktop";
import HeroInsects from "@/components/home/hero/HeroInsects";
import HeroIntroPanel from "@/components/home/hero/HeroIntroPanel";
import ParallaxScene from "@/components/home/hero/ParallaxScene";
import BeeIcon from "@/components/home/shared/BeeIcon";
import LuxuryButton from "@/components/home/shared/LuxuryButton";

const PARALLAX_SCROLL_DISTANCE = 1050;
const PROGRESS_UPDATE_THRESHOLD = 0.002;
const CENTER_STORY_SCROLL_LIFT = 500;
const HERO_UI_SCROLL_LIFT = 1050;

const STATIC_HERO_ZOOM_THRESHOLD = 0.78;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function detectStrongZoomOut() {
  const screenWidth =
    window.screen?.availWidth ||
    window.screen?.width ||
    window.innerWidth;

  const viewportRatio =
    screenWidth / window.innerWidth;

  return viewportRatio < STATIC_HERO_ZOOM_THRESHOLD;
}

export default function HomeDesktop() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const frameIdRef = useRef(null);
  const staticHeroRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [isStaticHero, setIsStaticHero] =
    useState(false);

  const centerStoryLift = isStaticHero
    ? 0
    : Math.round(
        progress * CENTER_STORY_SCROLL_LIFT,
      );

  const heroUiTranslateY = Math.round(
    progress * -HERO_UI_SCROLL_LIFT,
  );

  useEffect(() => {
    const updateStaticHeroMode = () => {
      const nextStaticHeroState =
        detectStrongZoomOut();

      if (
        staticHeroRef.current ===
        nextStaticHeroState
      ) {
        return;
      }

      staticHeroRef.current =
        nextStaticHeroState;

      setIsStaticHero(nextStaticHeroState);

      if (nextStaticHeroState) {
        progressRef.current = 0;
        setProgress(0);
      }
    };

    const updateProgress = () => {
      frameIdRef.current = null;

      if (
        staticHeroRef.current ||
        !sectionRef.current
      ) {
        return;
      }

      const rect =
        sectionRef.current.getBoundingClientRect();

      if (
        rect.bottom < 0 ||
        rect.top > window.innerHeight
      ) {
        return;
      }

      const rawProgress = clamp(
        -rect.top / PARALLAX_SCROLL_DISTANCE,
        0,
        1,
      );

      const nextProgress =
        Math.round(rawProgress * 1000) / 1000;

      if (
        Math.abs(
          progressRef.current - nextProgress,
        ) < PROGRESS_UPDATE_THRESHOLD
      ) {
        return;
      }

      progressRef.current = nextProgress;
      setProgress(nextProgress);
    };

    const requestProgressUpdate = () => {
      if (frameIdRef.current !== null) {
        return;
      }

      frameIdRef.current =
        window.requestAnimationFrame(
          updateProgress,
        );
    };

    const handleResize = () => {
      updateStaticHeroMode();
      requestProgressUpdate();
    };

    updateStaticHeroMode();
    updateProgress();

    window.addEventListener(
      "scroll",
      requestProgressUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestProgressUpdate,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );

      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(
          frameIdRef.current,
        );
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative bg-black"
    >
      {isStaticHero ? (
        <div
          ref={sectionRef}
          className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#051f20]"
        >
          <Image
            src="/images/hero/hero-static-fallback.webp"
            alt=""
            fill
            priority
            draggable={false}
            sizes="100vw"
            className="select-none object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 z-30">
            <HeroIntroPanel />
          </div>
        </div>
      ) : (
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
                      href="/contacts"
                      className="relative top-[340px] min-w-[330px]"
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
      )}

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