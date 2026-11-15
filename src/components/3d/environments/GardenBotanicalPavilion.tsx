"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { RealisticGardenLantern } from "./RealisticGardenLantern";

interface GardenBotanicalPavilionProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  lanternIntensity?: number;
  lanternColor?: string;
}

export const GardenBotanicalPavilion: React.FC<GardenBotanicalPavilionProps> = ({
  position = [5.4, 0, -2.8],
  rotationY = -0.42,
  scale = 1.05,
  lanternIntensity = 0.0,
  lanternColor = "#FFE2A3",
}) => {
  // Deep forest green / dark timber column material (matching reference photo 32d77fb2.jpg)
  const columnMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#18261c",
      roughness: 0.68,
      metalness: 0.12,
    });
  }, []);

  // Warm cedar / teak decking material
  const deckMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#544030",
      roughness: 0.82,
      metalness: 0.02,
    });
  }, []);

  // Dark timber handrail & roof trim material
  const railMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#35271d",
      roughness: 0.75,
      metalness: 0.06,
    });
  }, []);

  // Dark weathered copper/slate roof shingles
  const roofMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#233328",
      roughness: 0.72,
      metalness: 0.18,
    });
  }, []);

  // Circular / octagonal pavilion column positions
  const radius = 2.7;
  const numColumns = 6;
  const columns = useMemo(() => {
    const list: { x: number; z: number; angle: number }[] = [];
    for (let i = 0; i < numColumns; i++) {
      // Semi-circular arc facing inward toward the garden path
      const angle = (i / (numColumns - 1)) * Math.PI * 1.05 + 0.45;
      list.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        angle,
      });
    }
    return list;
  }, [radius]);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* 1. Raised Timber Deck Plinth */}
      <mesh position={[0, 0.14, 0]} material={deckMaterial} receiveShadow castShadow>
        <cylinderGeometry args={[radius * 1.15, radius * 1.2, 0.28, 32]} />
      </mesh>

      {/* 2. Forest-Green Structural Columns */}
      {columns.map((col, idx) => (
        <group key={idx} position={[col.x, 0.28, col.z]}>
          <mesh position={[0, 1.45, 0]} material={columnMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.11, 0.13, 2.9, 16]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={columnMaterial} castShadow>
            <cylinderGeometry args={[0.16, 0.18, 0.16, 16]} />
          </mesh>
          <mesh position={[0, 2.82, 0]} material={columnMaterial} castShadow>
            <cylinderGeometry args={[0.17, 0.14, 0.16, 16]} />
          </mesh>
        </group>
      ))}

      {/* 3. Curved Wooden Balustrade & Handrail facing the path */}
      {columns.slice(0, columns.length - 1).map((col, idx) => {
        const nextCol = columns[idx + 1];
        const midX = (col.x + nextCol.x) / 2;
        const midZ = (col.z + nextCol.z) / 2;
        const dist = Math.hypot(nextCol.x - col.x, nextCol.z - col.z);
        const rotY = Math.atan2(nextCol.x - col.x, nextCol.z - col.z);

        return (
          <group key={idx} position={[midX, 0.28, midZ]} rotation={[0, rotY + Math.PI / 2, 0]}>
            {/* Top Handrail */}
            <mesh position={[0, 0.95, 0]} material={railMaterial} castShadow>
              <boxGeometry args={[dist, 0.08, 0.12]} />
            </mesh>
            {/* Bottom Rail */}
            <mesh position={[0, 0.15, 0]} material={railMaterial} castShadow>
              <boxGeometry args={[dist, 0.06, 0.08]} />
            </mesh>
            {/* Vertical Baluster Spindles */}
            {[-0.35, -0.12, 0.12, 0.35].map((spX, spIdx) => (
              <mesh key={spIdx} position={[spX * dist, 0.55, 0]} material={railMaterial} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.75, 8]} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* 4. Architectural Pavilion Roof Structure */}
      {/* Overhead Ring Beam */}
      <mesh position={[0, 3.22, 0]} material={railMaterial} castShadow receiveShadow>
        <torusGeometry args={[radius * 0.98, 0.14, 12, 32]} />
      </mesh>

      {/* Conical Slate Roof */}
      <mesh position={[0, 3.82, 0]} material={roofMaterial} castShadow receiveShadow>
        <coneGeometry args={[radius * 1.25, 1.15, 32]} />
      </mesh>

      {/* 5. Warm Interior Hanging Lantern */}
      <group position={[0, 3.0, 0]}>
        <RealisticGardenLantern
          position={[0, 0, 0]}
          scale={0.9}
          lanternIntensity={lanternIntensity}
          lanternColor={lanternColor}
        />
      </group>
    </group>
  );
};

export default GardenBotanicalPavilion;
