import ApidarbLogo from "@/components/home/shared/ApidarbLogo";
import DecorativeBeeIcon from "@/components/home/shared/DecorativeBeeIcon";
import GoldDivider from "@/components/home/shared/GoldDivider";
import SectionTitle from "@/components/home/shared/SectionTitle";
import { homeContent } from "@/data/homeContent";

export default function AboutMobile() {
  return (
    <section className="bg-[#031617] px-4 py-14">
      <div className="mx-auto max-w-xl">
        <div className="mb-4">
          <ApidarbLogo />
        </div>

        <SectionTitle eyebrow={homeContent.about.eyebrow} title={homeContent.about.title} />

        <div className="mt-5 space-y-4 text-[14px] leading-7 text-[#f3efe5]/88">
          {homeContent.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <GoldDivider />
          <DecorativeBeeIcon className="size-7 text-[#d8b66a]" />
        </div>
      </div>
    </section>
  );
}
