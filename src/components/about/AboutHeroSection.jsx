"use client";

import { useEffect, useRef, useState } from "react";

import LuxuryButton from "@/components/home/shared/LuxuryButton";

const benefits = ["Пчелоужаление", "Апитоксин", "Пчелопродукты"];

function BeeSmallIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
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
    </svg>
  );
}

function DropIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HoneyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 4h8l4 7-4 7H8l-4-7 4-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M8 4 12 11m4-7-4 7m0 0 4 7m-4-7-4 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[23px] w-[23px] translate-x-[1px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6v12M15 6v12"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[23px] w-[23px] translate-x-[2px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function HexIcon({ children }) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center text-[#d8b66a]">
      <svg
        viewBox="0 0 52 58"
        className="absolute h-12 w-12"
        aria-hidden="true"
      >
        <path
          d="M26 2 49 15.5v27L26 56 3 42.5v-27L26 2Z"
          fill="rgba(3,17,13,0.5)"
          stroke="rgba(216,182,106,0.78)"
          strokeWidth="1.4"
        />
      </svg>

      <span className="relative z-10">{children}</span>
    </span>
  );
}

export default function AboutHeroSection() {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePause = () => setIsPaused(true);
    const handlePlay = () => setIsPaused(false);

    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
      return;
    }

    video.pause();
    setIsPaused(true);
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#020908] xl:h-[min(100svh,1080px)] xl:min-h-[760px]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source
          src="/videos/about-hero1.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,9,8,0.88)_0%,rgba(2,9,8,0.72)_22%,rgba(2,9,8,0.34)_48%,rgba(2,9,8,0.1)_68%,rgba(2,9,8,0.34)_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,9,8,0.14)_0%,rgba(2,9,8,0.04)_42%,rgba(2,9,8,0.9)_100%)]" />

      <div className="pointer-events-none absolute left-0 top-0 h-full w-[58vw] bg-[radial-gradient(ellipse_at_20%_48%,rgba(3,22,16,0.82)_0%,rgba(3,22,16,0.66)_32%,rgba(3,22,16,0.36)_58%,rgba(3,22,16,0.12)_78%,transparent_100%)] blur-[18px]" />

      <div className="pointer-events-none absolute bottom-[-12%] right-[-8%] h-[70%] w-[56vw] bg-[radial-gradient(circle_at_100%_100%,rgba(2,9,8,0.76)_0%,rgba(2,9,8,0.54)_26%,rgba(2,9,8,0.26)_54%,transparent_82%)] blur-[20px]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1920px] items-center px-5 pb-16 pt-20 sm:px-8 lg:px-12 xl:h-full xl:min-h-0 xl:px-[5vw]">
        <div className="w-full max-w-[720px]">
          <p className="mb-7 text-[13px] font-semibold uppercase tracking-[0.58em] text-[#d8b66a] drop-shadow-[0_5px_16px_rgba(0,0,0,0.78)]">
            О специалисте
          </p>

          <h1 className="max-w-[700px] font-serif text-[clamp(3.2rem,5.8vw,6.8rem)] font-normal leading-[0.98] tracking-[-0.06em] text-[#f8f0dd] drop-shadow-[0_12px_34px_rgba(0,0,0,0.82)]">
            Магомед
            <br />
            Базаев
          </h1>

          <div className="mt-8 flex max-w-[520px] items-center gap-4 text-[#d8b66a]">
            <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a] to-transparent" />

            <BeeSmallIcon />

            <span className="h-px flex-1 bg-gradient-to-l from-[#d8b66a] to-transparent" />
          </div>

          <p className="mt-8 max-w-[620px] text-[17px] font-medium leading-8 text-[#f3e8cf] drop-shadow-[0_5px_18px_rgba(0,0,0,0.82)]">
            Лечение пациентов методами апитерапии и восстановительные курсы
            на основе силы пчёл.
          </p>

          <div className="mt-10 grid max-w-[680px] gap-6 sm:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="flex items-center gap-4"
              >
                <HexIcon>
                  {index === 0 ? (
                    <BeeSmallIcon />
                  ) : index === 1 ? (
                    <DropIcon />
                  ) : (
                    <HoneyIcon />
                  )}
                </HexIcon>

                <p className="text-[14px] font-semibold leading-5 text-[#f3e6c8] drop-shadow-[0_4px_12px_rgba(0,0,0,0.72)]">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-[49%] top-[47%] z-30 -translate-x-1/2 -translate-y-1/2">
          <LuxuryButton
            type="button"
            aria-label={
              isPaused
                ? "Запустить видео"
                : "Остановить видео"
            }
            aria-pressed={isPaused}
            onClick={toggleVideo}
            className="!flex !h-[72px] !w-[72px] !min-w-0 !translate-y-0 !items-center !justify-center !rounded-full !px-0 !py-0 [&_.luxury-button__content]:!flex [&_.luxury-button__content]:!h-full [&_.luxury-button__content]:!w-full [&_.luxury-button__content]:!items-center [&_.luxury-button__content]:!justify-center [&_.luxury-button__icon]:!m-0 [&_.luxury-button__icon]:!flex [&_.luxury-button__icon]:!h-full [&_.luxury-button__icon]:!w-full [&_.luxury-button__icon]:!items-center [&_.luxury-button__icon]:!justify-center [&_.luxury-button__label]:!hidden"
            icon={
              isPaused
                ? <PlayIcon />
                : <PauseIcon />
            }
          />
        </div>
      </div>
    </section>
  );
}