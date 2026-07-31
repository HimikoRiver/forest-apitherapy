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
        {apidomikBenefits.map((item, index) => {
          const isLastItem = index === apidomikBenefits.length - 1;

          return (
            <article
              key={item.title}
              className={`relative flex flex-col items-center px-3 text-center sm:px-4 xl:px-5 ${
                isLastItem
                  ? "sm:col-span-2 sm:mx-auto sm:grid sm:w-full sm:max-w-[580px] sm:grid-cols-[88px_1fr] sm:items-center sm:gap-5 sm:overflow-hidden sm:rounded-[20px] sm:border sm:border-[#d0a34a]/28 sm:bg-[radial-gradient(circle_at_12%_50%,rgba(216,173,86,0.1),transparent_34%),linear-gradient(135deg,rgba(2,20,14,0.74),rgba(3,31,20,0.46))] sm:px-6 sm:py-4 sm:text-left sm:shadow-[0_14px_34px_rgba(0,0,0,0.2)] xl:col-span-1 xl:mx-0 xl:flex xl:w-auto xl:max-w-none xl:rounded-none xl:border-0 xl:bg-transparent xl:px-5 xl:py-0 xl:text-center xl:shadow-none"
                  : "xl:border-r xl:border-[#d0a34a]/20"
              }`}
            >
              {isLastItem && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-[18%] left-[88px] hidden w-px bg-gradient-to-b from-transparent via-[#d0a34a]/30 to-transparent sm:block xl:hidden"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 hidden h-24 w-24 rounded-full border border-[#d0a34a]/10 sm:block xl:hidden"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 -right-3 hidden h-20 w-20 rounded-full border border-[#d0a34a]/10 sm:block xl:hidden"
                  />
                </>
              )}

              <div
                className={
                  isLastItem
                    ? "relative z-10 flex justify-center sm:justify-start xl:justify-center"
                    : ""
                }
              >
                <ServiceIcon src={item.icon} />
              </div>

              <div
                className={
                  isLastItem
                    ? "relative z-10 flex flex-col items-center sm:items-start xl:items-center"
                    : "contents"
                }
              >
                <h3
                  className={`max-w-[240px] text-[11px] font-bold leading-5 text-[#e0b45b] sm:text-[12px] xl:text-[13px] ${
                    isLastItem
                      ? "mt-3 sm:mt-0 sm:max-w-none xl:mt-3 xl:max-w-[240px]"
                      : "mt-3"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-[10px] font-medium leading-5 text-[#e5dbc4]/90 xl:text-[11px] ${
                    isLastItem
                      ? "mt-2 max-w-[240px] sm:max-w-[390px] xl:max-w-[240px]"
                      : "mt-2 max-w-[240px]"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}