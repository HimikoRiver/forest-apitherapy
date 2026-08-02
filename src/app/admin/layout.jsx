import CabinetTopNav from "@/components/shared/CabinetTopNav";

export default function AdminLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030b0c] [&_main]:relative [&_main]:z-10 [&_main]:bg-transparent">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[#030b0c]"
      />

      <div className="relative z-10 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <CabinetTopNav showAdminLinks />
      </div>

      <div className="relative z-10 [&>main]:!pb-4 [&>main]:!pt-0 [&>main>section>div:first-child]:!mb-3 [&>main>section>div.grid]:!gap-3">
        {children}
      </div>
    </div>
  );
}