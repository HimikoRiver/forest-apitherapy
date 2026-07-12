import { apidomikBenefits } from "./data/apidomik";
import ServiceIcon from "./shared/ServiceIcon";

export default function ApidomikBenefits() {
  return (
    <section className="relative rounded-[24px] border border-[#d0a34a]/62 bg-transparent px-4 pb-7 pt-7 sm:px-6 sm:pb-8 sm:pt-8 lg:px-8 lg:pt-9 xl:px-10">
      <div className="mb-8 flex items-center gap-5 px-1 sm:mb-10 sm:px-2 lg:px-4">
        <h2
          className="shrink-0 text-[clamp(1rem,1.55vw,1.55rem)] font-normal uppercase leading-none tracking-[0.035em] text-[#e4b45a]"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Как действует апидомик
        </h2>

        <span
          aria-hidden="true"
          className="h-px min-w-8 flex-1 bg-gradient-to-r from-[#d2a54b]/55 via-[#d2a54b]/20 to-transparent"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5 xl:gap-0">
        {apidomikBenefits.map((item, index) => (
          <article
            key={item.title}
            className={`flex flex-col items-center px-4 text-center sm:px-5 ${
              index !== apidomikBenefits.length - 1
                ? "xl:border-r xl:border-[#d0a34a]/20"
                : ""
            }`}
          >
            <ServiceIcon src={item.icon} />

            <div className="my-4 flex items-center gap-2">
              <span className="h-px w-7 bg-[#d8ad56]/55" />

              <span className="size-[4px] rotate-45 border border-[#d8ad56]/80" />

              <span className="h-px w-7 bg-[#d8ad56]/55" />
            </div>

            <h3 className="max-w-[240px] text-[11px] font-bold leading-5 text-[#e0b45b] sm:text-[12px] xl:text-[13px]">
              {item.title}
            </h3>

            <p className="mt-2 max-w-[240px] text-[10px] font-medium leading-5 text-[#e5dbc4]/90 xl:text-[11px]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}