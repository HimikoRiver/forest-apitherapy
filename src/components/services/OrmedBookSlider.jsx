"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import LuxuryButton from "@/components/home/shared/LuxuryButton";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const TURN_DURATION = 0.5;
const SETTLE_HOLD_DURATION = 0;
const SETTLE_DURATION = 110;

const PAGE_LEFT_PERCENT = 7.3;
const PAGE_RIGHT_PERCENT = 49;
const PAGE_TOP_PERCENT = 19;
const PAGE_WIDTH_PERCENT = 42.7;
const PAGE_HEIGHT_PERCENT = 60.4;

const PHOTO_LEFT_PERCENT = 5;
const PHOTO_TOP_PERCENT = 8.7;
const PHOTO_WIDTH_PERCENT = 90;
const PHOTO_HEIGHT_PERCENT = 82;
const PHOTO_CORNER_RADIUS_PERCENT = 2.8;

const PAGE_POSITIONS = {
  left: {
    left: `${PAGE_LEFT_PERCENT}%`,
    top: `${PAGE_TOP_PERCENT}%`,
    width: `${PAGE_WIDTH_PERCENT}%`,
    height: `${PAGE_HEIGHT_PERCENT}%`,
  },
  right: {
    left: `${PAGE_RIGHT_PERCENT}%`,
    top: `${PAGE_TOP_PERCENT}%`,
    width: `${PAGE_WIDTH_PERCENT}%`,
    height: `${PAGE_HEIGHT_PERCENT}%`,
  },
};

const PAGE_X_SEGMENTS = 72;
const PAGE_Y_SEGMENTS = 24;

const PAGE_BEND_RADIANS = 0.56;
const PAGE_TOP_EDGE_CURVE = 0.028;
const PAGE_BOTTOM_EDGE_CURVE = 0.052;
const PAGE_TOP_EDGE_DEPTH = 0.017;
const PAGE_BOTTOM_EDGE_DEPTH = 0.013;
const PAGE_CENTER_BILLOW = 0.0065;

const STATIC_OUTER_TOP_INSET = 0;
const STATIC_OUTER_CURVE_START = 0.82;
const STATIC_BOTTOM_ARC_LIFT = 0.018;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(edgeStart, edgeEnd, value) {
  const normalized = clamp(
    (value - edgeStart) / (edgeEnd - edgeStart),
    0,
    1,
  );

  return normalized * normalized * (3 - 2 * normalized);
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function drawRoundedRectangle(
  context,
  x,
  y,
  width,
  height,
  radius,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);

  context.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + safeRadius,
  );

  context.lineTo(x + width, y + height - safeRadius);

  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height,
  );

  context.lineTo(x + safeRadius, y + height);

  context.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - safeRadius,
  );

  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawPageOutline(context, width, height, side) {
  const isLeft = side === "left";

  context.beginPath();

  if (isLeft) {
    context.moveTo(width, 0);

    context.bezierCurveTo(
      width * 0.74,
      0,
      width * 0.42,
      0,
      width * 0.18,
      height * 0.006,
    );

    context.bezierCurveTo(
      width * 0.08,
      height * 0.008,
      width * 0.02,
      height * 0.015,
      width * 0.005,
      height * 0.03,
    );

    context.bezierCurveTo(
      0,
      height * 0.28,
      0,
      height * 0.72,
      0,
      height,
    );

    context.bezierCurveTo(
      width * 0.12,
      height * 0.996,
      width * 0.28,
      height * 0.982,
      width * 0.5,
      height * 0.982,
    );

    context.bezierCurveTo(
      width * 0.72,
      height * 0.982,
      width * 0.88,
      height * 0.996,
      width,
      height,
    );
  } else {
    context.moveTo(0, 0);

    context.bezierCurveTo(
      width * 0.26,
      0,
      width * 0.58,
      0,
      width * 0.82,
      height * 0.006,
    );

    context.bezierCurveTo(
      width * 0.92,
      height * 0.008,
      width * 0.98,
      height * 0.015,
      width * 0.995,
      height * 0.03,
    );

    context.bezierCurveTo(
      width,
      height * 0.28,
      width,
      height * 0.72,
      width,
      height,
    );

    context.bezierCurveTo(
      width * 0.88,
      height * 0.996,
      width * 0.72,
      height * 0.982,
      width * 0.5,
      height * 0.982,
    );

    context.bezierCurveTo(
      width * 0.28,
      height * 0.982,
      width * 0.12,
      height * 0.996,
      0,
      height,
    );
  }

  context.closePath();
}

function drawCoverImage(context, image, x, y, width, height) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;

  if (imageRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height,
  );
}

