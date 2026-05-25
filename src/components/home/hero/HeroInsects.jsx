"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const BEE_MODEL_PATH = "/models/bee.hero-quality.1024.glb";
const FIREFLY_MODEL_PATH = "/models/firefly.hero-quality.512.glb";

const HIVES_PARALLAX_Y = -320;

const BEE_MODEL_TARGET_SIZE = 2.2;
const BEE_GROUP_OFFSET_Y = -0.35;
const BEE_WING_FLAP_SPEED = 42;
const BEE_WINGS_POSITION = [0, 0.04, 0.14];

const BEE_WING_WIDTH = 1.46;
const BEE_WING_HEIGHT = 0.5;
const BEE_WING_SPREAD = 0.74;
const BEE_WING_ROOT_OFFSET = 0.15;

const FIREFLY_WING_FLAP_SPEED = 34;
const FIREFLIES_GROUP_OFFSET_X = -3.2;
const FIREFLIES_GROUP_OFFSET_Y = 0.8;

const TAIL_LIGHT_POSITION = [0, -0.08, -0.68];
const TAIL_AURA_POSITION = [0, -0.06, -0.64];
const TAIL_CORE_POSITION = [0, -0.12, -0.82];

const beesConfig = [
  {
    scale: 0.2,
    center: [0.2, 1.18, 0.35],
    radius: [0.42, 0.18, 0.14],
    speed: 1.12,
    phase: 0.2,
    rotationY: -1.55,
  },
  {
    scale: 0.18,
    center: [1.55, 0.8, 0.42],
    radius: [0.5, 0.22, 0.16],
    speed: 1.28,
    phase: 1.7,
    rotationY: -1.7,
  },
  {
    scale: 0.16,
    center: [3.35, 1.25, 0.5],
    radius: [0.46, 0.2, 0.13],
    speed: 1.36,
    phase: 3.1,
    rotationY: -1.35,
  },
  {
    scale: 0.17,
    center: [2.45, 0.4, 0.3],
    radius: [0.38, 0.16, 0.12],
    speed: 1.05,
    phase: 4.4,
    rotationY: -1.85,
  },
];

