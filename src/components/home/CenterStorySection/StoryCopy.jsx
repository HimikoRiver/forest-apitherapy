import BeeDividerIcon from "./BeeDividerIcon";

function GoldText({ children }) {
  return <span className="story-gold-text">{children}</span>;
}

const storyText = [
  <>
    Клиника <GoldText>«Апи-Дарб»</GoldText> выросла из семейного дела,
    начатого Базаевым Лечи — отцом Магомеда Л.Б. Ещё в те годы, когда к
    пчелоужалению относились с недоверием, он помогал людям с грыжами,
    протрузиями и многолетними болями, принимая тех, кто приходил по
    рекомендации благодарных пациентов. Видя результаты отца, Магомед решил
    продолжить это направление уже на профессиональной основе: получил
    медицинское образование и много лет практиковал в Грозном, постепенно
    расширяя опыт и возможности лечения.
  </>,
  <>
    В 2025 году он построил и обустроил собственную клинику, а в январе 2026
    года <GoldText>«Апи-Дарб»</GoldText> официально начала приём пациентов.
    Сегодня здесь применяют не только пчелоужаление, но и вытяжение
    позвоночника, кинезиотерапию, массажи, карбокситерапию, электрофорез,
    пчелодомики и другие процедуры. Лечение назначается только после
    консультации, изучения анализов и МРТ, а также обязательной пробы на
    аллергию к пчёлам.
  </>,
];

export default function StoryCopy() {
  return (
    <div className="story-copy max-w-[620px]">
      <p className="mb-4 mt-0 text-xs font-bold uppercase tracking-[0.48em]">
        <GoldText>APIDARB</GoldText>
      </p>

      <h2 className="m-0 text-[clamp(2.05rem,3.1vw,4.6rem)] font-bold leading-[1.08] tracking-[-0.075em] text-[#d8b66a] drop-shadow-[0_2px_16px_rgba(216,182,106,0.24)]">
        Центр Апитерапии
      </h2>

      <div className="my-7 flex w-full max-w-[430px] items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a]/0 via-[#d8b66a]/80 to-[#d8b66a]" />
        <BeeDividerIcon />
        <span className="h-px flex-1 bg-gradient-to-r from-[#d8b66a] via-[#d8b66a]/80 to-[#d8b66a]/0" />
      </div>

      <div className="space-y-4 text-left text-[0.82rem] font-medium leading-[1.72] tracking-[-0.035em] text-[#f3efe5]/86 sm:text-[0.88rem] lg:text-[0.92rem]">
        {storyText.map((paragraph, index) => (
          <p key={index} className="m-0 [text-indent:1.8em]">
            {paragraph}
          </p>
        ))}
      </div>

      <style jsx global>{`
        .story-gold-text {
          display: inline;
          font-weight: 800;
          color: transparent;
          background-image: linear-gradient(
            105deg,
            #8c6425 0%,
            #d8b66a 18%,
            #fff4c7 34%,
            #d8b66a 48%,
            #c99138 64%,
            #f4d88f 82%,
            #8c6425 100%
          );
          background-size: 240% 100%;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 0 0 14px rgba(216, 182, 106, 0.18);
          animation: storyGoldTextShimmer 5.5s linear infinite;
        }

        @keyframes storyGoldTextShimmer {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 240% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-gold-text {
            animation: none;
            background-position: 50% 50%;
          }
        }
      `}</style>
    </div>
  );
}