import Image from "next/image";
import ApidomikBenefits from "@/components/services/ApidomikBenefits";
import ApidomikDescription from "@/components/services/ApidomikDescription";
import ApidomikHero from "@/components/services/ApidomikHero";
import OrmedEquipmentSection from "@/components/services/OrmedEquipmentSection";
import ServicesOverviewSection from "@/components/services/ServicesOverviewSection";

export const metadata = {
  title: "Услуги | APIDARB",
  description: "Услуги центра апитерапии APIDARB.",
};

export default function ServicesPage() {
  return (
    <main
      className="overflow-x-hidden bg-[#020908] text-[#f4edda]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <ApidomikHero />

      <section className="relative -mt-px overflow-hidden">
        <Image
          src="/images/services/fon22.webp"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="pointer-events-none select-none object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-[#03180f]/14" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,88,55,0.12),transparent_64%)]" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[240px] bg-[linear-gradient(180deg,rgb(1,10,8)_0%,rgba(1,10,8,0.96)_14%,rgba(1,10,8,0.78)_38%,rgba(1,10,8,0.38)_70%,transparent_100%)]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 pb-0 pt-8 sm:px-7 sm:pt-10 lg:px-10 lg:pt-12 xl:px-16">
          <div className="grid w-full gap-5 lg:gap-6">
            <ApidomikBenefits />
            <ApidomikDescription />
          </div>
        </div>
      </section>

      <ServicesOverviewSection />

      <OrmedEquipmentSection />
    </main>
  );
}