const firefliesConfig = [
  {
    scale: 0.36,
    basePosition: [-3.4, 0.9, 0],
    radius: [0.65, 0.34, 0.22],
    speed: 0.72,
    phase: 0.2,
    glowPower: 1.15,
  },
  {
    scale: 0.22,
    basePosition: [1.2, -0.2, -0.65],
    radius: [0.46, 0.24, 0.2],
    speed: 1.08,
    phase: 2.8,
    glowPower: 0.85,
  },
  {
    scale: 0.3,
    basePosition: [-1.7, -0.55, -0.45],
    radius: [0.56, 0.3, 0.16],
    speed: 0.82,
    phase: 4.1,
    glowPower: 1,
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function cloneMaterial(material) {
  if (Array.isArray(material)) {
    return material.map((item) => item.clone());
  }

  return material?.clone();
}

function normalizeModelSize(model, targetSize = 2.2) {
  model.updateWorldMatrix(true, true);

  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  const maxAxis = Math.max(size.x, size.y, size.z);

  if (!maxAxis || !Number.isFinite(maxAxis)) {
    return model;
  }

  const normalizedGroup = new THREE.Group();
  const scale = targetSize / maxAxis;

  model.position.sub(center);
  normalizedGroup.scale.setScalar(scale);
  normalizedGroup.add(model);

  return normalizedGroup;
}

function createRadialTexture({
  size = 256,
  color = [255, 214, 92],
  power = 2.4,
  maxAlpha = 1,
}) {
  const data = new Uint8Array(size * size * 4);
  const center = size / 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = (x - center) / center;
      const dy = (y - center) / center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const alpha = Math.pow(Math.max(0, 1 - distance), power) * maxAlpha;
      const index = (y * size + x) * 4;

      data[index] = color[0];
      data[index + 1] = color[1];
      data[index + 2] = color[2];
      data[index + 3] = Math.round(clamp(alpha, 0, 1) * 255);
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
}

function createWingTexture() {
  const width = 512;
  const height = 256;
  const data = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const u = x / (width - 1);
      const v = y / (height - 1);

      const wingHeight =
        0.055 + Math.sin(Math.PI * clamp(u, 0, 1)) * 0.34 * (1 - u * 0.12);
      const centerY = 0.5 + Math.sin(u * Math.PI) * 0.025;
      const distanceFromCenter = Math.abs(v - centerY) / wingHeight;

      const rootFade = clamp(u / 0.12, 0, 1);
      const tipFade = clamp((1 - u) / 0.08, 0, 1);
      const bodyAlpha =
        clamp(1 - distanceFromCenter, 0, 1) * rootFade * tipFade;

      const mainVein = Math.abs(v - centerY) < 0.012 && u > 0.04;
      const edgeVein = Math.abs(distanceFromCenter - 0.82) < 0.045;
      const diagonalVeinA =
        Math.abs(v - (centerY - 0.22 * u + 0.05)) < 0.012 &&
        u > 0.18 &&
        u < 0.9;
      const diagonalVeinB =
        Math.abs(v - (centerY + 0.2 * u - 0.04)) < 0.012 &&
        u > 0.2 &&
        u < 0.9;
      const diagonalVeinC =
        Math.abs(v - (centerY - 0.13 * u + 0.03)) < 0.009 &&
        u > 0.28 &&
        u < 0.82;
      const diagonalVeinD =
        Math.abs(v - (centerY + 0.12 * u - 0.025)) < 0.009 &&
        u > 0.28 &&
        u < 0.82;

      const vein =
        mainVein ||
        edgeVein ||
        diagonalVeinA ||
        diagonalVeinB ||
        diagonalVeinC ||
        diagonalVeinD;

      const alpha = clamp(bodyAlpha * 0.5 + (vein ? 0.42 : 0), 0, 0.78);
      const index = (y * width + x) * 4;

      data[index] = vein ? 255 : 230;
      data[index + 1] = vein ? 205 : 188;
      data[index + 2] = vein ? 112 : 145;
      data[index + 3] = Math.round(alpha * 255);
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
}

function useDraggableRotation() {
  const rotationGroupRef = useRef(null);
  const dragStateRef = useRef({
    active: false,
    rotationX: 0,
    rotationY: 0,
  });

  const handlePointerDown = (event) => {
    event.stopPropagation();

    dragStateRef.current.active = true;
    event.target?.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current;

    if (!dragState.active || !rotationGroupRef.current) return;

    event.stopPropagation();

    const movementX = event.movementX ?? event.nativeEvent?.movementX ?? 0;
    const movementY = event.movementY ?? event.nativeEvent?.movementY ?? 0;

    dragState.rotationY += movementX * 0.012;
    dragState.rotationX = clamp(
      dragState.rotationX + movementY * 0.01,
      -Math.PI * 0.45,
      Math.PI * 0.45
    );

    rotationGroupRef.current.rotation.set(
      dragState.rotationX,
      dragState.rotationY,
      0
    );
  };

  const handlePointerUp = (event) => {
    dragStateRef.current.active = false;

    event.stopPropagation();
    event.target?.releasePointerCapture?.(event.pointerId);
  };

  const syncRotation = () => {
    if (!rotationGroupRef.current) return;

    rotationGroupRef.current.rotation.set(
      dragStateRef.current.rotationX,
      dragStateRef.current.rotationY,
      0
    );
  };

  return {
    rotationGroupRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    syncRotation,
  };
}

function AnimatedWings({
  phase,
  wingTexture,
  flapSpeed,
  wingPosition,
  width,
  height,
  spread,
  rootOffset = 0.12,
  opacityBase,
  opacityRange,
}) {
  const leftWingRef = useRef(null);
  const rightWingRef = useRef(null);
  const leftMaterialRef = useRef(null);
  const rightMaterialRef = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * flapSpeed + phase;
    const flap = Math.sin(time);
    const flutter = Math.sin(time * 0.52 + phase) * 0.07;
    const sideSway = Math.sin(time * 0.85 + phase) * 0.16;
    const opacity = opacityBase + Math.abs(flap) * opacityRange;

    if (leftWingRef.current) {
      leftWingRef.current.rotation.set(
        -0.08 + flutter,
        -0.14 - sideSway,
        -0.38 - flap * 0.5
      );
    }

    if (rightWingRef.current) {
      rightWingRef.current.rotation.set(
        -0.08 - flutter,
        0.14 + sideSway,
        0.38 + flap * 0.5
      );
    }

    if (leftMaterialRef.current) {
      leftMaterialRef.current.opacity = opacity;
    }

    if (rightMaterialRef.current) {
      rightMaterialRef.current.opacity = opacity;
    }
  });

  return (
    <group position={wingPosition}>
      <group ref={leftWingRef} position={[-rootOffset, 0, 0]}>
        <mesh position={[-spread, 0, 0]} scale={[-1, 1, 1]}>
          <planeGeometry args={[width, height, 18, 6]} />
          <meshBasicMaterial
            ref={leftMaterialRef}
            map={wingTexture}
            color="#ffd77a"
            transparent
            opacity={opacityBase}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={rightWingRef} position={[rootOffset, 0, 0]}>
        <mesh position={[spread, 0, 0]}>
          <planeGeometry args={[width, height, 18, 6]} />
          <meshBasicMaterial
            ref={rightMaterialRef}
            map={wingTexture}
            color="#ffd77a"
            transparent
            opacity={opacityBase}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

function BeeModel({ config, wingTexture }) {
  const flightGroupRef = useRef(null);
  const gltf = useLoader(GLTFLoader, BEE_MODEL_PATH);

  const {
    rotationGroupRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    syncRotation,
  } = useDraggableRotation();

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = false;
      child.receiveShadow = false;
      child.frustumCulled = false;

      if (child.material) {
        child.material = cloneMaterial(child.material);

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((material) => {
          if ("metalness" in material) {
            material.metalness = Math.min(material.metalness ?? 0.15, 0.28);
          }

          if ("roughness" in material) {
            material.roughness = Math.max(material.roughness ?? 0.55, 0.48);
          }

          material.needsUpdate = true;
        });
      }
    });

    return normalizeModelSize(clone, BEE_MODEL_TARGET_SIZE);
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    if (!flightGroupRef.current) return;

    const time = clock.getElapsedTime() * config.speed + config.phase;

    const x =
      config.center[0] +
      Math.sin(time * 1.15) * config.radius[0] +
      Math.sin(time * 3.8 + 0.8) * 0.18 +
      Math.cos(time * 5.2) * 0.07;

    const y =
      config.center[1] +
      BEE_GROUP_OFFSET_Y +
      Math.cos(time * 1.55) * config.radius[1] +
      Math.sin(time * 4.4 + 1.1) * 0.13 +
      Math.cos(time * 6.1) * 0.045;

    const z =
      config.center[2] +
      Math.sin(time * 1.1 + 0.5) * config.radius[2] +
      Math.cos(time * 3.7) * 0.08;

    flightGroupRef.current.position.set(x, y, z);

    flightGroupRef.current.rotation.set(
      Math.sin(time * 3.2) * 0.2,
      config.rotationY + Math.sin(time * 2.15) * 0.65,
      Math.cos(time * 3.8) * 0.16
    );

    syncRotation();
  });

  return (
    <group ref={flightGroupRef} scale={config.scale}>
      <group ref={rotationGroupRef}>
        <mesh
          position={[0, 0, 0]}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={handlePointerUp}
        >
          <sphereGeometry args={[1.35, 16, 16]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
            color="#ffffff"
          />
        </mesh>

        <primitive object={clonedScene} />

        <AnimatedWings
          phase={config.phase}
          wingTexture={wingTexture}
          flapSpeed={BEE_WING_FLAP_SPEED}
          wingPosition={BEE_WINGS_POSITION}
          width={BEE_WING_WIDTH}
          height={BEE_WING_HEIGHT}
          spread={BEE_WING_SPREAD}
          rootOffset={BEE_WING_ROOT_OFFSET}
          opacityBase={0.28}
          opacityRange={0.26}
        />
      </group>
    </group>
  );
}

