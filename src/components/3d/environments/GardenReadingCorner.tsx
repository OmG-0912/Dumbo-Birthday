"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RealisticGardenBench } from "./RealisticGardenBench";
import { RealisticGardenLantern } from "./RealisticGardenLantern";

interface GardenReadingCornerProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  lanternIntensity?: number;
  lanternColor?: string;
}

export const GardenReadingCorner: React.FC<GardenReadingCornerProps> = ({
  position = [-3.5, 0, 0.2],
  rotationY = 0.55,
  scale = 1.05,
  lanternIntensity = 0.0,
  lanternColor = "#FFE2A3",
}) => {
  // Load CC0 Round Wooden Table (242KB bin, 1K PBR textures)
  const tableGltf = useGLTF("/models/furniture/round_wooden_table_01/round_wooden_table_01_1k.gltf");

  // Load CC0 Glazed Potted Plant
  const potGltf = useGLTF("/models/decorations/potted_plant_01/potted_plant_01_1k.gltf");

  // Clone table model
  const tableModel = useMemo(() => {
    const clone = tableGltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.85;
        }
      }
    });
    return clone;
  }, [tableGltf.scene]);

  // Clone potted plant model
  const potModel = useMemo(() => {
    const clone = potGltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [potGltf.scene]);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* 1. Painted Slatted Teak Garden Bench tucked into shady alcove */}
      <RealisticGardenBench
        position={[0, 0.02, 0]}
        rotation={[0, 0, 0]}
        scale={1.15}
      />

      {/* 2. Side Round Wooden Reading Table */}
      <group position={[1.35, 0.02, 0.1]} rotation={[0, 0.7, 0]} scale={0.82}>
        <primitive object={tableModel} />

        {/* Small Lantern resting on table */}
        <RealisticGardenLantern
          position={[0, 0.72, 0]}
          scale={0.5}
          lanternIntensity={lanternIntensity}
          lanternColor={lanternColor}
        />
      </group>

      {/* 3. Glazed Terracotta Potted Plant beside Bench */}
      <group position={[-1.25, 0.02, -0.1]} rotation={[0, -0.4, 0]} scale={0.85}>
        <primitive object={potModel} />
      </group>
    </group>
  );
};

// Preload assets
useGLTF.preload("/models/furniture/round_wooden_table_01/round_wooden_table_01_1k.gltf");
useGLTF.preload("/models/decorations/potted_plant_01/potted_plant_01_1k.gltf");

export default GardenReadingCorner;
