"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LuxuryButton from "@/components/home/shared/LuxuryButton";
import HoneycombRows from "@/components/home/about/CenterStorySection/HoneycombRows";

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

function OrmedVideo() {
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
        poster="/videos/prev.webp"
        preload="none"
        playsInline
        controls={hasStarted}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(event) => event.preventDefault()}
      >
        <source src="/videos/services-vid1.mp4" type="video/mp4" />

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

export default function OrmedEquipmentSection() {
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
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[220px] bg-[linear-gradient(180deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.86)_18%,rgba(0,0,0,0.5)_48%,rgba(0,0,0,0.18)_76%,transparent_100%)]"
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
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.34em] text-[#d7aa51]/82 sm:text-[11px]">
                Оборудование
              </p>

              <h2
                className="max-w-[760px] text-[clamp(1.8rem,3vw,3.2rem)] font-normal uppercase leading-[1.08] tracking-[0.02em] text-[#e2b45b]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                ORMED-Тракцион
              </h2>

              <div className="mt-3 h-px w-28 bg-gradient-to-r from-[#d8ad56]/80 to-transparent" />

              <div className="mt-4 max-w-[860px] space-y-3 text-[12px] font-medium leading-6 text-[#e8ddc8]/90 sm:text-[13px] sm:leading-7 lg:text-[14px]">
                <p>
                  В центре используется современная система ORMED для
                  контролируемой работы с шейным и поясничным отделами
                  позвоночника. Параметры воздействия регулируются специалистом
                  с учётом состояния человека и задач восстановительной
                  программы.
                </p>

                <p>
                  Дозированное вытяжение способствует снижению нагрузки на
                  позвоночник, расслаблению перенапряжённых мышц и восстановлению
                  естественной подвижности. Комфортная кушетка и мягкое тепловое
                  воздействие помогают подготовить тело к процедуре.
                </p>

                <p>
                  ORMED может применяться как самостоятельная методика или
                  становиться частью комплексной программы вместе с другими
                  процедурами центра.
                </p>
              </div>
            </div>

            <div className="relative flex min-h-[190px] items-start justify-center sm:min-h-[220px] lg:min-h-[250px] lg:justify-end">
              <div className="relative w-[112%] max-w-[680px] translate-y-5 sm:w-[116%] sm:translate-y-7 lg:w-[125%] lg:max-w-[820px] lg:translate-y-10">
                <Image
                  src="/images/services/ormed.webp"
                  alt="ORMED-Тракцион"
                  width={1448}
                  height={1086}
                  sizes="(max-width: 1023px) 100vw, 48vw"
                  className="h-auto w-full object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 my-6 h-px w-full bg-gradient-to-r from-transparent via-[#a57833]/35 to-transparent sm:my-7 lg:my-8" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-12">
            <div className="min-w-0">
              <div className="mb-4 px-5 sm:mb-5 sm:px-6">
                <HoneycombRows mode="standalone" direction="top" />
              </div>

              <OrmedVideo />

              <div className="mt-4 px-5 sm:mt-5 sm:px-6">
                <HoneycombRows mode="standalone" direction="bottom" />
              </div>
            </div>

            <div className="relative flex flex-col justify-center">
              <div className="mb-7">
                <div className="flex items-center gap-4">
                  <h3 className="shrink-0 text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7aa51] sm:text-[12px]">
                    Описание процедуры
                  </h3>

                  <div className="h-px flex-1 bg-gradient-to-r from-[#d7aa51]/65 to-transparent" />
                </div>

                <div className="mt-4 space-y-4 text-[12px] font-medium leading-7 text-[#e8ddc8]/88 sm:text-[13px] lg:text-[14px]">
                  <p>
                    Аппарат позволяет проводить дозированное вытяжение шейного и
                    поясничного отделов позвоночника. Интенсивность и
                    продолжительность воздействия подбираются специалистом
                    индивидуально.
                  </p>

                  <p>
                    Инфракрасный подогрев поверхности кушетки способствует
                    расслаблению мышц и подготовке тканей к вытяжению. Тепловое
                    воздействие поддерживает местное кровообращение, помогает
                    уменьшить напряжение и делает процедуру комфортнее.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4">
                  <h3 className="shrink-0 text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7aa51] sm:text-[12px]">
                    Показания и эффект
                  </h3>

                  <div className="h-px flex-1 bg-gradient-to-r from-[#d7aa51]/65 to-transparent" />
                </div>

                <div className="mt-4 space-y-4 text-[12px] font-medium leading-7 text-[#e8ddc8]/88 sm:text-[13px] lg:text-[14px]">
                  <p>
                    Тракционная методика может использоваться в комплексных
                    программах при протрузиях, межпозвонковых грыжах,
                    дегенеративных изменениях позвоночника, нарушениях осанки,
                    сколиозе и мышечном перенапряжении.
                  </p>

                  <p>
                    Процедуры направлены на уменьшение избыточной нагрузки,
                    поддержку подвижности позвоночника и профилактику
                    дальнейшего развития нарушений. Возможность проведения курса
                    определяется после консультации специалиста.
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