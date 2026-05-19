import { COLORS } from "./heroMenu.constants";

export default function HeroMenuOverlay({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[90] transition duration-500 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Закрыть меню"
        onClick={onClose}
        className="absolute inset-0"
        style={{
          backgroundColor: COLORS.overlay,
          backdropFilter: "blur(1.5px)",
        }}
      />
    </div>
  );
}