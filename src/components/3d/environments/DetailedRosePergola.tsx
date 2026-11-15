"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gardenPBR } from "../textures/GardenPBRTextures";

interface DetailedRosePergolaProps {
  position?: [number, number, number];
  lanternIntensity?: number;
  lanternColor?: string;
}

export const DetailedRosePergola: React.FC<DetailedRosePergolaProps> = ({
  position = [3.0, 0, -2.0],
  lanternIntensity = 0.0,
  lanternColor = "#FFE2A3",
}) => {
  const lanternLightRef = useRef<THREE.PointLight>(null);

  // Weathered timber PBR material (Photos 2, 4, 6)
  const timberMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#554238" });
    }
    const { map, bumpMap } = gardenPBR.getWeatheredWoodTexture();
    return new THREE.MeshStandardMaterial({
      map,
      bumpMap,
      bumpScale: 0.065,
      roughness: 0.84,
      metalness: 0.04,
      color: "#645245",
    });
  }, []);

  // Wrought iron gate & fittings material
  const ironMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#231B16",
      roughness: 0.42,
      metalness: 0.78,
    });
  }, []);

  // Bench wood material (aged honey teak)
  const benchMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#D8C6AE",
      roughness: 0.76,
      metalness: 0.02,
    });
  }, []);

  // Clematis violet blossom texture
  const clematisMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#6A3F8E" });
    }
    const texture = gardenPBR.getClematisTexture();
    return new THREE.MeshStandardMaterial({
      map: texture,
      alphaTest: 0.35,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.58,
    });
  }, []);

  // Climbing rose flora data (Photos 2, 4, 6)
  const roseClusters = useMemo(() => {
    return [
      // Left vertical post climb
      { x: -1.75, y: 1.1, z: 0.05, color: "#E8C9CA", sz: 0.22 },
      { x: -1.65, y: 1.7, z: 0.12, color: "#F7E1E3", sz: 0.25 },
      { x: -1.8, y: 2.3, z: -0.08, color: "#E8C9CA", sz: 0.24 },
      { x: -1.55, y: 2.9, z: 0.18, color: "#FDEFF1", sz: 0.26 },
      // Arch curve top
      { x: -1.2, y: 3.45, z: 0.15, color: "#F7E1E3", sz: 0.28 },
      { x: -0.6, y: 3.75, z: 0.22, color: "#E8C9CA", sz: 0.32 },
      { x: 0.0, y: 3.82, z: 0.18, color: "#FFFFFF", sz: 0.3 },
      { x: 0.65, y: 3.72, z: 0.25, color: "#E8C9CA", sz: 0.32 },
      { x: 1.25, y: 3.45, z: 0.18, color: "#F7E1E3", sz: 0.28 },
      // Right vertical post climb
      { x: 1.6, y: 2.85, z: 0.1, color: "#FDEFF1", sz: 0.26 },
      { x: 1.78, y: 2.15, z: -0.06, color: "#E8C9CA", sz: 0.25 },
      { x: 1.62, y: 1.55, z: 0.14, color: "#F7E1E3", sz: 0.24 },
      { x: 1.75, y: 0.95, z: -0.05, color: "#E8C9CA", sz: 0.22 },
      // Cascading sprays hanging from rafters
      { x: -0.3, y: 3.25, z: 0.4, color: "#F7E1E3", sz: 0.24 },
      { x: 0.35, y: 3.2, z: 0.42, color: "#E8C9CA", sz: 0.25 },
    ];
  }, []);

  // Clematis violet stars (Photos 2 & 6)
  const clematisFlora = useMemo(() => {
    return [
      { x: -1.5, y: 2.1, z: 0.2, sz: 0.35, rot: 0.4 },
      { x: -1.35, y: 3.1, z: 0.22, sz: 0.38, rot: -0.6 },
      { x: -0.2, y: 3.6, z: 0.3, sz: 0.42, rot: 0.2 },
      { x: 0.8, y: 3.5, z: 0.28, sz: 0.38, rot: 0.8 },
      { x: 1.55, y: 2.5, z: 0.18, sz: 0.36, rot: -0.3 },
      { x: 1.65, y: 1.8, z: 0.22, sz: 0.34, rot: 0.5 },
    ];
  }, []);

  // Lantern flicker calculation
  useFrame((state, delta) => {
    if (!lanternLightRef.current) return;
    const time = state.clock.getElapsedTime();
    const flicker = Math.sin(time * 2.8) * 0.12 + Math.cos(time * 4.6) * 0.08;
    const target = lanternIntensity > 0 ? lanternIntensity + flicker : 0;
    lanternLightRef.current.intensity = THREE.MathUtils.lerp(
      lanternLightRef.current.intensity,
      target,
      delta * 3.5
    );
  });

  return (
    <group position={position}>
      {/* 1. Heavy Timber Vertical Pillars */}
      {/* Front-Left */}
      <mesh position={[-1.75, 1.8, -0.25]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.6, 0.22]} />
      </mesh>
      {/* Back-Left */}
      <mesh position={[-1.75, 1.8, 0.55]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.6, 0.22]} />
      </mesh>
      {/* Front-Right */}
      <mesh position={[1.75, 1.8, -0.25]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.6, 0.22]} />
      </mesh>
      {/* Back-Right */}
      <mesh position={[1.75, 1.8, 0.55]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[0.22, 3.6, 0.22]} />
      </mesh>

      {/* 2. Side Trellis Slats (for climbing roses) */}
      {[-1.75, 1.75].map((tx, idx) => (
        <group key={idx} position={[tx, 1.8, 0.15]}>
          {[-1.0, -0.5, 0.0, 0.5, 1.0].map((ly, sIdx) => (
            <mesh key={sIdx} position={[0, ly, 0]} material={timberMaterial} castShadow>
              <boxGeometry args={[0.08, 0.06, 0.7]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. Pergola Top Rafter Beams & Curved Arch Top (Photos 2 & 4) */}
      {/* Left-to-Right Main Beams */}
      <mesh position={[0, 3.65, -0.25]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[4.1, 0.18, 0.18]} />
      </mesh>
      <mesh position={[0, 3.65, 0.55]} material={timberMaterial} castShadow receiveShadow>
        <boxGeometry args={[4.1, 0.18, 0.18]} />
      </mesh>
      {/* Overhead Cross Rafters */}
      {[-1.6, -1.0, -0.4, 0.2, 0.8, 1.4].map((rx, idx) => (
        <mesh key={idx} position={[rx, 3.82, 0.15]} material={timberMaterial} castShadow>
          <boxGeometry args={[0.12, 0.14, 1.4]} />
        </mesh>
      ))}

      {/* 4. Open Wrought Iron Gate (Photos 2 & 6) */}
      <group position={[-0.8, 0, -0.25]} rotation={[0, 0.65, 0]}>
        {/* Gate outer frame */}
        <mesh position={[0.7, 1.15, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[1.4, 0.04, 0.04]} />
        </mesh>
        <mesh position={[0.7, 0.1, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[1.4, 0.04, 0.04]} />
        </mesh>
        <mesh position={[0.02, 1.1, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[0.04, 2.1, 0.04]} />
        </mesh>
        <mesh position={[1.38, 1.1, 0]} material={ironMaterial} castShadow>
          <boxGeometry args={[0.04, 2.1, 0.04]} />
        </mesh>
        {/* Gate vertical scrolls / spindles */}
        {[0.25, 0.48, 0.7, 0.92, 1.15].map((gx, idx) => (
          <mesh key={idx} position={[gx, 1.1, 0]} material={ironMaterial} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 2.0, 6]} />
          </mesh>
        ))}
      </group>

      {/* 5. Slatted English Teak Garden Bench tucked inside (Photos 4 & 9) */}
      <group position={[0, 0.45, 0.4]}>
        {/* Bench legs */}
        <mesh position={[-1.1, -0.22, -0.22]} material={benchMaterial} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.08]} />
        </mesh>
        <mesh position={[-1.1, -0.22, 0.22]} material={benchMaterial} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.08]} />
        </mesh>
        <mesh position={[1.1, -0.22, -0.22]} material={benchMaterial} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.08]} />
        </mesh>
        <mesh position={[1.1, -0.22, 0.22]} material={benchMaterial} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.08]} />
        </mesh>
        {/* Bench seat slats */}
        {[-0.18, -0.06, 0.06, 0.18].map((sy, idx) => (
          <mesh key={idx} position={[0, 0.02, sy]} material={benchMaterial} castShadow receiveShadow>
            <boxGeometry args={[2.35, 0.035, 0.09]} />
          </mesh>
        ))}
        {/* Bench backrest slats */}
        {[0.22, 0.36, 0.5, 0.64].map((by, idx) => (
          <mesh key={idx} position={[0, by, 0.24]} material={benchMaterial} castShadow>
            <boxGeometry args={[2.35, 0.07, 0.03]} />
          </mesh>
        ))}
        {/* Bench curved armrests */}
        <mesh position={[-1.12, 0.24, 0.0]} material={benchMaterial} castShadow>
          <boxGeometry args={[0.07, 0.04, 0.48]} />
        </mesh>
        <mesh position={[1.12, 0.24, 0.0]} material={benchMaterial} castShadow>
          <boxGeometry args={[0.07, 0.04, 0.48]} />
        </mesh>
      </group>

      {/* 6. Climbing English Roses (Photos 2, 4, 6) */}
      {roseClusters.map((r, i) => (
        <group key={i} position={[r.x, r.y, r.z]}>
          {/* Central Rose Blossom */}
          <mesh castShadow>
            <dodecahedronGeometry args={[r.sz, 1]} />
            <meshStandardMaterial color={r.color} roughness={0.65} metalness={0.02} />
          </mesh>
          {/* Foliage leaves */}
          {[0, 1.2, 2.4, 3.6].map((ang, lIdx) => (
            <mesh
              key={lIdx}
              position={[Math.cos(ang) * (r.sz * 1.1), -r.sz * 0.4, Math.sin(ang) * (r.sz * 1.1)]}
              rotation={[0.3, ang, 0.2]}
            >
              <planeGeometry args={[r.sz * 1.1, r.sz * 0.7]} />
              <meshStandardMaterial
                color="#4C6339"
                roughness={0.75}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* 7. Purple Clematis Star Blooms (Photos 2 & 6) */}
      {clematisFlora.map((c, i) => (
        <mesh
          key={i}
          position={[c.x, c.y, c.z]}
          rotation={[0, 0, c.rot]}
          material={clematisMaterial}
          castShadow
        >
          <planeGeometry args={[c.sz, c.sz]} />
        </mesh>
      ))}

      {/* 8. Hanging Wrought Iron Lantern with Gentle Warm Light */}
      <group position={[0, 3.3, 0.15]}>
        {/* Chain */}
        <mesh position={[0, 0.18, 0]} material={ironMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.36, 4]} />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0, 0]} material={ironMaterial} castShadow>
          <coneGeometry args={[0.18, 0.12, 6]} />
        </mesh>
        {/* Glass enclosure with candle inside */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.11, 0.09, 0.22, 6]} />
          <meshStandardMaterial
            color="#FFF4DC"
            emissive={lanternColor}
            emissiveIntensity={lanternIntensity > 0 ? 0.8 : 0.05}
            transparent
            opacity={0.85}
          />
        </mesh>
        <pointLight
          ref={lanternLightRef}
          position={[0, -0.15, 0]}
          color={lanternColor}
          intensity={lanternIntensity}
          distance={7.5}
          decay={2}
          castShadow
        />
      </group>
    </group>
  );
};

export default DetailedRosePergola;
