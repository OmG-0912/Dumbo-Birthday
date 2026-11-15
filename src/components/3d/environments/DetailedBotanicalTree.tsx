"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gardenPBR } from "../textures/GardenPBRTextures";

interface DetailedBotanicalTreeProps {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
}

export const DetailedBotanicalTree: React.FC<DetailedBotanicalTreeProps> = ({
  position = [0, 0, 0],
  scale = 1.0,
  rotationY = 0,
}) => {
  const treeGroupRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Group>(null);

  // Procedural PBR Bark Materials (Photos 1, 7, 9)
  const barkMaterials = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#4A3931" });
    }
    const { map, bumpMap } = gardenPBR.getBarkTexture();
    return new THREE.MeshStandardMaterial({
      map,
      bumpMap,
      bumpScale: 0.085,
      roughness: 0.88,
      metalness: 0.04,
      color: "#544338",
    });
  }, []);

  // Translucent Botanical Leaf Cluster Material
  const leafMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#5E7548" });
    }
    const texture = gardenPBR.getLeafClusterTexture();
    return new THREE.MeshStandardMaterial({
      map: texture,
      alphaTest: 0.28,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.62,
      metalness: 0.04,
      color: "#F6FFF0",
    });
  }, []);

  // Branch and canopy structure (sprawling spreading oak canopy from Photos 1 & 9)
  const leafPlanes = useMemo(() => {
    const planes: {
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      size: number;
    }[] = [];

    const clusterCenters = [
      { x: 0.0, y: 5.2, z: 0.0, r: 2.4, count: 20 },
      { x: 1.6, y: 4.5, z: 0.8, r: 2.0, count: 16 },
      { x: -1.5, y: 4.2, z: -0.6, r: 1.9, count: 16 },
      { x: 0.6, y: 6.0, z: -0.8, r: 2.1, count: 18 },
      { x: -1.0, y: 5.1, z: 1.3, r: 1.8, count: 14 },
      { x: 2.1, y: 3.9, z: -0.9, r: 1.7, count: 14 },
      { x: -2.0, y: 3.8, z: 0.7, r: 1.6, count: 12 },
    ];

    clusterCenters.forEach((c) => {
      for (let i = 0; i < c.count; i++) {
        const phi = Math.random() * Math.PI * 2;
        const theta = (Math.random() - 0.5) * Math.PI * 0.85;
        const dist = Math.random() * c.r;
        planes.push({
          x: c.x + Math.cos(phi) * Math.cos(theta) * dist,
          y: c.y + Math.sin(theta) * dist * 0.75,
          z: c.z + Math.sin(phi) * Math.cos(theta) * dist,
          rotX: Math.random() * Math.PI,
          rotY: Math.random() * Math.PI,
          rotZ: Math.random() * Math.PI,
          size: 1.4 + Math.random() * 0.7,
        });
      }
    });

    return planes;
  }, []);

  useFrame((state) => {
    if (!canopyRef.current) return;
    const time = state.clock.getElapsedTime();
    // Gentle foliage breeze sway
    canopyRef.current.rotation.z = Math.sin(time * 0.85 + position[0]) * 0.014;
    canopyRef.current.rotation.x = Math.cos(time * 0.65 + position[2]) * 0.01;
  });

  return (
    <group ref={treeGroupRef} position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* 1. Heavy Root Buttresses Anchoring into Meadow (Photo 1) */}
      {[0, 1.25, 2.5, 3.75, 5.0].map((ang, rIdx) => (
        <mesh
          key={rIdx}
          position={[Math.cos(ang) * 0.65, 0.22, Math.sin(ang) * 0.65]}
          rotation={[0.35, -ang, 0.2]}
          material={barkMaterials}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.18, 0.32, 0.8, 7]} />
        </mesh>
      ))}

      {/* 2. Main Trunk with Natural Organic Curvature & Taper */}
      {/* Base section */}
      <mesh position={[0, 0.9, 0]} material={barkMaterials} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.72, 1.8, 10]} />
      </mesh>
      {/* Mid trunk section */}
      <mesh position={[0.08, 2.4, -0.05]} rotation={[0.08, 0, -0.06]} material={barkMaterials} castShadow>
        <cylinderGeometry args={[0.38, 0.52, 1.5, 9]} />
      </mesh>
      {/* Upper trunk bifurcation */}
      <mesh position={[0.18, 3.6, -0.1]} rotation={[0.12, 0, -0.1]} material={barkMaterials} castShadow>
        <cylinderGeometry args={[0.28, 0.38, 1.3, 8]} />
      </mesh>

      {/* 3. Sprawling Major Boughs Arching Overhead (Photos 1, 7, 9) */}
      {/* Branch 1 (spreading right towards garden center) */}
      <mesh position={[0.75, 3.8, 0.3]} rotation={[-0.2, 0.3, -0.65]} material={barkMaterials} castShadow>
        <cylinderGeometry args={[0.16, 0.26, 1.9, 7]} />
      </mesh>
      <mesh position={[1.65, 4.3, 0.55]} rotation={[-0.1, 0.2, -0.4]} material={barkMaterials} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 1.6, 6]} />
      </mesh>

      {/* Branch 2 (spreading left) */}
      <mesh position={[-0.65, 3.6, -0.25]} rotation={[0.15, -0.4, 0.6]} material={barkMaterials} castShadow>
        <cylinderGeometry args={[0.15, 0.24, 1.8, 7]} />
      </mesh>
      <mesh position={[-1.4, 4.1, -0.45]} rotation={[0.1, -0.2, 0.38]} material={barkMaterials} castShadow>
        <cylinderGeometry args={[0.09, 0.15, 1.5, 6]} />
      </mesh>

      {/* Branch 3 (arching forward canopy) */}
      <mesh position={[0.1, 4.2, 0.7]} rotation={[0.65, 0.1, 0.05]} material={barkMaterials} castShadow>
        <cylinderGeometry args={[0.14, 0.22, 1.7, 6]} />
      </mesh>

      {/* 4. Translucent Botanical Leaf Canopy Cluster Array */}
      <group ref={canopyRef}>
        {leafPlanes.map((lp, idx) => (
          <mesh
            key={idx}
            position={[lp.x, lp.y, lp.z]}
            rotation={[lp.rotX, lp.rotY, lp.rotZ]}
            material={leafMaterial}
            castShadow
          >
            <planeGeometry args={[lp.size, lp.size]} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default DetailedBotanicalTree;
