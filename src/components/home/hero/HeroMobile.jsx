import Image from "next/image";
import LuxuryButton from "@/components/home/shared/LuxuryButton";
import MobileHeroMenu from "./MobileHeroMenu";

const HERO_BACKGROUND = "/images/home/hero/mobile/hero-bg6.webp";
const LOGO_IMAGE = "/images/logo1.webp";

export default function HeroMobile() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#020b0b] text-[#f3efe5]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <Image
        src={HERO_BACKGROUND}
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-top"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_34%,rgba(0,0,0,0.1)_100%)]"
      />

      <header className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-5 pt-[calc(env(safe-area-inset-top)+18px)]">
        <div className="flex items-center gap-3">
          <span className="relative block size-[52px] shrink-0 overflow-hidden rounded-full shadow-[0_0_18px_rgba(216,182,106,0.22)]">
            <Image
              src={LOGO_IMAGE}
              alt="APIDARB"
              fill
              sizes="52px"
              className="object-cover"
            />
          </span>

          <span className="block pt-1">
            <span className="block text-[1.62rem] font-semibold uppercase leading-none tracking-[0.13em] text-[#e5c56f] drop-shadow-[0_0_12px_rgba(216,182,106,0.25)]">
              APIDARB
            </span>

            <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#d8b66a]/90">
              Центр апитерапии
            </span>
          </span>
        </div>
      </header>

      <MobileHeroMenu />

      <div
        className="absolute inset-x-0 z-20 px-5"
        style={{
          top: "clamp(358px, 54svh, 505px)",
        }}
      >
        <div className="mx-auto w-full max-w-[350px] text-center">
          <h1
            className="m-0 text-[clamp(3rem,14vw,4.35rem)] font-normal leading-[0.9] tracking-[0.01em] text-[#e7cb78] drop-shadow-[0_0_18px_rgba(0,0,0,0.68)]"
            style={{
              fontFamily:
                '"ApitherapyCustom", var(--font-comfortaa), Arial, Helvetica, sans-serif',
            }}
          >
            Апитерапия
          </h1>

          <p className="m-0 mt-4 text-[clamp(1.05rem,4.55vw,1.34rem)] font-semibold leading-[1.22] tracking-[-0.045em] text-[#a8cf98] drop-shadow-[0_0_12px_rgba(216,182,106,0.46)]">
            Природа. Наука. Гармония.
          </p>

          <div className="mx-auto mt-7 max-w-[330px]">
            <LuxuryButton className="min-h-[58px] w-full justify-center text-[0.9rem]">
              Записаться на консультацию
            </LuxuryButton>
          </div>
        </div>
      </div>
    </section>
  );
}