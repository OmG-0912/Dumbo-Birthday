"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { gardenPBR } from "../textures/GardenPBRTextures";

interface SunflowerClusterProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  count?: number;
}

export const SunflowerCluster: React.FC<SunflowerClusterProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1.0,
  count = 3,
}) => {
  const flowerMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#FFC72C" });
    }
    const texture = gardenPBR.getSunflowerTexture();
    return new THREE.MeshStandardMaterial({
      map: texture,
      alphaTest: 0.35,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0.02,
    });
  }, []);

  const stemMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#4E6637",
      roughness: 0.8,
      metalness: 0.02,
    });
  }, []);

  const leafMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#445C2F",
      roughness: 0.75,
      side: THREE.DoubleSide,
    });
  }, []);

  const stalks = useMemo(() => {
    const list = [
      { dx: 0, dz: 0, height: 1.45, flowerScale: 0.75, tiltX: 0.12, tiltZ: 0.05 },
      { dx: 0.28, dz: -0.15, height: 1.6, flowerScale: 0.82, tiltX: -0.08, tiltZ: 0.1 },
      { dx: -0.22, dz: 0.18, height: 1.3, flowerScale: 0.68, tiltX: 0.14, tiltZ: -0.06 },
    ];
    return list.slice(0, count);
  }, [count]);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {stalks.map((s, idx) => (
        <group key={idx} position={[s.dx, 0, s.dz]}>
          {/* Main Stem */}
          <mesh position={[0, s.height * 0.5, 0]} material={stemMaterial} castShadow>
            <cylinderGeometry args={[0.025, 0.035, s.height, 6]} />
          </mesh>

          {/* Broad Lower Leaves */}
          {[-0.35, 0.45].map((ang, lIdx) => (
            <mesh
              key={lIdx}
              position={[Math.cos(ang) * 0.18, s.height * (0.35 + lIdx * 0.22), Math.sin(ang) * 0.18]}
              rotation={[0.4, ang, 0.2]}
              material={leafMaterial}
              castShadow
            >
              <planeGeometry args={[0.26, 0.18]} />
            </mesh>
          ))}

          {/* Sunflower Head facing slightly upwards towards sunlight & camera */}
          <group position={[0, s.height, 0]} rotation={[s.tiltX, 0.2, s.tiltZ]}>
            {/* Green calyx back */}
            <mesh position={[0, 0, -0.03]} material={leafMaterial} castShadow>
              <coneGeometry args={[0.16, 0.06, 8]} />
            </mesh>
            {/* Golden Sunflower Blossom Plane */}
            <mesh material={flowerMaterial} castShadow receiveShadow>
              <planeGeometry args={[s.flowerScale, s.flowerScale]} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
};

export default SunflowerCluster;
