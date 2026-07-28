import Image from "next/image";
import { PageLogo } from "@/components/shared/PageLogo";
import BeeIcon from "@/components/home/shared/BeeIcon";
import DecorativeDivider from "@/components/services/shared/DecorativeDivider";

export default function ApidomikHero() {
  return (
    <section className="relative overflow-hidden min-[1025px]:h-[clamp(740px,100svh,1080px)]">
      {/* MOBILE BACKGROUND */}
      <Image
        src="/images/services/fonMobile.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 639px) 100vw"
        className="pointer-events-none select-none object-cover object-center sm:hidden"
      />

      {/* TABLET / DESKTOP BACKGROUND */}
      <Image
        src="/images/services/fon11.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 640px) 100vw"
        className="pointer-events-none hidden select-none object-cover object-[68%_center] sm:block min-[1025px]:object-[70%_center]"
      />

      {/* DESKTOP OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(1,11,8,0.99)_0%,rgba(1,11,8,0.97)_22%,rgba(1,11,8,0.86)_39%,rgba(1,11,8,0.45)_59%,rgba(1,11,8,0.08)_100%)] min-[1025px]:block" />

      <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,transparent_28%,transparent_58%,rgba(0,0,0,0.72)_78%,rgb(0,0,0)_100%)] min-[1025px]:block" />

      {/* MOBILE / TABLET CONTENT */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-[1024px] flex-col px-4 pb-7 pt-5 md:px-10 md:pb-12 md:pt-8 min-[1025px]:hidden"
        style={{
          minHeight: "max(900px, 100svh)",
        }}
      >
        <header className="shrink-0">
          <PageLogo variant="hero" />
        </header>

        <div className="flex flex-1 items-start pt-[clamp(220px,28svh,285px)] md:pt-[clamp(270px,26svh,360px)]">
          <div className="w-full max-w-[620px] md:max-w-[700px]">
            <div>
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.48em] text-[#d8ad56] md:mb-4 md:text-[11px]">
                Услуги
              </p>

              <div className="mb-3 h-px w-20 bg-gradient-to-r from-[#d8ad56]/80 to-transparent md:mb-5 md:w-28" />

              <h1
                className="text-[46px] font-normal leading-[0.92] tracking-[-0.055em] text-[#f4e5c1] drop-shadow-[0_5px_18px_rgba(0,0,0,0.68)] md:text-[72px]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                Апидомик
              </h1>

              <p
                className="mt-3 max-w-[390px] text-[26px] leading-[1.08] text-[#e0b45b] drop-shadow-[0_4px_14px_rgba(0,0,0,0.72)] md:mt-5 md:max-w-[620px] md:text-[40px]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                оздоровительный сон
                <br />
                на ульях с пчелами
              </p>
            </div>

            <div className="mt-6 max-w-[390px] space-y-4 text-[13px] font-medium leading-[1.58] text-[#f0e5cf] drop-shadow-[0_3px_10px_rgba(0,0,0,0.92)] md:mt-8 md:max-w-[610px] md:space-y-6 md:text-[16px] md:leading-[1.7]">
              <p>
                Сон на пчелиных ульях, или по-другому — SPA-процедура на
                пчёлах — научно доказанный и очень действенный способ укрепления
                здоровья.
              </p>

              <p>
                Пчёлы попадают в ульи через специальные отверстия в стене
                домика. Специальная лежанка на ульях исключает проникновение
                пчёл во внутреннее пространство домика.
              </p>
            </div>

            <div className="relative mt-6 w-full max-w-[390px] overflow-hidden rounded-[15px] border border-[#d2a54b]/75 px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.42)] md:mt-8 md:max-w-[650px] md:rounded-[18px] md:px-6 md:py-5">
              <Image
                src="/images/services/fon22.webp"
                alt=""
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 650px"
                className="pointer-events-none select-none object-cover object-center brightness-[0.68] contrast-[1.18]"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#02130d]/62" />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(1,16,11,0.2)_0%,rgba(1,16,11,0.52)_100%)]" />

              <div className="relative z-10 flex items-center gap-4 md:gap-6">
                <span
                  aria-hidden="true"
                  className="luxury-button__icon !m-0 !h-[38px] !w-[38px] !shrink-0 md:!h-[50px] md:!w-[50px]"
                >
                  <BeeIcon className="size-full" />
                </span>

                <p
                  className="text-[12px] font-semibold leading-[1.55] md:text-[15px] md:leading-[1.7]"
                  style={{
                    background:
                      "linear-gradient(90deg, #8d6123 0%, #c68f3c 18%, #fff1c3 34%, #ad7129 50%, #f4d88f 68%, #8d6123 100%)",
                    backgroundSize: "240% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    filter:
                      "drop-shadow(0 1px 9px rgba(244,214,151,0.24))",
                    animation: "textGoldFlow 6.4s linear infinite",
                  }}
                >
                  Вы просто спите, а пчёлы дают вам новые силы, забирая взамен
                  болезни и усталость.
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-center md:mt-10">
              <DecorativeDivider compact />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP CONTENT */}
      <div className="relative z-10 mx-auto hidden h-full w-full max-w-[1800px] flex-col px-5 py-[clamp(18px,2.6vh,30px)] sm:px-8 lg:px-14 xl:px-20 min-[1025px]:flex">
        <header className="shrink-0">
          <PageLogo />
        </header>

        <div className="flex min-h-0 flex-1 items-center py-[clamp(28px,4vh,52px)]">
          <div className="flex w-full max-w-[700px] flex-col gap-[clamp(28px,3.8vh,44px)]">
            <div>
              <p className="mb-[clamp(16px,2.2vh,24px)] text-[clamp(10px,1.25vh,12px)] font-bold uppercase tracking-[0.42em] text-[#d8ad56]">
                Услуги
              </p>

              <h1
                className="text-[clamp(3.4rem,8.6vh,6.8rem)] font-normal leading-[0.88] tracking-[-0.055em] text-[#f4e5c1]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                Апидомик
              </h1>

              <p
                className="mt-[clamp(24px,3.2vh,38px)] max-w-[650px] text-[clamp(1.8rem,4.7vh,3.5rem)] leading-[1.1] text-[#e0b45b]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                оздоровительный сон
                <br />
                на ульях с пчелами
              </p>
            </div>

            <div className="max-w-[650px] space-y-[clamp(26px,3.4vh,38px)] text-[clamp(15px,1.85vh,18px)] font-medium leading-[1.8] text-[#eee3cd]">
              <p>
                Сон на пчелиных ульях, или по-другому — SPA-процедура на
                пчёлах — научно доказанный и очень действенный способ укрепления
                здоровья.
              </p>

              <p>
                Пчёлы попадают в ульи через специальные отверстия в стене
                домика. Специальная лежанка на ульях исключает проникновение
                пчёл во внутреннее пространство домика.
              </p>
            </div>

            <div className="relative max-w-[640px] overflow-hidden rounded-[16px] border border-[#d2a54b]/75 px-[clamp(20px,2.2vw,28px)] py-[clamp(22px,3vh,32px)] shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
              <Image
                src="/images/services/fon22.webp"
                alt=""
                fill
                unoptimized
                sizes="640px"
                className="pointer-events-none select-none object-cover object-center brightness-[0.82] contrast-[1.12]"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#03180f]/28" />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,18,13,0.18)_0%,rgba(2,18,13,0.38)_100%)]" />

              <div className="relative z-10 flex items-center gap-5 sm:gap-6">
                <span
                  aria-hidden="true"
                  className="luxury-button__icon !m-0 !h-[42px] !w-[42px] !shrink-0 sm:!h-[48px] sm:!w-[48px]"
                >
                  <BeeIcon className="size-full" />
                </span>

                <p
                  className="text-[clamp(13px,1.65vh,17px)] font-semibold leading-[1.7]"
                  style={{
                    background:
                      "linear-gradient(90deg, #7e551d 0%, #c28b37 18%, #fff2c7 34%, #aa6d25 50%, #f4d88f 68%, #7e551d 100%)",
                    backgroundSize: "240% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    filter:
                      "drop-shadow(0 1px 9px rgba(244, 214, 151, 0.24))",
                    animation: "textGoldFlow 6.4s linear infinite",
                  }}
                >
                  Вы просто спите, а пчёлы дают вам новые силы, забирая взамен
                  болезни и усталость.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}