import Image from "next/image";
import { apidomikFeatures } from "./data/apidomik";
import BeeIconFrame from "./shared/BeeIconFrame";
import DecorativeDivider from "./shared/DecorativeDivider";

export default function ApidomikDescription() {
  return (
    <section className="grid gap-5 overflow-hidden rounded-[24px] border border-[#d0a34a]/62 bg-transparent p-5 shadow-[0_-24px_40px_-26px_rgba(0,0,0,0.95),0_24px_40px_-26px_rgba(0,0,0,0.95)] lg:grid-cols-[42%_58%] xl:grid-cols-[40%_60%]">
      <div className="flex min-w-0 items-center justify-start">
        <div className="relative w-full overflow-hidden rounded-[18px] border border-[#d0a34a]/30">
          <Image
            src="/images/services/apihome.webp"
            alt="Апидомик"
            width={1536}
            height={1152}
            sizes="(max-width: 1023px) 100vw, 40vw"
            className="block h-auto w-full object-contain"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.16)_100%)]" />
        </div>
      </div>

      <div className="flex min-w-0 w-full flex-col justify-center px-2 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-8 xl:px-12 2xl:px-16">
        <div className="w-full max-w-[860px]">
          <h2
            className="text-center text-[clamp(1.8rem,2.6vw,3rem)] leading-tight text-[#e0b45b] sm:text-left"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Что такое апидомик?
          </h2>

          <div className="mt-4 flex justify-center sm:block">
            <DecorativeDivider />
          </div>

          <ul className="mt-7 space-y-5 xl:mt-8 xl:space-y-6">
            {apidomikFeatures.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[38px_1fr] items-start gap-4 text-[11px] font-medium leading-6 text-[#e8ddc6] sm:text-[12px] lg:text-[13px] lg:leading-7"
              >
                <BeeIconFrame size="small" />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}