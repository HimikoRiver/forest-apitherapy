import Image from "next/image";

import LuxuryButton from "@/components/home/shared/LuxuryButton";

const BRIGHT_BORDER = "rgba(216,182,106,0.62)";
const BRIGHT_INNER_BORDER =
  "rgba(216,182,106,0.62)";

const PANEL_SHADOW =
  "drop-shadow(0 7px 10px rgba(0,0,0,0.86)) drop-shadow(0 12px 16px rgba(0,0,0,0.68))";

const MEDIA_SHADOW =
  "drop-shadow(0 8px 12px rgba(0,0,0,0.86)) drop-shadow(0 13px 18px rgba(0,0,0,0.66))";

const ADDRESS_PANEL_SHADOW =
  "drop-shadow(0 7px 10px rgba(0,0,0,0.88)) drop-shadow(0 12px 16px rgba(0,0,0,0.72))";

const FULL_ADDRESS =
  "г. Грозный, Байсангуровский район, Смотровой переулок, 4";

const ADDRESS_QUERY =
  encodeURIComponent(FULL_ADDRESS);

const YANDEX_MAP_URL =
  `https://yandex.ru/maps/?text=${ADDRESS_QUERY}`;

const YANDEX_MAP_WIDGET_URL =
  `https://yandex.ru/map-widget/v1/?mode=search&text=${ADDRESS_QUERY}&z=17`;

const contacts = [
  {
    title: "Телефон",
    text: "8 (966) 727-17-71",
    caption: "Ежедневно с 09:00 до 20:00",
    href: "tel:+79667271771",
    icon: "/images/footer/cardIcons/connection.webp",
    iconAlt: "Телефон",
  },
  {
    title: "WhatsApp",
    text: "8 (966) 727-17-71",
    caption: "Написать в WhatsApp",
    href: "https://wa.me/79667271771",
    icon: "/images/footer/WhatsApp.webp",
    iconAlt: "WhatsApp",
  },
  {
    title: "Telegram",
    text: "t.me/apiterapiya_95",
    caption: "Быстрая связь и консультация",
    href: "https://t.me/apiterapiya_95",
    icon: "/images/footer/Telegram.webp",
    iconAlt: "Telegram",
  },
  {
    title: "E-mail",
    text: "apidarb_77@mail.ru",
    caption: "Написать на электронную почту",
    href: "mailto:apidarb_77@mail.ru",
    icon: "/images/footer/Mail.webp",
    iconAlt: "E-mail",
  },
];

const infoCards = [
  {
    number: "01",
    title: "Приём",
    text: "По предварительной записи. Индивидуальный подход к каждому пациенту.",
    icon: "/images/contacts/icons/1.webp",
    iconAlt: "Приём по предварительной записи",
  },
  {
    number: "02",
    title: "Консультация",
    text: "Перед курсом обсуждаем состояние, запрос и возможные противопоказания.",
    icon: "/images/contacts/icons/2.webp",
    iconAlt: "Консультация",
  },
  {
    number: "03",
    title: "Формат связи",
    text: "Администратор уточнит удобное время и детали посещения.",
    icon: "/images/contacts/icons/3.webp",
    iconAlt: "Формат связи",
  },
];

const addressIcon = {
  src: "/images/contacts/icons/4.webp",
  alt: "Адрес центра апитерапии",
};

