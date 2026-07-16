import Image from "next/image";
import FooterCards from "@/components/home/footer/FooterCards";

const instagramDisclaimer =
  "Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации. Упоминание осуществляется исключительно в информационных целях.";

const copyright = "© 2026 Himiko River. Все права защищены.";

export default function FooterTablet() {
  return (
    <footer
      className="relative overflow-hidden bg-black text-[#f3efe5]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <div
        data-menu-hide-start
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 left-0 h-px w-px"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-[1680px] px-6 sm:px-10 md:px-14 lg:px-20"
      >
        <div className="grid w-full grid-cols-[1fr_clamp(70px,8vw,150px)_1fr] items-center gap-[clamp(16px,2.2vw,38px)]">
          <span className="h-px bg-gradient-to-r from-transparent via-[#d8b66a]/78 to-[#d8b66a]/24 shadow-[0_0_16px_rgba(216,182,106,0.32)]" />

          <span className="relative flex items-center justify-center">
            <span className="h-[7px] w-[7px] rounded-full bg-[#d8b66a] shadow-[0_0_14px_rgba(216,182,106,0.62)]" />
            <span className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#d8b66a]/74 to-transparent" />
          </span>

          <span className="h-px bg-gradient-to-r from-[#d8b66a]/24 via-[#d8b66a]/78 to-transparent shadow-[0_0_16px_rgba(216,182,106,0.32)]" />
        </div>
      </div>

      <div className="relative mx-auto h-[clamp(460px,34.3vw,702px)] w-full max-w-[2047px] overflow-hidden bg-black">
        <Image
          src="/images/footer/footerFon229.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-bottom"
        />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_46%,rgba(0,0,0,0.18)_100%)]" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[10px] bg-[linear-gradient(180deg,#000000_0%,rgba(0,0,0,0.9)_28%,rgba(0,0,0,0.55)_62%,rgba(0,0,0,0)_100%)]"
        />

        <div className="absolute right-[15.2%] top-[24.8%] z-10 w-[42.5%]">
          <FooterCards />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8.8%] left-[6.7%] right-[6.7%] z-10 grid grid-cols-[1fr_clamp(90px,8vw,160px)_1fr] items-center gap-[clamp(14px,1.7vw,30px)]"
        >
          <span className="h-px bg-gradient-to-r from-transparent via-[#d8b66a]/76 to-[#d8b66a]/22 shadow-[0_0_14px_rgba(216,182,106,0.3)]" />

          <span className="relative flex items-center justify-center">
            <span className="h-[5px] w-[5px] rounded-full bg-[#d8b66a] shadow-[0_0_12px_rgba(216,182,106,0.56)]" />
            <span className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#d8b66a]/62 to-transparent" />
          </span>

          <span className="h-px bg-gradient-to-r from-[#d8b66a]/22 via-[#d8b66a]/76 to-transparent shadow-[0_0_14px_rgba(216,182,106,0.3)]" />
        </div>

        <p className="absolute bottom-[2.2%] left-[6.7%] z-10 m-0 max-w-[720px] text-left text-[clamp(0.52rem,0.64vw,0.78rem)] font-medium leading-[1.55] tracking-[-0.02em] text-[#d8b66a]/76 drop-shadow-[0_3px_12px_rgba(0,0,0,0.82)]">
          {instagramDisclaimer}
        </p>

        <p className="absolute bottom-[2.2%] right-[6.7%] z-10 m-0 max-w-[420px] text-right text-[clamp(0.72rem,0.86vw,1rem)] font-medium leading-[1.45] tracking-[0.02em] text-[#d8b66a]/88 drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
          {copyright}
        </p>
      </div>
    </footer>
  );
}