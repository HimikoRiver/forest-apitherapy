import Link from "next/link";

export default function LuxuryButton({
  children,
  className = "",
  icon,
  type = "button",
  href,
  ...props
}) {
  const isIconOnly = icon && !children;
  const Component = href ? Link : "button";

  return (
    <Component
      {...(href ? { href } : { type })}
      className={`luxury-button relative isolate translate-y-[15px] ${className}`}
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
          isIconOnly
            ? "!absolute !inset-0 !flex !items-center !justify-center"
            : ""
        }`}
      >
        {icon ? (
          <span
            className={`luxury-button__icon ${
              isIconOnly ? "!m-0 !flex !items-center !justify-center" : ""
            }`}
          >
            {icon}
          </span>
        ) : null}

        {children ? (
          <span className="luxury-button__label">{children}</span>
        ) : null}
      </span>
    </Component>
  );
}