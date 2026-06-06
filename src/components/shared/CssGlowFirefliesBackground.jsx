const fireflies = [
  { id: 1, className: "left-[6%] top-[12%] h-[7px] w-[7px] animate-firefly-one" },
  { id: 2, className: "left-[18%] top-[22%] h-[5px] w-[5px] animate-firefly-two" },
  { id: 3, className: "left-[32%] top-[10%] h-[6px] w-[6px] animate-firefly-three" },
  { id: 4, className: "left-[48%] top-[18%] h-[4px] w-[4px] animate-firefly-four" },
  { id: 5, className: "left-[67%] top-[11%] h-[6px] w-[6px] animate-firefly-five" },
  { id: 6, className: "left-[84%] top-[20%] h-[7px] w-[7px] animate-firefly-six" },

  { id: 7, className: "left-[10%] top-[42%] h-[5px] w-[5px] animate-firefly-seven" },
  { id: 8, className: "left-[25%] top-[55%] h-[7px] w-[7px] animate-firefly-eight" },
  { id: 9, className: "left-[41%] top-[46%] h-[4px] w-[4px] animate-firefly-nine" },
  { id: 10, className: "left-[58%] top-[52%] h-[6px] w-[6px] animate-firefly-ten" },
  { id: 11, className: "left-[73%] top-[41%] h-[5px] w-[5px] animate-firefly-eleven" },
  { id: 12, className: "left-[91%] top-[50%] h-[7px] w-[7px] animate-firefly-twelve" },

  { id: 13, className: "left-[7%] top-[76%] h-[8px] w-[8px] animate-firefly-thirteen" },
  { id: 14, className: "left-[21%] top-[84%] h-[5px] w-[5px] animate-firefly-fourteen" },
  { id: 15, className: "left-[36%] top-[72%] h-[6px] w-[6px] animate-firefly-fifteen" },
  { id: 16, className: "left-[51%] top-[82%] h-[4px] w-[4px] animate-firefly-sixteen" },
  { id: 17, className: "left-[64%] top-[74%] h-[7px] w-[7px] animate-firefly-seventeen" },
  { id: 18, className: "left-[78%] top-[86%] h-[5px] w-[5px] animate-firefly-eighteen" },
  { id: 19, className: "left-[88%] top-[69%] h-[6px] w-[6px] animate-firefly-nineteen" },
  { id: 20, className: "left-[96%] top-[82%] h-[8px] w-[8px] animate-firefly-twenty" },
];

export default function CssGlowFirefliesBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {fireflies.map((firefly) => (
        <span
          key={firefly.id}
          className={`absolute rounded-full bg-[#f4d878]/80 opacity-60 shadow-[0_0_14px_rgba(244,216,120,0.75),0_0_34px_rgba(244,216,120,0.32),0_0_64px_rgba(244,216,120,0.16)] ${firefly.className}`}
        />
      ))}

      <style jsx>{`
        @keyframes fireflyFloatOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0.22;
          }
          35% {
            transform: translate3d(34px, -22px, 0) scale(1.35);
            opacity: 0.78;
          }
          68% {
            transform: translate3d(-16px, 28px, 0) scale(0.95);
            opacity: 0.42;
          }
        }

        @keyframes fireflyFloatTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.75);
            opacity: 0.2;
          }
          40% {
            transform: translate3d(-28px, 26px, 0) scale(1.28);
            opacity: 0.72;
          }
          72% {
            transform: translate3d(22px, -18px, 0) scale(0.9);
            opacity: 0.38;
          }
        }

        @keyframes fireflyFloatThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.85);
            opacity: 0.24;
          }
          32% {
            transform: translate3d(18px, 34px, 0) scale(1.42);
            opacity: 0.8;
          }
          70% {
            transform: translate3d(-26px, -20px, 0) scale(0.9);
            opacity: 0.36;
          }
        }

        @keyframes fireflyFloatFour {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0.18;
          }
          42% {
            transform: translate3d(38px, 18px, 0) scale(1.25);
            opacity: 0.68;
          }
          76% {
            transform: translate3d(-20px, -30px, 0) scale(0.88);
            opacity: 0.32;
          }
        }

        .animate-firefly-one {
          animation: fireflyFloatOne 8.4s ease-in-out infinite;
        }

        .animate-firefly-two {
          animation: fireflyFloatTwo 9.2s ease-in-out infinite;
          animation-delay: -1.3s;
        }

        .animate-firefly-three {
          animation: fireflyFloatThree 10s ease-in-out infinite;
          animation-delay: -2.1s;
        }

        .animate-firefly-four {
          animation: fireflyFloatFour 8.8s ease-in-out infinite;
          animation-delay: -3.2s;
        }

        .animate-firefly-five {
          animation: fireflyFloatOne 9.6s ease-in-out infinite;
          animation-delay: -4.1s;
        }

        .animate-firefly-six {
          animation: fireflyFloatTwo 8.6s ease-in-out infinite;
          animation-delay: -5.2s;
        }

        .animate-firefly-seven {
          animation: fireflyFloatThree 10.4s ease-in-out infinite;
          animation-delay: -2.8s;
        }

        .animate-firefly-eight {
          animation: fireflyFloatFour 9.4s ease-in-out infinite;
          animation-delay: -6.1s;
        }

        .animate-firefly-nine {
          animation: fireflyFloatOne 8.9s ease-in-out infinite;
          animation-delay: -1.9s;
        }

        .animate-firefly-ten {
          animation: fireflyFloatTwo 10.2s ease-in-out infinite;
          animation-delay: -3.7s;
        }

        .animate-firefly-eleven {
          animation: fireflyFloatThree 9s ease-in-out infinite;
          animation-delay: -5.5s;
        }

        .animate-firefly-twelve {
          animation: fireflyFloatFour 8.2s ease-in-out infinite;
          animation-delay: -6.8s;
        }

        .animate-firefly-thirteen {
          animation: fireflyFloatOne 10.6s ease-in-out infinite;
          animation-delay: -4.6s;
        }

        .animate-firefly-fourteen {
          animation: fireflyFloatTwo 9.8s ease-in-out infinite;
          animation-delay: -7.1s;
        }

        .animate-firefly-fifteen {
          animation: fireflyFloatThree 8.7s ease-in-out infinite;
          animation-delay: -2.4s;
        }

        .animate-firefly-sixteen {
          animation: fireflyFloatFour 10.1s ease-in-out infinite;
          animation-delay: -3.4s;
        }

        .animate-firefly-seventeen {
          animation: fireflyFloatOne 9.3s ease-in-out infinite;
          animation-delay: -5.9s;
        }

        .animate-firefly-eighteen {
          animation: fireflyFloatTwo 8.5s ease-in-out infinite;
          animation-delay: -1.7s;
        }

        .animate-firefly-nineteen {
          animation: fireflyFloatThree 10.8s ease-in-out infinite;
          animation-delay: -7.4s;
        }

        .animate-firefly-twenty {
          animation: fireflyFloatFour 9.1s ease-in-out infinite;
          animation-delay: -4.9s;
        }
      `}</style>
    </div>
  );
}