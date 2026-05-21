import Image from "next/image";

const ringText =
  "APIDARB • ЛЕЧЕНИЕ ПЧЁЛАМИ И ПЧЕЛОПРОДУКТАМИ • APIDARB • ЛЕЧЕНИЕ ПЧЁЛАМИ И ПЧЕЛОПРОДУКТАМИ • APIDARB • ЛЕЧЕНИЕ ПЧЁЛАМИ И ПЧЕЛОПРОДУКТАМИ •";

export default function StoryLogoCluster({ isLogoVisible }) {
  return (
    <div className="story-logo-row relative flex min-h-[260px] items-center justify-center pb-4 pt-0 sm:min-h-[300px] lg:min-h-[330px]">
      <div className="story-gold-line story-gold-line-left" />
      <div className="story-gold-line story-gold-line-right" />

      <div className="story-cluster relative flex items-center justify-center">
        <svg
          className="story-ring pointer-events-none absolute left-1/2 top-1/2 z-30"
          viewBox="0 0 620 620"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="apidarb-story-ring-gold"
              x1="0"
              y1="0"
              x2="620"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#8c6425" />
              <stop offset="22%" stopColor="#d8b66a" />
              <stop offset="42%" stopColor="#fff0bd" />
              <stop offset="62%" stopColor="#c99138" />
              <stop offset="100%" stopColor="#f4d88f" />
            </linearGradient>

            <path
              id="apidarb-story-ring-path"
              d="
                M 310 310
                m -244 0
                a 244 244 0 1 1 488 0
                a 244 244 0 1 1 -488 0
              "
            />
          </defs>

          <g className="story-ring-spin">
            <text className="story-ring-text">
              <textPath
                href="#apidarb-story-ring-path"
                startOffset="50%"
                textAnchor="middle"
                textLength="1532"
                lengthAdjust="spacing"
              >
                {ringText}
              </textPath>
            </text>
          </g>
        </svg>

        <div
          className={`apidarb-logo-wheel pointer-events-none relative z-20 h-[var(--story-logo-size)] w-[var(--story-logo-size)] ${
            isLogoVisible ? "is-visible" : ""
          }`}
        >
          <Image
            src="/images/logo.webp"
            alt="APIDARB"
            fill
            priority
            draggable={false}
            sizes="(max-width: 768px) 170px, 260px"
            className="select-none object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.72)]"
          />
        </div>
      </div>
    </div>
  );
}