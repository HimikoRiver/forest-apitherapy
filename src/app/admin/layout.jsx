export default function AdminLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030b0c] [&_main]:relative [&_main]:z-10 [&_main]:bg-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-center bg-no-repeat opacity-95"
        style={{
          backgroundImage: "url('/images/admin/admin-bees-bg.webp')",
          backgroundSize: "100% 100%",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,182,106,0.06),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(216,182,106,0.06),transparent_32%),linear-gradient(180deg,_rgba(3,11,12,0.04)_0%,_rgba(3,11,12,0.16)_48%,_rgba(3,11,12,0.34)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[#030b0c]/12"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}