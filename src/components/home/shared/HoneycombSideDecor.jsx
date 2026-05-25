export default function HoneycombSideDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 lg:block">
      <div className="absolute inset-y-8 right-4 w-px bg-gradient-to-b from-transparent via-[#d8b66a]/50 to-transparent" />
      <div className="absolute inset-y-10 right-7 h-5 w-5 rotate-45 rounded-[4px] border border-[#d8b66a]/45" />
    </div>
  );
}
