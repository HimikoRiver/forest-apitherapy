export default function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.42em] text-[#d8b66a]">
          {eyebrow}
        </p>
      ) : null}

      {title ? (
        <h2 className="m-0 text-[clamp(2rem,3vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.06em] text-[#f3efe5]">
          {title}
        </h2>
      ) : null}

      {children}
    </div>
  );
}
