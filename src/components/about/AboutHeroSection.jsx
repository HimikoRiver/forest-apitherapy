"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import LuxuryButton from "@/components/home/shared/LuxuryButton";

const benefits = [
  {
    title: "Пчелоужаление",
    subtitle: "Природная стимуляция иммунитета",
    icon: "/images/about/icons/11.webp",
    mobileImageClassName: "",
    tabletImageClassName: "",
    desktopImageClassName: "scale-[1.2]",
  },
  {
    title: "Апитоксин",
    subtitle: "Активные пептиды для здоровья",
    icon: "/images/about/icons/2222.webp",
    mobileImageClassName: "scale-[0.82]",
    tabletImageClassName: "scale-[0.82]",
    desktopImageClassName: "scale-100",
  },
  {
    title: "Пчелопродукты",
    subtitle: "Натуральная поддержка организма",
    icon: "/images/about/icons/33.webp",
    mobileImageClassName: "",
    tabletImageClassName: "",
    desktopImageClassName: "scale-[1.2]",
  },
];

const aboutText =
  "Более 18 лет я практикую апитерапию. По два года работал в железнодорожной больнице Одессы и городской больнице № 10. Второе образование получил в ЧГУ по специальности «Микробиология», обучаясь по очно-заочной форме. В своей практике я объединяю медицинский опыт, знания о свойствах пчелопродуктов и комплексный подход к восстановлению организма.";

function BeeSmallIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
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
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6v12M15 6v12"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[22px] w-[22px] translate-x-[1px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function VideoToggleButton({
  isPaused,
  onClick,
  className = "",
  sizeClassName,
}) {
  return (
    <LuxuryButton
      type="button"
      aria-label={isPaused ? "Запустить видео" : "Остановить видео"}
      aria-pressed={isPaused}
      onClick={onClick}
      className={`!flex !min-w-0 !translate-y-0 !items-center !justify-center !rounded-full !px-0 !py-0 [&_.luxury-button__content]:!flex [&_.luxury-button__content]:!h-full [&_.luxury-button__content]:!w-full [&_.luxury-button__content]:!items-center [&_.luxury-button__content]:!justify-center [&_.luxury-button__icon]:!m-0 [&_.luxury-button__icon]:!flex [&_.luxury-button__icon]:!h-full [&_.luxury-button__icon]:!w-full [&_.luxury-button__icon]:!items-center [&_.luxury-button__icon]:!justify-center [&_.luxury-button__label]:!hidden ${sizeClassName} ${className}`}
      icon={isPaused ? <PlayIcon /> : <PauseIcon />}
    />
  );
}

