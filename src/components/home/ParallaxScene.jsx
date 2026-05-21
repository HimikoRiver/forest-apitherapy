import Image from "next/image";

const parallaxLayers = [
  {
    id: "right-pines",
    src: "/images/hero/layers/tree.webp",
    alt: "",
    className:
      "right-[-4%] top-[9%] w-[38%] max-w-[620px] min-w-[300px]",
    y: -110,
    zIndex: 1,
  },
  {
    id: "building",
    src: "/images/hero/layers/hero-building5.webp",
    alt: "",
    className:
      "left-[20.5%] top-[9.5%] w-full max-w-[1200px] min-w-[340px]",
    y: -150,
    zIndex: 2,
    withShadow: true,
    wallShade: true,
  },
  {
    id: "hill",
    src: "/images/hero/layers/hill.webp",
    alt: "",
    className:
      "left-[-5%] bottom-[25%] w-[58%] max-w-[960px] min-w-[480px]",
    y: -210,
    zIndex: 3,
  },
  {
    id: "tree",
    src: "/images/hero/layers/hero-tree4.webp",
    alt: "",
    className:
      "left-[-1.8%] top-[0%] w-full max-w-[1760px] min-w-[430px]",
    y: -270,
    zIndex: 8,
  },
  {
    id: "hives",
    src: "/images/hero/layers/hero-hives2.webp",
    alt: "",
    className:
      "left-[35.5%] top-[45%] w-full max-w-[700px] min-w-[300px]",
    y: -320,
    zIndex: 7,
  },
  {
    id: "front",
    src: "/images/hero/layers/front2.webp",
    alt: "",
    className:
      "left-[0%] bottom-[-20%] w-full max-w-none min-w-[900px]",
    y: -360,
    zIndex: 25,
  },
];

export default function ParallaxScene({ progress = 0 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#051f20]">
      <Image
        src="/images/hero/hero-forest-main3.webp"
        alt=""
        fill
        priority
        draggable={false}
        sizes="100vw"
        className="absolute inset-0 z-0 select-none object-cover object-center"
        style={{
          transform: `translate3d(0, ${progress * -45}px, 0)`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />

      {parallaxLayers.map((layer) => {
        const translateY = progress * layer.y;

        return (
          <div
            key={layer.id}
            className={`absolute ${layer.className}`}
            style={{
              zIndex: layer.zIndex,
              transform: `translate3d(0, ${translateY}px, 0)`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            {layer.withShadow ? (
              <>
                <div
                  className="absolute left-[18%] right-[8%] bottom-[60%] h-[18%] rounded-[50%] bg-black/80 blur-2xl"
                  style={{
                    transform: "translateX(-8%) skewX(-14deg)",
                  }}
                />

                <div
                  className="absolute left-[24%] right-[14%] bottom-[11%] h-[9%] rounded-[50%] bg-[#020805]/90 blur-xl"
                  style={{
                    transform: "translateX(-6%) skewX(-10deg)",
                  }}
                />
              </>
            ) : null}

            <Image
              src={layer.src}
              alt={layer.alt}
              width={1600}
              height={900}
              draggable={false}
              className={`relative z-10 h-auto w-full select-none object-contain ${
                layer.withShadow
                  ? "drop-shadow-[0_32px_36px_rgba(0,0,0,0.36)]"
                  : ""
              }`}
            />

            {layer.wallShade ? (
              <div
                className="absolute z-20 overflow-hidden"
                style={{
                  left: "6.4%",
                  top: "4.8%",
                  width: "24.2%",
                  height: "82%",
                }}
              >
                <div
                  className="absolute left-0 top-0 h-[860.8%] w-full mix-blend-multiply"
                  style={{
                    clipPath:
                      "polygon(6% 5%, 100% 0%, 100% 100%, 0% 91%, 0% 13%)",
                    background:
                      "linear-gradient(90deg, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.87) 46%, rgba(0, 0, 0, 0.53) 100%)",
                    opacity: 0.72,
                    filter: "blur(0.2px)",
                  }}
                />
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(3,16,13,0.5)_0%,rgba(3,16,13,0.24)_36%,rgba(3,16,13,0.02)_100%)]" />

      <div
        className="absolute inset-x-0 bottom-0 z-[24] h-[46%] bg-black"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 24%, rgba(0,0,0,0.98) 48%, #000 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 z-[26]"
        style={{
          bottom: "0%",
          height: "24%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.58) 28%, rgba(0,0,0,0.9) 62%, #000 100%)",
          filter: "blur(4px)",
        }}
      />

      <div
        className="absolute inset-x-0 z-[27] bg-black"
        style={{
          bottom: "0%",
          height: "14%",
          boxShadow: "0 -18px 34px rgba(0, 0, 0, 0.86)",
        }}
      />
    </div>
  );
}