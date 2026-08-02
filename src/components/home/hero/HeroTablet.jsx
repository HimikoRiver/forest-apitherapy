import Image from "next/image";
import LuxuryButton from "@/components/home/shared/LuxuryButton";

const HERO_BACKGROUND = "/images/home/hero/mobile/hero-bg6.webp";

export default function HeroTablet() {
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
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.12)_100%)]"
      />

      <header className="absolute inset-x-0 top-0 z-20 px-5 pt-[calc(env(safe-area-inset-top)+22px)]">
        <span className="block text-[1.68rem] font-semibold uppercase leading-none tracking-[0.15em] text-[#e5c56f] drop-shadow-[0_0_12px_rgba(216,182,106,0.25)]">
          APIDARB
        </span>
      </header>

      <div className="hero-tablet-content absolute inset-x-0 z-20 px-10">
        <div className="mx-auto w-full max-w-[620px] text-center">
          <h1
            className="m-0 text-[clamp(4.8rem,9.2vw,6.9rem)] font-normal leading-[0.9] tracking-[0.01em] text-[#e7cb78] drop-shadow-[0_0_22px_rgba(0,0,0,0.7)]"
            style={{
              fontFamily:
                '"ApitherapyCustom", var(--font-comfortaa), Arial, Helvetica, sans-serif',
            }}
          >
            Апитерапия
          </h1>

          <p className="m-0 mt-5 text-[clamp(1.3rem,2.6vw,1.78rem)] font-semibold leading-[1.25] tracking-[-0.045em] text-[#a8cf98] drop-shadow-[0_0_12px_rgba(216,182,106,0.45)]">
            Природа. Наука. Гармония.
          </p>

          <p className="mx-auto mt-4 max-w-[470px] text-[1.02rem] font-medium leading-7 text-[#f3efe5]/86 drop-shadow-[0_0_12px_rgba(0,0,0,0.58)]">
            Целебная сила пчёл, проверенная временем.
          </p>

          <div className="mx-auto mt-9 max-w-[460px]">
            <LuxuryButton className="min-h-[66px] w-full justify-center text-[1rem]">
              Записаться на консультацию
            </LuxuryButton>
          </div>
        </div>
      </div>

      <style>{`
        .hero-tablet-content {
          top: clamp(680px, 67svh, 930px);
        }

        @media (min-width: 768px) and (max-width: 799px) {
          .hero-tablet-content {
            top: clamp(735px, 72svh, 790px);
          }
        }

        @media (min-width: 900px) and (max-width: 1279px) {
          .hero-tablet-content {
            top: clamp(780px, 71.5svh, 985px);
          }
        }
      `}</style>
    </section>
  );
}