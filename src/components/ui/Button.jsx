export default function Button({
  children,
  className = "",
  icon,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`luxury-button relative isolate ${className}`}
      {...props}
    >
      <span className="luxury-button__base" />
      <span className="luxury-button__texture" />
      <span className="luxury-button__velvet-light" />
      <span className="luxury-button__gold-fill" />
      <span className="luxury-button__shine" />
      <span className="luxury-button__border" />

      <span className="luxury-button__content">
        {icon ? <span className="luxury-button__icon">{icon}</span> : null}
        <span className="luxury-button__label">{children}</span>
      </span>
    </button>
  );
}