function FireflyModel({
  config,
  wingTexture,
  coreGlowTexture,
  auraGlowTexture,
}) {
  const flightGroupRef = useRef(null);
  const coreGlowRef = useRef(null);
  const auraGlowRef = useRef(null);
  const lightRef = useRef(null);
  const gltf = useLoader(GLTFLoader, FIREFLY_MODEL_PATH);

  const {
    rotationGroupRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    syncRotation,
  } = useDraggableRotation();

  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = false;
      child.receiveShadow = false;
      child.frustumCulled = false;

      if (child.material) {
        child.material = cloneMaterial(child.material);

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((material) => {
          material.metalness = Math.min(material.metalness ?? 0.2, 0.35);
          material.roughness = Math.max(material.roughness ?? 0.5, 0.45);
          material.needsUpdate = true;
        });
      }
    });

    return clone;
  }, [gltf.scene]);

  useFrame(({ clock }) => {
    if (!flightGroupRef.current) return;

    const time = clock.getElapsedTime() * config.speed + config.phase;

    const x =
      config.basePosition[0] +
      FIREFLIES_GROUP_OFFSET_X +
      Math.sin(time * 0.95) * config.radius[0] +
      Math.sin(time * 1.73) * 0.12;

    const y =
      config.basePosition[1] +
      FIREFLIES_GROUP_OFFSET_Y +
      Math.cos(time * 1.18) * config.radius[1] +
      Math.sin(time * 2.12) * 0.08;

    const z =
      config.basePosition[2] + Math.sin(time * 0.72) * config.radius[2];

    flightGroupRef.current.position.set(x, y, z);

    flightGroupRef.current.rotation.set(
      Math.sin(time * 1.05) * 0.16,
      Math.sin(time * 0.64) * 0.45,
      Math.cos(time * 1.22) * 0.14
    );

    syncRotation();

    const pulseFast = 1 + Math.sin(time * 3.6) * 0.22;
    const pulseSoft = 1 + Math.sin(time * 2.25 + 0.5) * 0.16;
    const brightnessPulse = 1 + Math.sin(time * 3.1 + 0.35) * 0.18;

    if (coreGlowRef.current) {
      const coreScale = 1.08 * config.glowPower * pulseFast;
      coreGlowRef.current.scale.set(coreScale, coreScale, 1);
      coreGlowRef.current.material.opacity =
        0.88 * config.glowPower * brightnessPulse;
    }

    if (auraGlowRef.current) {
      const auraScale = 2.15 * config.glowPower * pulseSoft;
      auraGlowRef.current.scale.set(auraScale, auraScale, 1);
      auraGlowRef.current.material.opacity =
        0.42 * config.glowPower * (0.92 + Math.sin(time * 2.05) * 0.12);
    }

    if (lightRef.current) {
      lightRef.current.intensity =
        0.24 * config.glowPower * (0.9 + Math.sin(time * 2.7 + 0.2) * 0.22);
    }
  });

  return (
    <group ref={flightGroupRef} scale={config.scale}>
      <group ref={rotationGroupRef}>
        <mesh
          position={[0, 0, 0]}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={handlePointerUp}
        >
          <sphereGeometry args={[1.25, 16, 16]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            depthWrite={false}
            color="#ffffff"
          />
        </mesh>

        <primitive object={clonedScene} />

        <AnimatedWings
          phase={config.phase}
          wingTexture={wingTexture}
          flapSpeed={FIREFLY_WING_FLAP_SPEED}
          wingPosition={[0, 0.04, 0.14]}
          width={1.24}
          height={0.42}
          spread={0.62}
          rootOffset={0.12}
          opacityBase={0.34}
          opacityRange={0.22}
        />

        <pointLight
          ref={lightRef}
          position={TAIL_LIGHT_POSITION}
          color="#ffd86b"
          intensity={0.24 * config.glowPower}
          distance={1.05}
          decay={3}
        />

        <sprite
          ref={auraGlowRef}
          position={TAIL_AURA_POSITION}
          scale={[2.15, 2.15, 1]}
        >
          <spriteMaterial
            map={auraGlowTexture}
            color="#ffd86b"
            transparent
            opacity={0.42}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        <sprite
          ref={coreGlowRef}
          position={TAIL_CORE_POSITION}
          scale={[1.08, 1.08, 1]}
        >
          <spriteMaterial
            map={coreGlowTexture}
            color="#fff0a6"
            transparent
            opacity={0.88}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      </group>
    </group>
  );
}

