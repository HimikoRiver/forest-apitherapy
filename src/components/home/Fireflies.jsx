"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const FIREFLY_MODEL_PATH = "/models/firefly.optimized.glb";
const WING_FLAP_SPEED = 34;
const FIREFLIES_GROUP_OFFSET_X = -3.2;
const FIREFLIES_GROUP_OFFSET_Y = 0.8;

const TAIL_LIGHT_POSITION = [0, -0.08, -0.68];
const TAIL_AURA_POSITION = [0, -0.06, -0.64];
const TAIL_CORE_POSITION = [0, -0.12, -0.82];

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
        0.055 + Math.sin(Math.PI * clamp(u, 0, 1)) * 0.36 * (1 - u * 0.12);
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

      const alpha = clamp(bodyAlpha * 0.48 + (vein ? 0.46 : 0), 0, 0.82);
      const index = (y * width + x) * 4;

      data[index] = vein ? 255 : 224;
      data[index + 1] = vein ? 196 : 180;
      data[index + 2] = vein ? 92 : 132;
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

function cloneMaterial(material) {
  if (Array.isArray(material)) {
    return material.map((item) => item.clone());
  }

  return material?.clone();
}

function AnimatedWings({ phase }) {
  const leftWingRef = useRef(null);
  const rightWingRef = useRef(null);
  const leftMaterialRef = useRef(null);
  const rightMaterialRef = useRef(null);

  const wingTexture = useMemo(() => createWingTexture(), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * WING_FLAP_SPEED + phase;
    const flap = Math.sin(time);
    const flutter = Math.sin(time * 0.45 + phase) * 0.06;
    const sideSway = Math.sin(time * 0.9 + phase) * 0.14;
    const opacity = 0.34 + Math.abs(flap) * 0.22;

    if (leftWingRef.current) {
      leftWingRef.current.rotation.set(
        -0.08 + flutter,
        -0.12 - sideSway,
        -0.36 - flap * 0.46
      );
    }

    if (rightWingRef.current) {
      rightWingRef.current.rotation.set(
        -0.08 - flutter,
        0.12 + sideSway,
        0.36 + flap * 0.46
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
    <group position={[0, 0.04, 0.14]}>
      <group ref={leftWingRef} position={[-0.12, 0, 0]}>
        <mesh position={[-0.62, 0, 0]} scale={[-1, 1, 1]}>
          <planeGeometry args={[1.24, 0.42, 18, 6]} />
          <meshBasicMaterial
            ref={leftMaterialRef}
            map={wingTexture}
            color="#ffd77a"
            transparent
            opacity={0.42}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={rightWingRef} position={[0.12, 0, 0]}>
        <mesh position={[0.62, 0, 0]}>
          <planeGeometry args={[1.24, 0.42, 18, 6]} />
          <meshBasicMaterial
            ref={rightMaterialRef}
            map={wingTexture}
            color="#ffd77a"
            transparent
            opacity={0.42}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

function FireflyModel({ config }) {
  const flightGroupRef = useRef(null);
  const rotationGroupRef = useRef(null);
  const coreGlowRef = useRef(null);
  const auraGlowRef = useRef(null);
  const lightRef = useRef(null);

  const dragStateRef = useRef({
    active: false,
    rotationX: 0,
    rotationY: 0,
  });

  const gltf = useLoader(GLTFLoader, FIREFLY_MODEL_PATH);

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
        });
      }
    });

    return clone;
  }, [gltf.scene]);

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

    if (rotationGroupRef.current) {
      rotationGroupRef.current.rotation.set(
        dragStateRef.current.rotationX,
        dragStateRef.current.rotationY,
        0
      );
    }

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

        <AnimatedWings phase={config.phase} />

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

function FirefliesScene() {
  return (
    <>
      <ambientLight intensity={0.82} />
      <directionalLight position={[2, 3, 5]} intensity={1.25} />

      {firefliesConfig.map((config, index) => (
        <FireflyModel key={index} config={config} />
      ))}
    </>
  );
}

export default function Fireflies() {
  return (
    <div className="pointer-events-auto absolute inset-0 z-20 hidden cursor-grab overflow-hidden active:cursor-grabbing lg:block">
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
          <FirefliesScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useLoader.preload(GLTFLoader, FIREFLY_MODEL_PATH);