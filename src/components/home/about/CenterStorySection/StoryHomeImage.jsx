import Image from "next/image";

export default function StoryHomeImage() {
  return (
    <div className="story-home-image relative left-1/2 min-h-[clamp(520px,56vw,920px)] w-screen -translate-x-1/2 overflow-hidden">
      <Image
        src="/images/beesHome11.webp"
        alt="Домик с пчёлами"
        fill
        priority
        draggable={false}
        sizes="100vw"
        className="object-cover object-center drop-shadow-[0_34px_70px_rgba(0,0,0,0.55)]"
      />
    </div>
  );
}