export default function HeroParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute left-[12%] top-[18%] h-24 w-24 rounded-full bg-[#f2cf6f]/10 blur-3xl" />
      <span className="absolute right-[8%] top-[24%] h-20 w-20 rounded-full bg-[#fff3c8]/8 blur-2xl" />
      <span className="absolute bottom-[16%] left-[18%] h-16 w-16 rounded-full bg-[#d8b66a]/12 blur-2xl" />
    </div>
  );
}
