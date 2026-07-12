import Image from "next/image";

export default function InhalationTherapy() {
  return (
    <section className="relative overflow-hidden rounded-[22px] border border-[#d0a34a]/55 bg-[#03140f]/72 shadow-[0_24px_65px_rgba(0,0,0,0.36),inset_0_0_45px_rgba(216,173,86,0.025)]">
      <div className="grid min-h-[260px] lg:grid-cols-[52%_48%]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-9 sm:px-9 sm:py-11 lg:px-12 xl:px-14">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.34em] text-[#d7aa51]/75 sm:text-[11px]">
            Апидомик
          </p>

          <h2
            className="text-[clamp(1.25rem,2vw,2rem)] font-normal uppercase leading-[1.25] tracking-[0.035em] text-[#e2b45b]"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Ингаляционная терапия во сне
          </h2>

          <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#d8ad56]/80 to-transparent" />

          <p className="mt-6 max-w-[690px] text-[12px] font-medium leading-7 text-[#e8ddc8]/90 sm:text-[13px] lg:text-[14px]">
            Ингаляция — вот что происходит внутри помещения. Вдыхая ароматы
            мёда, воска, маточного молочка и пыльцы, человек получает
            естественный заряд бодрости. В апидомике организм расслабляется,
            человек быстрее засыпает, а сон становится спокойнее.
          </p>
        </div>

        <div className="relative min-h-[230px] overflow-hidden border-t border-[#d0a34a]/18 lg:min-h-full lg:border-l lg:border-t-0">
          <Image
            src="/images/services/soti.webp"
            alt="Пчёлы и соты"
            fill
            sizes="(max-width: 1023px) 100vw, 48vw"
            className="pointer-events-none select-none object-cover"
          />
        </div>
      </div>
    </section>
  );
}