function GoldDivider({ tablet = false }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center ${
        tablet ? "gap-5" : "gap-3"
      }`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d8b66a]/76 to-[#d8b66a]/22" />

      <span
        className={`rounded-full bg-[#e0bb63] shadow-[0_0_12px_rgba(224,187,99,0.72)] ${
          tablet ? "size-[7px]" : "size-[6px]"
        }`}
      />

      <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/22 via-[#d8b66a]/76 to-transparent" />
    </div>
  );
}

function BenefitImage({ benefit, variant = "mobile" }) {
  const settings = {
    mobile: {
      wrapper: "size-[46px]",
      sizes: "46px",
      imageClassName: benefit.mobileImageClassName || "",
    },
    tablet: {
      wrapper: "size-[60px]",
      sizes: "60px",
      imageClassName: benefit.tabletImageClassName || "",
    },
    desktop: {
      wrapper: "size-[82px]",
      sizes: "82px",
      imageClassName: benefit.desktopImageClassName || "",
    },
  };

  const current = settings[variant];

  return (
    <span className={`relative block shrink-0 ${current.wrapper}`}>
      <Image
        src={benefit.icon}
        alt=""
        fill
        sizes={current.sizes}
        className={`object-contain ${current.imageClassName}`}
      />
    </span>
  );
}

function BenefitCard({ benefit, tablet = false }) {
  return (
    <div
      className={`relative overflow-hidden border border-[#d8b66a]/34 bg-[linear-gradient(180deg,rgba(4,22,16,0.82)_0%,rgba(2,12,9,0.94)_100%)] shadow-[0_12px_24px_rgba(0,0,0,0.34)] ${
        tablet
          ? "min-h-[92px] rounded-[22px]"
          : "min-h-[72px] rounded-[18px]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_110%,rgba(216,182,106,0.13),transparent_48%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[36%] opacity-20 [background-image:linear-gradient(30deg,transparent_46%,rgba(216,182,106,0.15)_47%,rgba(216,182,106,0.15)_49%,transparent_50%),linear-gradient(150deg,transparent_46%,rgba(216,182,106,0.15)_47%,rgba(216,182,106,0.15)_49%,transparent_50%)] [background-size:18px_30px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[18%] bottom-0 h-px bg-gradient-to-r from-transparent via-[#efc66d]/88 to-transparent shadow-[0_0_10px_rgba(239,198,109,0.5)]"
      />

      <div
        className={`relative z-10 grid items-center ${
          tablet
            ? "min-h-[92px] grid-cols-[62px_minmax(0,1fr)_12px] gap-4 px-5 py-3"
            : "min-h-[72px] grid-cols-[48px_minmax(0,1fr)_10px] gap-3 px-3.5 py-2.5"
        }`}
      >
        <BenefitImage
          benefit={benefit}
          variant={tablet ? "tablet" : "mobile"}
        />

        <div className="min-w-0 self-center text-left">
          <h3
            className={`m-0 font-semibold leading-[1.2] tracking-[-0.025em] text-[#f3e7c8] ${
              tablet ? "text-[0.98rem]" : "text-[0.78rem]"
            }`}
          >
            {benefit.title}
          </h3>

          <p
            className={`m-0 font-medium uppercase leading-[1.35] tracking-[0.09em] text-[#d8b66a]/78 ${
              tablet
                ? "mt-1.5 max-w-[280px] text-[0.59rem]"
                : "mt-1 max-w-[185px] text-[0.47rem]"
            }`}
          >
            {benefit.subtitle}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`justify-self-end rounded-full bg-[#e0bb63] shadow-[0_0_10px_rgba(224,187,99,0.72)] ${
            tablet ? "size-[7px]" : "size-[6px]"
          }`}
        />
      </div>
    </div>
  );
}

function DesktopBenefit({ benefit }) {
  return (
    <div className="grid min-w-0 grid-cols-[82px_minmax(0,1fr)] items-center gap-5">
      <BenefitImage benefit={benefit} variant="desktop" />

      <p className="m-0 text-[15px] font-semibold leading-5 text-[#f3e6c8] drop-shadow-[0_4px_12px_rgba(0,0,0,0.72)]">
        {benefit.title}
      </p>
    </div>
  );
}

function MobileInformationPanel() {
  return (
    <div className="relative mx-auto min-h-[590px] w-full max-w-[430px] overflow-hidden rounded-[26px] bg-[#03100d] shadow-[0_18px_38px_rgba(0,0,0,0.44)]">
      <div className="pointer-events-none absolute -inset-x-[5px] -inset-y-[10px]">
        <Image
          src="/images/about/mobileFon.webp"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 430px"
          className="select-none object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.04)_35%,rgba(0,0,0,0.14)_100%)]"
      />

      <div className="relative z-10 flex min-h-[590px] flex-col px-[clamp(24px,7vw,34px)] pb-7 pt-[102px]">
        <p className="m-0 text-left text-[0.69rem] font-medium leading-[1.68] tracking-[-0.025em] text-[#f1e7cf]/94">
          {aboutText}
        </p>

        <div className="mt-5">
          <GoldDivider />
        </div>

        <div className="mt-5 grid gap-2.5">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </div>

        <div className="mt-6">
          <GoldDivider />
        </div>
      </div>
    </div>
  );
}

