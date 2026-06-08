import Image from "next/image";
import Link from "next/link";

const contacts = [
  {
    title: "Телефон",
    text: "+7 000 000-00-00",
    caption: "Ежедневно с 09:00 до 20:00",
    href: "tel:+70000000000",
  },
  {
    title: "WhatsApp",
    text: "Написать в WhatsApp",
    caption: "Ответим в течение нескольких минут",
    href: "https://wa.me/70000000000",
  },
  {
    title: "Telegram",
    text: "Открыть Telegram",
    caption: "Быстрая связь и консультация",
    href: "https://t.me/",
  },
  {
    title: "E-mail",
    text: "info@apidarb.ru",
    caption: "Ответим на все ваши вопросы",
    href: "mailto:info@apidarb.ru",
  },
];

const infoCards = [
  {
    number: "01",
    title: "Приём",
    text: "По предварительной записи. Индивидуальный подход к каждому пациенту.",
  },
  {
    number: "02",
    title: "Консультация",
    text: "Перед курсом обсуждаем состояние, запрос и возможные противопоказания.",
  },
  {
    number: "03",
    title: "Формат связи",
    text: "Администратор уточнит удобное время и детали посещения.",
  },
];

function PlaceholderIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-[36px] shrink-0 items-center justify-center sm:size-[40px] lg:size-[42px]"
    >
      <svg viewBox="0 0 58 64" className="relative z-10 size-full">
        <path
          d="M29 2.8 53.5 17v30L29 61.2 4.5 47V17L29 2.8Z"
          fill="#071915"
          stroke="rgba(216,182,106,0.82)"
          strokeWidth="1.35"
        />
        <path
          d="M29 17.5 40 24v12.7L29 43.2 18 36.7V24L29 17.5Z"
          fill="none"
          stroke="rgba(216,182,106,0.48)"
          strokeWidth="1.1"
        />
      </svg>
    </span>
  );
}

function SmallPlaceholderIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-[30px] shrink-0 items-center justify-center sm:size-[32px] lg:size-[34px]"
    >
      <svg viewBox="0 0 58 64" className="relative z-10 size-full">
        <path
          d="M29 2.8 53.5 17v30L29 61.2 4.5 47V17L29 2.8Z"
          fill="#071915"
          stroke="rgba(216,182,106,0.8)"
          strokeWidth="1.35"
        />
        <circle
          cx="29"
          cy="32"
          r="7"
          fill="none"
          stroke="rgba(216,182,106,0.42)"
          strokeWidth="1.1"
        />
      </svg>
    </span>
  );
}

