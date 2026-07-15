import Image from "next/image";
import BeeIconFrame from "./shared/BeeIconFrame";
import DecorativeDivider from "./shared/DecorativeDivider";

export default function ApidomikHero() {
  return (
    <section className="relative h-[100svh] min-h-[740px] overflow-hidden">
      <Image
        src="/images/services/fon1.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-[70%_center]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(1,11,8,0.99)_0%,rgba(1,11,8,0.97)_22%,rgba(1,11,8,0.86)_39%,rgba(1,11,8,0.45)_59%,rgba(1,11,8,0.08)_100%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,transparent_28%,transparent_58%,rgba(0,0,0,0.72)_78%,rgb(0,0,0)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1800px] flex-col px-5 py-[clamp(18px,2.6vh,30px)] sm:px-8 lg:px-14 xl:px-20">
        <header className="shrink-0">
          <div className="flex w-fit flex-col items-center">
            <p
              className="text-[clamp(1.55rem,3.2vh,2.8rem)] tracking-[0.12em] text-[#e0b45b]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              APIDARB
            </p>

            <div className="mt-3">
              <DecorativeDivider compact />
            </div>
          </div>
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

            <DecorativeDivider />

            <div className="max-w-[640px] space-y-[clamp(26px,3.4vh,38px)] text-[clamp(13px,1.65vh,16px)] font-medium leading-[1.8] text-[#eee3cd]">
              <p>
                Сон на пчелиных ульях, или по-другому — SPA-процедура на пчёлах
                — научно доказанный и очень действенный способ укрепления
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
                sizes="(max-width: 768px) 100vw, 640px"
                className="pointer-events-none select-none object-cover object-center brightness-[0.82] contrast-[1.12]"
              />

              <div className="pointer-events-none absolute inset-0 bg-[#03180f]/28" />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,18,13,0.18)_0%,rgba(2,18,13,0.38)_100%)]" />

              <div className="relative z-10 flex items-center gap-5">
                <BeeIconFrame />

                <p className="text-[clamp(12px,1.5vh,15px)] font-semibold leading-[1.7] text-[#e7bd67]">
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