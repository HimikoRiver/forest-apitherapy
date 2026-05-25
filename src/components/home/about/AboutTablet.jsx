import ApidarbLogo from "@/components/home/shared/ApidarbLogo";
import DecorativeBeeIcon from "@/components/home/shared/DecorativeBeeIcon";
import GoldDivider from "@/components/home/shared/GoldDivider";
import SectionTitle from "@/components/home/shared/SectionTitle";
import { homeContent } from "@/data/homeContent";

export default function AboutTablet() {
  return (
    <section className="bg-[#031617] px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex justify-start">
          <ApidarbLogo />
        </div>

        <SectionTitle eyebrow={homeContent.about.eyebrow} title={homeContent.about.title} />

        <div className="mt-6 space-y-5 text-[15px] leading-7 text-[#f3efe5]/88">
          {homeContent.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <GoldDivider />
          <DecorativeBeeIcon className="size-8 text-[#d8b66a]" />
        </div>
      </div>
    </section>
  );
}