function drawPageTexture(context, canvas, image, side) {
  const { width, height } = canvas;
  const isLeft = side === "left";

  context.clearRect(0, 0, width, height);

  context.save();
  drawPageOutline(context, width, height, side);
  context.clip();

  const paperGradient = context.createLinearGradient(
    0,
    0,
    width,
    height,
  );

  if (isLeft) {
    paperGradient.addColorStop(0, "#d9b97f");
    paperGradient.addColorStop(0.18, "#ecd6a8");
    paperGradient.addColorStop(0.66, "#f1dfb9");
    paperGradient.addColorStop(1, "#cda66b");
  } else {
    paperGradient.addColorStop(0, "#cda66b");
    paperGradient.addColorStop(0.34, "#f1dfb9");
    paperGradient.addColorStop(0.82, "#ecd6a8");
    paperGradient.addColorStop(1, "#d9b97f");
  }

  context.fillStyle = paperGradient;
  context.fillRect(0, 0, width, height);

  const paperLight = context.createRadialGradient(
    width * 0.5,
    height * 0.43,
    0,
    width * 0.5,
    height * 0.43,
    width * 0.72,
  );

  paperLight.addColorStop(0, "rgba(255,250,236,0.14)");
  paperLight.addColorStop(0.62, "rgba(255,250,236,0)");
  paperLight.addColorStop(1, "rgba(255,250,236,0)");

  context.fillStyle = paperLight;
  context.fillRect(0, 0, width, height);

  const photoX = width * (PHOTO_LEFT_PERCENT / 100);
  const photoY = height * (PHOTO_TOP_PERCENT / 100);
  const photoWidth = width * (PHOTO_WIDTH_PERCENT / 100);
  const photoHeight = height * (PHOTO_HEIGHT_PERCENT / 100);

  const photoRadius = Math.min(
    photoWidth * (PHOTO_CORNER_RADIUS_PERCENT / 100),
    photoHeight * 0.034,
  );

  context.save();

  drawRoundedRectangle(
    context,
    photoX,
    photoY,
    photoWidth,
    photoHeight,
    photoRadius,
  );

  context.clip();

  if (image) {
    drawCoverImage(
      context,
      image,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
    );
  } else {
    const emptyGradient = context.createLinearGradient(
      photoX,
      photoY,
      photoX + photoWidth,
      photoY + photoHeight,
    );

    emptyGradient.addColorStop(0, "#e7ce9c");
    emptyGradient.addColorStop(1, "#c99f64");

    context.fillStyle = emptyGradient;
    context.fillRect(photoX, photoY, photoWidth, photoHeight);
  }

  const photoOverlay = context.createLinearGradient(
    0,
    photoY,
    0,
    photoY + photoHeight,
  );

  photoOverlay.addColorStop(0, "rgba(255,255,255,0.05)");
  photoOverlay.addColorStop(0.18, "rgba(255,255,255,0)");
  photoOverlay.addColorStop(0.76, "rgba(0,0,0,0)");
  photoOverlay.addColorStop(1, "rgba(47,24,5,0.12)");

  context.fillStyle = photoOverlay;
  context.fillRect(photoX, photoY, photoWidth, photoHeight);

  context.restore();
  context.save();

  drawRoundedRectangle(
    context,
    photoX,
    photoY,
    photoWidth,
    photoHeight,
    photoRadius,
  );

  context.strokeStyle = "rgba(111,71,27,0.42)";
  context.lineWidth = Math.max(2, width * 0.003);
  context.stroke();
  context.restore();

  const spineShadow = isLeft
    ? context.createLinearGradient(width * 0.92, 0, width, 0)
    : context.createLinearGradient(0, 0, width * 0.08, 0);

  if (isLeft) {
    spineShadow.addColorStop(0, "rgba(120,79,32,0)");
    spineShadow.addColorStop(0.45, "rgba(120,79,32,0.04)");
    spineShadow.addColorStop(0.72, "rgba(76,42,12,0.14)");
    spineShadow.addColorStop(1, "rgba(48,23,4,0.24)");
  } else {
    spineShadow.addColorStop(0, "rgba(48,23,4,0.24)");
    spineShadow.addColorStop(0.28, "rgba(76,42,12,0.14)");
    spineShadow.addColorStop(0.55, "rgba(120,79,32,0.04)");
    spineShadow.addColorStop(1, "rgba(120,79,32,0)");
  }

  context.fillStyle = spineShadow;
  context.fillRect(0, 0, width, height);

  const spineHighlight = isLeft
    ? context.createLinearGradient(
        width * 0.968,
        0,
        width * 0.988,
        0,
      )
    : context.createLinearGradient(
        width * 0.012,
        0,
        width * 0.032,
        0,
      );

  if (isLeft) {
    spineHighlight.addColorStop(0, "rgba(255,242,209,0)");
    spineHighlight.addColorStop(0.5, "rgba(255,242,209,0.14)");
    spineHighlight.addColorStop(1, "rgba(85,44,12,0.05)");
  } else {
    spineHighlight.addColorStop(0, "rgba(85,44,12,0.05)");
    spineHighlight.addColorStop(0.5, "rgba(255,242,209,0.14)");
    spineHighlight.addColorStop(1, "rgba(255,242,209,0)");
  }

  context.fillStyle = spineHighlight;
  context.fillRect(0, 0, width, height);

  context.restore();
}

