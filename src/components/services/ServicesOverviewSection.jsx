import InhalationTherapy from "./InhalationTherapy";
import ServicesPriceList from "./ServicesPriceList";

export default function ServicesOverviewSection() {
  return (
    <section className="relative -mt-px overflow-hidden bg-black pb-16 pt-5 sm:pb-20 lg:pb-24">
      <div className="relative z-10 mx-auto grid w-full max-w-[1800px] gap-5 px-4 sm:px-7 lg:gap-6 lg:px-10 xl:px-16">
        <InhalationTherapy />
        <ServicesPriceList />
      </div>
    </section>
  );
}