function BeeIcon({ className = "size-6" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
    >
      <path
        d="M16 13.2c2.2 0 4 2 4 4.6 0 3.6-1.8 6.3-4 6.3s-4-2.7-4-6.3c0-2.6 1.8-4.6 4-4.6Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />

      <path
        d="M13.2 16.8h5.6M12.8 19.6h6.4M16 13.1v-3.6M13.8 9.5h4.4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      <path
        d="M12.5 13.9C8.8 10.4 5 10.2 4.2 12.3c-.8 2.2 1.8 5.3 7.2 5.1M19.5 13.9c3.7-3.5 7.5-3.7 8.3-1.6.8 2.2-1.8 5.3-7.2 5.1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M13.9 23.2 16 26l2.1-2.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeaderBee() {
  return (
    <span className="relative flex size-8 shrink-0 items-center justify-center text-[#f0c76d] sm:size-9">
      <BeeIcon className="relative z-10 size-full drop-shadow-[0_0_8px_rgba(240,199,109,0.42)]" />

      <span className="pointer-events-none absolute inset-0 animate-pulse text-[#fff1bd] opacity-60 blur-[0.8px]">
        <BeeIcon className="size-full" />
      </span>
    </span>
  );
}

function createClipPath(cut) {
  const safeCut = Math.max(cut, 1);

  return `polygon(
    ${safeCut}px 0,
    calc(100% - ${safeCut}px) 0,
    100% ${safeCut}px,
    100% calc(100% - ${safeCut}px),
    calc(100% - ${safeCut}px) 100%,
    ${safeCut}px 100%,
    0 calc(100% - ${safeCut}px),
    0 ${safeCut}px
  )`;
}

function ContactIcon({ src, alt }) {
  return (
    <span className="relative flex size-[42px] shrink-0 items-center justify-center sm:size-[46px] lg:size-[48px]">
      <span className="relative block size-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="48px"
          className="relative z-10 object-contain transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.08] group-hover:saturate-[1.15] group-hover:drop-shadow-[0_0_5px_rgba(216,182,106,0.35)]"
        />

        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="48px"
          className="pointer-events-none absolute inset-0 z-20 object-contain opacity-0 blur-[1.2px] transition-opacity duration-500 ease-out group-hover:opacity-55"
          style={{
            filter:
              "brightness(1.18) saturate(1.25) drop-shadow(0 0 8px rgba(216,182,106,0.42))",
          }}
        />
      </span>
    </span>
  );
}

function InfoBlockIcon({
  src,
  alt,
  variant = "card",
  className = "",
}) {
  const sizeClassName =
    variant === "address"
      ? "size-[42px] sm:size-[46px] lg:size-[48px]"
      : "size-[50px] sm:size-[56px] lg:size-[60px]";

  const sizes =
    variant === "address" ? "48px" : "60px";

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center ${sizeClassName} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="scale-[1.15] object-contain drop-shadow-[0_5px_9px_rgba(0,0,0,0.62)]"
      />
    </span>
  );
}

