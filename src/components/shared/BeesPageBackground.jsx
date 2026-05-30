export default function BeesPageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-center bg-no-repeat opacity-100"
      style={{
        backgroundImage: "url('/images/admin/admin-bees-bg.webp')",
        backgroundSize: "100% 100%",
      }}
    />
  );
}