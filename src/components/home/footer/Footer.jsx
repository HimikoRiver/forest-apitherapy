import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

export default function Footer() {
  return (
    <>
      <div className="block min-[1025px]:hidden">
        <FooterMobile />
      </div>

      <div className="hidden min-[1025px]:block">
        <FooterDesktop />
      </div>
    </>
  );
}