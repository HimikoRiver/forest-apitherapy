import Image from "next/image";
import FooterCards from "@/components/footer/FooterCards";

const tagline = "Природная гармония. Научный подход.";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-black text-[#f3efe5]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-[#d8b66a]/95 to-transparent shadow-[0_0_18px_rgba(216,182,106,0.58)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[1px] z-20 h-[18px] w-full bg-[linear-gradient(180deg,rgba(216,182,106,0.16)_0%,transparent_100%)]"
      />

      <div
        data-menu-hide-start
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-0 h-px w-px"
      />

      <div className="relative mx-auto w-full max-w-[2048px]">
        <div className="relative aspect-[2048/884] w-full overflow-hidden">
          <Image
            src="/images/footer/footerFon222.webp"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none select-none object-contain object-center"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.12)_52%,rgba(0,0,0,0.42)_100%)]" />

          <section className="absolute left-[6.3%] top-[calc(7.7vw-30px)] z-10 flex w-[31%] min-w-[280px] flex-col items-center text-center">
            <p
              aria-label={tagline}
              className="m-0 max-w-[390px] text-[clamp(0.95rem,1.18vw,1.26rem)] font-medium leading-[1.52] tracking-[-0.035em] text-[#f3d98d]"
            >
              {tagline.split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  aria-hidden="true"
                  className="footer-tagline-letter inline-block"
                  style={{
                    animationDelay: `${index * 0.055}s`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </p>
          </section>

          <div className="absolute right-[2.8vw] top-[calc(4.1vw-30px)] z-10 flex w-[66%] justify-center">
            <FooterCards />
          </div>

          <div className="absolute bottom-[2%] left-[4.2%] right-[4.2%] z-10 grid grid-cols-[minmax(0,620px)_1fr] items-end gap-6 text-[clamp(0.5rem,0.58vw,0.64rem)] font-medium leading-[1.35] tracking-[-0.025em] text-[#c5b894]/78">
            <p className="m-0 justify-self-start text-left">
              Instagram принадлежит компании Meta Platforms Inc., деятельность
              которой признана экстремистской и запрещена на территории
              Российской Федерации. Упоминание осуществляется исключительно в информационных целях.
            </p>

            <p className="m-0 justify-self-end text-right">
              © {year} Himiko River. Все права защищены.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-tagline-letter {
          transform-origin: center;
          opacity: 0.84;
          text-shadow:
            0 0 8px rgba(216, 182, 106, 0.22),
            0 0 18px rgba(216, 182, 106, 0.1);
          animation: footerTaglineLetterPulse 2.8s
            cubic-bezier(0.45, 0, 0.25, 1) infinite;
          will-change: transform, opacity, text-shadow, filter;
        }

        @keyframes footerTaglineLetterPulse {
          0%,
          22%,
          78%,
          100% {
            transform: scale(1);
            opacity: 0.84;
            filter: brightness(1);
            text-shadow:
              0 0 8px rgba(216, 182, 106, 0.2),
              0 0 18px rgba(216, 182, 106, 0.1);
          }

          32% {
            transform: scale(1.06);
            opacity: 0.94;
            filter: brightness(1.08);
            text-shadow:
              0 0 11px rgba(216, 182, 106, 0.38),
              0 0 24px rgba(216, 182, 106, 0.2);
          }

          42% {
            transform: scale(1.13);
            opacity: 1;
            filter: brightness(1.16);
            text-shadow:
              0 0 15px rgba(216, 182, 106, 0.58),
              0 0 30px rgba(216, 182, 106, 0.32),
              0 0 44px rgba(216, 182, 106, 0.16);
          }

          56% {
            transform: scale(1.05);
            opacity: 0.92;
            filter: brightness(1.06);
            text-shadow:
              0 0 10px rgba(216, 182, 106, 0.32),
              0 0 22px rgba(216, 182, 106, 0.16);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-tagline-letter {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}