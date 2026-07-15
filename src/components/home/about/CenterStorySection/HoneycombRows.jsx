"use client";

import { useState } from "react";

const honeycombCells = Array.from({ length: 9 });

export default function HoneycombRows({
  mode = "hero",
  direction = "top",
  className = "",
}) {
  const [animatingCells, setAnimatingCells] = useState(() => new Set());

  const startCellAnimation = (cellId) => {
    setAnimatingCells((currentCells) => {
      /*
       * Повторное наведение на уже анимирующуюся соту не перезапускает
       * текущую анимацию и не обрывает её.
       */
      if (currentCells.has(cellId)) {
        return currentCells;
      }

      const nextCells = new Set(currentCells);
      nextCells.add(cellId);

      return nextCells;
    });
  };

  const finishCellAnimation = (cellId, event) => {
    /*
     * Псевдоэлемент блика тоже запускает animationend.
     * Удаляем состояние только после завершения основной анимации соты.
     */
    if (event.animationName !== "persistentHoneyJump") {
      return;
    }

    setAnimatingCells((currentCells) => {
      if (!currentCells.has(cellId)) {
        return currentCells;
      }

      const nextCells = new Set(currentCells);
      nextCells.delete(cellId);

      return nextCells;
    });
  };

  const renderHeroRow = (rowType) => {
    const isBottom = rowType === "bottom";

    return (
      <div
        className={`story-honeycomb-row ${
          isBottom
            ? "story-honeycomb-row-bottom"
            : "story-honeycomb-row-top"
        }`}
        aria-hidden="true"
      >
        {honeycombCells.map((_, index) => {
          const cellId = `hero-${rowType}-${index}`;
          const isAnimating = animatingCells.has(cellId);

          return (
            <span
              key={cellId}
              className={`story-honeycomb-hit ${
                isAnimating ? "is-animating" : ""
              }`}
              onMouseEnter={() => startCellAnimation(cellId)}
            >
              <span
                className="story-honeycomb-cell"
                onAnimationEnd={(event) =>
                  finishCellAnimation(cellId, event)
                }
              />
            </span>
          );
        })}
      </div>
    );
  };

  if (mode === "hero") {
    return (
      <>
        {renderHeroRow("top")}
        {renderHeroRow("bottom")}

        <style jsx global>{`
          .story-honeycomb-hit.is-animating .story-honeycomb-cell {
            z-index: 5;
            filter: brightness(1.14) saturate(1.16);
            box-shadow:
              0 0 16px rgba(255, 229, 149, 0.32),
              0 0 30px rgba(216, 182, 106, 0.16),
              inset 0 1px 0 rgba(255, 251, 236, 0.92),
              inset 0 -7px 10px rgba(101, 54, 8, 0.22);
            animation: persistentHoneyJump 520ms
              cubic-bezier(0.22, 1.16, 0.34, 1) 1;
          }

          .story-honeycomb-hit.is-animating
            .story-honeycomb-cell::before {
            animation: persistentHoneySweep 620ms ease-out 1;
          }

          @keyframes persistentHoneyJump {
            0% {
              transform:
                translateY(var(--cell-rest-y))
                scale(var(--cell-rest-scale));
            }

            45% {
              transform:
                translateY(var(--cell-jump-y))
                scale(var(--cell-hover-scale));
            }

            72% {
              transform:
                translateY(var(--cell-land-y))
                scale(var(--cell-land-scale));
            }

            100% {
              transform:
                translateY(var(--cell-rest-y))
                scale(var(--cell-rest-scale));
            }
          }

          @keyframes persistentHoneySweep {
            0% {
              opacity: 0;
              transform: translateX(-125%) rotate(8deg);
            }

            35% {
              opacity: 0.95;
            }

            100% {
              opacity: 0;
              transform: translateX(125%) rotate(8deg);
            }
          }
        `}</style>
      </>
    );
  }

  const isBottom = direction === "bottom";

  return (
    <div
      className={`universal-honeycomb-row ${
        isBottom ? "universal-honeycomb-row--bottom" : ""
      } ${className}`}
      aria-hidden="true"
    >
      {honeycombCells.map((_, index) => {
        const cellId = `standalone-${direction}-${index}`;
        const isAnimating = animatingCells.has(cellId);

        return (
          <span
            key={cellId}
            className={`universal-honeycomb-hit ${
              isBottom ? "universal-honeycomb-hit--bottom" : ""
            } ${isAnimating ? "is-animating" : ""}`}
            onMouseEnter={() => startCellAnimation(cellId)}
          >
            <span
              className="universal-honeycomb-cell"
              onAnimationEnd={(event) =>
                finishCellAnimation(cellId, event)
              }
            />
          </span>
        );
      })}

      <style jsx global>{`
        .universal-honeycomb-row {
          position: relative;
          display: flex;
          width: 100%;
          min-width: 0;
          height: 48px;
          align-items: center;
          justify-content: space-between;
          overflow: visible;
          pointer-events: none;
        }

        .universal-honeycomb-hit {
          --cell-rest-y: 0px;
          --cell-rest-scale: 1;
          --cell-jump-y: -13px;
          --cell-land-y: 2px;
          --cell-hover-scale: 1.08;
          --cell-land-scale: 0.97;

          position: relative;
          display: flex;
          width: 54px;
          height: 48px;
          flex: 0 0 54px;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          cursor: default;
        }

        .universal-honeycomb-hit--bottom {
          --cell-jump-y: 13px;
          --cell-land-y: -2px;
        }

        .universal-honeycomb-cell {
          --cell-size: 26px;

          position: relative;
          display: block;
          width: var(--cell-size);
          height: calc(var(--cell-size) * 0.88);
          flex: 0 0 auto;
          overflow: hidden;

          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );

          border: 1px solid rgba(255, 232, 166, 0.58);

          background:
            radial-gradient(
              circle at 34% 28%,
              rgba(255, 251, 235, 0.95) 0%,
              rgba(255, 232, 167, 0.92) 12%,
              rgba(245, 192, 80, 0.76) 32%,
              rgba(210, 137, 24, 0.88) 62%,
              rgba(122, 66, 8, 0.92) 100%
            ),
            linear-gradient(
              135deg,
              rgba(255, 243, 191, 0.9) 0%,
              rgba(244, 191, 67, 0.72) 36%,
              rgba(160, 95, 14, 0.85) 100%
            );

          box-shadow:
            0 0 12px rgba(216, 182, 106, 0.14),
            0 0 22px rgba(216, 182, 106, 0.08),
            inset 0 1px 0 rgba(255, 251, 236, 0.85),
            inset 0 -7px 10px rgba(101, 54, 8, 0.28);

          opacity: 0.95;

          transform:
            translateY(var(--cell-rest-y))
            scale(var(--cell-rest-scale));

          transition:
            filter 180ms ease,
            box-shadow 180ms ease;

          will-change: transform, filter;
        }

        .universal-honeycomb-cell::before {
          content: "";
          position: absolute;
          inset: 2px;
          clip-path: inherit;

          background: linear-gradient(
            118deg,
            transparent 0%,
            rgba(255, 248, 220, 0.08) 24%,
            rgba(255, 253, 244, 0.82) 44%,
            rgba(255, 224, 130, 0.24) 56%,
            transparent 72%
          );

          opacity: 0;
          transform: translateX(-125%) rotate(8deg);
        }

        .universal-honeycomb-cell::after {
          content: "";
          position: absolute;
          inset: 3px 4px 5px;
          clip-path: inherit;

          background: radial-gradient(
            circle at 34% 28%,
            rgba(255, 250, 228, 0.45) 0%,
            rgba(255, 212, 112, 0.16) 28%,
            rgba(165, 95, 14, 0.14) 100%
          );

          opacity: 0.88;
        }

        .universal-honeycomb-hit.is-animating
          .universal-honeycomb-cell {
          z-index: 5;
          filter: brightness(1.14) saturate(1.16);

          box-shadow:
            0 0 16px rgba(255, 229, 149, 0.32),
            0 0 30px rgba(216, 182, 106, 0.16),
            inset 0 1px 0 rgba(255, 251, 236, 0.92),
            inset 0 -7px 10px rgba(101, 54, 8, 0.22);

          animation: persistentHoneyJump 520ms
            cubic-bezier(0.22, 1.16, 0.34, 1) 1;
        }

        .universal-honeycomb-hit.is-animating
          .universal-honeycomb-cell::before {
          animation: persistentHoneySweep 620ms ease-out 1;
        }

        .universal-honeycomb-row:not(.universal-honeycomb-row--bottom)
          .universal-honeycomb-hit:nth-child(even) {
          --cell-rest-y: -2px;
          --cell-rest-scale: 0.95;
          --cell-hover-scale: 1.03;
          --cell-land-scale: 0.93;
        }

        .universal-honeycomb-row--bottom
          .universal-honeycomb-hit:nth-child(odd) {
          --cell-rest-y: 2px;
          --cell-rest-scale: 0.95;
          --cell-hover-scale: 1.03;
          --cell-land-scale: 0.93;
        }

        .universal-honeycomb-row:not(.universal-honeycomb-row--bottom)
          .universal-honeycomb-hit:nth-child(even)
          .universal-honeycomb-cell,
        .universal-honeycomb-row--bottom
          .universal-honeycomb-hit:nth-child(odd)
          .universal-honeycomb-cell {
          opacity: 0.82;
        }

        @keyframes persistentHoneyJump {
          0% {
            transform:
              translateY(var(--cell-rest-y))
              scale(var(--cell-rest-scale));
          }

          45% {
            transform:
              translateY(var(--cell-jump-y))
              scale(var(--cell-hover-scale));
          }

          72% {
            transform:
              translateY(var(--cell-land-y))
              scale(var(--cell-land-scale));
          }

          100% {
            transform:
              translateY(var(--cell-rest-y))
              scale(var(--cell-rest-scale));
          }
        }

        @keyframes persistentHoneySweep {
          0% {
            opacity: 0;
            transform: translateX(-125%) rotate(8deg);
          }

          35% {
            opacity: 0.95;
          }

          100% {
            opacity: 0;
            transform: translateX(125%) rotate(8deg);
          }
        }

        @media (max-width: 640px) {
          .universal-honeycomb-row {
            height: 40px;
          }

          .universal-honeycomb-hit {
            width: 34px;
            height: 40px;
            flex-basis: 34px;
          }

          .universal-honeycomb-cell {
            --cell-size: 21px;
          }
        }
      `}</style>
    </div>
  );
}