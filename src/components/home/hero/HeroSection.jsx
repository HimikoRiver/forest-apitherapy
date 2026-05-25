import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";
import HeroTablet from "./HeroTablet";

export default function HeroSection() {
  return (
    <>
      <div className="hidden lg:block">
        <HeroDesktop />
      </div>

      <div className="hidden md:block lg:hidden">
        <HeroTablet />
      </div>

      <div className="block md:hidden">
        <HeroMobile />
      </div>
    </>
  );
}
