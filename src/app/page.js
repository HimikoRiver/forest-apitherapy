import DeviceGate from "@/components/DeviceGate";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <DeviceGate>
      <main className="min-h-screen bg-[#051f20] text-[#daf1de]">
        <HeroSection />
      </main>
    </DeviceGate>
  );
}