"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export type TreeVariant = "oak" | "island" | "jacaranda";

interface RealisticBotanicalTreeProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  variant?: TreeVariant;
}

const TREE_MODELS: Record<TreeVariant, { url: string; baseScale: number }> = {
  oak: {
    url: "/models/trees/tree_small_02/tree_small_02_1k.gltf",
    baseScale: 1.0,
  },
  island: {
    url: "/models/trees/island_tree_01/island_tree_01_1k.gltf",
    baseScale: 1.25,
  },
  jacaranda: {
    url: "/models/trees/jacaranda_tree/jacaranda_tree_1k.gltf",
    baseScale: 0.28,
  },
};

export const RealisticBotanicalTree: React.FC<RealisticBotanicalTreeProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1.0,
  variant = "oak",
}) => {
  const modelInfo = TREE_MODELS[variant] || TREE_MODELS.oak;
  const { scene } = useGLTF(modelInfo.url);
  const treeRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.82;
          mat.envMapIntensity = 0.85;
          if (mat.name && (mat.name.toLowerCase().includes("leaf") || mat.name.toLowerCase().includes("leaves"))) {
            mat.transparent = true;
            mat.alphaTest = 0.35;
            mat.side = THREE.DoubleSide;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!treeRef.current) return;
    const time = state.clock.getElapsedTime();
    // Gentle natural wind sway
    treeRef.current.rotation.z = Math.sin(time * 0.7 + position[0]) * 0.007;
    treeRef.current.rotation.x = Math.cos(time * 0.5 + position[2]) * 0.005;
  });

  const finalScale = scale * modelInfo.baseScale;

  return (
    <group ref={treeRef} position={position} rotation={[0, rotationY, 0]} scale={finalScale}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload all tree variants
useGLTF.preload("/models/trees/tree_small_02/tree_small_02_1k.gltf");
useGLTF.preload("/models/trees/island_tree_01/island_tree_01_1k.gltf");
useGLTF.preload("/models/trees/jacaranda_tree/jacaranda_tree_1k.gltf");

export default RealisticBotanicalTree;
