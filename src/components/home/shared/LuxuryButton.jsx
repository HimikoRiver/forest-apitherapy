import Link from "next/link";

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
      clipPath: `polygon(
        9px 0,
        calc(100% - 9px) 0,
        100% 9px,
        100% calc(100% - 9px),
        calc(100% - 9px) 100%,
        9px 100%,
        0 calc(100% - 9px),
        0 9px
      )`,
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
};

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
  const isIconOnly = icon && !children;
  const Component = href ? Link : "button";

  const variantConfig =
    BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.default;

  return (
    <Component
      {...(href ? { href } : { type })}
      className={`luxury-button relative isolate ${variantConfig.rootClassName} ${className}`}
      style={{
        ...variantConfig.rootStyle,
        ...style,
      }}
      {...props}
    >
      <span className="luxury-button__base" />
      <span className="luxury-button__texture" />
      <span className="luxury-button__velvet-light" />
      <span className="luxury-button__gold-fill" />
      <span className="luxury-button__shine" />
      <span className="luxury-button__border" />

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