function BevelPanel({
  children,
  className = "",
  cut = 14,
  borderColor = "rgba(216,182,106,0.38)",
  innerBorderColor = "rgba(216,182,106,0.12)",
  background = "#06130f",
  shadow = "drop-shadow(0 0 10px rgba(216,182,106,0.2)) drop-shadow(0 14px 28px rgba(0,0,0,0.44))",
}) {
  const clipPath = `polygon(
    ${cut}px 0,
    calc(100% - ${cut}px) 0,
    100% ${cut}px,
    100% calc(100% - ${cut}px),
    calc(100% - ${cut}px) 100%,
    ${cut}px 100%,
    0 calc(100% - ${cut}px),
    0 ${cut}px
  )`;

  const innerClipPath = `polygon(
    ${cut - 1}px 1px,
    calc(100% - ${cut - 1}px) 1px,
    calc(100% - 1px) ${cut - 1}px,
    calc(100% - 1px) calc(100% - ${cut - 1}px),
    calc(100% - ${cut - 1}px) calc(100% - 1px),
    ${cut - 1}px calc(100% - 1px),
    1px calc(100% - ${cut - 1}px),
    1px ${cut - 1}px
  )`;

  return (
    <div className={`relative ${className}`} style={{ filter: shadow }}>
      <div
        className="relative h-full overflow-hidden"
        style={{
          minHeight: "inherit",
          clipPath,
          background,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            clipPath,
            border: `1px solid ${borderColor}`,
          }}
        />

        <div
          className="pointer-events-none absolute inset-[1px]"
          style={{
            clipPath: innerClipPath,
            border: `1px solid ${innerBorderColor}`,
          }}
        />

        {children}
      </div>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8b66a] sm:gap-4 sm:text-[11px] sm:tracking-[0.2em]">
      <span className="text-[#d8b66a]">•</span>

      <Link
        href="/"
        aria-label="Перейти на главную страницу"
        className="group relative inline-flex items-center text-[#d8b66a] transition duration-300 hover:-translate-y-0.5 hover:text-[#fff0ae] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d8b66a]/70"
      >
        <span className="relative z-10 drop-shadow-[0_0_7px_rgba(216,182,106,0.18)] transition duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,240,174,0.62)]">
          Главная
        </span>

        <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#fff0ae] to-transparent opacity-0 shadow-[0_0_10px_rgba(216,182,106,0.65)] transition duration-300 group-hover:scale-x-100 group-hover:opacity-100" />

        <span className="pointer-events-none absolute inset-x-[-10px] inset-y-[-6px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(216,182,106,0.16),transparent_68%)] opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
      </Link>

      <span className="text-[#d8b66a]">•</span>
    </div>
  );
}

function ContactCard({ item }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      className="group block w-full max-w-none lg:max-w-[440px]"
    >
      <BevelPanel
        className="min-h-[64px] sm:min-h-[66px]"
        background="#06130f"
        borderColor="rgba(216,182,106,0.42)"
        innerBorderColor="rgba(216,182,106,0.1)"
        shadow="drop-shadow(0 0 9px rgba(216,182,106,0.22)) drop-shadow(0 10px 22px rgba(0,0,0,0.44))"
      >
        <div className="relative z-10 grid min-h-[64px] grid-cols-[48px_1fr_18px] items-center gap-3 px-3 py-2.5 sm:min-h-[66px] sm:grid-cols-[56px_1fr_20px] sm:px-4">
          <PlaceholderIcon />

          <span className="block min-w-0">
            <span className="block text-[8px] font-bold uppercase tracking-[0.3em] text-[#d8b66a] sm:text-[9px] sm:tracking-[0.36em]">
              {item.title}
            </span>

            <span className="mt-1 block break-words text-[12px] font-semibold leading-snug text-[#f7eed9] sm:text-[13px]">
              {item.text}
            </span>

            <span className="mt-0.5 block text-[8px] font-medium leading-4 text-[#cbbb9a]/88 sm:text-[9px]">
              {item.caption}
            </span>
          </span>

          <span className="text-[21px] leading-none text-[#d8b66a] transition duration-300 group-hover:translate-x-1 group-hover:text-[#fff0ae] sm:text-[23px]">
            ›
          </span>
        </div>
      </BevelPanel>
    </a>
  );
}

function InfoCard({ item }) {
  return (
    <BevelPanel
      className="min-h-[150px] sm:min-h-[170px] lg:min-h-[204px]"
      cut={12}
      background="#06130f"
      borderColor="rgba(216,182,106,0.4)"
      innerBorderColor="rgba(216,182,106,0.1)"
      shadow="drop-shadow(0 0 9px rgba(216,182,106,0.2)) drop-shadow(0 10px 22px rgba(0,0,0,0.42))"
    >
      <div className="pointer-events-none absolute left-4 top-14 hidden h-[72px] w-[34px] opacity-16 sm:block">
        <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,rgba(216,182,106,0.24)_0,rgba(216,182,106,0.08)_18%,transparent_18.5%)] bg-[length:12px_12px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-4 py-4 sm:px-5 sm:py-5">
        <SmallPlaceholderIcon />

        <span className="absolute right-4 top-10 text-[26px] font-semibold leading-none text-[#d8b66a]/12 sm:right-5 sm:top-12 sm:text-[30px]">
          {item.number}
        </span>

        <h2 className="mt-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#d8b66a] sm:mt-5 sm:text-[10px] sm:tracking-[0.26em]">
          {item.title}
        </h2>

        <p className="mt-2.5 text-[10px] font-medium leading-5 text-[#eadfc8] sm:mt-3">
          {item.text}
        </p>

        <span className="mt-auto flex justify-center pt-4 text-[#d8b66a]/75 sm:pt-5">
          <span className="h-px w-5 bg-[#d8b66a]/75" />
          <span className="mx-1 mt-[-2px] size-[4px] rounded-full border border-[#d8b66a]/75" />
          <span className="h-px w-5 bg-[#d8b66a]/75" />
        </span>
      </div>
    </BevelPanel>
  );
}

