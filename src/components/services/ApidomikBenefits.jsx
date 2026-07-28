import { apidomikBenefits } from "./data/apidomik";
import ServiceIcon from "./shared/ServiceIcon";

export default function ApidomikBenefits() {
  return (
    <section className="relative rounded-[24px] border border-[#d0a34a]/62 bg-transparent px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 xl:px-10">
      <div className="mb-4 flex flex-col items-center gap-3 px-1 text-center sm:mb-5 sm:flex-row sm:gap-5 sm:px-2 sm:text-left lg:px-4">
        <h2
          className="text-[clamp(1rem,1.55vw,1.55rem)] font-normal uppercase leading-none tracking-[0.035em] text-[#e4b45a] sm:shrink-0"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Как действует апидомик
        </h2>

        <span
          aria-hidden="true"
          className="h-px w-24 flex-none bg-gradient-to-r from-transparent via-[#d2a54b]/55 to-transparent sm:w-auto sm:min-w-8 sm:flex-1 sm:from-[#d2a54b]/55 sm:via-[#d2a54b]/20 sm:to-transparent"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-5 xl:gap-0">
        {apidomikBenefits.map((item, index) => (
          <article
            key={item.title}
            className={`flex flex-col items-center px-3 text-center sm:px-4 xl:px-5 ${
              index !== apidomikBenefits.length - 1
                ? "xl:border-r xl:border-[#d0a34a]/20"
                : ""
            }`}
          >
            <ServiceIcon src={item.icon} />

            <h3 className="mt-3 max-w-[240px] text-[11px] font-bold leading-5 text-[#e0b45b] sm:text-[12px] xl:text-[13px]">
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