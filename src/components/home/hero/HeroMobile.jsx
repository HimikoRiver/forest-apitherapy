import ApidarbLogo from "@/components/home/shared/ApidarbLogo";
import DecorativeBeeIcon from "@/components/home/shared/DecorativeBeeIcon";
import GoldDivider from "@/components/home/shared/GoldDivider";
import LuxuryButton from "@/components/home/shared/LuxuryButton";
import SectionTitle from "@/components/home/shared/SectionTitle";
import { homeContent } from "@/data/homeContent";
import HeroParticles from "./HeroParticles";

export default function HeroMobile() {
  return (
    <section className="relative overflow-hidden bg-[#031617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(216,182,106,0.16),transparent_40%),linear-gradient(180deg,_rgba(3,22,23,1)_0%,_rgba(4,14,15,1)_100%)]" />
      <HeroParticles />

      <div className="relative mx-auto flex min-h-[72vh] max-w-xl flex-col justify-center px-4 py-14">
        <div className="mb-4">
          <ApidarbLogo />
        </div>

        <SectionTitle eyebrow={homeContent.hero.eyebrow} title={homeContent.hero.title} />

        <p className="mt-4 text-[15px] leading-7 text-[#f3efe5]/88">
          {homeContent.hero.summary}
        </p>

        <div className="mt-7">
          <LuxuryButton icon={<DecorativeBeeIcon />}>
            {homeContent.hero.cta}
          </LuxuryButton>
        </div>

        <div className="mt-8">
          <GoldDivider />
        </div>
      </div>
    </section>
  );
}
