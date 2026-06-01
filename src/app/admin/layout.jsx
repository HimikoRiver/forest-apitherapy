import CabinetTopNav from "@/components/shared/CabinetTopNav";

export default function AdminLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030b0c] [&_main]:relative [&_main]:z-10 [&_main]:bg-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[#030b0c] lg:hidden"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 hidden bg-[#030b0c] bg-center bg-cover bg-no-repeat opacity-100 lg:block"
        style={{
          backgroundImage: "url('/images/admin/admin-bees-bg.webp')",
        }}
      />

      <div className="relative z-10 px-4 pt-8 sm:px-6 lg:px-8">
        <CabinetTopNav showAdminLinks />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}