function HeroInsectsScene() {
  const wingTexture = useMemo(() => createWingTexture(), []);

  const coreGlowTexture = useMemo(
    () =>
      createRadialTexture({
        size: 256,
        color: [255, 228, 125],
        power: 2.05,
        maxAlpha: 1,
      }),
    []
  );

  const auraGlowTexture = useMemo(
    () =>
      createRadialTexture({
        size: 256,
        color: [255, 210, 92],
        power: 3.1,
        maxAlpha: 0.8,
      }),
    []
  );

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2.5, 3.5, 5]} intensity={1.18} />

      {firefliesConfig.map((config, index) => (
        <FireflyModel
          key={`firefly-${index}`}
          config={config}
          wingTexture={wingTexture}
          coreGlowTexture={coreGlowTexture}
          auraGlowTexture={auraGlowTexture}
        />
      ))}

      {beesConfig.map((config, index) => (
        <BeeModel
          key={`bee-${index}`}
          config={config}
          wingTexture={wingTexture}
        />
      ))}
    </>
  );
}

export default function HeroInsects({ progress = 0 }) {
  const translateY = progress * HIVES_PARALLAX_Y;

  return (
    <div
      className="pointer-events-auto absolute left-0 top-0 z-[22] hidden h-[1160px] w-full cursor-grab overflow-hidden active:cursor-grabbing lg:block"
      style={{
        transform: `translate3d(0, ${translateY}px, 0)`,
        transformOrigin: "center center",
        willChange: "transform",
      }}
    >
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 8],
          zoom: 92,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <HeroInsectsScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useLoader.preload(GLTFLoader, BEE_MODEL_PATH);
useLoader.preload(GLTFLoader, FIREFLY_MODEL_PATH);