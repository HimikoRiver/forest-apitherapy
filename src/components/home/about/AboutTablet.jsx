"use client";

import Image from "next/image";
import { Fragment } from "react";
import DecorativeBeeIcon from "@/components/home/shared/DecorativeBeeIcon";
import { homeContent } from "@/data/homeContent";
import StoryHomeImage from "./CenterStorySection/StoryHomeImage";

const ABOUT_BEE_IMAGE = "/images/hero/heroMobileBee.webp";
const GOLD_PHRASE = "«Апи-Дарб»";

function AnimatedParagraphText({ text }) {
  const parts = text.split(GOLD_PHRASE);

  return parts.map((part, index) => (
    <Fragment key={`${index}-${part}`}>
      {part}

      {index < parts.length - 1 ? (
        <span className="about-tablet-gold-text">{GOLD_PHRASE}</span>
      ) : null}
    </Fragment>
  ));
}

export default function AboutTablet() {
  return (
    <section
      id="about"
      className="about-tablet-section relative isolate -mt-px overflow-hidden bg-black px-8 pb-14 pt-20 text-[#f3efe5] sm:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[42px]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66a]/90 to-transparent shadow-[0_0_14px_rgba(216,182,106,0.52)]" />

        <div className="absolute left-1/2 top-0 h-[42px] w-[78%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(216,182,106,0.18)_0%,rgba(216,182,106,0.08)_34%,transparent_72%)] blur-xl" />

        <div className="absolute inset-x-0 top-0 h-[18px] bg-gradient-to-b from-[#d8b66a]/10 to-transparent" />
      </div>

      <div className="about-tablet-content relative z-10 mx-auto flex w-full max-w-[780px] flex-col items-center">
        <p className="m-0 text-center text-[0.78rem] font-semibold uppercase tracking-[0.48em] text-[#d8b66a]/90 drop-shadow-[0_0_10px_rgba(216,182,106,0.18)]">
          {homeContent.about.eyebrow}
        </p>

        <h2 className="about-tablet-title mt-4 max-w-[720px] text-center text-[clamp(3.4rem,8.8vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.08em] text-[#d8b66a] drop-shadow-[0_0_18px_rgba(216,182,106,0.18)]">
          {homeContent.about.title}
        </h2>

        <div className="about-tablet-title-divider mt-8 flex w-full max-w-[620px] items-center justify-center gap-6 text-[#d8b66a]">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/76 to-[#d8b66a]/48" />

          <DecorativeBeeIcon className="size-7 shrink-0 drop-shadow-[0_0_12px_rgba(216,182,106,0.42)]" />

          <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/48 via-[#d8b66a]/76 to-transparent" />
        </div>

        <div className="about-tablet-image mt-12 w-full max-w-[610px]">
          <StoryHomeImage />
        </div>

        <div className="about-tablet-copy mt-11 w-full max-w-[700px] space-y-5 text-left text-[1rem] font-medium leading-[1.9] tracking-[-0.045em] text-[#f3efe5]/88">
          {homeContent.about.paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`} className="m-0">
              <AnimatedParagraphText text={paragraph} />
            </p>
          ))}
        </div>

        <div className="about-tablet-bottom-divider mt-12 flex w-full items-center justify-center gap-5 text-[#d8b66a]/90">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/62 to-[#d8b66a]/18" />

          <span className="size-2.5 rounded-full bg-[#d8b66a] shadow-[0_0_14px_rgba(216,182,106,0.5)]" />

          <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/18 via-[#d8b66a]/62 to-transparent" />
        </div>

        <div className="about-tablet-bee relative mx-auto mt-9 aspect-square w-full max-w-[180px] overflow-hidden">
          <Image
            src={ABOUT_BEE_IMAGE}
            alt="Золотая пчела"
            fill
            sizes="(min-width: 1000px) 210px, 180px"
            className="pointer-events-none select-none object-contain"
          />
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

        .about-tablet-gold-text {
          display: inline;
          color: transparent;
          font-weight: 800;
          background-image: linear-gradient(
            105deg,
            #8c6425 0%,
            #d8b66a 18%,
            #fff4c7 34%,
            #d8b66a 48%,
            #c99138 64%,
            #f4d88f 82%,
            #8c6425 100%
          );
          background-position: 0% 50%;
          background-size: 240% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 14px rgba(216, 182, 106, 0.18);
          animation: aboutTabletGoldTextShimmer 5.5s linear infinite;
        }

        @keyframes aboutTabletGoldTextShimmer {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 240% 50%;
          }
        }

        @media (min-width: 1000px) and (max-width: 1279px) {
          .about-tablet-section {
            padding-right: 52px;
            padding-left: 52px;
            padding-bottom: 64px;
          }

          .about-tablet-content {
            max-width: 920px;
          }

          .about-tablet-title {
            max-width: 860px;
            font-size: clamp(5.6rem, 9vw, 6.3rem);
          }

          .about-tablet-title-divider {
            max-width: 720px;
          }

          .about-tablet-image {
            max-width: 760px;
            margin-top: 44px;
          }

          .about-tablet-image .story-home-image {
            min-height: 510px;
          }

          .about-tablet-copy {
            max-width: 840px;
            margin-top: 44px;
            font-size: 1.1rem;
            line-height: 1.88;
          }

          .about-tablet-bottom-divider {
            max-width: 840px;
            margin-top: 48px;
          }

          .about-tablet-bee {
            max-width: 210px;
            margin-top: 32px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-tablet-gold-text {
            animation: none;
            background-position: 50% 50%;
          }
        }
      `}</style>
    </section>
  );
}