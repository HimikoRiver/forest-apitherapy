export default function DecorativeDivider({ compact = false }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 text-[#d8ad56]"
    >
      <span
        className={`h-px bg-gradient-to-r from-transparent to-[#d8ad56]/80 ${
          compact ? "w-10" : "w-16 sm:w-24"
        }`}
      />

      <span className="size-[6px] rotate-45 border border-[#d8ad56]" />

      <span
        className={`h-px bg-gradient-to-l from-transparent to-[#d8ad56]/80 ${
          compact ? "w-10" : "w-16 sm:w-24"
        }`}
      />
    </div>
  );
}