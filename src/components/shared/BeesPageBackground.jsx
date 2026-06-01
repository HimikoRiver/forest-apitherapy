export default function BeesPageBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[#030b0c] lg:hidden"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 hidden bg-[#030b0c] bg-center bg-cover bg-no-repeat lg:block"
        style={{
          backgroundImage: "url('/images/admin/admin-bees-bg.webp')",
        }}
      />
    </>
  );
}