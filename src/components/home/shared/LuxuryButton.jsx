import Link from "next/link";
import { useId } from "react";

const BUTTON_VARIANTS = {
  default: {
    rootClassName: "translate-y-[15px]",
    rootStyle: {},
    contentClassName: "",
    contentStyle: {},
    labelClassName: "",
    labelStyle: {},
  },

  contactMap: {
    rootClassName: "!min-w-0 !translate-y-0",
    rootStyle: {
      width: "clamp(158px, 12vw, 172px)",
      height: "46px",
      minHeight: "46px",
    },
    contentClassName:
      "!absolute !inset-0 !flex !items-center !justify-center !p-0",
    contentStyle: {
      padding: 0,
    },
    labelClassName:
      "!whitespace-nowrap !text-[9px] !uppercase !tracking-[0.12em] sm:!text-[10px]",
    labelStyle: {
      fontWeight: 700,
    },
  },

  training: {
    rootClassName:
      "!h-[64px] !min-h-[64px] !min-w-[320px] !translate-y-0 !px-9 !py-0",
    rootStyle: {},
    contentClassName: "!gap-3",
    contentStyle: {},
    labelClassName: "",
    labelStyle: {},
  },
};

const OUTER_PATH = `
  M 28 1
  H 372
  C 381 1 386 5 389 12
  C 391 18 394 22 398 26
  C 401 29 401 35 398 38
  C 394 42 391 46 389 52
  C 386 59 381 63 372 63
  H 28
  C 19 63 14 59 11 52
  C 9 46 6 42 2 38
  C -1 35 -1 29 2 26
  C 6 22 9 18 11 12
  C 14 5 19 1 28 1
  Z
`;

const INNER_PATH = `
  M 30 4
  H 370
  C 377 4 381 7 384 14
  C 386 20 389 24 393 28
  C 395 30 395 34 393 36
  C 389 40 386 44 384 50
  C 381 57 377 60 370 60
  H 30
  C 23 60 19 57 16 50
  C 14 44 11 40 7 36
  C 5 34 5 30 7 28
  C 11 24 14 20 16 14
  C 19 7 23 4 30 4
  Z
`;

function FacetedButtonFrame({ gradientId }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 64"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient
          id={`${gradientId}-outer`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#795019" />
          <stop offset="18%" stopColor="#c88e36" />
          <stop offset="38%" stopColor="#ffe9a8" />
          <stop offset="58%" stopColor="#d99f3e" />
          <stop offset="78%" stopColor="#fff0b8" />
          <stop offset="100%" stopColor="#81531a" />
        </linearGradient>

        <linearGradient
          id={`${gradientId}-inner`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#9b671f" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#ffe8a4" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#9b671f" stopOpacity="0.45" />
        </linearGradient>

        <filter
          id={`${gradientId}-glow`}
          x="-10%"
          y="-30%"
          width="120%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="0.7" result="glow" />

          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={OUTER_PATH}
        fill="none"
        stroke={`url(#${gradientId}-outer)`}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        filter={`url(#${gradientId}-glow)`}
      />

      <path
        d={INNER_PATH}
        fill="none"
        stroke={`url(#${gradientId}-inner)`}
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StandardButtonLayers() {
  return (
    <>
      <span className="luxury-button__base" />
      <span className="luxury-button__texture" />
      <span className="luxury-button__velvet-light" />
      <span className="luxury-button__gold-fill" />
      <span className="luxury-button__shine" />
      <span className="luxury-button__border" />
    </>
  );
}

function FacetedButtonLayers({ clipId, gradientId }) {
  return (
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        className="pointer-events-none absolute"
      >
        <defs>
          <clipPath
            id={clipId}
            clipPathUnits="objectBoundingBox"
          >
            <path
              d="
                M 0.07 0.015
                H 0.93
                C 0.9525 0.015 0.965 0.078 0.9725 0.188
                C 0.9775 0.282 0.985 0.344 0.995 0.406
                C 1.0025 0.453 1.0025 0.547 0.995 0.594
                C 0.985 0.656 0.9775 0.718 0.9725 0.812
                C 0.965 0.922 0.9525 0.985 0.93 0.985
                H 0.07
                C 0.0475 0.985 0.035 0.922 0.0275 0.812
                C 0.0225 0.718 0.015 0.656 0.005 0.594
                C -0.0025 0.547 -0.0025 0.453 0.005 0.406
                C 0.015 0.344 0.0225 0.282 0.0275 0.188
                C 0.035 0.078 0.0475 0.015 0.07 0.015
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          clipPath: `url(#${clipId})`,
        }}
      >
        <span className="luxury-button__base" />
        <span className="luxury-button__texture" />
        <span className="luxury-button__velvet-light" />
        <span className="luxury-button__gold-fill" />
        <span className="luxury-button__shine" />
      </span>

      <FacetedButtonFrame gradientId={gradientId} />
    </>
  );
}

export default function LuxuryButton({
  children,
  className = "",
  icon,
  type = "button",
  href,
  variant = "default",
  style,
  ...props
}) {
  const componentId = useId().replaceAll(":", "");
  const clipId = `luxury-button-clip-${componentId}`;
  const gradientId = `luxury-button-gradient-${componentId}`;

  const isIconOnly = Boolean(icon && !children);
  const useFacetedShape = Boolean(children);
  const Component = href ? Link : "button";

  const variantConfig =
    BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.default;

  return (
    <Component
      {...(href ? { href } : { type })}
      className={`luxury-button relative isolate ${
        variantConfig.rootClassName
      } ${
        useFacetedShape
          ? "!overflow-visible !rounded-none !border-0"
          : ""
      } ${className}`}
      style={{
        ...variantConfig.rootStyle,
        ...style,
      }}
      {...props}
    >
      {useFacetedShape ? (
        <FacetedButtonLayers
          clipId={clipId}
          gradientId={gradientId}
        />
      ) : (
        <StandardButtonLayers />
      )}

      <span
        className={`luxury-button__content ${
          variantConfig.contentClassName
        } ${
          isIconOnly
            ? "!absolute !inset-0 !flex !items-center !justify-center"
            : ""
        }`}
        style={variantConfig.contentStyle}
      >
        {icon ? (
          <span
            className={`luxury-button__icon ${
              isIconOnly
                ? "!m-0 !flex !items-center !justify-center"
                : ""
            }`}
          >
            {icon}
          </span>
        ) : null}

        {children ? (
          <span
            className={`luxury-button__label ${variantConfig.labelClassName}`}
            style={variantConfig.labelStyle}
          >
            {children}
          </span>
        ) : null}
      </span>
    </Component>
  );
}