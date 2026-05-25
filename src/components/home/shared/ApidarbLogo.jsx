import Image from "next/image";

export default function ApidarbLogo() {
  return (
    <div className="inline-flex items-center gap-3">
      <Image
        src="/images/logo.webp"
        alt="APIDARB"
        width={64}
        height={64}
        className="h-12 w-12 rounded-full object-cover"
      />

      <span className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f3efe5]">
        APIDARB
      </span>
    </div>
  );
}
