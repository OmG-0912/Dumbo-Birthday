"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { gardenPBR } from "../textures/GardenPBRTextures";

export const DetailedStonePathway: React.FC = () => {
  const stoneMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#DDD0BE" });
    }
    const { map, bumpMap } = gardenPBR.getStoneTexture();
    return new THREE.MeshStandardMaterial({
      map,
      bumpMap,
      bumpScale: 0.055,
      roughness: 0.82,
      metalness: 0.04,
      color: "#F6EEE2",
    });
  }, []);

  // Crevice soil / moss edge material for gaps between pavers (Reference Photo 1)
  const creviceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#3F4F2E",
      roughness: 0.95,
      metalness: 0.02,
    });
  }, []);

  // Handcrafted polygonal flagstone coordinates forming an organic winding S-curve (Photos 1, 7, 9)
  const stones = useMemo(() => {
    const list = [
      // Foreground entry stones
      { x: 0.12, z: 6.2, rx: 1.05, rz: 0.72, rot: 0.08, y: 0.022 },
      { x: -0.28, z: 5.1, rx: 0.96, rz: 0.68, rot: -0.12, y: 0.02 },
      { x: 0.35, z: 4.0, rx: 1.02, rz: 0.7, rot: 0.16, y: 0.024 },
      { x: -0.15, z: 3.0, rx: 0.92, rz: 0.62, rot: -0.09, y: 0.021 },
      // Midground curve sweeping toward center-right
      { x: 0.42, z: 1.9, rx: 1.04, rz: 0.74, rot: 0.22, y: 0.023 },
      { x: 0.1, z: 0.8, rx: 0.95, rz: 0.65, rot: -0.05, y: 0.02 },
      { x: -0.25, z: -0.3, rx: 0.98, rz: 0.68, rot: 0.14, y: 0.022 },
      { x: 0.18, z: -1.4, rx: 0.92, rz: 0.62, rot: -0.11, y: 0.019 },
      // Leading toward pergola & distant glade
      { x: 0.38, z: -2.5, rx: 0.96, rz: 0.66, rot: 0.18, y: 0.022 },
      { x: 0.06, z: -3.6, rx: 0.9, rz: 0.6, rot: -0.07, y: 0.018 },
      { x: -0.22, z: -4.7, rx: 0.94, rz: 0.64, rot: 0.12, y: 0.02 },
      { x: 0.15, z: -5.8, rx: 0.88, rz: 0.58, rot: -0.1, y: 0.017 },
      { x: 0.28, z: -6.9, rx: 0.85, rz: 0.55, rot: 0.06, y: 0.016 },

      // Natural irregular stepping stones along shoulders
      { x: 0.88, z: 5.6, rx: 0.52, rz: 0.38, rot: 0.42, y: 0.016 },
      { x: -0.82, z: 4.6, rx: 0.48, rz: 0.36, rot: -0.35, y: 0.015 },
      { x: 0.95, z: 3.4, rx: 0.54, rz: 0.4, rot: 0.28, y: 0.017 },
      { x: -0.78, z: 2.3, rx: 0.5, rz: 0.36, rot: -0.25, y: 0.016 },
      { x: 1.02, z: 1.2, rx: 0.52, rz: 0.38, rot: 0.34, y: 0.017 },
      { x: -0.85, z: 0.2, rx: 0.48, rz: 0.34, rot: -0.2, y: 0.015 },
      { x: 0.82, z: -0.9, rx: 0.5, rz: 0.36, rot: 0.3, y: 0.016 },
      { x: -0.8, z: -2.0, rx: 0.46, rz: 0.34, rot: -0.28, y: 0.015 },
      { x: 0.88, z: -3.1, rx: 0.48, rz: 0.36, rot: 0.32, y: 0.015 },
      { x: -0.72, z: -4.1, rx: 0.44, rz: 0.32, rot: -0.22, y: 0.014 },
    ];

    return list.map((st) => {
      // 9-point irregular organic polygon contour
      const shape = new THREE.Shape();
      const pointsCount = 9;
      for (let i = 0; i < pointsCount; i++) {
        const angle = (i / pointsCount) * Math.PI * 2;
        // Natural hand-chiseled radius perturbation
        const radiusPerturb = 0.82 + Math.sin(angle * 3.4 + st.rot * 9) * 0.18;
        const px = Math.cos(angle) * (st.rx * radiusPerturb);
        const py = Math.sin(angle) * (st.rz * radiusPerturb);
        if (i === 0) shape.moveTo(px, py);
        else shape.lineTo(px, py);
      }
      shape.closePath();

      const extrudeSettings = {
        depth: 0.06,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.028,
        bevelThickness: 0.022,
      };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      return { geom, pos: [st.x, st.y, st.z] as [number, number, number], rot: st.rot };
    });
  }, []);

  return (
    <group>
      {/* 1. Underlying natural earth/gravel bed ribbon beneath path */}
      <mesh position={[0.1, 0.005, -0.3]} rotation={[-Math.PI / 2, 0, 0.03]} receiveShadow>
        <planeGeometry args={[2.8, 14.5, 12, 28]} />
        <meshStandardMaterial color="#4A4132" roughness={0.96} metalness={0.02} />
      </mesh>

      {/* 2. Chamfered Cleft Cotswold Sandstone Flagstones */}
      {stones.map((st, idx) => (
        <mesh
          key={idx}
          position={st.pos}
          rotation={[-Math.PI / 2, 0, st.rot]}
          geometry={st.geom}
          material={stoneMaterial}
          receiveShadow
          castShadow
        />
      ))}
    </group>
  );
};

export default DetailedStonePathway;
