"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const TEXTURE_PATH = "/textures/suede-green.webp";
const CROSS_ANIMATION_MS = 980;

const navItems = [
  { id: "home", label: "Главная", href: "#home" },
  { id: "about", label: "О специалисте", href: "#about" },
  { id: "services", label: "Услуги", href: "#services" },
  { id: "products", label: "Пчелопродукты", href: "#products" },
  { id: "contacts", label: "Контакты", href: "#contacts" },
];

const COLORS = {
  dark: "#063829",
  light: "#f3efe5",
  gold: "#d8b66a",
  textDark: "#17342d",
  overlay: "rgba(5, 31, 32, 0.16)",
};

const GOLD_TEXT_ITEMS = new Set(["about", "products"]);

const HOVER_STROKE_BOOST = 14;
const compactThresholds = [0.18, 0.36, 0.56, 0.78, 1.02];

const NORMAL_CROSS_PATH_A =
  "M -22 -22 C -14 -14 -7 -6 0 0 C 7 6 14 14 22 22";

const NORMAL_CROSS_PATH_B =
  "M 22 -22 C 14 -14 7 -6 0 0 C -7 6 -14 14 -22 22";

const openRings = [
  {
    id: "home",
    label: "Главная",
    radius: 72,
    labelRadius: 72,
    stroke: 54,
    color: COLORS.light,
    textColor: COLORS.textDark,
    fontSize: 17,
    arcStart: 168,
    arcEnd: 52,
    textDy: 3,
  },
  {
    id: "about",
    label: "О специалисте",
    radius: 128,
    labelRadius: 128,
    stroke: 56,
    color: COLORS.dark,
    textColor: COLORS.light,
    fontSize: 18,
    arcStart: 170,
    arcEnd: 48,
    textDy: 3,
  },
  {
    id: "services",
    label: "Услуги",
    radius: 184,
    labelRadius: 184,
    stroke: 56,
    color: COLORS.light,
    textColor: COLORS.textDark,
    fontSize: 19,
    arcStart: 168,
    arcEnd: 52,
    textDy: 3,
  },
  {
    id: "products",
    label: "Пчелопродукты",
    radius: 240,
    labelRadius: 240,
    stroke: 58,
    color: COLORS.dark,
    textColor: COLORS.light,
    fontSize: 20,
    arcStart: 172,
    arcEnd: 46,
    textDy: 3,
  },
  {
    id: "contacts",
    label: "Контакты",
    radius: 298,
    labelRadius: 298,
    stroke: 60,
    color: COLORS.light,
    textColor: COLORS.textDark,
    fontSize: 21,
    arcStart: 170,
    arcEnd: 50,
    textDy: 3,
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function getCompactHoverDepth(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const x = (event.clientX - cx) / (rect.width / 2);
  const y = (event.clientY - cy) / (rect.height / 2);
  const distance = Math.sqrt(x * x + (y / 0.9) * (y / 0.9));

  for (let i = 0; i < compactThresholds.length; i += 1) {
    if (distance <= compactThresholds[i]) {
      return compactThresholds.length - i;
    }
  }

  return 0;
}

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function makeArcPath(radius, startAngle, endAngle, cx = 325, cy = 325) {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`;
}

function getRingColor(color, isOpen, isHovered) {
  if (isOpen || !isHovered) return color;

  return color === COLORS.dark ? COLORS.light : COLORS.dark;
}

function getPaintFromColor(color) {
  return color === COLORS.dark ? "url(#heroMenuGreenTexture)" : COLORS.light;
}

function isLightPaint(paint) {
  return paint === COLORS.light;
}

function getCrossPaths(progress) {
  const wave = Math.sin(progress * Math.PI);
  const flutter = Math.sin(progress * Math.PI * 4);

  const bend = wave * 9;
  const twist = flutter * 2.5;

  return {
    firstPath: `
      M -22 -22
      C ${-14 + bend} ${-15 - bend} ${-7 - twist} ${-5 + bend} 0 0
      C ${7 + twist} ${5 - bend} ${14 - bend} ${15 + bend} 22 22
    `,
    secondPath: `
      M 22 -22
      C ${14 - bend} ${-15 + bend} ${7 + twist} ${-5 - bend} 0 0
      C ${-7 - twist} ${5 + bend} ${-14 + bend} ${15 - bend} -22 22
    `,
  };
}

export default function HeroMenu() {
  const crossGroupRef = useRef(null);
  const crossPathARef = useRef(null);
  const crossPathBRef = useRef(null);
  const crossFrameRef = useRef(null);
  const menuInflateTimeoutRef = useRef(null);

  const [isClientReady, setIsClientReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [compactHoverDepth, setCompactHoverDepth] = useState(0);
  const [hoveredOpenRing, setHoveredOpenRing] = useState(null);
  const [isInflating, setIsInflating] = useState(false);

  const compactHovered = compactHoverDepth > 0;

  const compactHoveredRingIndex =
    compactHoverDepth > 0 ? compactThresholds.length - compactHoverDepth : null;

  const compactHoveredRingId =
    compactHoveredRingIndex !== null
      ? openRings[compactHoveredRingIndex]?.id
      : null;

  const renderedRings = useMemo(() => {
    return [...openRings].sort((a, b) => b.radius - a.radius);
  }, []);

  const resetCross = () => {
    if (crossGroupRef.current) {
      crossGroupRef.current.setAttribute(
        "transform",
        "translate(325 325) rotate(0)"
      );
    }

    if (crossPathARef.current) {
      crossPathARef.current.setAttribute("d", NORMAL_CROSS_PATH_A);
    }

    if (crossPathBRef.current) {
      crossPathBRef.current.setAttribute("d", NORMAL_CROSS_PATH_B);
    }
  };

  const stopCrossAnimation = () => {
    if (crossFrameRef.current) {
      cancelAnimationFrame(crossFrameRef.current);
      crossFrameRef.current = null;
    }

    resetCross();
  };

  const startCrossAnimation = () => {
    stopCrossAnimation();

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const rawProgress = clamp(elapsed / CROSS_ANIMATION_MS, 0, 1);
      const easedProgress = easeOutCubic(rawProgress);
      const rotation = easedProgress * 360;
      const { firstPath, secondPath } = getCrossPaths(rawProgress);

      if (crossGroupRef.current) {
        crossGroupRef.current.setAttribute(
          "transform",
          `translate(325 325) rotate(${rotation})`
        );
      }

      if (crossPathARef.current) {
        crossPathARef.current.setAttribute("d", firstPath);
      }

      if (crossPathBRef.current) {
        crossPathBRef.current.setAttribute("d", secondPath);
      }

      if (rawProgress < 1) {
        crossFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      resetCross();
      crossFrameRef.current = null;
    };

    crossFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    setIsClientReady(true);

    return () => {
      if (crossFrameRef.current) {
        cancelAnimationFrame(crossFrameRef.current);
      }

      if (menuInflateTimeoutRef.current) {
        window.clearTimeout(menuInflateTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    setIsInflating(true);
    setCompactHoverDepth(0);

    requestAnimationFrame(() => {
      startCrossAnimation();
    });

    if (menuInflateTimeoutRef.current) {
      window.clearTimeout(menuInflateTimeoutRef.current);
    }

    menuInflateTimeoutRef.current = window.setTimeout(() => {
      setIsInflating(false);
    }, 560);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setHoveredOpenRing(null);
    setCompactHoverDepth(0);
    setIsInflating(false);
    stopCrossAnimation();

    if (menuInflateTimeoutRef.current) {
      window.clearTimeout(menuInflateTimeoutRef.current);
      menuInflateTimeoutRef.current = null;
    }
  };

  const handleCompactMove = (event) => {
    if (isOpen) return;

    const nextDepth = getCompactHoverDepth(event);

    setCompactHoverDepth((currentDepth) =>
      currentDepth === nextDepth ? currentDepth : nextDepth
    );
  };

  const handleCompactLeave = () => {
    if (isOpen) return;

    setCompactHoverDepth((currentDepth) =>
      currentDepth === 0 ? currentDepth : 0
    );
  };

  const handleNavClick = (href) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    } else {
      window.location.hash = href;
    }

    closeMenu();
  };

  const handleCenterPointerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  return (
    <>
      <style jsx global>{`
        .hero-menu-root {
          --menu-offset: 22px;
          --closed-size: 160px;
          --closed-half: 80px;
          --closed-scale: 0.2580645;

          --open-size: 620px;
          --open-half: 310px;

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
            --closed-scale: 0.276;

            --open-size: 500px;
            --open-half: 250px;

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

      <div
        className="hero-menu-root pointer-events-none fixed inset-0 z-[80]"
        style={{
          visibility: isClientReady ? "visible" : "hidden",
        }}
      >
        <div
          className={`fixed inset-0 z-[90] transition duration-500 ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={closeMenu}
            className="absolute inset-0"
            style={{
              backgroundColor: COLORS.overlay,
              backdropFilter: "blur(1.5px)",
            }}
          />
        </div>

        <div
          className="pointer-events-auto fixed z-[100]"
          style={{
            width: "var(--open-size, 620px)",
            height: "var(--open-size, 620px)",
            right:
              "calc(var(--menu-offset, 22px) + var(--closed-half, 80px) + var(--open-shift-x, 12px) - var(--open-half, 310px))",
            top:
              "calc(var(--menu-offset, 22px) + var(--closed-half, 80px) + var(--open-shift-y, -18px) - var(--open-half, 310px))",
            transform: isOpen
              ? "translate3d(0, 0, 0) scale(1)"
              : "translate3d(var(--closed-translate-x, 12px), var(--closed-translate-y, 18px), 0) scale(var(--closed-scale, 0.2580645))",
            transformOrigin: "center",
            transition: "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
          onPointerMove={handleCompactMove}
          onPointerLeave={handleCompactLeave}
        >
          <svg
            viewBox="0 0 650 650"
            className={`h-full w-full overflow-visible hero-menu-svg-shape ${
              isOpen
                ? isInflating
                  ? "hero-menu-svg-shape-inflate"
                  : "hero-menu-svg-shape-open"
                : "hero-menu-svg-shape-closed"
            }`}
            shapeRendering="geometricPrecision"
            onPointerDown={(event) => {
              if (!isOpen) {
                event.preventDefault();
                openMenu();
              }
            }}
          >
            <defs>
              <pattern
                id="heroMenuGreenTexture"
                x="0"
                y="0"
                width="650"
                height="650"
                patternUnits="userSpaceOnUse"
              >
                <image
                  href={TEXTURE_PATH}
                  x="0"
                  y="0"
                  width="650"
                  height="650"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>

              <linearGradient
                id="heroMenuGoldText"
                x1="0"
                y1="0"
                x2="650"
                y2="0"
                gradientUnits="userSpaceOnUse"
                spreadMethod="repeat"
              >
                <stop offset="0%" stopColor="#7e551d" />
                <stop offset="18%" stopColor="#c28b37" />
                <stop offset="34%" stopColor="#fff2c7" />
                <stop offset="50%" stopColor="#aa6d25" />
                <stop offset="68%" stopColor="#f4d88f" />
                <stop offset="100%" stopColor="#7e551d" />

                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="0 0"
                  to="650 0"
                  dur="6.4s"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <filter
                id="heroMenuHomeOuterShadow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="4"
                  floodColor="rgba(0,0,0,0.42)"
                  floodOpacity="1"
                />
              </filter>

              {openRings.map((ring) => (
                <path
                  key={`${ring.id}-arc`}
                  id={`hero-menu-arc-${ring.id}`}
                  d={makeArcPath(ring.labelRadius, ring.arcStart, ring.arcEnd)}
                  fill="none"
                />
              ))}
            </defs>

            {renderedRings.map((ring) => {
              const isOpenRingHovered = hoveredOpenRing === ring.id;
              const isCompactRingHovered =
                !isOpen && compactHoveredRingId === ring.id;

              const ringColor = getRingColor(
                ring.color,
                isOpen,
                compactHovered
              );

              const ringPaint = getPaintFromColor(ringColor);
              const ringIsLight = isLightPaint(ringPaint);

              const currentStrokeWidth =
                isOpenRingHovered || isCompactRingHovered
                  ? ring.stroke + HOVER_STROKE_BOOST
                  : ring.stroke;

              const bigLightRingShadow =
                isOpenRingHovered || isCompactRingHovered
                  ? "drop-shadow(0 6px 12px rgba(0,0,0,0.22))"
                  : "drop-shadow(0 2px 6px rgba(0,0,0,0.2))";

              const bigDarkRingShadow =
                isOpenRingHovered || isCompactRingHovered
                  ? "drop-shadow(0 10px 20px rgba(0,0,0,0.14))"
                  : "drop-shadow(0 2px 6px rgba(0,0,0,0.14))";

              const ringFilter = !isOpen
                ? "none"
                : ringIsLight
                  ? ring.id === "home"
                    ? "url(#heroMenuHomeOuterShadow)"
                    : bigLightRingShadow
                  : bigDarkRingShadow;

              return (
                <g key={`${ring.id}-group`}>
                  <circle
                    cx="325"
                    cy="325"
                    r={ring.radius}
                    fill="none"
                    stroke={ringPaint}
                    strokeWidth={currentStrokeWidth}
                    className="hero-menu-ring"
                    pointerEvents="none"
                    style={{
                      filter: ringFilter,
                    }}
                  />
                </g>
              );
            })}

            {openRings.map((ring) => {
              const isHovered = hoveredOpenRing === ring.id;
              const isGoldText = GOLD_TEXT_ITEMS.has(ring.id);

              return (
                <text
                  key={`${ring.id}-label`}
                  className="select-none transition-all duration-300"
                  fill={isGoldText ? "url(#heroMenuGoldText)" : ring.textColor}
                  fontSize={isHovered ? ring.fontSize + 2 : ring.fontSize}
                  fontWeight="700"
                  letterSpacing="-0.2"
                  textAnchor="middle"
                  dy={ring.textDy}
                  opacity={isOpen ? 1 : 0}
                  pointerEvents="none"
                  style={{
                    fontFamily:
                      "var(--font-comfortaa), Arial, Helvetica, sans-serif",
                    filter: isGoldText
                      ? "drop-shadow(0 1px 9px rgba(244, 214, 151, 0.24))"
                      : ring.textColor === COLORS.light
                        ? "drop-shadow(0 2px 6px rgba(0,0,0,0.28))"
                        : "drop-shadow(0 1px 5px rgba(255,255,255,0.12))",
                    transition:
                      "font-size 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease, filter 220ms ease",
                  }}
                >
                  <textPath
                    href={`#hero-menu-arc-${ring.id}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {ring.label}
                  </textPath>
                </text>
              );
            })}

            {openRings.map((ring) => {
              const item = navItems.find((navItem) => navItem.id === ring.id);

              return (
                <circle
                  key={`${ring.id}-hit`}
                  cx="325"
                  cy="325"
                  r={ring.radius}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={ring.stroke + HOVER_STROKE_BOOST + 10}
                  pointerEvents={isOpen ? "stroke" : "none"}
                  className="cursor-pointer"
                  onPointerEnter={() => setHoveredOpenRing(ring.id)}
                  onPointerLeave={() => setHoveredOpenRing(null)}
                  onPointerDown={(event) => {
                    if (!isOpen) return;

                    event.preventDefault();
                    event.stopPropagation();
                    handleNavClick(item.href);
                  }}
                />
              );
            })}

            <g
              className="cursor-pointer"
              onPointerDown={handleCenterPointerDown}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <circle
                cx="325"
                cy="325"
                r={isOpen ? 52 : clamp(42 - compactHoverDepth * 2.9, 28, 42)}
                fill={
                  isOpen
                    ? "url(#heroMenuGreenTexture)"
                    : compactHovered
                      ? COLORS.light
                      : "url(#heroMenuGreenTexture)"
                }
                stroke={COLORS.gold}
                strokeWidth={isOpen ? 2.4 : compactHovered ? 2.2 : 0}
                className="hero-menu-ring"
                style={{
                  filter: "none",
                }}
              />

              <g
                ref={crossGroupRef}
                transform="translate(325 325) rotate(0)"
                className={`transition duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
                pointerEvents="none"
              >
                <path
                  ref={crossPathARef}
                  className="hero-menu-cross-line"
                  d={NORMAL_CROSS_PATH_A}
                  stroke={COLORS.light}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />

                <path
                  ref={crossPathBRef}
                  className="hero-menu-cross-line"
                  d={NORMAL_CROSS_PATH_B}
                  stroke={COLORS.light}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>
          </svg>
        </div>

        <span
          className={`hero-menu-compact-label pointer-events-none fixed z-[101] w-[120px] text-center text-[1.55rem] font-bold leading-none tracking-[-0.05em] transition duration-300 sm:text-[1.75rem] ${
            isOpen
              ? "translate-y-2 opacity-0"
              : compactHovered
                ? "hero-menu-compact-label-gold opacity-100"
                : "hero-menu-compact-label-light opacity-100"
          }`}
          style={{
            right:
              "calc(var(--menu-offset, 22px) + var(--closed-half, 80px) - 60px)",
            top:
              "calc(var(--menu-offset, 22px) + var(--closed-size, 160px) + 4px)",
          }}
        >
          menu
        </span>
      </div>
    </>
  );
}