"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const SLIDE_DURATION = 600;

function NavigationButton({ direction = "left", onClick, disabled }) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Предыдущее фото" : "Следующее фото"}
      className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#a87933]/65 bg-[#03110d]/88 text-[#d8ad56] shadow-[0_8px_24px_rgba(0,0,0,0.42)] outline-none transition-transform duration-150 active:scale-95 disabled:cursor-default disabled:active:scale-100"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isLeft ? (
          <path d="M14.5 5.5 8 12l6.5 6.5" />
        ) : (
          <path d="M9.5 5.5 16 12l-6.5 6.5" />
        )}
      </svg>
    </button>
  );
}

function GalleryHeader() {
  return (
    <div className="relative z-10 text-center">
      <div className="mx-auto flex max-w-[900px] items-center justify-center gap-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b98736]/55 to-[#d7aa51]/80" />

        <div
          aria-hidden="true"
          className="h-[7px] w-[7px] rotate-45 border border-[#d7aa51]/80 bg-[#061a13] shadow-[0_0_12px_rgba(215,170,81,0.3)]"
        />

        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#b98736]/55 to-[#d7aa51]/80" />
      </div>

      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.45em] text-[#d7aa51]/70">
        Центр, кабинеты и рабочие моменты
      </p>

      <h2
        className="mt-3 text-[2.2rem] font-normal uppercase leading-none tracking-[0.08em] text-[#e2b45b]"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        Фотогалерея
      </h2>

      <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#d8ad56]/75 to-transparent" />
    </div>
  );
}

export default function OrmedBookSliderTablet() {
  const photos = useMemo(
    () =>
      Array.from({ length: 25 }, (_, index) => ({
        src: `/images/services/slides/${index + 1}.webp`,
        alt: `Фотография центра APIDARB ${index + 1}`,
      })),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(null);

  const visibleIndex = transition?.toIndex ?? currentIndex;
  const progressPercent = ((visibleIndex + 1) / photos.length) * 100;

  const startTransition = (toIndex, direction) => {
    if (transition || toIndex === currentIndex) {
      return;
    }

    setTransition({
      fromIndex: currentIndex,
      toIndex,
      direction,
    });
  };

  const showPrev = () => {
    const nextIndex =
      currentIndex === 0 ? photos.length - 1 : currentIndex - 1;

    startTransition(nextIndex, "prev");
  };

  const showNext = () => {
    const nextIndex =
      currentIndex === photos.length - 1 ? 0 : currentIndex + 1;

    startTransition(nextIndex, "next");
  };

  const openPhoto = (photoIndex) => {
    if (transition || photoIndex === currentIndex) {
      return;
    }

    const forwardDistance =
      (photoIndex - currentIndex + photos.length) % photos.length;

    const backwardDistance =
      (currentIndex - photoIndex + photos.length) % photos.length;

    startTransition(
      photoIndex,
      forwardDistance <= backwardDistance ? "next" : "prev",
    );
  };

  const finishTransition = () => {
    if (!transition) {
      return;
    }

    setCurrentIndex(transition.toIndex);
    setTransition(null);
  };

  const outgoingPhoto = photos[transition?.fromIndex ?? currentIndex];
  const incomingPhoto = transition ? photos[transition.toIndex] : null;
  const isNextDirection = transition?.direction === "next";

  const previewIndexes = useMemo(
    () =>
      Array.from(
        { length: 4 },
        (_, offset) => (visibleIndex + offset) % photos.length,
      ),
    [photos.length, visibleIndex],
  );

  return (
    <section className="relative">
      <style>
        {`
          @keyframes tabletSlideOutLeft {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }

            to {
              transform: translate3d(-100%, 0, 0) scale(0.99);
              opacity: 0.76;
            }
          }

          @keyframes tabletSlideInRight {
            from {
              transform: translate3d(100%, 0, 0) scale(0.99);
              opacity: 0.76;
            }

            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }

          @keyframes tabletSlideOutRight {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }

            to {
              transform: translate3d(100%, 0, 0) scale(0.99);
              opacity: 0.76;
            }
          }

          @keyframes tabletSlideInLeft {
            from {
              transform: translate3d(-100%, 0, 0) scale(0.99);
              opacity: 0.76;
            }

            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

      <GalleryHeader />

      <div className="mx-auto mt-8 w-full max-w-[980px]">
        <div className="relative overflow-hidden rounded-[28px] border border-[#a57833]/58 bg-[linear-gradient(180deg,rgba(2,15,11,0.94)_0%,rgba(1,10,8,0.98)_100%)] px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.42)]">
          <div className="relative overflow-hidden rounded-[22px] border border-[#d0a34a]/36 bg-[#020706] shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <div
                className="absolute inset-0 will-change-transform"
                style={
                  transition
                    ? {
                        animation: `${
                          isNextDirection
                            ? "tabletSlideOutLeft"
                            : "tabletSlideOutRight"
                        } ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                      }
                    : undefined
                }
              >
                <Image
                  src={outgoingPhoto.src}
                  alt={outgoingPhoto.alt}
                  fill
                  priority={currentIndex === 0}
                  sizes="(max-width: 1279px) 90vw, 980px"
                  className="object-cover object-center"
                />
              </div>

              {transition && incomingPhoto ? (
                <div
                  className="absolute inset-0 will-change-transform"
                  style={{
                    animation: `${
                      isNextDirection
                        ? "tabletSlideInRight"
                        : "tabletSlideInLeft"
                    } ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                  }}
                  onAnimationEnd={finishTransition}
                >
                  <Image
                    src={incomingPhoto.src}
                    alt={incomingPhoto.alt}
                    fill
                    sizes="(max-width: 1279px) 90vw, 980px"
                    className="object-cover object-center"
                  />
                </div>
              ) : null}

              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_18%,rgba(0,0,0,0)_72%,rgba(0,0,0,0.18)_100%)]" />

              <div className="absolute left-3 top-1/2 z-20 -translate-y-1/2">
                <NavigationButton
                  direction="left"
                  onClick={showPrev}
                  disabled={Boolean(transition)}
                />
              </div>

              <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2">
                <NavigationButton
                  direction="right"
                  onClick={showNext}
                  disabled={Boolean(transition)}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-3">
            {previewIndexes.map((photoIndex) => {
              const photo = photos[photoIndex];
              const isActive = photoIndex === visibleIndex;

              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => openPhoto(photoIndex)}
                  disabled={Boolean(transition)}
                  aria-label={`Открыть фото ${photoIndex + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative overflow-hidden rounded-[16px] border outline-none transition-[border-color,opacity] duration-300 disabled:cursor-default ${
                    isActive
                      ? "border-[#d8ad56]/80 shadow-[0_0_0_1px_rgba(216,173,86,0.22)]"
                      : "border-[#a57833]/34"
                  }`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="220px"
                      className="object-cover object-center"
                    />

                    <div
                      className={`pointer-events-none absolute inset-0 transition duration-300 ${
                        isActive
                          ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.08))]"
                          : "bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.22))]"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 px-1">
            <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#0b241a]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#8d6123_0%,#c68f3c_28%,#f4d88f_60%,#8d6123_100%)] shadow-[0_0_10px_rgba(216,173,86,0.28)] transition-[width] duration-500"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <span
              aria-live="polite"
              className="inline-flex min-w-[94px] items-center justify-center rounded-full border border-[#a87933]/55 bg-[#03110d]/92 px-4 py-2 text-[12px] font-bold tracking-[0.18em] text-[#d8ad56] shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              {String(visibleIndex + 1).padStart(2, "0")} / {photos.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}