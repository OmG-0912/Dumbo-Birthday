"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface GardenPondWaterProps {
  position?: [number, number, number];
  scale?: number;
}

export const GardenPondWater: React.FC<GardenPondWaterProps> = ({
  position = [-5.2, -0.15, -4.8],
  scale = 1.0,
}) => {
  const waterMeshRef = useRef<THREE.Mesh>(null);

  // Load mossy rocks for natural shoreline edging
  const rockGltf = useGLTF("/models/decorations/rock_moss_set_01/rock_moss_set_01_1k.gltf");

  // Realistic Reflective Botanical Pond Water Material
  const waterMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#183a32",
      roughness: 0.12,
      metalness: 0.15,
      envMapIntensity: 1.4,
      transparent: true,
      opacity: 0.92,
    });
  }, []);

  // Water Lily Pad Material
  const lilyPadMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#284d20",
      roughness: 0.45,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, []);

  // Lily Flower Petal Material
  const lilyBlossomMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#fcf3e8",
      roughness: 0.35,
      metalness: 0.0,
    });
  }, []);

  // Floating Water Lilies Placements
  const lilies = useMemo(() => {
    return [
      { pos: [0.6, 0.02, 0.4], scale: 0.55 },
      { pos: [0.95, 0.02, 0.7], scale: 0.45 },
      { pos: [-0.8, 0.02, -0.3], scale: 0.6 },
      { pos: [-1.2, 0.02, -0.1], scale: 0.5 },
      { pos: [0.2, 0.02, -1.1], scale: 0.52 },
      { pos: [-0.3, 0.02, 1.2], scale: 0.58 },
    ];
  }, []);

  // Micro water ripple animation in useFrame
  useFrame((state) => {
    if (waterMeshRef.current) {
      const t = state.clock.getElapsedTime();
      waterMeshRef.current.position.y = -0.01 + Math.sin(t * 1.5) * 0.005;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* 1. Reflective Organic Pond Water Surface */}
      <mesh
        ref={waterMeshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        material={waterMaterial}
        receiveShadow
      >
        <circleGeometry args={[3.2, 48]} />
      </mesh>

      {/* 2. Floating Water Lily Pads with Delicate White Blossoms */}
      {lilies.map((lily, idx) => (
        <group key={idx} position={lily.pos as [number, number, number]} scale={lily.scale}>
          {/* Lily Pad Leaf */}
          <mesh rotation={[-Math.PI / 2, 0, (idx * Math.PI) / 3]} material={lilyPadMaterial}>
            <circleGeometry args={[0.42, 24, 0, Math.PI * 1.82]} />
          </mesh>
          {/* Central Water Lily Blossom */}
          <group position={[0, 0.04, 0]} scale={0.28}>
            {[0, 1, 2, 3, 4, 5].map((pIdx) => (
              <mesh
                key={pIdx}
                rotation={[0.3, (pIdx * Math.PI) / 3, 0]}
                material={lilyBlossomMaterial}
              >
                <sphereGeometry args={[0.22, 8, 8]} />
              </mesh>
            ))}
            {/* Golden Stamen */}
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        </group>
      ))}

      {/* 3. Shoreline Mossy Rocks Framing the Water Margin */}
      <group position={[2.6, 0.02, 0.4]} rotation={[0, 0.4, 0]} scale={0.85}>
        <primitive object={rockGltf.scene.clone(true)} />
      </group>
      <group position={[-2.4, 0.02, -0.6]} rotation={[0, -0.8, 0]} scale={0.9}>
        <primitive object={rockGltf.scene.clone(true)} />
      </group>
    </group>
  );
};

export default GardenPondWater;
