"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LuxuryButton from "@/components/home/shared/LuxuryButton";

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] translate-x-[1px] sm:h-[22px] sm:w-[22px] lg:h-[23px] lg:w-[23px]"
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
      className="h-[18px] w-[18px] translate-x-[2px] sm:h-[22px] sm:w-[22px] lg:h-[23px] lg:w-[23px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function CircleVideoButton({
  onClick,
  ariaLabel,
  icon,
  pressed = false,
  hiddenOnDesktopHover = false,
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={pressed}
      onClick={onClick}
      className={`group relative flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#d6a950]/80 bg-[radial-gradient(circle_at_30%_30%,rgba(18,56,38,0.98),rgba(5,22,15,0.98))] text-[#e8bc63] shadow-[0_10px_28px_rgba(0,0,0,0.42),0_0_0_1px_rgba(216,173,86,0.16)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_18px_rgba(216,173,86,0.25)] active:scale-[0.98] sm:h-[66px] sm:w-[66px] ${
        hiddenOnDesktopHover ? "opacity-0 hover:opacity-100" : ""
      }`}
    >
      <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#f4d487]/18 sm:inset-[4px]" />

      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(255,232,173,0.12),transparent_46%)]" />

      <span className="relative z-10 flex items-center justify-center">
        {icon}
      </span>
    </button>
  );
}

function DesktopVideoButton({
  onClick,
  ariaLabel,
  icon,
  pressed = false,
}) {
  return (
    <LuxuryButton
      type="button"
      aria-label={ariaLabel}
      aria-pressed={pressed}
      onClick={onClick}
      className="!flex !h-[72px] !w-[72px] !min-w-0 !translate-y-0 !items-center !justify-center !rounded-full !px-0 !py-0 [&_.luxury-button__content]:!flex [&_.luxury-button__content]:!h-full [&_.luxury-button__content]:!w-full [&_.luxury-button__content]:!items-center [&_.luxury-button__content]:!justify-center [&_.luxury-button__icon]:!m-0 [&_.luxury-button__icon]:!flex [&_.luxury-button__icon]:!h-full [&_.luxury-button__icon]:!w-full [&_.luxury-button__icon]:!items-center [&_.luxury-button__icon]:!justify-center [&_.luxury-button__label]:!hidden"
      icon={icon}
    />
  );
}

