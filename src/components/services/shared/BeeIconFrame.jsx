import BeeIcon from "@/components/home/shared/BeeIcon";

export default function BeeIconFrame({ size = "default" }) {
  const sizeClasses =
    size === "small"
      ? "size-[34px] sm:size-[38px]"
      : "size-[46px] sm:size-[50px]";

  const iconClasses =
    size === "small"
      ? "!size-[20px] sm:!size-[22px]"
      : "!size-[27px] sm:!size-[30px]";

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border border-[#d8ad56]/40 bg-[#0a2b1e]/70 shadow-[inset_0_0_22px_rgba(216,173,86,0.06),0_0_18px_rgba(216,173,86,0.06)] ${sizeClasses}`}
    >
      <span className={`luxury-button__icon ${iconClasses}`}>
        <BeeIcon className="size-full" />
      </span>
    </span>
  );
}