function usePageTexture(photoSrc, side) {
  const [textureState, setTextureState] = useState({
    texture: null,
    ready: false,
  });

  useEffect(() => {
    let disposed = false;

    setTextureState({
      texture: null,
      ready: false,
    });

    const canvas = document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 972;

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    drawPageTexture(context, canvas, null, side);

    const pageTexture = new THREE.CanvasTexture(canvas);

    pageTexture.colorSpace = THREE.SRGBColorSpace;
    pageTexture.wrapS = THREE.RepeatWrapping;
    pageTexture.wrapT = THREE.ClampToEdgeWrapping;
    pageTexture.minFilter = THREE.LinearMipmapLinearFilter;
    pageTexture.magFilter = THREE.LinearFilter;
    pageTexture.anisotropy = 8;
    pageTexture.generateMipmaps = true;
    pageTexture.premultiplyAlpha = true;

    if (side === "left") {
      pageTexture.repeat.x = -1;
      pageTexture.offset.x = 1;
    }

    pageTexture.needsUpdate = true;

    if (!photoSrc) {
      setTextureState({
        texture: pageTexture,
        ready: true,
      });
    } else {
      setTextureState({
        texture: pageTexture,
        ready: false,
      });

      const photo = new window.Image();

      photo.decoding = "async";

      photo.onload = () => {
        if (disposed) {
          return;
        }

        drawPageTexture(context, canvas, photo, side);
        pageTexture.needsUpdate = true;

        setTextureState({
          texture: pageTexture,
          ready: true,
        });
      };

      photo.onerror = () => {
        if (disposed) {
          return;
        }

        drawPageTexture(context, canvas, null, side);
        pageTexture.needsUpdate = true;

        setTextureState({
          texture: pageTexture,
          ready: true,
        });
      };

      photo.src = photoSrc;
    }

    return () => {
      disposed = true;
      pageTexture.dispose();
    };
  }, [photoSrc, side]);

  return textureState;
}

