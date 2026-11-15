"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

interface RealisticGardenBenchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const RealisticGardenBench: React.FC<RealisticGardenBenchProps> = ({
  position = [2.2, 0, -1.2],
  rotation = [0, -0.4, 0],
  scale = 1.25,
}) => {
  const { scene } = useGLTF("/models/furniture/painted_wooden_bench/painted_wooden_bench_1k.gltf");

  // Clone scene so materials/transforms are isolated
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.88;
          (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 0.9;
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

useGLTF.preload("/models/furniture/painted_wooden_bench/painted_wooden_bench_1k.gltf");

export default RealisticGardenBench;
