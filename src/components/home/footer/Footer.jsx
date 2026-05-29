import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";
import FooterTablet from "./FooterTablet";

export default function Footer() {
  return (
    <>
      <div className="block md:hidden">
        <FooterMobile />
      </div>

      <div className="hidden md:block lg:hidden">
        <FooterTablet />
      </div>

      <div className="hidden lg:block">
        <FooterDesktop />
      </div>
    </>
  );
}