export const metadata = {
  title: "Контакты | APIDARB",
  description:
    "Контакты апитерапевта Магомеда Базаева: запись на консультацию, адрес и способы связи.",
};

export default function ContactsPage() {
  return (
    <main
      className="min-h-screen overflow-hidden bg-[#020908] text-[#f4edda]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <section className="relative min-h-screen overflow-hidden bg-[#020908] px-4 py-5 sm:px-7 lg:px-10 xl:px-[4vw]">
        <Image
          src="/images/contacts/fon5.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none hidden select-none object-fill min-[1440px]:block"
        />

        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(2,9,8,0.12)_0%,rgba(2,9,8,0.02)_42%,rgba(2,9,8,0.12)_100%)] min-[1440px]:block" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(2,9,8,0.02)_0%,rgba(2,9,8,0)_62%,rgba(2,9,8,0.14)_100%)] min-[1440px]:block" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-40px)] max-w-[1100px] flex-col">
          <div className="mb-4 flex items-start justify-between">
            <Breadcrumbs />

            <div className="hidden w-[120px] lg:block" />
          </div>

          <div className="mb-4 flex -translate-y-5 justify-center sm:mb-5 sm:-translate-y-6 lg:mb-6 lg:-translate-y-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.56em] text-[#d8b66a] sm:text-[11px] sm:tracking-[0.72em]">
              Контакты
            </p>
          </div>

          <div className="grid flex-1 items-start gap-8 pb-6 sm:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-8 lg:pb-0">
            <div className="mx-auto w-full max-w-[520px] text-center lg:mx-0 lg:max-w-[480px] lg:text-left">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.42em] text-[#d8b66a] sm:mb-4 sm:text-[10px] sm:tracking-[0.48em]">
                Свяжитесь
              </p>

              <h1 className="font-serif text-[clamp(2.7rem,13vw,4.2rem)] font-normal uppercase leading-[0.82] tracking-[0.06em] text-[#f8f0dd] drop-shadow-[0_14px_36px_rgba(0,0,0,0.86)] sm:text-[clamp(3.2rem,9vw,5rem)] lg:text-[clamp(3.1rem,5.2vw,5.6rem)] lg:leading-[0.78] lg:tracking-[0.08em]">
                С нами
              </h1>

              <p className="mx-auto mt-4 max-w-[440px] text-[12px] font-medium leading-6 text-[#eee3cc] drop-shadow-[0_5px_16px_rgba(0,0,0,0.84)] sm:mt-5 sm:text-[13px] sm:leading-7 lg:mx-0">
                Запишитесь на консультацию, чтобы обсудить курс апитерапии,
                пчелопродукты и подобрать индивидуальный подход.
              </p>

              <div className="mt-5 space-y-2.5 sm:mt-6">
                {contacts.map((item) => (
                  <ContactCard key={item.title} item={item} />
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <div className="mx-auto max-w-[690px]">
                <div className="grid gap-3 sm:grid-cols-3">
                  {infoCards.map((item) => (
                    <InfoCard key={item.number} item={item} />
                  ))}
                </div>

                <div className="mt-4">
                  <BevelPanel
                    className="min-h-[560px] sm:min-h-[520px] lg:min-h-[320px]"
                    cut={14}
                    background="#06130f"
                    borderColor="rgba(216,182,106,0.42)"
                    innerBorderColor="rgba(216,182,106,0.1)"
                    shadow="drop-shadow(0 0 12px rgba(216,182,106,0.2)) drop-shadow(0 14px 30px rgba(0,0,0,0.46))"
                  >
                    <div className="grid min-h-[560px] sm:min-h-[520px] lg:min-h-[320px] lg:grid-cols-[0.34fr_0.66fr]">
                      <div className="relative z-10 flex flex-col justify-between border-b border-[#d8b66a]/14 p-4 sm:p-5 lg:border-b-0 lg:border-r">
                        <div>
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.38em] text-[#d8b66a] sm:mb-4 sm:text-[11px] sm:tracking-[0.44em]">
                            Адрес
                          </p>

                          <div className="flex items-start gap-3">
                            <SmallPlaceholderIcon />

                            <p className="text-[14px] font-semibold leading-6 text-[#f7eed9] sm:text-[15px] sm:leading-7">
                              г. Грозный,
                              <br />
                              ул. Гикало, 6В
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-6">
                          <a
                            href="https://yandex.ru/maps/?text=Грозный%20Гикало%206В"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex"
                          >
                            <BevelPanel
                              className="min-w-[158px] sm:min-w-[172px]"
                              cut={10}
                              background="#06130f"
                              borderColor="rgba(216,182,106,0.46)"
                              innerBorderColor="rgba(216,182,106,0.1)"
                              shadow="drop-shadow(0 0 8px rgba(216,182,106,0.18)) drop-shadow(0 7px 15px rgba(0,0,0,0.32))"
                            >
                              <span className="flex h-9 items-center justify-center gap-3 px-4 text-[8px] font-bold uppercase tracking-[0.16em] text-[#f6e3aa] transition duration-300 hover:text-[#fff0ae] sm:h-10 sm:px-5 sm:text-[9px] sm:tracking-[0.18em]">
                                Открыть на карте
                                <span className="text-[17px] leading-none sm:text-[18px]">
                                  ›
                                </span>
                              </span>
                            </BevelPanel>
                          </a>
                        </div>

                        <div className="pointer-events-none absolute bottom-0 left-0 h-[52px] w-[150px] opacity-18 sm:h-[64px] sm:w-[180px]">
                          <div className="h-full w-full bg-[linear-gradient(180deg,transparent_0%,rgba(216,182,106,0.07)_100%)]" />
                        </div>
                      </div>

                      <div className="relative min-h-[320px] overflow-hidden p-3 sm:min-h-[340px] lg:min-h-[320px]">
                        <BevelPanel
                          className="h-full min-h-[296px] sm:min-h-[316px] lg:min-h-[296px]"
                          cut={10}
                          background="#06130f"
                          borderColor="rgba(216,182,106,0.24)"
                          innerBorderColor="rgba(216,182,106,0.08)"
                          shadow="drop-shadow(0 0 7px rgba(216,182,106,0.12))"
                        >
                          <iframe
                            title="Карта проезда"
                            src="https://yandex.ru/map-widget/v1/?ll=45.694909%2C43.318902&z=15"
                            className="absolute inset-0 h-full w-full opacity-58 grayscale-[0.72] contrast-[1.15] sepia-[0.22]"
                            loading="lazy"
                          />

                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,9,8,0.1)_38%,rgba(2,9,8,0.52)_100%)]" />
                        </BevelPanel>
                      </div>
                    </div>
                  </BevelPanel>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-center pb-2 sm:mt-5 lg:justify-end lg:pb-0">
            <p className="text-center text-[8px] font-medium leading-4 text-[#d8b66a]/84 lg:text-right">
              © 2026 Himiko River. Все права защищены.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}