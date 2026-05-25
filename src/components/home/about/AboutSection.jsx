import AboutMobile from "./AboutMobile";
import AboutTablet from "./AboutTablet";

export default function AboutSection() {
  return (
    <div className="lg:hidden">
      <div className="block md:hidden">
        <AboutMobile />
      </div>

      <div className="hidden md:block">
        <AboutTablet />
      </div>
    </div>
  );
}
