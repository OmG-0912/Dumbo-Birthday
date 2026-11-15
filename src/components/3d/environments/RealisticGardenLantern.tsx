"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface RealisticGardenLanternProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  lanternIntensity?: number;
  lanternColor?: string;
}

export const RealisticGardenLantern: React.FC<RealisticGardenLanternProps> = ({
  position = [0, 3.2, 0],
  rotation = [0, 0, 0],
  scale = 1.0,
  lanternIntensity = 0.0,
  lanternColor = "#FFE2A3",
}) => {
  const { scene } = useGLTF("/models/decorations/wooden_lantern_01/wooden_lantern_01_1k.gltf");
  const lightRef = useRef<THREE.PointLight>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!lightRef.current) return;
    const time = state.clock.getElapsedTime();
    const flicker = Math.sin(time * 2.8) * 0.12 + Math.cos(time * 4.4) * 0.08;
    const target = lanternIntensity > 0 ? lanternIntensity + flicker : 0;
    lightRef.current.intensity = THREE.MathUtils.lerp(
      lightRef.current.intensity,
      target,
      delta * 4.0
    );
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />
      <pointLight
        ref={lightRef}
        position={[0, 0.25, 0]}
        color={lanternColor}
        intensity={lanternIntensity}
        distance={7}
        decay={2}
        castShadow
      />
    </group>
  );
};

useGLTF.preload("/models/decorations/wooden_lantern_01/wooden_lantern_01_1k.gltf");

export default RealisticGardenLantern;
