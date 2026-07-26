import Image from "next/image";

import AboutHeroSection from "@/components/about/AboutHeroSection";
import Footer from "@/components/home/footer/Footer";
import LuxuryButton from "@/components/home/shared/LuxuryButton";

const directions = [
  {
    number: "01",
    title: "Пчелоужаление",
    text: "Апитоксин запускает активные процессы восстановления, улучшает кровообращение и помогает работать с болевыми состояниями.",
  },
  {
    number: "02",
    title: "Пчелопродукты",
    text: "Маточное молочко, прополис, подмор, огнёвка и другие продукты пчеловодства становятся основой курса.",
  },
  {
    number: "03",
    title: "Восстановительный курс",
    text: "Апитерапия применяется курсом: от первичной консультации до процедур, закрепления результата и рекомендаций.",
  },
];

const methodStrength = [
  {
    title: "Сила природы, проверенная практикой",
    text: "Использую пчелопродукты как рабочий инструмент восстановления: с пониманием их действия, ценности и места в курсе.",
  },
  {
    title: "Уверенность в каждом назначении",
    text: "Каждый продукт, процедура и этап курса имеют понятную задачу: поддержать организм, усилить восстановление и закрепить результат.",
  },
  {
    title: "Ответственность специалиста",
    text: "Веду работу с учётом состояния человека, реакции организма и целей курса, чтобы апитерапия давала ощутимую пользу.",
  },
  {
    title: "Развитие через опыт",
    text: "Постоянно усиливаю практику знаниями, наблюдением и обучением, чтобы применять методы апитерапии глубже и результативнее.",
  },
];

const workSteps = [
  {
    title: "Консультация",
    text: "Обсуждаем ваш запрос\nи состояние здоровья.",
  },
  {
    title: "Анализ и рекомендации",
    text: "Определяю наиболее подходящие\nпродукты и методы.",
  },
  {
    title: "Практическое применение",
    text: "Подбираем удобный способ\nприменения и режим.",
  },
  {
    title: "Поддержка и корректировка",
    text: "Отслеживаем результат и при\nнеобходимости корректируем подход.",
  },
];

function HexIcon({ children }) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center text-[#d8b66a]">
      <svg
        viewBox="0 0 52 58"
        className="absolute h-12 w-12"
        aria-hidden="true"
      >
        <path
          d="M26 2 49 15.5v27L26 56 3 42.5v-27L26 2Z"
          fill="rgb(3, 17, 13)"
          stroke="rgba(216, 182, 106, 0.7)"
          strokeWidth="1.4"
        />
      </svg>

      <span className="relative z-10">{children}</span>
    </span>
  );
}

function LeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19.6 4.4C12.4 4.6 6.9 8 5.1 13.1c-1 2.9.6 5.3 3.4 5.7 5.2.7 9.7-5.4 11.1-14.4Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5.1 19.2c2.7-4.7 6.4-7.6 11.1-9.7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.6 9.2 17 19.2 7"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.6 18.8 6v5.4c0 4.4-2.7 7.4-6.8 9-4.1-1.6-6.8-4.6-6.8-9V6L12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />

      <path
        d="M9.2 12.1 11.1 14l3.9-4.2"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.2 10.4v9H4.8a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5h2.4Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />

      <path
        d="M7.2 10.4c2.2-1.7 3.2-3.9 3.8-6 .2-.8.9-1.3 1.7-1.1 1 .2 1.6 1.1 1.4 2.1l-.6 3.1h4.4c1.5 0 2.6 1.4 2.3 2.9l-1.1 5.5a3.1 3.1 0 0 1-3 2.5H7.2"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function JarIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-[22px] w-[22px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5.5h8M13 5.5v4.2M19 5.5v4.2M11.8 10h8.4c1.35 0 2.45 1.1 2.45 2.45v10.1A4.45 4.45 0 0 1 18.2 27h-4.4a4.45 4.45 0 0 1-4.45-4.45v-10.1A2.45 2.45 0 0 1 11.8 10Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.45 17.2c2.1-1.05 3.8.9 6.1-.08 2.25-.95 3.9-2.55 7 .08"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M12.7 21.8c.9.72 2.15 1.1 3.3 1.1s2.4-.38 3.3-1.1"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HoneycombDivider() {
  return (
    <div
      aria-hidden="true"
      className="mt-8 flex w-full max-w-[330px] items-center justify-center gap-4 text-[#d8b66a] xl:hidden"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/70 to-[#d8b66a]" />

      <svg
        viewBox="0 0 58 50"
        className="h-10 w-12 shrink-0 drop-shadow-[0_0_9px_rgba(216,182,106,0.28)]"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1.25">
          <path d="M29 2 36 6v8l-7 4-7-4V6l7-4Z" />
          <path d="M15 10 22 14v8l-7 4-7-4v-8l7-4Z" />
          <path d="M43 10 50 14v8l-7 4-7-4v-8l7-4Z" />
          <path d="M29 18 36 22v8l-7 4-7-4v-8l7-4Z" />
          <path d="M15 26 22 30v8l-7 4-7-4v-8l7-4Z" />
          <path d="M43 26 50 30v8l-7 4-7-4v-8l7-4Z" />
          <path d="M29 34 36 38v8l-7 4-7-4v-8l7-4Z" />
        </g>
      </svg>

      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d8b66a]/70 to-[#d8b66a]" />
    </div>
  );
}

export const metadata = {
  title: "О специалисте | APIDARB",
  description:
    "Магомед Базаев — апитерапевт. Пчелоужаление, апитоксин, пчелопродукты и восстановительные курсы.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020908] text-[#f4edda]">
      <section className="relative">
        <AboutHeroSection />
      </section>

      <section className="relative isolate -mt-px overflow-hidden bg-[#020908] px-5 py-16 sm:px-8 lg:px-12 xl:px-[5vw]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[38px] xl:hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66a]/90 to-transparent shadow-[0_0_14px_rgba(216,182,106,0.52)]" />

          <div className="absolute left-1/2 top-0 h-[38px] w-[86%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(216,182,106,0.2)_0%,rgba(216,182,106,0.08)_34%,transparent_72%)] blur-xl" />

          <div className="absolute inset-x-0 top-0 h-[18px] bg-gradient-to-b from-[#d8b66a]/10 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[url('/textures/suede-green.webp')] bg-cover bg-center" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,9,8,0.92)_0%,rgba(2,9,8,0)_5%,rgba(2,9,8,0)_95%,rgba(2,9,8,0.92)_100%)]" />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="mb-10 flex items-center justify-center gap-5 text-[#d8b66a]">
            <span className="h-px w-32 bg-gradient-to-r from-transparent to-[#d8b66a]" />

            <p className="text-center text-[12px] font-bold uppercase tracking-[0.52em]">
              Этапы лечения
            </p>

            <span className="h-px w-32 bg-gradient-to-l from-transparent to-[#d8b66a]" />
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {directions.map((item) => (
              <article
                key={item.number}
                className="relative border-r border-[#d8b66a]/18 pr-8 last:border-r-0"
              >
                <div className="flex items-start gap-6">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center text-sm font-bold text-[#d8b66a]">
                    <svg
                      viewBox="0 0 52 58"
                      className="absolute h-14 w-14"
                      aria-hidden="true"
                    >
                      <path
                        d="M26 2 49 15.5v27L26 56 3 42.5v-27L26 2Z"
                        fill="rgb(2, 9, 8)"
                        stroke="rgba(216, 182, 106, 0.72)"
                        strokeWidth="1.4"
                      />
                    </svg>

                    <span className="relative z-10">{item.number}</span>
                  </span>

                  <div>
                    <h2 className="text-[clamp(1.45rem,2vw,2rem)] font-semibold leading-tight tracking-[-0.05em] text-[#f4edda]">
                      {item.title}
                    </h2>

                    <p className="mt-4 max-w-[320px] text-sm leading-7 text-[#cfc5ad]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[#d8b66a]/12 bg-black px-5 pb-16 pt-14 sm:px-8 lg:px-12 xl:px-[5vw]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[42px] xl:hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b66a]/80 to-transparent" />

          <div className="absolute left-1/2 top-0 h-[42px] w-[86%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(216,182,106,0.18)_0%,rgba(216,182,106,0.07)_36%,transparent_74%)] blur-xl" />

          <div className="absolute inset-x-0 top-0 h-[22px] bg-gradient-to-b from-[#d8b66a]/10 to-transparent" />
        </div>

        {/* MOBILE / TABLET BACKGROUND — ПОЛОЖЕНИЕ НЕ ИЗМЕНЕНО */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden xl:hidden">
          <div className="absolute left-[-28%] top-[38%] h-[52%] w-[150%] sm:left-[-23%] sm:w-[142%] md:left-[-20%] md:top-[40%] md:h-[48%] md:w-[135%] lg:left-[-16%] lg:top-[42%] lg:w-[128%]">
            <Image
              src="/images/about/fon7.webp"
              alt=""
              fill
              sizes="128vw"
              className="select-none object-contain object-center"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute left-0 top-[42%] z-[2] h-[46%] w-[82%] bg-[radial-gradient(ellipse_at_20%_48%,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.94)_34%,rgba(0,0,0,0.82)_52%,rgba(0,0,0,0.58)_68%,rgba(0,0,0,0.3)_82%,rgba(0,0,0,0.1)_91%,transparent_100%)] md:hidden"
          />
        </div>

        {/* DESKTOP BACKGROUND — БЕЗ ИЗМЕНЕНИЙ */}

        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
          <div className="absolute inset-y-0 right-[-1%] w-full">
            <Image
              src="/images/about/fon7.webp"
              alt=""
              fill
              sizes="100vw"
              className="select-none object-contain object-right"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1280px] items-start gap-12 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-[720px] xl:mx-0 xl:max-w-none">
            <div className="relative z-10">
              <div className="mb-9 flex w-full items-center justify-center gap-4 text-[#d8b66a] xl:justify-start xl:gap-5">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8b66a] xl:hidden" />

                <p className="shrink-0 text-center text-[10px] font-bold uppercase tracking-[0.38em] sm:text-[11px] xl:text-left xl:text-[12px] xl:tracking-[0.52em]">
                  Мои ценности в работе
                </p>

                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8b66a] xl:hidden" />

                <span className="hidden h-px flex-1 bg-gradient-to-r from-[#d8b66a] to-transparent xl:block" />
              </div>

              <div className="space-y-7">
                {methodStrength.map((item, index) => (
                  <article
                    key={item.title}
                    className="grid grid-cols-[56px_1fr] gap-5"
                  >
                    <HexIcon>
                      {index === 0 ? (
                        <LeafIcon />
                      ) : index === 1 ? (
                        <CheckIcon />
                      ) : index === 2 ? (
                        <ShieldIcon />
                      ) : (
                        <LikeIcon />
                      )}
                    </HexIcon>

                    <div>
                      <h3 className="text-[1.15rem] font-semibold tracking-[-0.04em] text-[#d8b66a] drop-shadow-[0_3px_10px_rgba(0,0,0,0.82)]">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-[390px] text-[0.82rem] leading-[1.72] text-[#d8cfb8] drop-shadow-[0_3px_10px_rgba(0,0,0,0.88)]">
                        {item.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[720px] xl:mx-0 xl:max-w-none">
            <div className="relative z-10">
              <div className="mb-9 flex w-full items-center justify-center gap-4 text-[#d8b66a] xl:justify-start xl:gap-5">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8b66a] xl:hidden" />

                <p className="shrink-0 text-center text-[10px] font-bold uppercase tracking-[0.38em] drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] sm:text-[11px] xl:text-left xl:text-[12px] xl:tracking-[0.52em]">
                  Как проходит работа
                </p>

                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8b66a] xl:hidden" />

                <span className="hidden h-px flex-1 bg-gradient-to-r from-[#d8b66a] to-transparent xl:block" />
              </div>

              <div className="relative grid gap-0">
                <span className="pointer-events-none absolute left-6 top-12 hidden h-[calc(100%-96px)] w-px bg-[#d8b66a]/42 xl:block" />

                {workSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="relative grid min-h-[96px] grid-cols-[54px_1fr] gap-5"
                  >
                    {index < workSteps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[-24px] left-6 top-12 w-px bg-[#d8b66a]/42 xl:hidden"
                      />
                    )}

                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#d8b66a]/70 bg-[#03110d] text-sm font-semibold text-[#d8b66a] shadow-[0_0_18px_rgba(216,182,106,0.12)]">
                      {index + 1}
                    </span>

                    <div className="relative z-10 pb-5">
                      <h3 className="text-[1.08rem] font-semibold tracking-[-0.04em] text-[#d8b66a] drop-shadow-[0_4px_12px_rgba(0,0,0,0.92)]">
                        {step.title}
                      </h3>

                      <p className="mt-1.5 max-w-[340px] whitespace-pre-line text-[0.82rem] leading-[1.58] text-[#efe6d0] drop-shadow-[0_4px_12px_rgba(0,0,0,0.98)]">
                        {step.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center xl:hidden">
                <LuxuryButton
                  href="/products"
                  icon={<JarIcon />}
                  className="!inline-flex !h-[64px] !w-full !max-w-[315px] !translate-y-0 !justify-center !px-8 [&_.luxury-button__content]:!w-full [&_.luxury-button__content]:!justify-center [&_.luxury-button__icon]:!mr-4 [&_.luxury-button__icon]:!text-[#d8b66a] [&_.luxury-button__label]:!tracking-[0.12em]"
                >
                  Пчелопродукты
                </LuxuryButton>

                <HoneycombDivider />
              </div>

              <div className="mt-5 hidden pl-[4px] xl:block">
                <LuxuryButton
                  href="/products"
                  icon={<JarIcon />}
                  className="!inline-flex !h-[64px] !w-full !max-w-[315px] !translate-y-0 !justify-start !px-15 [&_.luxury-button__content]:!w-full [&_.luxury-button__content]:!justify-start [&_.luxury-button__icon]:!mr-4 [&_.luxury-button__icon]:!text-[#d8b66a] [&_.luxury-button__label]:!tracking-[0.12em]"
                >
                  Пчелопродукты
                </LuxuryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}