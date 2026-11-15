"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { RealisticGardenBench } from "./RealisticGardenBench";
import { RealisticGardenLantern } from "./RealisticGardenLantern";
import { RealisticPlanterBox } from "./RealisticPlanterBox";
import { gardenPBR } from "../textures/GardenPBRTextures";

interface GardenEntranceArborProps {
  position?: [number, number, number];
  lanternIntensity?: number;
  lanternColor?: string;
}

export const GardenEntranceArbor: React.FC<GardenEntranceArborProps> = ({
  position = [2.2, 0, -1.5],
  lanternIntensity = 0.0,
  lanternColor = "#FFE2A3",
}) => {
  // Weathered timber PBR material for the architectural archway (Photos 2, 4, 6)
  const timberMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#524136" });
    }
    const { map, bumpMap } = gardenPBR.getWeatheredWoodTexture();
    return new THREE.MeshStandardMaterial({
      map,
      bumpMap,
      bumpScale: 0.065,
      roughness: 0.86,
      metalness: 0.04,
      color: "#625042",
    });
  }, []);

  // Wrought iron gate fittings
  const ironMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#241D18",
      roughness: 0.45,
      metalness: 0.75,
    });
  }, []);

  return (
    <group position={position}>
      {/* 1. Heavy Timber Vertical Uprights (Photos 2, 4) */}
      {/* Front-Left Post */}
      <mesh position={[-1.6, 1.85, -0.3]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.7, 0.22]} />
      </mesh>
      {/* Back-Left Post */}
      <mesh position={[-1.6, 1.85, 0.6]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.7, 0.22]} />
      </mesh>
      {/* Front-Right Post */}
      <mesh position={[1.6, 1.85, -0.3]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.7, 0.22]} />
      </mesh>
      {/* Back-Right Post */}
      <mesh position={[1.6, 1.85, 0.6]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.7, 0.22]} />
      </mesh>

      {/* 2. Side Trellis Slats for climbing vines */}
      {[-1.6, 1.6].map((tx, idx) => (
        <group key={idx} position={[tx, 1.85, 0.15]}>
          {[-1.1, -0.6, -0.1, 0.4, 0.9].map((sy, sIdx) => (
            <mesh key={sIdx} position={[0, sy, 0]} material={timberMaterial} castShadow>
              <boxGeometry args={[0.07, 0.05, 0.8]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. Overhead Beams & Pergola Rafters */}
      <mesh position={[0, 3.75, -0.3]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.18, 0.18]} />
      </mesh>
      <mesh position={[0, 3.75, 0.6]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.18, 0.18]} />
      </mesh>
      {/* Cross Rafters */}
      {[-1.4, -0.8, -0.2, 0.4, 1.0, 1.5].map((rx, idx) => (
        <mesh key={idx} position={[rx, 3.92, 0.15]} material={timberMaterial} castShadow>
          <boxGeometry args={[0.12, 0.14, 1.35]} />
        </mesh>
      ))}

      {/* 4. Open Wrought-Iron Garden Gate (Photos 2 & 6) */}
      <group position={[-0.7, 0, -0.3]} rotation={[0, 0.7, 0]}>
        <mesh position={[0.65, 1.15, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[1.3, 0.04, 0.04]} />
        </mesh>
        <mesh position={[0.65, 0.1, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[1.3, 0.04, 0.04]} />
        </mesh>
        <mesh position={[0.02, 1.1, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[0.04, 2.1, 0.04]} />
        </mesh>
        <mesh position={[1.28, 1.1, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[0.04, 2.1, 0.04]} />
        </mesh>
        {[0.22, 0.44, 0.65, 0.86, 1.08].map((gx, idx) => (
          <mesh key={idx} position={[gx, 1.1, 0]} material={ironMaterial} castShadow>
            <cylinderGeometry args={[0.014, 0.014, 2.0, 6]} />
          </mesh>
        ))}
      </group>

      {/* 5. Authentic Weathered Wooden Garden Bench (Poly Haven CC0 GLTF) */}
      <RealisticGardenBench position={[0.1, 0, 0.35]} rotation={[0, 0, 0]} scale={1.3} />

      {/* 6. Authentic Wooden Lantern (Poly Haven CC0 GLTF) suspended from central rafter */}
      <RealisticGardenLantern
        position={[0, 3.3, 0.15]}
        scale={1.2}
        lanternIntensity={lanternIntensity}
        lanternColor={lanternColor}
      />

      {/* 7. Authentic Garden Planter Boxes flanking entrance (Reference Photo) */}
      <RealisticPlanterBox position={[-1.75, 0, -0.45]} rotation={[0, 0.12, 0]} scale={1.1} />
      <RealisticPlanterBox position={[1.75, 0, -0.45]} rotation={[0, -0.12, 0]} scale={1.1} />
    </group>
  );
};

export default GardenEntranceArbor;
