"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LuxuryButton from "@/components/home/shared/LuxuryButton";

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

function KinezoVideo() {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

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

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
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
    <div className="relative aspect-video overflow-hidden rounded-[18px] border border-[#d0a34a]/45 bg-[#020706] shadow-[0_18px_42px_rgba(0,0,0,0.32)]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/videos/kinez.webp"
        preload="none"
        playsInline
        controls={hasStarted}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(event) => event.preventDefault()}
      >
        <source src="/videos/services-vid2.mp4" type="video/mp4" />

        Ваш браузер не поддерживает воспроизведение видео.
      </video>

      <div
        className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,7,5,0.02)_0%,rgba(1,7,5,0.01)_58%,rgba(1,7,5,0.24)_100%)] transition-opacity duration-300 ${
          hasStarted && !isPaused ? "opacity-0" : "opacity-100"
        }`}
      />

      {(!hasStarted || isPaused) && (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <LuxuryButton
            type="button"
            aria-label={
              hasStarted ? "Продолжить воспроизведение" : "Запустить видео"
            }
            aria-pressed={hasStarted && !isPaused}
            onClick={toggleVideo}
            className="!flex !h-[72px] !w-[72px] !min-w-0 !translate-y-0 !items-center !justify-center !rounded-full !px-0 !py-0 [&_.luxury-button__content]:!flex [&_.luxury-button__content]:!h-full [&_.luxury-button__content]:!w-full [&_.luxury-button__content]:!items-center [&_.luxury-button__content]:!justify-center [&_.luxury-button__icon]:!m-0 [&_.luxury-button__icon]:!flex [&_.luxury-button__icon]:!h-full [&_.luxury-button__icon]:!w-full [&_.luxury-button__icon]:!items-center [&_.luxury-button__icon]:!justify-center [&_.luxury-button__label]:!hidden"
            icon={<PlayIcon />}
          />
        </div>
      )}

      {hasStarted && !isPaused && (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <LuxuryButton
            type="button"
            aria-label="Остановить видео"
            aria-pressed
            onClick={toggleVideo}
            className="!flex !h-[72px] !w-[72px] !min-w-0 !translate-y-0 !items-center !justify-center !rounded-full !px-0 !py-0 [&_.luxury-button__content]:!flex [&_.luxury-button__content]:!h-full [&_.luxury-button__content]:!w-full [&_.luxury-button__content]:!items-center [&_.luxury-button__content]:!justify-center [&_.luxury-button__icon]:!m-0 [&_.luxury-button__icon]:!flex [&_.luxury-button__icon]:!h-full [&_.luxury-button__icon]:!w-full [&_.luxury-button__icon]:!items-center [&_.luxury-button__icon]:!justify-center [&_.luxury-button__label]:!hidden"
            icon={<PauseIcon />}
          />
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
        <div className="relative overflow-hidden rounded-[24px] border border-[#d0a34a]/62 bg-transparent px-5 py-6 shadow-[0_-24px_40px_-26px_rgba(0,0,0,0.95),0_24px_40px_-26px_rgba(0,0,0,0.95)] sm:px-7 sm:py-8 lg:px-9 lg:py-9 xl:px-12 xl:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1 hidden h-[92px] w-[92px] rotate-[8deg] opacity-90 lg:block xl:right-5 xl:h-[105px] xl:w-[105px]"
          >
            <Image
              src="/images/services/bee.webp"
              alt=""
              fill
              sizes="105px"
              className="object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
            />
          </div>

          <div className="relative z-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start xl:gap-8">
            <div className="min-w-0">
              <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.34em] text-[#d7aa51]/82 sm:text-left sm:text-[11px]">
                Оборудование
              </p>

              <h2
                className="max-w-[760px] text-center text-[clamp(1.8rem,3vw,3.2rem)] font-normal uppercase leading-[1.08] tracking-[0.02em] text-[#e2b45b] sm:text-left"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                ОРМЕД-Кинезо
              </h2>

              <div className="mx-auto mt-3 h-px w-28 bg-gradient-to-r from-transparent via-[#d8ad56]/80 to-transparent sm:mx-0 sm:bg-gradient-to-r sm:from-[#d8ad56]/80 sm:via-[#d8ad56]/80 sm:to-transparent" />

              <div className="mt-4 max-w-[860px] space-y-3 text-[12px] font-medium leading-6 text-[#e8ddc8]/90 sm:text-[13px] sm:leading-7 lg:text-[14px]">
                <p>
                  «ОРМЕД-Кинезо» — установка для активно-пассивной механотерапии
                  позвоночника. Аппарат используется для выполнения лечебных
                  движений, направленных на восстановление функций
                  опорно-двигательной системы и улучшение обменных процессов в
                  тканях позвоночника.
                </p>

                <p>
                  Воздействие охватывает межпозвонковые диски, суставы, связочный
                  аппарат, сухожилия и мышцы.
                </p>

                <p>
                  Во время процедуры оборудование плавно и дозированно изменяет
                  углы сгибания и разгибания в шейном, грудном и поясничном
                  отделах позвоночника. Движения сочетаются с мягким растяжением
                  позвоночника и суставов.
                </p>
              </div>
            </div>

            <div className="relative flex min-h-[190px] items-start justify-center sm:min-h-[220px] lg:min-h-[250px] lg:justify-end">
              <div className="relative w-[112%] max-w-[680px] translate-y-5 sm:w-[116%] sm:translate-y-7 lg:w-[125%] lg:max-w-[820px] lg:translate-y-10">
                <Image
                  src="/images/services/kinez2.webp"
                  alt="ОРМЕД-Кинезо"
                  width={1448}
                  height={1086}
                  sizes="(max-width: 1023px) 100vw, 48vw"
                  className="pointer-events-none h-auto w-full select-none object-contain mix-blend-screen drop-shadow-[0_20px_42px_rgba(0,0,0,0.48)]"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 my-6 h-px w-full bg-gradient-to-r from-transparent via-[#a57833]/35 to-transparent sm:my-7 lg:my-8" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-12">
            <div className="min-w-0">
              <KinezoVideo />
            </div>

            <div className="relative flex flex-col justify-center">
              <div className="mb-7">
                <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7aa51] sm:text-left sm:text-[12px]">
                  Особенности процедуры
                </h3>

                <div className="mt-4 space-y-4 text-[12px] font-medium leading-7 text-[#e8ddc8]/88 sm:text-[13px] lg:text-[14px]">
                  <p>
                    Занятия проводятся в положении лёжа на спине, животе или
                    боку. Движения выполняются аппаратом плавно и дозированно,
                    поэтому активное напряжение мышц туловища практически не
                    требуется.
                  </p>

                  <p>
                    Такое воздействие позволяет последовательно работать с
                    шейным, грудным и поясничным отделами, сочетая сгибание,
                    разгибание и мягкое растяжение позвоночника и суставов.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7aa51] sm:text-left sm:text-[12px]">
                  Применение
                </h3>

                <div className="mt-4 space-y-4 text-[12px] font-medium leading-7 text-[#e8ddc8]/88 sm:text-[13px] lg:text-[14px]">
                  <p>
                    Продуманная конструкция и износостойкие материалы позволяют
                    использовать аппарат в регулярных программах лечения,
                    реабилитации и восстановления подвижности позвоночника.
                  </p>

                  <p>
                    «ОРМЕД-Кинезо» разработан НВП «Орбита» и предназначен для
                    проведения контролируемой аппаратной кинезиотерапии под
                    наблюдением специалиста.
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