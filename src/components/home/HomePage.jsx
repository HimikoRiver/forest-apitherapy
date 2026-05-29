import HomeDesktop from "@/components/home/HomeDesktop";
import AboutMobile from "@/components/home/about/AboutMobile";
import AboutTablet from "@/components/home/about/AboutTablet";
import FooterMobile from "@/components/home/footer/FooterMobile";
import FooterTablet from "@/components/home/footer/FooterTablet";
import HeroMobile from "@/components/home/hero/HeroMobile";
import HeroTablet from "@/components/home/hero/HeroTablet";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#051f20] text-[#daf1de]">
      <div className="hidden xl:block">
        <HomeDesktop />
      </div>

      <div className="hidden md:block xl:hidden">
        <HeroTablet />
        <AboutTablet />
        <FooterTablet />
      </div>

      <div className="block md:hidden">
        <HeroMobile />
        <AboutMobile />
        <FooterMobile />
      </div>
    </main>
  );
}