function TabletInformationPanel() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[820px] overflow-hidden bg-[#03100d] shadow-[0_22px_46px_rgba(0,0,0,0.46)]">
      <div className="pointer-events-none absolute -inset-[5%]">
        <Image
          src="/images/about/tabletFon.webp"
          alt=""
          fill
          sizes="(max-width: 1279px) 92vw, 820px"
          className="select-none object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.05)_40%,rgba(0,0,0,0.15)_100%)]"
      />

      <div className="relative z-10 flex h-full flex-col px-12 pb-12 pt-[174px] lg:px-16 lg:pb-14 lg:pt-[194px]">
        <p className="mx-auto m-0 w-full max-w-[620px] text-left text-[1rem] font-medium leading-[1.86] tracking-[-0.025em] text-[#f1e7cf]/94 lg:text-[1.08rem]">
          {aboutText}
        </p>

        <div className="mx-auto mt-10 w-full max-w-[620px]">
          <GoldDivider tablet />
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-[650px] gap-4">
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              benefit={benefit}
              tablet
            />
          ))}
        </div>

        <div className="mx-auto mt-10 w-full max-w-[620px]">
          <GoldDivider tablet />
        </div>
      </div>
    </div>
  );
}

export default function AboutHeroSection() {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePause = () => setIsPaused(true);
    const handlePlay = () => setIsPaused(false);

    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
      return;
    }

    video.pause();
    setIsPaused(true);
  };

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#020908] text-[#f4edda] xl:h-[min(100svh,1080px)] xl:min-h-[760px]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-x-0 top-0 h-[60svh] min-h-[520px] w-full object-cover object-[64%_center] md:h-[60svh] md:min-h-[560px] md:object-[62%_center] xl:h-full xl:min-h-0 xl:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/about-hero1.mp4" type="video/mp4" />
      </video>

      {/* MOBILE OVERLAYS */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60svh] min-h-[520px] bg-[linear-gradient(180deg,rgba(2,9,8,0.3)_0%,rgba(2,9,8,0.03)_30%,rgba(2,9,8,0.08)_52%,rgba(2,9,8,0.82)_84%,#020908_100%)] md:hidden"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[60svh] min-h-[520px] w-[64%] bg-[linear-gradient(90deg,rgba(2,9,8,0.48)_0%,rgba(2,9,8,0.12)_70%,transparent_100%)] md:hidden"
      />

      {/* TABLET OVERLAYS */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[60svh] min-h-[560px] bg-[linear-gradient(90deg,rgba(2,9,8,0.94)_0%,rgba(2,9,8,0.78)_24%,rgba(2,9,8,0.44)_52%,rgba(2,9,8,0.12)_74%,rgba(2,9,8,0.24)_100%)] md:block xl:hidden"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[60svh] min-h-[560px] bg-[linear-gradient(180deg,rgba(2,9,8,0.18)_0%,rgba(2,9,8,0.02)_42%,rgba(2,9,8,0.84)_100%)] md:block xl:hidden"
      />

      {/* DESKTOP OVERLAYS */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(2,9,8,0.88)_0%,rgba(2,9,8,0.72)_22%,rgba(2,9,8,0.34)_48%,rgba(2,9,8,0.1)_68%,rgba(2,9,8,0.34)_100%)] xl:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(2,9,8,0.14)_0%,rgba(2,9,8,0.04)_42%,rgba(2,9,8,0.9)_100%)] xl:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-[58vw] bg-[radial-gradient(ellipse_at_20%_48%,rgba(3,22,16,0.82)_0%,rgba(3,22,16,0.66)_32%,rgba(3,22,16,0.36)_58%,rgba(3,22,16,0.12)_78%,transparent_100%)] blur-[18px] xl:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12%] right-[-8%] hidden h-[70%] w-[56vw] bg-[radial-gradient(circle_at_100%_100%,rgba(2,9,8,0.76)_0%,rgba(2,9,8,0.54)_26%,rgba(2,9,8,0.26)_54%,transparent_82%)] blur-[20px] xl:block"
      />

      {/* MOBILE */}

      <div className="relative z-10 md:hidden">
        <div className="relative h-[60svh] min-h-[520px] px-5">
          <div className="absolute left-5 top-[calc(env(safe-area-inset-top)+24px)]">
            <span className="block text-[1.68rem] font-semibold uppercase leading-none tracking-[0.15em] text-[#e5c56f] drop-shadow-[0_0_12px_rgba(216,182,106,0.25)]">
              APIDARB
            </span>
          </div>

          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <VideoToggleButton
              isPaused={isPaused}
              onClick={toggleVideo}
              sizeClassName="!h-[60px] !w-[60px]"
            />
          </div>

          <div className="absolute inset-x-5 bottom-9">
            <p className="m-0 mb-3 text-[0.68rem] font-bold uppercase tracking-[0.46em] text-[#d8b66a] drop-shadow-[0_4px_14px_rgba(0,0,0,0.92)]">
              О специалисте
            </p>

            <h1 className="m-0 max-w-[82%] font-serif text-[clamp(3.2rem,15vw,4.55rem)] font-normal leading-[0.86] tracking-[-0.075em] text-[#f8f0dd] drop-shadow-[0_12px_32px_rgba(0,0,0,0.94)]">
              Магомед
              <br />
              Базаев
            </h1>
          </div>
        </div>

        <div className="relative bg-[#020908] px-3 pb-14 pt-5">
          <MobileInformationPanel />
        </div>
      </div>

      {/* TABLET */}

      <div className="relative z-10 hidden md:block xl:hidden">
        <div className="relative h-[60svh] min-h-[560px] px-10 py-16 lg:px-14">
          <div className="absolute left-10 top-[calc(env(safe-area-inset-top)+32px)] lg:left-14">
            <span className="block text-[2.1rem] font-semibold uppercase leading-none tracking-[0.15em] text-[#e5c56f] drop-shadow-[0_0_12px_rgba(216,182,106,0.25)]">
              APIDARB
            </span>
          </div>

          <div className="flex h-full w-[58%] max-w-[590px] flex-col justify-center">
            <p className="mb-4 text-[0.74rem] font-semibold uppercase tracking-[0.54em] text-[#d8b66a] drop-shadow-[0_5px_16px_rgba(0,0,0,0.82)]">
              О специалисте
            </p>

            <h1 className="m-0 font-serif text-[clamp(4.2rem,8vw,6rem)] font-normal leading-[0.91] tracking-[-0.07em] text-[#f8f0dd] drop-shadow-[0_12px_34px_rgba(0,0,0,0.9)]">
              Магомед
              <br />
              Базаев
            </h1>
          </div>

          <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <VideoToggleButton
              isPaused={isPaused}
              onClick={toggleVideo}
              sizeClassName="!h-[68px] !w-[68px]"
            />
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#020908] px-6 pb-16 pt-7 lg:px-10">
          <TabletInformationPanel />
        </div>
      </div>

      {/* DESKTOP */}

      <div className="relative z-10 mx-auto hidden h-full min-h-0 w-full max-w-[1920px] items-start px-[5vw] pb-[clamp(24px,3vh,42px)] pt-[clamp(170px,19vh,220px)] xl:flex">
        <div className="w-full max-w-[760px]">
          <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.58em] text-[#d8b66a] drop-shadow-[0_5px_16px_rgba(0,0,0,0.78)]">
            О специалисте
          </p>

          <h1 className="m-0 max-w-[700px] font-serif text-[clamp(3rem,5vw,6rem)] font-normal leading-[0.92] tracking-[-0.06em] text-[#f8f0dd] drop-shadow-[0_12px_34px_rgba(0,0,0,0.82)]">
            Магомед
            <br />
            Базаев
          </h1>

          <div className="mt-6 flex max-w-[520px] items-center gap-4 text-[#d8b66a]">
            <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a] to-transparent" />

            <BeeSmallIcon />

            <span className="h-px flex-1 bg-gradient-to-l from-[#d8b66a] to-transparent" />
          </div>

          <p className="mt-6 max-w-[690px] text-[clamp(14px,0.88vw,16px)] font-medium leading-[1.82] text-[#f3e8cf] drop-shadow-[0_5px_18px_rgba(0,0,0,0.82)]">
            {aboutText}
          </p>

          <div className="mt-[clamp(34px,4vh,50px)] grid max-w-[760px] grid-cols-3 items-center gap-8">
            {benefits.map((benefit) => (
              <DesktopBenefit key={benefit.title} benefit={benefit} />
            ))}
          </div>
        </div>

        <div className="absolute left-[49%] top-[47%] z-30 -translate-x-1/2 -translate-y-1/2">
          <VideoToggleButton
            isPaused={isPaused}
            onClick={toggleVideo}
            sizeClassName="!h-[72px] !w-[72px]"
          />
        </div>
      </div>
    </section>
  );
}