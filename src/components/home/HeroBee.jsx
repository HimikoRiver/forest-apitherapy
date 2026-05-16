"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const BEE_MODEL_PATH = "/models/bee.optimized.glb";

const BEE_GROUP_OFFSET_Y = -0.35;
const BEE_WING_FLAP_SPEED = 42;
const BEE_WINGS_POSITION = [0, 0.04, 0.14];

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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function cloneMaterial(material) {
  if (Array.isArray(material)) {
    return material.map((item) => item.clone());
  }

  return material?.clone();
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

function AnimatedBeeWings({ phase }) {
  const leftWingRef = useRef(null);
  const rightWingRef = useRef(null);
  const leftMaterialRef = useRef(null);
  const rightMaterialRef = useRef(null);

  const wingTexture = useMemo(() => createWingTexture(), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * BEE_WING_FLAP_SPEED + phase;
    const flap = Math.sin(time);
    const flutter = Math.sin(time * 0.52 + phase) * 0.07;
    const sideSway = Math.sin(time * 0.85 + phase) * 0.16;
    const opacity = 0.28 + Math.abs(flap) * 0.26;

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
    <group position={BEE_WINGS_POSITION}>
      <group ref={leftWingRef} position={[-0.12, 0, 0]}>
        <mesh position={[-0.56, 0, 0]} scale={[-1, 1, 1]}>
          <planeGeometry args={[1.12, 0.38, 18, 6]} />
          <meshBasicMaterial
            ref={leftMaterialRef}
            map={wingTexture}
            color="#ffd77a"
            transparent
            opacity={0.38}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={rightWingRef} position={[0.12, 0, 0]}>
        <mesh position={[0.56, 0, 0]}>
          <planeGeometry args={[1.12, 0.38, 18, 6]} />
          <meshBasicMaterial
            ref={rightMaterialRef}
            map={wingTexture}
            color="#ffd77a"
            transparent
            opacity={0.38}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

function BeeModel({ config }) {
  const flightGroupRef = useRef(null);
  const gltf = useLoader(GLTFLoader, BEE_MODEL_PATH);

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
        });
      }
    });

    return clone;
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
  });

  return (
    <group ref={flightGroupRef} scale={config.scale}>
      <primitive object={clonedScene} />
      <AnimatedBeeWings phase={config.phase} />
    </group>
  );
}

function HeroBeeScene() {
  return (
    <>
      <ambientLight intensity={0.92} />
      <directionalLight position={[2.5, 3.5, 5]} intensity={1.15} />

      {beesConfig.map((config, index) => (
        <BeeModel key={index} config={config} />
      ))}
    </>
  );
}

export default function HeroBee() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[22] hidden overflow-hidden lg:block">
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
          <HeroBeeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useLoader.preload(GLTFLoader, BEE_MODEL_PATH);