import BeeIcon from "@/components/home/shared/BeeIcon";
import { servicePrices } from "./data/services";

function PriceColumn({ services, startIndex }) {
  return (
    <ol className="space-y-4">
      {services.map((service, index) => (
        <li
          key={service.name}
          className="grid grid-cols-[26px_minmax(0,1fr)_auto] items-start gap-3"
        >
          <span className="pt-[2px] text-[12px] font-bold text-[#d8ad56] sm:text-[13px]">
            {startIndex + index + 1}.
          </span>

          <div className="min-w-0">
            <p className="text-[12px] font-semibold leading-6 text-[#e6dcc8] sm:text-[13px] lg:text-[14px]">
              {service.name}
            </p>

            {service.note ? (
              <p className="mt-1 text-[10px] font-medium leading-5 text-[#cfc3aa]/70 sm:text-[11px]">
                {service.note}
              </p>
            ) : null}
          </div>

          <span className="whitespace-nowrap pt-[2px] text-right text-[12px] font-bold text-[#d8ad56] sm:text-[13px] lg:text-[14px]">
            {service.price}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function ServicesPriceList() {
  const firstColumn = servicePrices.slice(0, 6);
  const secondColumn = servicePrices.slice(6);

  return (
    <section className="relative overflow-hidden rounded-[22px] border border-[#d0a34a]/55 bg-[#03140f]/76 px-6 py-9 shadow-[0_24px_65px_rgba(0,0,0,0.36),inset_0_0_45px_rgba(216,173,86,0.025)] sm:px-9 sm:py-11 lg:px-12 xl:px-14">
      <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[420px] bg-[radial-gradient(circle_at_top_right,rgba(216,173,86,0.07),transparent_68%)]" />

      <div className="relative z-10">
        <div className="flex items-center gap-5">
          <h2
            className="shrink-0 text-[clamp(1.35rem,2vw,2rem)] font-normal uppercase tracking-[0.035em] text-[#e2b45b]"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Наши услуги
          </h2>

          <span
            aria-hidden="true"
            className="h-px min-w-10 flex-1 bg-gradient-to-r from-[#d8ad56]/45 to-transparent"
          />
        </div>

        <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <PriceColumn services={firstColumn} startIndex={0} />
          <PriceColumn services={secondColumn} startIndex={6} />
        </div>
      </div>

      <span
        aria-hidden="true"
        className="luxury-button__icon pointer-events-none absolute bottom-4 right-5 size-[66px] rotate-[-22deg] text-[#d8ad56]/45 sm:bottom-5 sm:right-7 sm:size-[82px]"
      >
        <BeeIcon className="size-full" />
      </span>
    </section>
  );
}