import Image from "next/image";

export default function StoryHomeImage() {
  return (
    <div className="story-home-image relative min-h-[clamp(360px,37vw,620px)] self-start">
      <Image
        src="/images/beesHome.webp"
        alt="Домик с пчёлами"
        fill
        draggable={false}
        sizes="(max-width: 1024px) 52vw, 760px"
        className="object-contain object-top drop-shadow-[0_34px_70px_rgba(0,0,0,0.55)]"
      />
    </div>
  );
}