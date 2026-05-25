import FooterMobile from "./FooterMobile";
import FooterTablet from "./FooterTablet";

export default function Footer() {
  return (
    <div className="lg:hidden">
      <div className="block md:hidden">
        <FooterMobile />
      </div>

      <div className="hidden md:block">
        <FooterTablet />
      </div>
    </div>
  );
}