function BeeEmblem() {
  return (
    <svg
      viewBox="0 0 96 56"
      className="h-9 w-[58px] drop-shadow-[0_0_12px_rgba(238,195,98,0.35)] sm:h-10 sm:w-[64px]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="bee-gold-kinezo"
          x1="10"
          y1="8"
          x2="82"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7d5219" />
          <stop offset="0.28" stopColor="#f8dfa2" />
          <stop offset="0.55" stopColor="#b87924" />
          <stop offset="0.82" stopColor="#fff0b8" />
          <stop offset="1" stopColor="#7a4f18" />
        </linearGradient>
      </defs>

      <g
        stroke="url(#bee-gold-kinezo)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M30 18c-6-6-12-7-17-3 0 0-2 7 6 12"
          opacity="0.85"
        />

        <path
          d="M66 18c6-6 12-7 17-3 0 0 2 7-6 12"
          opacity="0.85"
        />

        <path
          d="M21 13c-1-4-4-6-7-8"
          opacity="0.7"
        />

        <path
          d="M75 13c1-4 4-6 7-8"
          opacity="0.7"
        />

        <ellipse
          cx="48"
          cy="30"
          rx="12"
          ry="15"
        />

        <path d="M39 27h18" />
        <path d="M38 33h20" />
        <path d="M41 21h14" />

        <path
          d="M48 15v-6"
          opacity="0.85"
        />

        <path
          d="M44 10 40 6"
          opacity="0.8"
        />

        <path
          d="M52 10 56 6"
          opacity="0.8"
        />

        <path
          d="M36 28h-8"
          opacity="0.75"
        />

        <path
          d="M60 28h8"
          opacity="0.75"
        />

        <path
          d="M43 45 39 50"
          opacity="0.8"
        />

        <path
          d="M53 45 57 50"
          opacity="0.8"
        />

        <path
          d="m48 45 3 6-3 2-3-2 3-6Z"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}

function MobileTabletVideoFrame({ children }) {
  return (
    <div className="relative">
      <style>
        {`
          @keyframes ormed-bee-glow-kinezo {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.88;
              filter: drop-shadow(0 0 6px rgba(238,195,98,0.22));
            }

            50% {
              transform: translateY(-2px);
              opacity: 1;
              filter: drop-shadow(0 0 16px rgba(238,195,98,0.52));
            }
          }

          @keyframes ormed-soft-breathe-kinezo {
            0%, 100% {
              opacity: 0.34;
              transform: scale(0.98);
            }

            50% {
              opacity: 0.56;
              transform: scale(1.02);
            }
          }
        `}
      </style>

      <div className="relative px-2 pb-6 pt-8 sm:px-4 sm:pb-8 sm:pt-10 lg:p-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[53%] h-[68%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#d8ad56]/10 blur-[32px] motion-safe:animate-[ormed-soft-breathe-kinezo_5s_ease-in-out_infinite] lg:hidden"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-20 flex -translate-x-1/2 flex-col items-center lg:hidden"
        >
          <div className="motion-safe:animate-[ormed-bee-glow-kinezo_4.6s_ease-in-out_infinite]">
            <BeeEmblem />
          </div>

          <div className="-mt-1 flex items-center">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#e6b95c]/85 sm:w-24" />

            <span className="mx-2 h-[3px] w-[3px] rotate-45 bg-[#f3d17f]" />

            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#e6b95c]/85 sm:w-24" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[6px] top-1/2 z-10 hidden h-16 w-8 -translate-y-1/2 rounded-r-full border-b border-r border-t border-[#d8ad56]/18 sm:block lg:hidden"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6px] top-1/2 z-10 hidden h-16 w-8 -translate-y-1/2 rounded-l-full border-b border-l border-t border-[#d8ad56]/18 sm:block lg:hidden"
        />

        <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,rgba(120,79,24,0.95),rgba(246,220,154,0.95),rgba(141,89,28,0.95),rgba(255,240,190,0.92),rgba(122,79,24,0.95))] p-[1px] sm:rounded-[28px] lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0">
          <div className="relative overflow-hidden rounded-[23px] bg-[#03110d] p-[8px] sm:rounded-[27px] sm:p-[10px] lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[4px] rounded-[20px] border border-[#efcb78]/12 sm:rounded-[24px] lg:hidden"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-12 w-12 rounded-br-[28px] border-b border-r border-[#efcb78]/18 lg:hidden"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-12 w-12 rounded-bl-[28px] border-b border-l border-[#efcb78]/18 lg:hidden"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 rounded-tr-[28px] border-r border-t border-[#efcb78]/18 lg:hidden"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 rounded-tl-[28px] border-l border-t border-[#efcb78]/18 lg:hidden"
            />

            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[17%] bottom-2 flex items-center justify-center gap-2 lg:hidden"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c28a35]/60 to-[#f1cf83]/55" />

          <span className="h-[6px] w-[6px] rotate-45 border border-[#e8bd67]/75 bg-[#052016]" />

          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#c28a35]/60 to-[#f1cf83]/55" />
        </div>
      </div>
    </div>
  );
}

