import BeeDividerIcon from "./BeeDividerIcon";

const loremText = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae sapien sed mauris fermentum facilisis. Praesent vel arcu non risus malesuada viverra. Donec pretium, neque vitae porttitor luctus, lorem justo hendrerit tortor, vitae gravida arcu magna at nibh.",
  "Sed dignissim, ipsum ac gravida suscipit, arcu eros luctus neque, vitae tincidunt libero quam sed massa. Curabitur tempor, augue sed cursus volutpat, urna justo lacinia nulla, vel porta sapien erat ac neque.",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Maecenas blandit, lorem id facilisis viverra, risus justo pretium mi, vitae imperdiet est nibh nec lectus.",
];

export default function StoryCopy() {
  return (
    <div className="story-copy max-w-[620px]">
      <p className="mb-4 mt-0 text-xs font-bold uppercase tracking-[0.48em] text-[#d8b66a]">
        APIDARB
      </p>

      <h2 className="m-0 text-[clamp(2.05rem,3.1vw,4.6rem)] font-bold leading-[1.08] tracking-[-0.075em] text-[#d8b66a] drop-shadow-[0_2px_16px_rgba(216,182,106,0.24)]">
        О природной силе
      </h2>

      <div className="my-7 flex w-full max-w-[430px] items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/0 via-[#d8b66a]/80 to-[#d8b66a]" />
        <BeeDividerIcon />
        <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a] via-[#d8b66a]/80 to-[#d8b66a]/0" />
      </div>

      <div className="space-y-5 text-[0.95rem] font-semibold leading-[1.82] tracking-[-0.055em] text-[#f3efe5]/88 sm:text-[1rem]">
        {loremText.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}