function ChevronButton({ direction = "left", onClick }) {
  const isLeft = direction === "left";

  return (
    <LuxuryButton
      type="button"
      onClick={onClick}
      aria-label={
        isLeft ? "Предыдущий разворот" : "Следующий разворот"
      }
      className="group !flex !size-[48px] !min-h-[48px] !min-w-[48px] !max-h-[48px] !max-w-[48px] !shrink-0 !translate-y-0 !items-center !justify-center !overflow-hidden !rounded-full !p-0 before:!inset-0 before:!rounded-full after:!inset-0 after:!rounded-full sm:!size-[54px] sm:!min-h-[54px] sm:!min-w-[54px] sm:!max-h-[54px] sm:!max-w-[54px] [&_*]:!rounded-full [&_.luxury-button__content]:!flex [&_.luxury-button__content]:!size-full [&_.luxury-button__content]:!min-h-0 [&_.luxury-button__content]:!min-w-0 [&_.luxury-button__content]:!items-center [&_.luxury-button__content]:!justify-center [&_.luxury-button__content]:!p-0 [&_.luxury-button__icon]:!m-0 [&_.luxury-button__icon]:!flex [&_.luxury-button__icon]:!size-full [&_.luxury-button__icon]:!min-h-0 [&_.luxury-button__icon]:!min-w-0 [&_.luxury-button__icon]:!items-center [&_.luxury-button__icon]:!justify-center [&_.luxury-button__label]:!hidden"
      icon={
        <svg
          viewBox="0 0 24 24"
          className={`!size-5 transition-transform duration-300 ${
            isLeft
              ? "group-hover:-translate-x-0.5"
              : "group-hover:translate-x-0.5"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isLeft ? (
            <path d="M14.5 5.5 8 12l6.5 6.5" />
          ) : (
            <path d="M9.5 5.5 16 12l-6.5 6.5" />
          )}
        </svg>
      }
    />
  );
}

function ClipDefs({ pageLeftId, pageRightId }) {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      className="pointer-events-none absolute"
    >
      <defs>
        <clipPath
          id={pageRightId}
          clipPathUnits="objectBoundingBox"
        >
          <path d="M0,0 C0.26,0 0.58,0 0.82,0.006 C0.92,0.008 0.98,0.015 0.995,0.03 C1,2.28 2,2.72 1,1 C0.88,0.996 0.72,0.982 0.5,0.982 C0.28,0.982 0.12,0.996 0,1 Z" />
        </clipPath>

        <clipPath
          id={pageLeftId}
          clipPathUnits="objectBoundingBox"
        >
          <path d="M1,0 C0.74,0 0.42,0 0.18,0.006 C0.08,0.008 0.02,0.015 0.005,0.03 C0,0.28 0,0.72 0,1 C0.12,0.996 0.28,0.982 0.5,0.982 C0.72,0.982 0.88,0.996 1,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

function InnerPageCurve({ side }) {
  const isLeft = side === "left";

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{
          width: "8%",
          ...(isLeft ? { right: 0 } : { left: 0 }),
          background: isLeft
            ? "linear-gradient(270deg,rgba(48,23,4,0.24) 0%,rgba(76,42,12,0.14) 28%,rgba(120,79,32,0.04) 55%,transparent 100%)"
            : "linear-gradient(90deg,rgba(48,23,4,0.24) 0%,rgba(76,42,12,0.14) 28%,rgba(120,79,32,0.04) 55%,transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[3%] z-20"
        style={{
          width: "2%",
          ...(isLeft ? { right: "1.2%" } : { left: "1.2%" }),
          background: isLeft
            ? "linear-gradient(90deg,transparent,rgba(255,242,209,0.14),rgba(85,44,12,0.06))"
            : "linear-gradient(90deg,rgba(85,44,12,0.06),rgba(255,242,209,0.14),transparent)",
          filter: "blur(0.6px)",
        }}
      />
    </>
  );
}

function PagePaperContent({ photo, side }) {
  const isLeft = side === "left";

  const paperBackground = isLeft
    ? "linear-gradient(135deg,#d9b97f 0%,#ecd6a8 18%,#f1dfb9 66%,#cda66b 100%)"
    : "linear-gradient(135deg,#cda66b 0%,#f1dfb9 34%,#ecd6a8 82%,#d9b97f 100%)";

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: paperBackground,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,236,0.14),transparent_62%)]" />

      <div
        className="absolute z-[2] overflow-hidden border border-[#8b612e]/28 bg-[#d8bc89] shadow-[0_8px_20px_rgba(42,21,4,0.18)]"
        style={{
          left: `${PHOTO_LEFT_PERCENT}%`,
          top: `${PHOTO_TOP_PERCENT}%`,
          width: `${PHOTO_WIDTH_PERCENT}%`,
          height: `${PHOTO_HEIGHT_PERCENT}%`,
          borderRadius: `${PHOTO_CORNER_RADIUS_PERCENT}% / 3.4%`,
        }}
      >
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 767px) 40vw, 36vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="size-full bg-[linear-gradient(145deg,#ead4a7,#d2ac6c)]" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%,transparent_76%,rgba(47,24,5,0.12))]" />
      </div>

      <InnerPageCurve side={side} />
    </>
  );
}

function StaticPage({ photo, side, clipId }) {
  const position = PAGE_POSITIONS[side];

  return (
    <div
      className="absolute z-10 overflow-hidden border border-[#a97a3a]/20 shadow-[0_10px_28px_rgba(38,19,4,0.18)]"
      style={{
        ...position,
        clipPath: `url(#${clipId})`,
        WebkitClipPath: `url(#${clipId})`,
      }}
    >
      <PagePaperContent photo={photo} side={side} />
    </div>
  );
}

function TurningPageMesh({
  direction,
  phase,
  frontPhoto,
  backPhoto,
  onReady,
  onComplete,
}) {
  const isNext = direction === "next";
  const groupRef = useRef(null);

  const viewportWidth = useThree(
    (state) => state.viewport.width,
  );

  const viewportHeight = useThree(
    (state) => state.viewport.height,
  );

  const pageWidth =
    viewportWidth * (PAGE_WIDTH_PERCENT / 100);

  const pageHeight =
    viewportHeight * (PAGE_HEIGHT_PERCENT / 100);

  const pageCenterY =
    viewportHeight / 2 -
    viewportHeight * (PAGE_TOP_PERCENT / 100) -
    pageHeight / 2;

  const frontPageSide = isNext ? "right" : "left";
  const backPageSide = isNext ? "left" : "right";

  const frontTextureState = usePageTexture(
    frontPhoto?.src ?? null,
    frontPageSide,
  );

  const backTextureState = usePageTexture(
    backPhoto?.src ?? null,
    backPageSide,
  );

  const geometry = useMemo(
    () =>
      new THREE.PlaneGeometry(
        pageWidth,
        pageHeight,
        PAGE_X_SEGMENTS,
        PAGE_Y_SEGMENTS,
      ),
    [pageHeight, pageWidth],
  );

  const pathX = useMemo(
    () => new Float32Array(PAGE_X_SEGMENTS + 1),
    [],
  );

  const pathZ = useMemo(
    () => new Float32Array(PAGE_X_SEGMENTS + 1),
    [],
  );

  const startTimeRef = useRef(null);
  const completedRef = useRef(false);
  const readyNotifiedRef = useRef(false);

  const onReadyRef = useRef(onReady);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (
      frontTextureState.ready &&
      backTextureState.ready &&
      !readyNotifiedRef.current
    ) {
      readyNotifiedRef.current = true;

      requestAnimationFrame(() => {
        onReadyRef.current();
      });
    }
  }, [
    backTextureState.ready,
    frontTextureState.ready,
  ]);

  useEffect(() => {
    if (phase === "turning") {
      startTimeRef.current = null;
      completedRef.current = false;
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((state) => {
    let rawProgress = 0;

    if (phase === "turning") {
      if (startTimeRef.current === null) {
        startTimeRef.current = state.clock.elapsedTime;
      }

      const elapsed =
        state.clock.elapsedTime - startTimeRef.current;

      rawProgress = Math.min(
        elapsed / TURN_DURATION,
        1,
      );
    }

    if (phase === "landed" || phase === "settling") {
      rawProgress = 1;
    }

    const progress = easeInOutCubic(rawProgress);
    const bendStrength = Math.sin(Math.PI * progress);

    const startHingePercent = isNext
      ? PAGE_RIGHT_PERCENT
      : PAGE_LEFT_PERCENT + PAGE_WIDTH_PERCENT;

    const endHingePercent = isNext
      ? PAGE_LEFT_PERCENT + PAGE_WIDTH_PERCENT
      : PAGE_RIGHT_PERCENT;

    const hingePercent =
      startHingePercent +
      (endHingePercent - startHingePercent) * progress;

    const pivotX =
      -viewportWidth / 2 +
      viewportWidth * (hingePercent / 100);

    if (groupRef.current) {
      groupRef.current.position.set(
        pivotX,
        pageCenterY,
        0.06,
      );
    }

    const baseAngle = isNext
      ? progress * Math.PI
      : (1 - progress) * Math.PI;

    const bendDirection = isNext ? 1 : -1;
    const segmentLength = pageWidth / PAGE_X_SEGMENTS;

    pathX[0] = 0;
    pathZ[0] = 0;

    for (
      let column = 1;
      column <= PAGE_X_SEGMENTS;
      column += 1
    ) {
      const normalizedMiddle =
        (column - 0.5) / PAGE_X_SEGMENTS;

      const localBend =
        Math.sin(Math.PI * normalizedMiddle) *
        PAGE_BEND_RADIANS *
        bendStrength *
        bendDirection;

      const tangentAngle = baseAngle + localBend;

      pathX[column] =
        pathX[column - 1] +
        Math.cos(tangentAngle) * segmentLength;

      pathZ[column] =
        pathZ[column - 1] +
        Math.sin(tangentAngle) * segmentLength;
    }

    const positionAttribute = geometry.attributes.position;
    const uvAttribute = geometry.attributes.uv;

    for (
      let vertexIndex = 0;
      vertexIndex < positionAttribute.count;
      vertexIndex += 1
    ) {
      const u = uvAttribute.getX(vertexIndex);
      const v = uvAttribute.getY(vertexIndex);

      const column = Math.min(
        PAGE_X_SEGMENTS,
        Math.max(
          0,
          Math.round(u * PAGE_X_SEGMENTS),
        ),
      );

      const baseVerticalPosition =
        (v - 0.5) * pageHeight;

      const topInfluence = Math.pow(
        Math.max(0, (v - 0.5) * 2),
        1.8,
      );

      const bottomInfluence = Math.pow(
        Math.max(0, (0.5 - v) * 2),
        1.8,
      );

      const staticOuterCurve = smoothstep(
        STATIC_OUTER_CURVE_START,
        1,
        u,
      );

      const staticTopInset =
        staticOuterCurve *
        topInfluence *
        pageHeight *
        STATIC_OUTER_TOP_INSET;

      const staticBottomArcLift =
        Math.pow(Math.sin(Math.PI * u), 0.9) *
        bottomInfluence *
        pageHeight *
        STATIC_BOTTOM_ARC_LIFT;

      const freeEdgeWeight = Math.pow(u, 1.34);

      const horizontalEdgeWave =
        freeEdgeWeight *
        (0.72 + Math.sin(Math.PI * u) * 0.22);

      const topCurve =
        horizontalEdgeWave *
        topInfluence *
        bendStrength *
        pageHeight *
        PAGE_TOP_EDGE_CURVE;

      const bottomCurve =
        horizontalEdgeWave *
        bottomInfluence *
        bendStrength *
        pageHeight *
        PAGE_BOTTOM_EDGE_CURVE;

      const centralBillow =
        Math.sin(Math.PI * u) *
        Math.sin(Math.PI * v) *
        bendStrength *
        pageHeight *
        PAGE_CENTER_BILLOW;

      const topDepth =
        horizontalEdgeWave *
        topInfluence *
        bendStrength *
        pageWidth *
        PAGE_TOP_EDGE_DEPTH;

      const bottomDepth =
        horizontalEdgeWave *
        bottomInfluence *
        bendStrength *
        pageWidth *
        PAGE_BOTTOM_EDGE_DEPTH;

      positionAttribute.setXYZ(
        vertexIndex,
        pathX[column],
        baseVerticalPosition -
          staticTopInset +
          staticBottomArcLift +
          topCurve -
          bottomCurve +
          centralBillow,
        pathZ[column] +
          topDepth -
          bottomDepth +
          centralBillow * 0.22,
      );
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();

    if (
      phase === "turning" &&
      rawProgress >= 1 &&
      !completedRef.current
    ) {
      completedRef.current = true;

      requestAnimationFrame(() => {
        onCompleteRef.current();
      });
    }
  });

  if (
    !frontTextureState.texture ||
    !backTextureState.texture
  ) {
    return null;
  }

  const frontMaterialSide = isNext
    ? THREE.FrontSide
    : THREE.BackSide;

  const backMaterialSide = isNext
    ? THREE.BackSide
    : THREE.FrontSide;

  return (
    <group ref={groupRef}>
      <mesh
        geometry={geometry}
        frustumCulled={false}
        renderOrder={10}
      >
        <meshBasicMaterial
          map={frontTextureState.texture}
          side={frontMaterialSide}
          transparent
          alphaTest={0.01}
          toneMapped={false}
        />
      </mesh>

      <mesh
        geometry={geometry}
        frustumCulled={false}
        renderOrder={11}
      >
        <meshBasicMaterial
          map={backTextureState.texture}
          side={backMaterialSide}
          transparent
          alphaTest={0.01}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function TurningPageCanvas({
  direction,
  frontPhoto,
  backPhoto,
  phase,
  onReady,
  onComplete,
}) {
  const isPreparing = phase === "preparing";
  const isSettling = phase === "settling";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40"
      style={{
        opacity: isPreparing || isSettling ? 0 : 1,
        filter: isSettling
          ? "drop-shadow(0 8px 10px rgba(0,0,0,0))"
          : "drop-shadow(0 18px 18px rgba(0,0,0,0.3))",
        transition: isSettling
          ? [
              `opacity ${SETTLE_DURATION}ms cubic-bezier(0.22,1,0.36,1)`,
              `filter ${SETTLE_DURATION}ms cubic-bezier(0.22,1,0.36,1)`,
            ].join(", ")
          : "none",
        willChange: "opacity, filter",
        transform: "translateZ(0)",
      }}
    >
      <Canvas
        orthographic
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 10],
          zoom: 100,
          near: 0.01,
          far: 50,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          premultipliedAlpha: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <TurningPageMesh
          direction={direction}
          phase={phase}
          frontPhoto={frontPhoto}
          backPhoto={backPhoto}
          onReady={onReady}
          onComplete={onComplete}
        />
      </Canvas>
    </div>
  );
}

export default function OrmedBookSlider() {
  const reactId = useId();

  const safeId = reactId.replace(
    /[^a-zA-Z0-9_-]/g,
    "",
  );

  const pageLeftId = `book-page-left-${safeId}`;
  const pageRightId = `book-page-right-${safeId}`;

  const currentSpreadRef = useRef(0);
  const turnActiveRef = useRef(false);
  const pendingTurnsRef = useRef([]);

  const coveringFrameOneRef = useRef(null);
  const coveringFrameTwoRef = useRef(null);

  const settleFrameOneRef = useRef(null);
  const settleFrameTwoRef = useRef(null);

  const nextTurnFrameRef = useRef(null);

  const settleHoldTimeoutRef = useRef(null);
  const settleTimeoutRef = useRef(null);

  const spreads = useMemo(() => {
    const photos = Array.from(
      { length: 25 },
      (_, index) => ({
        src: `/images/services/slides/${index + 1}.webp`,
        alt: `Фотография центра APIDARB ${index + 1}`,
      }),
    );

    const result = [];

    for (
      let index = 0;
      index < photos.length;
      index += 2
    ) {
      result.push({
        left: photos[index] ?? null,
        right: photos[index + 1] ?? null,
      });
    }

    return result;
  }, []);

  const [currentSpread, setCurrentSpread] = useState(0);
  const [turnState, setTurnState] = useState(null);

  useEffect(() => {
    currentSpreadRef.current = currentSpread;
  }, [currentSpread]);

  useEffect(() => {
    const preloadedImages = [];

    spreads.forEach((spread) => {
      [spread.left, spread.right]
        .filter(Boolean)
        .forEach((photo) => {
          const image = new window.Image();

          image.decoding = "async";
          image.src = photo.src;

          preloadedImages.push(image);
        });
    });

    return () => {
      preloadedImages.length = 0;
    };
  }, [spreads]);

  useEffect(() => {
    return () => {
      if (coveringFrameOneRef.current) {
        cancelAnimationFrame(coveringFrameOneRef.current);
      }

      if (coveringFrameTwoRef.current) {
        cancelAnimationFrame(coveringFrameTwoRef.current);
      }

      if (settleFrameOneRef.current) {
        cancelAnimationFrame(settleFrameOneRef.current);
      }

      if (settleFrameTwoRef.current) {
        cancelAnimationFrame(settleFrameTwoRef.current);
      }

      if (nextTurnFrameRef.current) {
        cancelAnimationFrame(nextTurnFrameRef.current);
      }

      if (settleHoldTimeoutRef.current) {
        clearTimeout(settleHoldTimeoutRef.current);
      }

      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current);
      }

      pendingTurnsRef.current = [];
      turnActiveRef.current = false;
    };
  }, []);

  const current = spreads[currentSpread];

  const source = turnState
    ? spreads[turnState.sourceIndex]
    : current;

  const target = turnState
    ? spreads[turnState.targetIndex]
    : current;

  const beginTurn = (
    direction,
    sourceIndex = currentSpreadRef.current,
  ) => {
    const targetIndex =
      direction === "next"
        ? (sourceIndex + 1) % spreads.length
        : (
            sourceIndex -
            1 +
            spreads.length
          ) % spreads.length;

    turnActiveRef.current = true;

    setTurnState({
      direction,
      sourceIndex,
      targetIndex,
      phase: "preparing",
    });
  };

  const startTurn = (direction) => {
    if (turnActiveRef.current) {
      pendingTurnsRef.current.push(direction);
      return;
    }

    beginTurn(direction);
  };

  const handleTurningPageReady = () => {
    setTurnState((currentState) => {
      if (
        !currentState ||
        currentState.phase !== "preparing"
      ) {
        return currentState;
      }

      return {
        ...currentState,
        phase: "covering",
      };
    });

    coveringFrameOneRef.current = requestAnimationFrame(() => {
      coveringFrameTwoRef.current = requestAnimationFrame(() => {
        setTurnState((currentState) => {
          if (
            !currentState ||
            currentState.phase !== "covering"
          ) {
            return currentState;
          }

          return {
            ...currentState,
            phase: "turning",
          };
        });
      });
    });
  };

  const finishTurnMotion = () => {
    if (!turnState || turnState.phase !== "turning") {
      return;
    }

    const {
      sourceIndex,
      targetIndex,
    } = turnState;

    currentSpreadRef.current = targetIndex;
    setCurrentSpread(targetIndex);

    setTurnState((currentState) => {
      if (
        !currentState ||
        currentState.sourceIndex !== sourceIndex ||
        currentState.targetIndex !== targetIndex
      ) {
        return currentState;
      }

      return {
        ...currentState,
        phase: "landed",
      };
    });

    settleFrameOneRef.current = requestAnimationFrame(() => {
      settleFrameTwoRef.current = requestAnimationFrame(() => {
        settleHoldTimeoutRef.current = window.setTimeout(() => {
          setTurnState((currentState) => {
            if (
              !currentState ||
              currentState.sourceIndex !== sourceIndex ||
              currentState.targetIndex !== targetIndex ||
              currentState.phase !== "landed"
            ) {
              return currentState;
            }

            return {
              ...currentState,
              phase: "settling",
            };
          });

          settleTimeoutRef.current = window.setTimeout(() => {
            const nextDirection =
              pendingTurnsRef.current.shift() ?? null;

            setTurnState(null);

            if (nextDirection) {
              turnActiveRef.current = true;

              nextTurnFrameRef.current = requestAnimationFrame(() => {
                beginTurn(nextDirection, targetIndex);
              });

              return;
            }

            turnActiveRef.current = false;
          }, SETTLE_DURATION);
        }, SETTLE_HOLD_DURATION);
      });
    });
  };

  let visibleLeft = current.left;
  let visibleRight = current.right;

  if (
    turnState?.phase === "preparing" ||
    turnState?.phase === "covering"
  ) {
    visibleLeft = source.left;
    visibleRight = source.right;
  }

  if (turnState?.phase === "turning") {
    if (turnState.direction === "next") {
      visibleLeft = source.left;
      visibleRight = target.right;
    } else {
      visibleLeft = target.left;
      visibleRight = source.right;
    }
  }

  if (
    turnState?.phase === "landed" ||
    turnState?.phase === "settling"
  ) {
    visibleLeft = target.left;
    visibleRight = target.right;
  }

  const turningFrontPhoto = turnState
    ? turnState.direction === "next"
      ? source.right
      : source.left
    : null;

  const turningBackPhoto = turnState
    ? turnState.direction === "next"
      ? target.left
      : target.right
    : null;

  return (
    <section className="relative">
      <div className="relative z-10 text-center">
        <div className="mx-auto flex max-w-[900px] items-center justify-center gap-3 sm:gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b98736]/55 to-[#d7aa51]/80" />

          <div
            aria-hidden="true"
            className="h-[7px] w-[7px] rotate-45 border border-[#d7aa51]/80 bg-[#061a13] shadow-[0_0_12px_rgba(215,170,81,0.3)]"
          />

          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#b98736]/55 to-[#d7aa51]/80" />
        </div>

        <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.45em] text-[#d7aa51]/70 sm:text-[10px]">
          Центр, кабинеты и рабочие моменты
        </p>

        <h2
          className="mt-3 text-[clamp(1.45rem,2.4vw,2.5rem)] font-normal uppercase leading-none tracking-[0.08em] text-[#e2b45b]"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          Фотогалерея
        </h2>

        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#d8ad56]/75 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1650px]">
        <div className="relative -mt-[8%] px-12 sm:-mt-[10%] sm:px-16 lg:-mt-[12%] lg:px-14">
          <ClipDefs
            pageLeftId={pageLeftId}
            pageRightId={pageRightId}
          />

          <div className="absolute left-0 top-1/2 z-50 -translate-y-1/2">
            <ChevronButton
              direction="left"
              onClick={() => startTurn("prev")}
            />
          </div>

          <div className="absolute right-0 top-1/2 z-50 -translate-y-1/2">
            <ChevronButton
              direction="right"
              onClick={() => startTurn("next")}
            />
          </div>

          <div
            className="relative mx-auto aspect-[3/2] w-full"
            style={{
              perspective: "2600px",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/images/services/book-open.webp"
              alt="Открытая книга с фотографиями центра"
              fill
              sizes="(max-width: 767px) 100vw, 90vw"
              className="pointer-events-none select-none object-contain"
            />

            <StaticPage
              photo={visibleLeft}
              side="left"
              clipId={pageLeftId}
            />

            <StaticPage
              photo={visibleRight}
              side="right"
              clipId={pageRightId}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-20"
              style={{
                left: "48.55%",
                top: "19.2%",
                width: "2.2%",
                height: "61.5%",
                background:
                  "linear-gradient(90deg,transparent 0%,rgba(41,20,4,0.18) 35%,rgba(24,11,2,0.28) 50%,rgba(83,47,15,0.08) 72%,transparent 100%)",
                filter: "blur(1.4px)",
              }}
            />

            {turnState ? (
              <TurningPageCanvas
                direction={turnState.direction}
                frontPhoto={turningFrontPhoto}
                backPhoto={turningBackPhoto}
                phase={turnState.phase}
                onReady={handleTurningPageReady}
                onComplete={finishTurnMotion}
              />
            ) : null}
          </div>

          <div className="-mt-[7%] flex justify-center sm:-mt-[8%]">
            <span
              aria-live="polite"
              className="relative z-50 inline-flex min-w-[82px] items-center justify-center rounded-full border border-[#a87933]/55 bg-[#03110d]/92 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-[#d8ad56] shadow-[0_8px_24px_rgba(0,0,0,0.4)] sm:text-[12px]"
            >
              {currentSpread + 1} / {spreads.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}