function VideoVineFrame({
  children,
  mirrored = false,
}) {
  return (
    <div
      className={
        mirrored
          ? "relative lg:pr-[56px] lg:pb-[72px] lg:pt-[30px]"
          : "relative lg:pl-[56px] lg:pb-[72px] lg:pt-[30px]"
      }
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-20 hidden lg:block ${
          mirrored
            ? "-right-[120px]"
            : "-left-[20%]"
        } -bottom-[8%] w-[140%]`}
      >
        <Image
          src="/images/services/vine.webp"
          alt=""
          width={3344}
          height={1882}
          sizes="62vw"
          className={`h-auto w-full max-w-none select-none object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.22)] ${
            mirrored ? "-scale-x-100" : ""
          }`}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function KinezoVideo() {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] =
    useState(false);
  const [isPaused, setIsPaused] =
    useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePlay = () => {
      setHasStarted(true);
      setIsPaused(false);
    };

    const handlePause = () => {
      setIsPaused(true);
    };

    const handleEnded = () => {
      setIsPaused(true);
    };

    video.addEventListener(
      "play",
      handlePlay
    );

    video.addEventListener(
      "pause",
      handlePause
    );

    video.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      video.removeEventListener(
        "play",
        handlePlay
      );

      video.removeEventListener(
        "pause",
        handlePause
      );

      video.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      return;
    }

    video.pause();
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-[17px] border border-[#d0a34a]/45 bg-[#020706] shadow-[0_18px_42px_rgba(0,0,0,0.36)] sm:rounded-[19px] lg:rounded-none lg:shadow-[0_18px_42px_rgba(0,0,0,0.32)]">
      <style>{`
        @media (max-width: 1023px) {
          .ormed-native-controls-video::-webkit-media-controls-overlay-play-button,
          .ormed-native-controls-video::-webkit-media-controls-start-playback-button,
          .ormed-native-controls-video::-webkit-media-controls-play-button {
            display: none !important;
            -webkit-appearance: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }
      `}</style>

      <video
        ref={videoRef}
        className="ormed-native-controls-video absolute inset-0 h-full w-full object-cover"
        poster="/videos/kinez.webp"
        preload="none"
        playsInline
        controls={hasStarted}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(event) =>
          event.preventDefault()
        }
      >
        <source
          src="/videos/services-vid2.mp4"
          type="video/mp4"
        />

        Ваш браузер не поддерживает воспроизведение
        видео.
      </video>

      <div
        className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,7,5,0.04)_0%,rgba(1,7,5,0.01)_58%,rgba(1,7,5,0.25)_100%)] transition-opacity duration-300 lg:bg-[linear-gradient(180deg,rgba(1,7,5,0.02)_0%,rgba(1,7,5,0.01)_58%,rgba(1,7,5,0.24)_100%)] ${
          hasStarted && !isPaused
            ? "opacity-0"
            : "opacity-100"
        }`}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,173,86,0.045),transparent_42%)] lg:hidden" />

      {(!hasStarted || isPaused) && (
        <div className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2 sm:top-[43%] lg:top-1/2">
          <div className="lg:hidden">
            <CircleVideoButton
              onClick={toggleVideo}
              ariaLabel={
                hasStarted
                  ? "Продолжить воспроизведение"
                  : "Запустить видео"
              }
              pressed={
                hasStarted && !isPaused
              }
              icon={<PlayIcon />}
            />
          </div>

          <div className="hidden lg:block">
            <DesktopVideoButton
              onClick={toggleVideo}
              ariaLabel={
                hasStarted
                  ? "Продолжить воспроизведение"
                  : "Запустить видео"
              }
              pressed={
                hasStarted && !isPaused
              }
              icon={<PlayIcon />}
            />
          </div>
        </div>
      )}

      {hasStarted && !isPaused && (
        <div className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-300 sm:top-[43%] lg:top-1/2 lg:opacity-0 lg:hover:opacity-100">
          <div className="lg:hidden">
            <CircleVideoButton
              onClick={toggleVideo}
              ariaLabel="Остановить видео"
              pressed
              icon={<PauseIcon />}
            />
          </div>

          <div className="hidden lg:block">
            <DesktopVideoButton
              onClick={toggleVideo}
              ariaLabel="Остановить видео"
              pressed
              icon={<PauseIcon />}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrmedKinezoSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/services/fon22.webp"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="pointer-events-none -z-30 select-none object-cover"
      />

      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#03180f]/14" />

      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(24,88,55,0.12),transparent_64%)]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[130px] bg-[linear-gradient(180deg,rgb(0,0,0)_0%,rgba(0,0,0,0.62)_32%,rgba(0,0,0,0.18)_74%,transparent_100%)] sm:h-[150px] lg:h-[170px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[130px] bg-[linear-gradient(0deg,rgb(0,0,0)_0%,rgba(0,0,0,0.62)_32%,rgba(0,0,0,0.18)_74%,transparent_100%)] sm:h-[150px] lg:h-[170px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 sm:px-7 lg:px-10 xl:px-16">
        <div className="relative overflow-hidden rounded-[24px] border border-[#d0a34a]/62 bg-transparent px-5 py-6 shadow-[0_-24px_40px_-26px_rgba(0,0,0,0.95),0_24px_40px_-26px_rgba(0,0,0,0.95)] sm:px-7 sm:py-5 lg:px-9 lg:py-9 xl:px-12 xl:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1 hidden h-[92px] w-[92px] -rotate-[8deg] opacity-90 lg:block xl:left-5 xl:h-[105px] xl:w-[105px]"
          >
            <Image
              src="/images/services/bee.webp"
              alt=""
              fill
              sizes="105px"
              className="-scale-x-100 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
            />
          </div>

          <div className="relative z-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-8">
            <div className="min-w-0 lg:order-2">
              <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.34em] text-[#d7aa51]/82 sm:text-left sm:text-[11px]">
                Оборудование
              </p>

              <h2
                className="max-w-[760px] text-center text-[clamp(1.8rem,3vw,3.2rem)] font-normal uppercase leading-[1.08] tracking-[0.02em] text-[#e2b45b] sm:text-left"
                style={{
                  fontFamily:
                    "Georgia, 'Times New Roman', serif",
                }}
              >
                ОРМЕД-Кинезо
              </h2>

              <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-transparent via-[#d8ad56]/80 to-transparent sm:mx-0 sm:bg-gradient-to-r sm:from-[#d8ad56]/80 sm:via-[#d8ad56]/80 sm:to-transparent" />

              <div className="mt-4 max-w-[860px] space-y-3 text-[12px] font-medium leading-6 text-[#e8ddc8]/90 sm:text-[13px] sm:leading-7 lg:text-[14px]">
                <p>
                  «ОРМЕД-Кинезо» — установка для
                  активно-пассивной механотерапии
                  позвоночника. Аппарат используется для
                  выполнения лечебных движений,
                  направленных на восстановление функций
                  опорно-двигательной системы и улучшение
                  обменных процессов в тканях
                  позвоночника.
                </p>

                <p>
                  Воздействие охватывает межпозвонковые
                  диски, суставы, связочный аппарат,
                  сухожилия и мышцы.
                </p>

                <p>
                  Во время процедуры оборудование плавно
                  и дозированно изменяет углы сгибания и
                  разгибания в шейном, грудном и
                  поясничном отделах позвоночника.
                  Движения сочетаются с мягким растяжением
                  позвоночника и суставов.
                </p>
              </div>
            </div>

            <div className="relative flex min-h-[190px] items-start justify-center sm:min-h-[170px] lg:order-1 lg:min-h-[320px] lg:items-center lg:justify-start">
              <div className="relative w-[112%] max-w-[680px] translate-y-5 sm:w-[116%] sm:translate-y-1 lg:w-[128%] lg:max-w-[920px] lg:-translate-x-10 lg:translate-y-10">
                <Image
                  src="/images/services/kinez2.webp"
                  alt="ОРМЕД-Кинезо"
                  width={1448}
                  height={1086}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="pointer-events-none h-auto w-full select-none object-contain mix-blend-screen drop-shadow-[0_20px_42px_rgba(0,0,0,0.48)]"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 my-6 h-px w-full bg-gradient-to-r from-transparent via-[#a57833]/35 to-transparent sm:my-4 lg:my-8" />

          <div className="relative z-10 grid gap-8 sm:gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-8 xl:gap-12">
            <div className="min-w-0 lg:order-2">
              <VideoVineFrame mirrored>
                <MobileTabletVideoFrame>
                  <KinezoVideo />
                </MobileTabletVideoFrame>
              </VideoVineFrame>
            </div>

            <div className="relative flex flex-col justify-center lg:order-1">
              <div className="mb-7 sm:mb-5 lg:mb-7">
                <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7aa51] sm:text-left sm:text-[12px]">
                  Особенности процедуры
                </h3>

                <div className="mt-4 space-y-4 text-[12px] font-medium leading-7 text-[#e8ddc8]/88 sm:text-[13px] lg:text-[14px]">
                  <p>
                    Занятия проводятся в положении лёжа на
                    спине, животе или боку. Движения
                    выполняются аппаратом плавно и
                    дозированно, поэтому активное
                    напряжение мышц туловища практически
                    не требуется.
                  </p>

                  <p>
                    Такое воздействие позволяет
                    последовательно работать с шейным,
                    грудным и поясничным отделами, сочетая
                    сгибание, разгибание и мягкое
                    растяжение позвоночника и суставов.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7aa51] sm:text-left sm:text-[12px]">
                  Применение
                </h3>

                <div className="mt-4 space-y-4 text-[12px] font-medium leading-7 text-[#e8ddc8]/88 sm:text-[13px] lg:text-[14px]">
                  <p>
                    Продуманная конструкция и
                    износостойкие материалы позволяют
                    использовать аппарат в регулярных
                    программах лечения, реабилитации и
                    восстановления подвижности
                    позвоночника.
                  </p>

                  <p>
                    «ОРМЕД-Кинезо» разработан НВП
                    «Орбита» и предназначен для проведения
                    контролируемой аппаратной
                    кинезиотерапии под наблюдением
                    специалиста.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}