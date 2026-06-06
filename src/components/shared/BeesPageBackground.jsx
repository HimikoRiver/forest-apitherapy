"use client";

import CssGlowFirefliesBackground from "@/components/shared/CssGlowFirefliesBackground";

export default function BeesPageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030b0c]"
    >
      <CssGlowFirefliesBackground />
    </div>
  );
}