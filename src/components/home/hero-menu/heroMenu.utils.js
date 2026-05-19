import { COLORS, compactThresholds } from "./heroMenu.constants";

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

export function getCompactHoverDepth(event) {
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

export function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

export function makeArcPath(radius, startAngle, endAngle, cx = 325, cy = 325) {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`;
}

export function getRingColor(color, isOpen, isHovered) {
  if (isOpen || !isHovered) return color;

  return color === COLORS.dark ? COLORS.light : COLORS.dark;
}

export function getPaintFromColor(color) {
  return color === COLORS.dark ? "url(#heroMenuGreenTexture)" : COLORS.light;
}

export function isLightPaint(paint) {
  return paint === COLORS.light;
}

export function getCrossPaths(progress) {
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