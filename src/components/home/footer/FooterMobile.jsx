import ApidarbLogo from "@/components/home/shared/ApidarbLogo";
import GoldDivider from "@/components/home/shared/GoldDivider";
import { homeContent } from "@/data/homeContent";

export default function FooterMobile() {
  return (
    <footer className="bg-[#030b0c] px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <ApidarbLogo />
          <GoldDivider />
        </div>

        <p className="text-sm leading-7 text-[#f3efe5]/84">
          {homeContent.footer.tagline}
        </p>

        <p className="mt-4 text-xs leading-6 text-[#f3efe5]/72">
          {homeContent.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
