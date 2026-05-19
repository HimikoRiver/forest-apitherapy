export default function HeroMenuStyles() {
  return (
    <style jsx global>{`
      .hero-menu-root {
        --menu-offset: 22px;
        --closed-size: 160px;
        --closed-half: 80px;
        --closed-scale: 0.216216;

        --open-size: 740px;
        --open-half: 370px;

        --open-shift-x: 12px;
        --open-shift-y: -18px;

        --closed-translate-x: 12px;
        --closed-translate-y: 18px;
      }

      @media (max-width: 767px) {
        .hero-menu-root {
          --menu-offset: 14px;
          --closed-size: 138px;
          --closed-half: 69px;
          --closed-scale: 0.23;

          --open-size: 600px;
          --open-half: 300px;

          --open-shift-x: 8px;
          --open-shift-y: -12px;

          --closed-translate-x: 8px;
          --closed-translate-y: 12px;
        }
      }

      @keyframes heroMenuInflate {
        0% {
          transform: scale(1) scaleX(1.025) scaleY(0.985);
        }

        44% {
          transform: scale(1.14) scaleX(1.05) scaleY(0.955);
        }

        100% {
          transform: scale(1) scaleX(1.025) scaleY(0.985);
        }
      }

      @keyframes heroMenuCompactGoldFlow {
        0% {
          background-position: 0% 50%;
        }

        100% {
          background-position: 240% 50%;
        }
      }

      .hero-menu-svg-shape {
        transform-origin: center;
        transition:
          transform 620ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity 220ms ease;
        will-change: transform;
      }

      .hero-menu-svg-shape-open {
        transform: scaleX(1.025) scaleY(0.985);
      }

      .hero-menu-svg-shape-closed {
        transform: scaleX(1) scaleY(1);
      }

      .hero-menu-svg-shape-inflate {
        animation: heroMenuInflate 360ms cubic-bezier(0.22, 1, 0.36, 1) 120ms
          both;
      }

      .hero-menu-ring {
        transition:
          stroke-width 240ms cubic-bezier(0.22, 1, 0.36, 1),
          stroke 180ms ease,
          filter 180ms ease;
      }

      .hero-menu-cross-line {
        transition: opacity 180ms ease;
      }

      .hero-menu-compact-label {
        font-family: var(--font-comfortaa), Arial, Helvetica, sans-serif;
      }

      .hero-menu-compact-label-light {
        color: #f3efe5;
        -webkit-text-fill-color: #f3efe5;
        filter:
          drop-shadow(0 2px 5px rgba(0, 0, 0, 0.58))
          drop-shadow(0 0 10px rgba(0, 0, 0, 0.24));
      }

      .hero-menu-compact-label-gold {
        background: linear-gradient(
          90deg,
          #7e551d 0%,
          #c28b37 18%,
          #fff2c7 34%,
          #aa6d25 50%,
          #f4d88f 68%,
          #7e551d 100%
        );
        background-size: 240% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        filter:
          drop-shadow(0 2px 5px rgba(0, 0, 0, 0.72))
          drop-shadow(0 0 8px rgba(244, 214, 151, 0.34));
        animation: heroMenuCompactGoldFlow 6.4s linear infinite;
      }
    `}</style>
  );
}