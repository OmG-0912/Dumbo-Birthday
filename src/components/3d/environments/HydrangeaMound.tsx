"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

interface HydrangeaMoundProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  palette?: "purple" | "blush" | "mixed";
}

export const HydrangeaMound: React.FC<HydrangeaMoundProps> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1.0,
  palette = "purple",
}) => {
  // Rich velvety purple and violet tones from the reference photo
  const flowerMaterials = useMemo(() => {
    const colors =
      palette === "purple"
        ? ["#6B3BA3", "#562A87", "#7C4CB8", "#885EC6", "#4E247D"]
        : palette === "blush"
        ? ["#E8A0B5", "#F2B8CA", "#D9869E", "#F7D0DC", "#C97089"]
        : ["#6B3BA3", "#E8A0B5", "#7C4CB8", "#F2B8CA", "#562A87"];

    return colors.map(
      (c) =>
        new THREE.MeshStandardMaterial({
          color: c,
          roughness: 0.65,
          metalness: 0.02,
        })
    );
  }, [palette]);

  const foliageMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#3F562B",
      roughness: 0.85,
      metalness: 0.02,
    });
  }, []);

  // Dense mophead florets arranged organically in a lush mound
  const florets = useMemo(() => {
    const list: { pos: [number, number, number]; radius: number; matIdx: number }[] = [
      // Top central crowns
      { pos: [0, 0.58, 0], radius: 0.26, matIdx: 0 },
      { pos: [0.18, 0.54, 0.12], radius: 0.24, matIdx: 1 },
      { pos: [-0.16, 0.52, -0.1], radius: 0.24, matIdx: 2 },
      // Mid ring
      { pos: [0.32, 0.42, -0.05], radius: 0.25, matIdx: 3 },
      { pos: [-0.3, 0.44, 0.14], radius: 0.25, matIdx: 4 },
      { pos: [0.12, 0.46, -0.28], radius: 0.23, matIdx: 0 },
      { pos: [-0.08, 0.45, 0.3], radius: 0.24, matIdx: 1 },
      // Lower outer blooms
      { pos: [0.42, 0.28, 0.18], radius: 0.22, matIdx: 2 },
      { pos: [-0.4, 0.3, -0.16], radius: 0.23, matIdx: 3 },
      { pos: [0.24, 0.26, 0.34], radius: 0.22, matIdx: 4 },
      { pos: [-0.22, 0.25, -0.32], radius: 0.21, matIdx: 0 },
    ];
    return list;
  }, []);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Dense underlying foliage dome */}
      <mesh position={[0, 0.35, 0]} material={foliageMaterial} castShadow receiveShadow>
        <sphereGeometry args={[0.55, 12, 8]} />
      </mesh>

      {/* Overflowing Hydrangea Mophead Flower Spheres */}
      {florets.map((f, idx) => (
        <group key={idx} position={f.pos}>
          <mesh material={flowerMaterials[f.matIdx]} castShadow>
            <dodecahedronGeometry args={[f.radius, 1]} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default HydrangeaMound;
