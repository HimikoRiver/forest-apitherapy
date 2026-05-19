export default function CompactMenuLabel({ isOpen, compactHovered }) {
  return (
    <span
      className={`hero-menu-compact-label pointer-events-none fixed z-[101] w-[120px] text-center text-[1.55rem] font-bold leading-none tracking-[-0.05em] transition duration-300 sm:text-[1.75rem] ${
        isOpen
          ? "translate-y-2 opacity-0"
          : compactHovered
            ? "hero-menu-compact-label-gold opacity-100"
            : "hero-menu-compact-label-light opacity-100"
      }`}
      style={{
        right:
          "calc(var(--menu-offset, 22px) + var(--closed-half, 80px) - 60px)",
        top:
          "calc(var(--menu-offset, 22px) + var(--closed-size, 160px) + 18px)",
      }}
    >
      menu
    </span>
  );
}