import Image from "next/image";
import BeeDividerIcon from "@/components/home/about/CenterStorySection/BeeDividerIcon";
import LuxuryButton from "@/components/home/shared/LuxuryButton";

export const metadata = {
  title: "Обучение | APIDARB",
  description: "Обучение апитерапии и консультационные материалы APIDARB.",
};

export default function TrainingPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#020908] text-[#f4edda]"
      style={{
        fontFamily: "var(--font-comfortaa), Arial, Helvetica, sans-serif",
      }}
    >
      <Image
        src="/images/training/fon2.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,9,8,0.08)_0%,rgba(2,9,8,0.01)_48%,rgba(2,9,8,0.08)_100%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pb-8 pt-8 sm:px-8 sm:pt-10 lg:px-14 lg:pb-10 lg:pt-12 xl:px-20">
        <section className="max-w-[760px]">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.52em] text-[#d8b66a] sm:text-[12px]">
            Обучение
          </p>

          <p className="max-w-[720px] text-[14px] font-medium leading-7 text-[#eadfc8] sm:text-[16px] sm:leading-8">
            Раздел находится в разработке. Подробности о программах и форматах
            занятий появятся позже.
          </p>
        </section>

        <section className="mt-5 flex flex-col items-center text-center sm:mt-6 lg:mt-7">
          <div className="mb-4 flex w-full max-w-[760px] items-center justify-center gap-4 sm:gap-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b98a35] to-[#d8b66a]" />

            <BeeDividerIcon />

            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#b98a35] to-[#d8b66a]" />
          </div>

          <h2 className="font-serif text-[clamp(1.55rem,2.7vw,2.45rem)] font-normal leading-tight text-[#d6a94e]">
            Пчёлы уже трудятся над этим разделом
          </h2>

          <p className="mt-2 max-w-[680px] text-[13px] font-medium leading-6 text-[#eadfc8] sm:text-[15px] sm:leading-7">
            Формируем содержание, расписание и условия участия.
            <br className="hidden sm:block" />
            Скоро здесь появится вся необходимая информация.
          </p>
        </section>

        <div className="mt-auto flex justify-center pb-2 sm:pb-4">
          <LuxuryButton
            href="/"
            variant="training"
            icon={<BeeDividerIcon />}
          >
            Вернуться на главную
          </LuxuryButton>
        </div>
      </div>
    </main>
  );
}