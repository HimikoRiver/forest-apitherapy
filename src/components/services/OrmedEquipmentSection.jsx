import Image from "next/image";
import OrmedBookSlider from "./OrmedBookSlider";

export default function OrmedEquipmentSection() {
  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-5 sm:pb-20 lg:pb-24">
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-7 lg:px-10 xl:px-16">
        <div className="relative overflow-hidden rounded-[28px] border border-[#a57833]/65 bg-[radial-gradient(circle_at_center,rgba(7,42,30,0.72),rgba(2,12,9,0.97)_68%)] px-5 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.45),inset_0_0_80px_rgba(216,173,86,0.03)] sm:px-7 sm:py-8 lg:px-9 lg:py-9 xl:px-12 xl:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(11,84,55,0.16),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(216,173,86,0.08),transparent_24%)]" />

          <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,transparent_18%,transparent_82%,rgba(0,0,0,0.12)_100%)]" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-2 hidden h-[58px] w-[58px] rotate-[14deg] opacity-75 lg:block"
          >
            <svg viewBox="0 0 64 64" className="h-full w-full text-[#b98736]">
              <path
                d="M11 32c0-7.8 5.5-13.2 11.5-13.2 5.2 0 8.1 3.4 9.8 7.1 1.8-3.7 4.6-7.1 9.9-7.1C48.4 18.8 54 24.2 54 32c0 8.8-6.4 14.9-14.4 14.9-4.4 0-6.6-1.7-7.3-2.2-.7.5-2.9 2.2-7.3 2.2C17.4 46.9 11 40.8 11 32Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M31.2 22.5c1.1-4.2 3.8-7.4 7-8.7M28.7 20.4c-2.5-3.9-6.2-6.2-10-6.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20 33.5c4.1.3 7.3-1.2 9.7-3.8M44.3 33.5c-4.2.2-7.5-1.2-10.1-3.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start xl:gap-12">
            <div className="min-w-0">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.34em] text-[#d7aa51]/82 sm:text-[11px]">
                Оборудование
              </p>

              <h2
                className="max-w-[760px] text-[clamp(1.8rem,3vw,3.2rem)] font-normal uppercase leading-[1.08] tracking-[0.02em] text-[#e2b45b]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                Оборудование ORMED
              </h2>

              <div className="mt-5 h-px w-28 bg-gradient-to-r from-[#d8ad56]/80 to-transparent" />

              <div className="mt-6 max-w-[860px] space-y-5 text-[12px] font-medium leading-7 text-[#e8ddc8]/90 sm:text-[13px] lg:text-[14px]">
                <p>
                  Приглашаем вас посетить наш центр, где вы можете
                  воспользоваться оборудованием «ORMED», предназначенным для
                  мягкого и контролируемого вытяжения позвоночника.
                </p>

                <p>
                  «ORMED» — это современное медицинское оборудование, которое
                  помогает при заболеваниях позвоночника. Аппарат способствует
                  бережному вытяжению, снижению нагрузки на межпозвонковые диски
                  и суставы, улучшению кровообращения и уменьшению напряжения в
                  спине.
                </p>

                <p>
                  Комбинация вытяжения позвоночника с процедурами
                  пчелоужаливания может ускорить процесс восстановления и
                  повысить эффективность лечения.
                </p>
              </div>
            </div>

            <div className="relative flex min-h-[240px] items-start justify-center lg:min-h-[280px] lg:justify-end">
              <div className="relative w-full max-w-[540px] lg:max-w-[600px]">
                <Image
                  src="/images/services/ormed.webp"
                  alt="Оборудование ORMED"
                  width={1448}
                  height={1086}
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="h-auto w-full object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>

          <OrmedBookSlider />
        </div>
      </div>
    </section>
  );
}