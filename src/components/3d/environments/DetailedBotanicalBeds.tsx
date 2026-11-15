"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gardenPBR } from "../textures/GardenPBRTextures";

export const DetailedBotanicalBeds: React.FC = () => {
  const fountainWaterRef = useRef<THREE.Mesh>(null);

  // Mossy Rock Boulders (Photos 1 & 9)
  const rockMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#7E7569",
      roughness: 0.92,
      metalness: 0.04,
    });
  }, []);

  // Aged Sandstone for Distant Classical Fountain (Photo 2)
  const fountainMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#DDD2C2",
      roughness: 0.85,
      metalness: 0.05,
    });
  }, []);

  // Hydrangea Mophead Texture (Photos 4 & 9)
  const hydrangeaMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#F6F5F2" });
    }
    const texture = gardenPBR.getHydrangeaTexture("#FAF8F5");
    return new THREE.MeshStandardMaterial({
      map: texture,
      alphaTest: 0.25,
      transparent: true,
      roughness: 0.6,
      metalness: 0.02,
    });
  }, []);

  // Granite Boulders with natural scaling & rotation
  const boulders = useMemo(() => {
    return [
      { x: -2.3, y: 0.38, z: 4.2, scale: [1.1, 0.65, 0.9] as [number, number, number], rot: 0.4 },
      { x: 2.2, y: 0.4, z: 3.2, scale: [1.15, 0.7, 0.95] as [number, number, number], rot: -0.3 },
      { x: -2.7, y: 0.44, z: 1.6, scale: [1.25, 0.72, 1.05] as [number, number, number], rot: 0.7 },
      { x: 2.9, y: 0.46, z: -0.2, scale: [1.05, 0.64, 0.85] as [number, number, number], rot: -0.5 },
      { x: -2.6, y: 0.4, z: -2.8, scale: [1.0, 0.58, 0.8] as [number, number, number], rot: 0.25 },
      { x: 2.4, y: 0.35, z: -4.8, scale: [0.95, 0.52, 0.75] as [number, number, number], rot: -0.4 },
    ];
  }, []);

  // Dense Lavender & Salvia Spikes (Photos 1, 3)
  const lavenderClusters = useMemo(() => {
    const list: { x: number; z: number; h: number; color: string }[] = [];
    const lavenderCenters = [
      { x: -1.35, z: 4.8, count: 26 },
      { x: -1.55, z: 3.2, count: 30 },
      { x: -1.65, z: 1.6, count: 32 },
      { x: 1.45, z: 4.2, count: 24 },
      { x: 1.55, z: 2.6, count: 28 },
      { x: 1.65, z: 0.9, count: 32 },
      { x: -1.5, z: -1.2, count: 28 },
      { x: 1.5, z: -1.8, count: 26 },
    ];

    lavenderCenters.forEach((c) => {
      for (let i = 0; i < c.count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.52;
        list.push({
          x: c.x + Math.cos(ang) * rad,
          z: c.z + Math.sin(ang) * rad,
          h: 0.36 + Math.random() * 0.24,
          color: Math.random() > 0.45 ? "#8773A6" : "#9F8EBD",
        });
      }
    });
    return list;
  }, []);

  // Golden marigolds & coreopsis heads (Photos 1, 3, 9)
  const marigoldClusters = useMemo(() => {
    const list: { x: number; y: number; z: number; color: string }[] = [];
    const centers = [
      { x: -1.05, z: 3.9, count: 14 },
      { x: 1.15, z: 3.5, count: 14 },
      { x: -1.15, z: 0.2, count: 12 },
      { x: 1.25, z: -0.6, count: 12 },
      { x: -1.1, z: -3.2, count: 10 },
      { x: 1.18, z: -3.8, count: 10 },
    ];

    centers.forEach((c) => {
      for (let i = 0; i < c.count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.4;
        list.push({
          x: c.x + Math.cos(ang) * rad,
          z: c.z + Math.sin(ang) * rad,
          y: 0.16 + Math.random() * 0.12,
          color: Math.random() > 0.35 ? "#EBB848" : "#DB9F2F",
        });
      }
    });
    return list;
  }, []);

  // Billowing Rhododendron & Azalea Mounds (Photos 1, 7, 9)
  const rhododendronMounds = useMemo(() => {
    return [
      // Left foreground magenta mound (Photo 1)
      { x: -3.2, y: 0.85, z: 3.2, color: "#D14D72", r: 1.25, florets: 26 },
      // Right pink mound (Photo 7 & 9)
      { x: 3.4, y: 0.9, z: 1.8, color: "#E06B88", r: 1.35, florets: 28 },
      // Left midground soft blush
      { x: -3.6, y: 0.95, z: -0.8, color: "#F092A5", r: 1.4, florets: 28 },
      // Right background purple-magenta
      { x: 3.8, y: 0.88, z: -3.2, color: "#BF4977", r: 1.2, florets: 24 },
    ];
  }, []);

  // Snowball Hydrangeas (Photos 4 & 9)
  const hydrangeaBushes = useMemo(() => {
    return [
      { x: -2.2, y: 0.6, z: -1.8, count: 8 },
      { x: 2.2, y: 0.65, z: -3.5, count: 9 },
    ];
  }, []);

  useFrame((state) => {
    if (!fountainWaterRef.current) return;
    const time = state.clock.getElapsedTime();
    fountainWaterRef.current.rotation.z = time * 0.25;
  });

  return (
    <group>
      {/* 2. Dense Lavender & Salvia Spikes (Photos 1 & 3) */}
      {lavenderClusters.map((lv, i) => (
        <group key={i} position={[lv.x, 0, lv.z]}>
          {/* Green stem */}
          <mesh position={[0, lv.h * 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.02, lv.h * 0.8, 5]} />
            <meshStandardMaterial color="#4D6338" roughness={0.8} />
          </mesh>
          {/* Flower spike */}
          <mesh position={[0, lv.h * 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, lv.h * 0.45, 6]} />
            <meshStandardMaterial color={lv.color} roughness={0.65} />
          </mesh>
        </group>
      ))}

      {/* 3. Golden Marigold / Coreopsis Flower Heads (Photos 1, 3, 9) */}
      {marigoldClusters.map((mg, i) => (
        <group key={i} position={[mg.x, mg.y, mg.z]}>
          <mesh castShadow>
            <sphereGeometry args={[0.07, 7, 6]} />
            <meshStandardMaterial color={mg.color} roughness={0.52} />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.12, 4]} />
            <meshStandardMaterial color="#4A6035" />
          </mesh>
        </group>
      ))}

      {/* 4. Billowing Rhododendron & Azalea Flower Mounds (Photos 1, 7, 9) */}
      {rhododendronMounds.map((sm, i) => (
        <group key={i} position={[sm.x, 0, sm.z]}>
          {/* Deep green foliage mound */}
          <mesh position={[0, sm.y * 0.7, 0]} castShadow receiveShadow>
            <sphereGeometry args={[sm.r, 12, 10]} />
            <meshStandardMaterial color="#435933" roughness={0.88} />
          </mesh>
          {/* Dense flowering florets on top hemisphere */}
          {Array.from({ length: sm.florets }).map((_, fIdx) => {
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI * 0.52; // Top dome
            const fx = Math.cos(phi) * Math.sin(theta) * sm.r * 0.96;
            const fy = sm.y * 0.7 + Math.cos(theta) * sm.r * 0.96;
            const fz = Math.sin(phi) * Math.sin(theta) * sm.r * 0.96;
            return (
              <mesh key={fIdx} position={[fx, fy, fz]} castShadow>
                <dodecahedronGeometry args={[0.24, 1]} />
                <meshStandardMaterial color={sm.color} roughness={0.58} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* 5. White Snowball Hydrangea Bushes (Photos 4 & 9) */}
      {hydrangeaBushes.map((hb, i) => (
        <group key={i} position={[hb.x, 0, hb.z]}>
          {/* Foliage base */}
          <mesh position={[0, hb.y * 0.6, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.9, 10, 8]} />
            <meshStandardMaterial color="#4A6338" roughness={0.85} />
          </mesh>
          {/* Hydrangea mophead bloom balls */}
          {Array.from({ length: hb.count }).map((_, hIdx) => {
            const ang = (hIdx / hb.count) * Math.PI * 2;
            const bx = Math.cos(ang) * 0.65;
            const bz = Math.sin(ang) * 0.65;
            const by = hb.y + Math.sin(hIdx * 2) * 0.15;
            return (
              <mesh key={hIdx} position={[bx, by, bz]} castShadow>
                <sphereGeometry args={[0.26, 8, 8]} />
                <meshStandardMaterial color="#FCFBF7" roughness={0.65} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* 6. Distant Tiered Classical Stone Fountain (Photo 2) */}
      <group position={[0.2, 0, -7.2]}>
        {/* Fountain Base Pedestal */}
        <mesh position={[0, 0.25, 0]} material={fountainMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[1.3, 1.5, 0.5, 16]} />
        </mesh>
        {/* Large Basin */}
        <mesh position={[0, 0.6, 0]} material={fountainMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[1.6, 1.2, 0.25, 16]} />
        </mesh>
        {/* Pool Water Surface */}
        <mesh ref={fountainWaterRef} position={[0, 0.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.45, 16]} />
          <meshStandardMaterial
            color="#8DB6C4"
            roughness={0.12}
            metalness={0.7}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Center Tier Column */}
        <mesh position={[0, 1.1, 0]} material={fountainMaterial} castShadow>
          <cylinderGeometry args={[0.25, 0.35, 0.8, 12]} />
        </mesh>
        {/* Upper Tier Basin */}
        <mesh position={[0, 1.55, 0]} material={fountainMaterial} castShadow>
          <cylinderGeometry args={[0.75, 0.5, 0.2, 14]} />
        </mesh>
        {/* Center Spire */}
        <mesh position={[0, 1.85, 0]} material={fountainMaterial} castShadow>
          <coneGeometry args={[0.15, 0.45, 10]} />
        </mesh>
      </group>
    </group>
  );
};

export default DetailedBotanicalBeds;
