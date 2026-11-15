"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export const RealisticMossyRocks: React.FC = () => {
  const { scene } = useGLTF("/models/decorations/rock_moss_set_01/rock_moss_set_01_1k.gltf");

  // Separate individual rock meshes and position them along path borders & pond edge
  const rockPlacements = useMemo(() => {
    // Collect the 6 unique rock meshes from the GLTF scene
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        meshes.push(mesh);
      }
    });

    if (meshes.length === 0) return [];

    // Natural landscape placements flanking the pond, flowerbeds, and pathway edges (Photos 3 & 9)
    // Sunk slightly into the earth so they look settled and weathered, not floating.
    const positions: {
      meshIndex: number;
      pos: [number, number, number];
      rot: [number, number, number];
      scale: number;
    }[] = [
      // Pond Shoreline rocks (Area E - left midground)
      { meshIndex: 0, pos: [-4.2, -0.04, -3.8], rot: [0.1, 0.4, -0.05], scale: 0.45 },
      { meshIndex: 1, pos: [-4.8, -0.05, -5.2], rot: [-0.05, -0.6, 0.1], scale: 0.5 },
      { meshIndex: 2, pos: [-5.8, -0.06, -3.6], rot: [0.08, 0.9, 0], scale: 0.48 },
      { meshIndex: 3, pos: [-6.4, -0.05, -4.8], rot: [-0.1, 0.3, 0.05], scale: 0.52 },

      // Left flowerbed edging rocks (settled in mulch behind the curb)
      { meshIndex: 4, pos: [-2.1, -0.03, 1.4], rot: [0.05, -0.8, -0.05], scale: 0.38 },
      { meshIndex: 5, pos: [-2.6, -0.04, 3.2], rot: [0.1, 0.5, 0.1], scale: 0.42 },

      // Right flowerbed edging rocks (nestled beside golden ursinia flowers)
      { meshIndex: 0, pos: [2.4, -0.03, 2.0], rot: [0, 0.5, 0.1], scale: 0.38 },
      { meshIndex: 1, pos: [2.8, -0.04, 3.6], rot: [-0.05, 0.8, 0], scale: 0.42 },

      // Near grand entrance gate pillars
      { meshIndex: 2, pos: [-1.9, -0.03, -3.4], rot: [0.05, -0.3, 0], scale: 0.36 },
      { meshIndex: 3, pos: [2.1, -0.03, -3.5], rot: [-0.05, 0.4, 0], scale: 0.36 },
    ];

    return positions.map((p, idx) => {
      const sourceMesh = meshes[p.meshIndex % meshes.length];
      const clone = sourceMesh.clone(true);
      // Crucial: reset local position & rotation from original gltf file multi-pack layout
      clone.position.set(0, 0, 0);
      clone.rotation.set(0, 0, 0);
      clone.castShadow = true;
      clone.receiveShadow = true;
      return { mesh: clone, pos: p.pos, rot: p.rot, scale: p.scale, key: idx };
    });
  }, [scene]);

  return (
    <group>
      {rockPlacements.map((rp) => (
        <group
          key={rp.key}
          position={rp.pos}
          rotation={rp.rot}
          scale={rp.scale}
        >
          <primitive object={rp.mesh} />
        </group>
      ))}
    </group>
  );
};

useGLTF.preload("/models/decorations/rock_moss_set_01/rock_moss_set_01_1k.gltf");

export default RealisticMossyRocks;
