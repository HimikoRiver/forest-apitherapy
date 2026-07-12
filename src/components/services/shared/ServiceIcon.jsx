export default function ServiceIcon({ src, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`luxury-button__icon !h-[58px] !w-[58px] sm:!h-[64px] sm:!w-[64px] xl:!h-[72px] xl:!w-[72px] ${className}`}
    >
      <span
        className="block size-full bg-current"
        style={{
          WebkitMaskImage: `url("${src}")`,
          maskImage: `url("${src}")`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </span>
  );
}