function BevelPanel({
  children,
  className = "",
  cut = 14,
  borderColor = BRIGHT_BORDER,
  innerBorderColor = BRIGHT_INNER_BORDER,
  background = "#06130f",
  shadow = PANEL_SHADOW,
}) {
  const outerClipPath = createClipPath(cut);
  const middleClipPath = createClipPath(cut - 1);
  const innerClipPath = createClipPath(cut - 2);

  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: shadow,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: outerClipPath,
          background: borderColor,
        }}
      />

      <div
        className="pointer-events-none absolute inset-[1px]"
        style={{
          clipPath: middleClipPath,
          background: innerBorderColor,
        }}
      />

      <div
        className="pointer-events-none absolute inset-[2px]"
        style={{
          clipPath: innerClipPath,
          background,
        }}
      />

      <div
        className="relative h-full overflow-hidden"
        style={{
          minHeight: "inherit",
          clipPath: outerClipPath,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MediaFrame({
  children,
  className = "",
  contentClassName = "",
}) {
  const cut = 14;
  const outerClipPath = createClipPath(cut);
  const middleClipPath = createClipPath(cut - 1);
  const innerClipPath = createClipPath(cut - 2);

  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: MEDIA_SHADOW,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: outerClipPath,
          background: BRIGHT_BORDER,
        }}
      />

      <div
        className="pointer-events-none absolute inset-[1px]"
        style={{
          clipPath: middleClipPath,
          background: BRIGHT_INNER_BORDER,
        }}
      />

      <div
        className={`absolute inset-[2px] overflow-hidden ${contentClassName}`}
        style={{
          clipPath: innerClipPath,
          background: "#06130f",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ContactCard({ item }) {
  const isExternal =
    item.href.startsWith("http");

  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group block w-full"
    >
      <BevelPanel
        className="min-h-[64px] sm:min-h-[66px]"
        background="#06130f"
        borderColor={BRIGHT_BORDER}
        innerBorderColor={BRIGHT_INNER_BORDER}
        shadow={PANEL_SHADOW}
      >
        <div className="relative z-10 grid min-h-[64px] grid-cols-[48px_1fr_18px] items-center gap-3 px-3 py-2.5 sm:min-h-[66px] sm:grid-cols-[56px_1fr_20px] sm:px-4">
          <ContactIcon
            src={item.icon}
            alt={item.iconAlt}
          />

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
      borderColor={BRIGHT_BORDER}
      innerBorderColor={BRIGHT_INNER_BORDER}
      shadow={PANEL_SHADOW}
    >
      <div className="pointer-events-none absolute left-4 top-14 hidden h-[72px] w-[34px] opacity-16 sm:block">
        <div className="h-full w-full bg-[radial-gradient(circle_at_0_0,rgba(216,182,106,0.24)_0,rgba(216,182,106,0.08)_18%,transparent_18.5%)] bg-[length:12px_12px]" />
      </div>

      <span className="pointer-events-none absolute left-1/2 top-[18px] z-30 flex -translate-x-1/2 items-center text-[#d8b66a]/75 sm:top-[20px]">
        <span className="h-px w-5 bg-[#d8b66a]/75" />
        <span className="mx-1 size-[4px] rounded-full border border-[#d8b66a]/75" />
        <span className="h-px w-5 bg-[#d8b66a]/75" />
      </span>

      <div className="relative z-10 flex h-full flex-col px-4 py-4 sm:px-5 sm:py-4">
        <InfoBlockIcon
          src={item.icon}
          alt={item.iconAlt}
        />

        <span
          className="contact-step-number absolute right-4 top-10 text-[26px] font-bold leading-none sm:right-5 sm:top-11 sm:text-[30px]"
          style={{
            animationDelay: `${
              (Number(item.number) - 1) * 0.8
            }s`,
          }}
        >
          {item.number}
        </span>

        <h2 className="mt-3.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d8b66a] sm:mt-4 sm:text-[11px] sm:tracking-[0.22em]">
          {item.title}
        </h2>

        <p className="mt-2 text-[12px] font-semibold leading-[1.7] text-[#f1e7d2] sm:mt-2.5">
          {item.text}
        </p>
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
        fontFamily:
          "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <style>{`
        .contact-step-number {
          color: transparent;
          background-image: linear-gradient(
            110deg,
            rgba(216, 182, 106, 0.12) 0%,
            rgba(216, 182, 106, 0.18) 22%,
            rgba(255, 239, 180, 0.78) 38%,
            rgba(216, 182, 106, 0.2) 52%,
            rgba(255, 229, 146, 0.86) 68%,
            rgba(216, 182, 106, 0.14) 100%
          );
          background-size: 240% 100%;
          background-position: 200% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow:
            0 0 6px rgba(216, 182, 106, 0.08),
            0 0 12px rgba(216, 182, 106, 0.04);
          filter: brightness(0.95);
          animation: contactNumberSheen 4.8s linear infinite;
        }

        @keyframes contactNumberSheen {
          0% {
            background-position: 220% 50%;
            filter: brightness(0.92);
            text-shadow:
              0 0 4px rgba(216, 182, 106, 0.05),
              0 0 10px rgba(216, 182, 106, 0.03);
          }

          45% {
            background-position: 40% 50%;
            filter: brightness(1.05);
            text-shadow:
              0 0 7px rgba(216, 182, 106, 0.12),
              0 0 14px rgba(216, 182, 106, 0.06);
          }

          55% {
            background-position: -10% 50%;
            filter: brightness(1.18);
            text-shadow:
              0 0 10px rgba(255, 225, 140, 0.16),
              0 0 18px rgba(216, 182, 106, 0.08);
          }

          100% {
            background-position: -220% 50%;
            filter: brightness(0.92);
            text-shadow:
              0 0 4px rgba(216, 182, 106, 0.05),
              0 0 10px rgba(216, 182, 106, 0.03);
          }
        }
      `}</style>

      <section className="relative min-h-screen overflow-hidden bg-[#020908] px-4 py-5 sm:px-7 lg:px-10 xl:px-[4vw]">
        <Image
          src="/images/contacts/fon557.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none hidden select-none object-fill min-[1440px]:block"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[120px] bg-[linear-gradient(180deg,rgba(1,7,6,0.82)_0%,rgba(1,7,6,0.64)_34%,rgba(1,7,6,0.3)_70%,rgba(1,7,6,0)_100%)] sm:h-[150px]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[72px] bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-40px)] max-w-[1800px] flex-col">
          <header className="relative mb-3 shrink-0 pt-1 sm:mb-4 sm:pt-2">
            <div className="mx-auto flex w-full max-w-[740px] flex-col items-center">
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.56em] text-[#d8b66a] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:text-[11px] sm:tracking-[0.72em]">
                Контакты
              </p>

              <div className="mt-2 flex w-full items-center justify-center gap-3 sm:mt-3 sm:gap-5">
                <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent_0%,rgba(216,182,106,0.15)_12%,rgba(216,182,106,0.9)_100%)]" />

                <HeaderBee />

                <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(216,182,106,0.9)_0%,rgba(216,182,106,0.15)_88%,transparent_100%)]" />
              </div>
            </div>
          </header>

          <div className="grid flex-1 items-start gap-8 pb-6 sm:gap-10 lg:grid-cols-[minmax(420px,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-8 lg:pb-0">
            <div className="mx-auto w-full max-w-[620px] text-center lg:mx-0 lg:max-w-none lg:text-left">
              <h1 className="max-w-[520px] font-serif text-[clamp(1.75rem,4.8vw,3rem)] font-normal uppercase leading-[1] tracking-[0.05em] text-[#f8f0dd] drop-shadow-[0_14px_36px_rgba(0,0,0,0.86)] sm:tracking-[0.07em]">
                Свяжитесь с нами
              </h1>

              <p className="mx-auto mt-4 max-w-[440px] text-[12px] font-medium leading-6 text-[#eee3cc] drop-shadow-[0_5px_16px_rgba(0,0,0,0.84)] sm:mt-5 sm:text-[13px] sm:leading-7 lg:mx-0">
                Запишитесь на консультацию, чтобы
                обсудить курс апитерапии,
                пчелопродукты и подобрать подходящий
                формат посещения.
              </p>

              <div className="mt-5 space-y-2.5 sm:mt-6">
                {contacts.map((item) => (
                  <ContactCard
                    key={item.title}
                    item={item}
                  />
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <div className="w-full">
                <div className="grid gap-3 sm:grid-cols-3">
                  {infoCards.map((item) => (
                    <InfoCard
                      key={item.number}
                      item={item}
                    />
                  ))}
                </div>

                <div className="mt-4">
                  <div className="grid gap-3 lg:grid-cols-[0.34fr_0.66fr]">
                    <MediaFrame className="min-h-[250px] lg:min-h-[320px]">
                      <Image
                        src="/images/contacts/home.webp"
                        alt="Центр апитерапии в Грозном"
                        fill
                        sizes="(max-width: 1023px) 100vw, 34vw"
                        className="object-cover object-center"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,9,8,0.35)_0%,rgba(2,9,8,0.12)_42%,rgba(2,9,8,0.74)_100%)]" />

                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,9,8,0.2)_0%,transparent_48%,rgba(2,9,8,0.2)_100%)]" />

                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(2,9,8,0.1)_52%,rgba(2,9,8,0.5)_100%)]" />

                      <div className="relative z-10 flex min-h-[246px] flex-col justify-between p-4 sm:p-5 lg:min-h-[316px]">
                        <div>
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.38em] text-[#d8b66a] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:mb-4 sm:text-[11px] sm:tracking-[0.44em]">
                            Адрес
                          </p>

                          <BevelPanel
                            className="w-full max-w-[250px]"
                            cut={9}
                            background="rgba(3,15,12,0.88)"
                            borderColor={BRIGHT_BORDER}
                            innerBorderColor={
                              BRIGHT_INNER_BORDER
                            }
                            shadow={
                              ADDRESS_PANEL_SHADOW
                            }
                          >
                            <div className="relative z-10 flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-3.5">
                              <InfoBlockIcon
                                src={addressIcon.src}
                                alt={addressIcon.alt}
                                variant="address"
                              />

                              <p className="min-w-0 text-[10px] font-semibold leading-5 text-[#fff7e5] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-[11px] sm:leading-5 lg:text-[12px] lg:leading-6">
                                <span className="block whitespace-nowrap">
                                  г. Грозный,
                                </span>

                                <span className="block whitespace-nowrap">
                                  Смотровой переулок, 4
                                </span>
                              </p>
                            </div>
                          </BevelPanel>
                        </div>

                        <LuxuryButton
                          href={YANDEX_MAP_URL}
                          target="_blank"
                          rel="noreferrer"
                          variant="contactMap"
                          className="self-start"
                        >
                          Открыть на карте
                        </LuxuryButton>
                      </div>
                    </MediaFrame>

                    <MediaFrame className="min-h-[320px]">
                      <iframe
                        title="Карта проезда"
                        src={YANDEX_MAP_WIDGET_URL}
                        className="absolute inset-0 h-full w-full opacity-58 grayscale-[0.72] contrast-[1.15] sepia-[0.22]"
                        loading="lazy"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,9,8,0.1)_38%,rgba(2,9,8,0.52)_100%)]" />
                    </MediaFrame>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-center pb-2 sm:mt-5 lg:justify-end lg:pb-0">
            <p className="text-center text-[8px] font-medium leading-4 text-[#d8b66a]/84 lg:text-right">
              © 2026 Himiko River. Все права
              защищены.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}