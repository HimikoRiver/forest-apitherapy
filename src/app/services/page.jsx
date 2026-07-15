import Image from "next/image";
import ApidomikBenefits from "@/components/services/ApidomikBenefits";
import ApidomikDescription from "@/components/services/ApidomikDescription";
import ApidomikHero from "@/components/services/ApidomikHero";
import Footer from "@/components/home/footer/Footer";
import OrmedBookSlider from "@/components/services/OrmedBookSlider";
import OrmedEquipmentSection from "@/components/services/OrmedEquipmentSection";
import OrmedKinezoSection from "@/components/services/OrmedKinezoSection";
import ServicesOverviewSection from "@/components/services/ServicesOverviewSection";

export const metadata = {
  title: "Услуги | APIDARB",
  description: "Услуги центра апитерапии APIDARB.",
};

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9 shrink-0 text-[#d8ad56] sm:h-11 sm:w-11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 6 43 40H5L24 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M24 17v11"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      <circle cx="24" cy="34" r="1.7" fill="currentColor" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main
      className="overflow-x-hidden bg-black text-[#f4edda]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <ApidomikHero />

      <div className="grid gap-5 sm:gap-6 lg:gap-6">
        <section className="relative -mt-px overflow-hidden">
          <Image
            src="/images/services/fon22.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="pointer-events-none select-none object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-[#03180f]/10" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,88,55,0.08),transparent_64%)]" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[200px] bg-[linear-gradient(180deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.84)_20%,rgba(0,0,0,0.48)_52%,transparent_100%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[220px] bg-[linear-gradient(0deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.88)_18%,rgba(0,0,0,0.56)_42%,rgba(0,0,0,0.2)_72%,transparent_100%)]"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 pb-0 pt-8 sm:px-7 sm:pt-10 lg:px-10 lg:pt-12 xl:px-16">
            <div className="grid w-full gap-5 lg:gap-6">
              <ApidomikBenefits />
              <ApidomikDescription />
            </div>
          </div>
        </section>

        <div className="[&>section]:!m-0 [&>section]:!py-0">
          <ServicesOverviewSection />
        </div>

        <div className="[&>section]:!m-0 [&>section]:!py-0">
          <OrmedEquipmentSection />
        </div>

        <div className="[&>section]:!m-0 [&>section]:!py-0">
          <OrmedKinezoSection />
        </div>

        <div className="mx-auto w-full sm:w-[90%] lg:w-[80%]">
          <div className="[&>section]:!m-0 [&>section]:!py-0">
            <OrmedBookSlider />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-7 lg:px-10 xl:px-16">
          <div className="relative overflow-hidden rounded-[20px] border border-[#a57833]/60 bg-[linear-gradient(135deg,rgba(2,15,11,0.98),rgba(3,24,16,0.92))] shadow-[0_20px_50px_rgba(0,0,0,0.38)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(24,89,56,0.12),transparent_36%),radial-gradient(circle_at_84%_50%,rgba(216,173,86,0.06),transparent_30%)]" />

            <div className="relative z-10 grid lg:grid-cols-2">
              <div className="relative flex items-center px-5 py-6 sm:px-7 lg:px-8 lg:pr-28">
                <p className="text-[11px] font-semibold leading-6 text-[#d7aa51] sm:text-[12px] lg:text-[13px]">
                  Не откладывайте заботу о своём здоровье на потом — обратитесь
                  к нам прямо сейчас и начните путь к более свободному движению
                  и комфортной жизни.
                </p>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-1 right-4 hidden h-[82px] w-[82px] -scale-x-100 rotate-[9deg] opacity-90 sm:block"
                >
                  <Image
                    src="/images/services/bee.webp"
                    alt=""
                    fill
                    sizes="82px"
                    className="object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.48)]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 border-t border-[#a57833]/30 px-5 py-6 sm:px-7 lg:border-l lg:border-t-0 lg:px-8">
                <WarningIcon />

                <p className="text-[11px] font-medium leading-6 text-[#d8c9aa]/82 sm:text-[12px] lg:text-[13px]">
                  Имеются противопоказания. Процедура строго противопоказана при
                  остеопорозе, опухолях, инфекциях и травмах, нестабильности
                  позвонков и острых воспалительных процессах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}