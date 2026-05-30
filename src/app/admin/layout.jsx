export default function AdminLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030b0c] [&_main]:relative [&_main]:z-10 [&_main]:bg-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: "url('/images/admin/admin-bees-bg.webp')",
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}