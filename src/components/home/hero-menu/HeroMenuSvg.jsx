import {
  COLORS,
  GOLD_TEXT_ITEMS,
  HOVER_STROKE_BOOST,
  NORMAL_CROSS_PATH_A,
  NORMAL_CROSS_PATH_B,
  TEXTURE_PATH,
  navItems,
  openRings,
} from "./heroMenu.constants";

import {
  clamp,
  getPaintFromColor,
  getRingColor,
  isLightPaint,
  makeArcPath,
} from "./heroMenu.utils";

export default function HeroMenuSvg({
  isOpen,
  isInflating,
  menuHiddenByFooter,
  compactHovered,
  compactHoverDepth,
  compactHoveredRingId,
  hoveredOpenRing,
  renderedRings,
  crossGroupRef,
  crossPathARef,
  crossPathBRef,
  onCompactMove,
  onCompactLeave,
  onOpenMenu,
  onCenterPointerDown,
  onHoverOpenRing,
  onNavClick,
}) {
  return (
    <div
      className="fixed z-[100]"
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
        pointerEvents: menuHiddenByFooter ? "none" : "auto",
      }}
      onPointerMove={onCompactMove}
      onPointerLeave={onCompactLeave}
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
            onOpenMenu();
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

          const ringColor = getRingColor(ring.color, isOpen, compactHovered);
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
              onPointerEnter={() => onHoverOpenRing(ring.id)}
              onPointerLeave={() => onHoverOpenRing(null)}
              onPointerDown={(event) => {
                if (!isOpen || !item) return;

                event.preventDefault();
                event.stopPropagation();
                onNavClick(item.href);
              }}
            />
          );
        })}

        <g
          className="cursor-pointer"
          onPointerDown={onCenterPointerDown}
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
              stroke="url(#heroMenuGoldText)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              style={{
                filter: "drop-shadow(0 1px 7px rgba(244, 214, 151, 0.42))",
              }}
            />

            <path
              ref={crossPathBRef}
              className="hero-menu-cross-line"
              d={NORMAL_CROSS_PATH_B}
              stroke="url(#heroMenuGoldText)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              style={{
                filter: "drop-shadow(0 1px 7px rgba(244, 214, 151, 0.42))",
              }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}