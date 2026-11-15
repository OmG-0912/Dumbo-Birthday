"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RealisticGardenLantern } from "./RealisticGardenLantern";

interface GardenGrandEntranceProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  lanternIntensity?: number;
  lanternColor?: string;
}

export const GardenGrandEntrance: React.FC<GardenGrandEntranceProps> = ({
  position = [0.1, 0, -3.8],
  rotationY = 0.04,
  scale = 1.1,
  lanternIntensity = 0.0,
  lanternColor = "#FFE2A3",
}) => {
  // Load CC0 Ornate Victorian Botanical Gate (971KB bin, 1K PBR textures)
  const gateGltf = useGLTF("/models/architecture/large_iron_gate/large_iron_gate_1k.gltf");

  // Load CC0 Planter Box
  const planterGltf = useGLTF("/models/decorations/planter_box_01/planter_box_01_1k.gltf");

  // Load CC0 Flowering Shrub to flank the pillars naturally (No procedural spheres!)
  const shrub02Gltf = useGLTF("/models/bushes/shrub_02/shrub_02_1k.gltf");

  // Clone and configure gate materials
  const gateModel = useMemo(() => {
    const clone = gateGltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          mat.roughness = 0.58;
          mat.metalness = 0.85;
          mat.envMapIntensity = 1.2;
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [gateGltf.scene]);

  // Authentic Sandstone Pillar Material
  const stonePillarMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#968b7d",
      roughness: 0.88,
      metalness: 0.02,
    });
  }, []);

  // Weathered Timber Transom Beam Material
  const timberBeamMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#463527",
      roughness: 0.84,
      metalness: 0.03,
    });
  }, []);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* 1. Ornate Botanical Iron Gate (Authentic 3D CC0 Model) */}
      <group position={[0, 0, 0]} scale={0.96}>
        <primitive object={gateModel} />
      </group>

      {/* 2. Flanking Cotswold Sandstone Gate Pillars */}
      {/* Left Pillar */}
      <group position={[-1.85, 0, 0]}>
        <mesh position={[0, 1.45, 0]} material={stonePillarMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.45, 2.9, 0.45]} />
        </mesh>
        <mesh position={[0, 2.94, 0]} material={stonePillarMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.56, 0.12, 0.56]} />
        </mesh>
        <mesh position={[0, 3.06, 0]} material={stonePillarMaterial} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
        {/* Left Lantern Mounted on Pillar Cap */}
        <RealisticGardenLantern
          position={[0, 3.2, 0]}
          scale={0.85}
          lanternIntensity={lanternIntensity}
          lanternColor={lanternColor}
        />
      </group>

      {/* Right Pillar */}
      <group position={[1.85, 0, 0]}>
        <mesh position={[0, 1.45, 0]} material={stonePillarMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.45, 2.9, 0.45]} />
        </mesh>
        <mesh position={[0, 2.94, 0]} material={stonePillarMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.56, 0.12, 0.56]} />
        </mesh>
        <mesh position={[0, 3.06, 0]} material={stonePillarMaterial} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
        {/* Right Lantern Mounted on Pillar Cap */}
        <RealisticGardenLantern
          position={[0, 3.2, 0]}
          scale={0.85}
          lanternIntensity={lanternIntensity}
          lanternColor={lanternColor}
        />
      </group>

      {/* 3. Overhead Weathered Timber Archway Header */}
      <group position={[0, 3.0, 0]}>
        <mesh material={timberBeamMaterial} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.18, 0.26]} />
        </mesh>
      </group>

      {/* 4. Real Flowering Shrubs Flanking the Pillars (No procedural spheres!) */}
      <group position={[-2.4, 0.02, 0.2]} rotation={[0, 0.5, 0]} scale={1.1}>
        <primitive object={shrub02Gltf.scene.clone(true)} />
      </group>
      <group position={[2.4, 0.02, 0.2]} rotation={[0, -0.6, 0]} scale={1.1}>
        <primitive object={shrub02Gltf.scene.clone(true)} />
      </group>

      {/* 5. Terracotta Planter Boxes with Foliage */}
      <group position={[-1.75, 0.02, 0.4]} rotation={[0, 0.1, 0]} scale={0.85}>
        <primitive object={planterGltf.scene.clone(true)} />
      </group>
      <group position={[1.75, 0.02, 0.4]} rotation={[0, -0.1, 0]} scale={0.85}>
        <primitive object={planterGltf.scene.clone(true)} />
      </group>
    </group>
  );
};

// Preload assets
useGLTF.preload("/models/architecture/large_iron_gate/large_iron_gate_1k.gltf");
useGLTF.preload("/models/decorations/planter_box_01/planter_box_01_1k.gltf");
useGLTF.preload("/models/bushes/shrub_02/shrub_02_1k.gltf");

export default GardenGrandEntrance;
