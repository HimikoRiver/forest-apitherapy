import HomeDesktop from "@/components/home/HomeDesktop";
import AboutMobile from "@/components/home/about/AboutMobile";
import AboutTablet from "@/components/home/about/AboutTablet";
import FooterMobile from "@/components/home/footer/FooterMobile";
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
      </div>

      <div className="block md:hidden">
        <HeroMobile />
        <AboutMobile />
      </div>

      <div className="block xl:hidden">
        <FooterMobile />
      </div>
    </main>
  );
}