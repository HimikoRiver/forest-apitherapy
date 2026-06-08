export const metadata = {
  title: "Обучение | APIDARB",
  description: "Обучение апитерапии и консультационные материалы APIDARB.",
};

export default function TrainingPage() {
  return (
    <main
      className="min-h-screen bg-[#020908] px-5 py-28 text-[#f4edda]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <section className="mx-auto max-w-5xl">
        <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.52em] text-[#d8b66a]">
          Обучение
        </p>

        <h1 className="text-[clamp(2.8rem,6vw,5.4rem)] font-serif font-normal leading-none tracking-[-0.06em] text-[#f8f0dd]">
          Обучение
        </h1>

        <p className="mt-7 max-w-2xl text-[16px] font-medium leading-8 text-[#e8dcc4]">
          Раздел находится в подготовке. Информация об обучающих программах и
          форматах занятий будет добавлена позже.
        </p>
      </section>
    </main>
  );
}