"use client";

import DecorativeBeeIcon from "@/components/home/shared/DecorativeBeeIcon";
import { homeContent } from "@/data/homeContent";
import StoryHomeImage from "./CenterStorySection/StoryHomeImage";

export default function AboutTablet() {
  return (
    <section
      id="about"
      className="about-tablet-section relative isolate -mt-px overflow-hidden bg-black px-8 pb-20 pt-20 text-[#f3efe5] sm:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,106,0.08),transparent_24%),radial-gradient(circle_at_50%_42%,rgba(5,48,36,0.46),transparent_44%),linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(2,11,10,1)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[42px]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66a]/90 to-transparent shadow-[0_0_14px_rgba(216,182,106,0.52)]" />
        <div className="absolute left-1/2 top-0 h-[42px] w-[78%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(216,182,106,0.18)_0%,rgba(216,182,106,0.08)_34%,transparent_72%)] blur-xl" />
        <div className="absolute inset-x-0 top-0 h-[18px] bg-gradient-to-b from-[#d8b66a]/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[780px] flex-col items-center">
        <p className="m-0 text-center text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#d8b66a]/90 drop-shadow-[0_0_10px_rgba(216,182,106,0.18)]">
          {homeContent.about.eyebrow}
        </p>

        <h2 className="mt-4 max-w-[720px] text-center text-[clamp(3.4rem,8.8vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.08em] text-[#d8b66a] drop-shadow-[0_0_18px_rgba(216,182,106,0.18)]">
          {homeContent.about.title}
        </h2>

        <div className="mt-8 flex w-full max-w-[620px] items-center justify-center gap-6 text-[#d8b66a]">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/76 to-[#d8b66a]/48" />
          <DecorativeBeeIcon className="size-7 shrink-0 drop-shadow-[0_0_12px_rgba(216,182,106,0.42)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/48 via-[#d8b66a]/76 to-transparent" />
        </div>

        <div className="about-tablet-image mt-12 w-full max-w-[610px]">
          <StoryHomeImage />
        </div>

        <article className="relative mt-10 w-full overflow-hidden rounded-[34px] border border-[#d8b66a]/32 bg-[linear-gradient(180deg,rgba(4,29,24,0.72),rgba(1,12,10,0.88))] px-8 py-8 shadow-[0_22px_55px_rgba(0,0,0,0.42),inset_0_0_0_1px_rgba(255,235,180,0.08)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-transparent"
          />

          <div className="space-y-5 text-[1rem] font-medium leading-[1.9] tracking-[-0.045em] text-[#f3efe5]/88">
            {homeContent.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-12 flex w-full items-center justify-center gap-5 text-[#d8b66a]/90">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/62 to-[#d8b66a]/18" />
          <span className="size-2.5 rounded-full bg-[#d8b66a] shadow-[0_0_14px_rgba(216,182,106,0.5)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/18 via-[#d8b66a]/62 to-transparent" />
        </div>
      </div>

      <style jsx global>{`
        .about-tablet-section,
        .about-tablet-section * {
          font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
        }

        .about-tablet-image {
          position: relative;
          overflow: visible;
        }

        .about-tablet-image .story-home-image {
          min-height: 430px;
          transform: none;
        }

        .about-tablet-image img {
          display: block;
          width: 100%;
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      `}</style>
    </section>
  );
}