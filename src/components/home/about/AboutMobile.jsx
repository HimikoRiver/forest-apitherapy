"use client";

import DecorativeBeeIcon from "@/components/home/shared/DecorativeBeeIcon";
import { homeContent } from "@/data/homeContent";
import StoryHomeImage from "./CenterStorySection/StoryHomeImage";

export default function AboutMobile() {
  return (
    <section
      id="about"
      className="about-mobile-section relative isolate -mt-px overflow-hidden bg-black px-5 pb-16 pt-16 text-[#f3efe5]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,106,0.08),transparent_26%),linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(2,11,10,1)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[38px]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66a]/90 to-transparent shadow-[0_0_14px_rgba(216,182,106,0.52)]" />
        <div className="absolute left-1/2 top-0 h-[38px] w-[86%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(216,182,106,0.2)_0%,rgba(216,182,106,0.08)_34%,transparent_72%)] blur-xl" />
        <div className="absolute inset-x-0 top-0 h-[18px] bg-gradient-to-b from-[#d8b66a]/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[430px] flex-col">
        <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-[#d8b66a]/90 drop-shadow-[0_0_10px_rgba(216,182,106,0.18)]">
          {homeContent.about.eyebrow}
        </p>

        <h2 className="mt-4 text-[clamp(2.2rem,10.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.07em] text-[#d8b66a] drop-shadow-[0_0_14px_rgba(216,182,106,0.16)]">
          {homeContent.about.title}
        </h2>

        <div className="mt-7 flex items-center justify-center gap-5 text-[#d8b66a]">
          <span className="h-px w-[34%] bg-gradient-to-r from-transparent via-[#d8b66a]/76 to-[#d8b66a]/55" />
          <DecorativeBeeIcon className="size-6 shrink-0 drop-shadow-[0_0_10px_rgba(216,182,106,0.36)]" />
          <span className="h-px w-[34%] bg-gradient-to-r from-[#d8b66a]/55 via-[#d8b66a]/76 to-transparent" />
        </div>

        <div className="about-mobile-image mt-9">
          <StoryHomeImage />
        </div>

        <div className="mt-9 space-y-4 text-[0.95rem] font-medium leading-[1.82] tracking-[-0.04em] text-[#f3efe5]/86">
          {homeContent.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 text-[#d8b66a]/90">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/62 to-[#d8b66a]/18" />
          <span className="size-2 rounded-full bg-[#d8b66a] shadow-[0_0_14px_rgba(216,182,106,0.5)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/18 via-[#d8b66a]/62 to-transparent" />
        </div>
      </div>

      <style jsx global>{`
        .about-mobile-section,
        .about-mobile-section * {
          font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
        }

        .about-mobile-image {
          position: relative;
          overflow: visible;
        }

        .about-mobile-image .story-home-image {
          min-height: 280px;
          transform: none;
        }

        .about-mobile-image img {
          display: block;
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      `}</style>
    </section>
  );
}