"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export const ContinuousGardenPathway: React.FC = () => {
  // Poly Haven CC0 Cotswold Stone Flagstone PBR Texture Set
  const textures = useTexture({
    map: "/textures/stone/stone_pathway_02/stone_pathway_02_diffuse_1k.jpg",
    normalMap: "/textures/stone/stone_pathway_02/stone_pathway_02_nor_gl_1k.jpg",
    roughnessMap: "/textures/stone/stone_pathway_02/stone_pathway_02_arm_1k.jpg",
    aoMap: "/textures/stone/stone_pathway_02/stone_pathway_02_arm_1k.jpg",
    displacementMap: "/textures/stone/stone_pathway_02/stone_pathway_02_displacement_1k.jpg",
  });

  const stoneMaterial = useMemo(() => {
    Object.values(textures).forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
    });

    textures.map.colorSpace = THREE.SRGBColorSpace;
    textures.map.repeat.set(1.6, 9.0);
    textures.normalMap.repeat.set(1.6, 9.0);
    textures.roughnessMap.repeat.set(1.6, 9.0);
    textures.aoMap.repeat.set(1.6, 9.0);
    textures.displacementMap.repeat.set(1.6, 9.0);

    return new THREE.MeshStandardMaterial({
      map: textures.map,
      normalMap: textures.normalMap,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughnessMap: textures.roughnessMap,
      aoMap: textures.aoMap,
      aoMapIntensity: 1.25,
      displacementMap: textures.displacementMap,
      displacementScale: 0.04,
      roughness: 0.84,
      metalness: 0.02,
    });
  }, [textures]);

  // Stepping stone material for offshoots to the reading bench & pond
  const steppingStoneMaterial = useMemo(() => {
    const mat = stoneMaterial.clone();
    mat.roughness = 0.88;
    return mat;
  }, [stoneMaterial]);

  // Winding 22-meter S-curve pathway geometry leading into the distance
  const pathGeometry = useMemo(() => {
    const length = 22.0;
    const segmentsY = 160;
    const segmentsX = 36;
    const geom = new THREE.PlaneGeometry(2.4, length, segmentsX, segmentsY);
    const pos = geom.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i); // along length (-11 to +11)
      const u = (y + 11) / length; // 0 (far) to 1 (near)

      // Perspective width narrowing: 2.3m in foreground, 1.7m in distant background
      const widthFactor = 0.75 + u * 0.35;
      pos.setX(i, pos.getX(i) * widthFactor);

      // Organic S-curve lateral offset: sweeps naturally between flower beds and trees
      const curveOffset = Math.sin(y * 0.28) * 0.65 + Math.cos(y * 0.14) * 0.28;
      pos.setX(i, pos.getX(i) + curveOffset);

      // Micro vertical camber (crowned center for natural drainage)
      const distFromCenter = Math.abs(pos.getX(i) - curveOffset);
      const camber = Math.max(0, 0.025 - distFromCenter * 0.018);
      pos.setZ(i, pos.getZ(i) + camber);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Stepping stones branching off to the reading alcove and pond
  const steppingStones = useMemo(() => {
    return [
      // Branch toward Reading Corner (left alcove)
      { pos: [-1.8, 0.012, 0.9], rot: [0, -0.2, 0], scale: [0.58, 0.025, 0.48] },
      { pos: [-2.4, 0.012, 0.6], rot: [0, 0.4, 0], scale: [0.55, 0.025, 0.46] },
      { pos: [-2.9, 0.012, 0.3], rot: [0, -0.1, 0], scale: [0.52, 0.025, 0.44] },
      // Branch toward Pond Garden (far left)
      { pos: [-2.0, 0.012, -2.4], rot: [0, -0.4, 0], scale: [0.52, 0.025, 0.46] },
      { pos: [-2.7, 0.012, -3.1], rot: [0, 0.2, 0], scale: [0.54, 0.025, 0.48] },
      { pos: [-3.5, 0.012, -3.8], rot: [0, -0.3, 0], scale: [0.56, 0.025, 0.5] },
      // Branch toward Botanical Pavilion (right terrace)
      { pos: [1.8, 0.015, -0.8], rot: [0, 0.5, 0], scale: [0.58, 0.025, 0.5] },
      { pos: [2.5, 0.018, -1.3], rot: [0, -0.2, 0], scale: [0.62, 0.025, 0.52] },
      { pos: [3.2, 0.022, -1.8], rot: [0, 0.3, 0], scale: [0.65, 0.025, 0.55] },
    ];
  }, []);

  return (
    <group position={[0.2, 0.02, -2.0]}>
      {/* 1. Main 22-meter Cotswold Stone Pathway */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={pathGeometry}
        material={stoneMaterial}
        receiveShadow
        castShadow
      />

      {/* 2. Stepping Stones connecting the distinct garden rooms */}
      {steppingStones.map((stone, idx) => (
        <mesh
          key={idx}
          position={stone.pos as [number, number, number]}
          rotation={stone.rot as [number, number, number]}
          material={steppingStoneMaterial}
          receiveShadow
          castShadow
        >
          <cylinderGeometry args={[stone.scale[0], stone.scale[0] * 1.05, stone.scale[1], 18]} />
        </mesh>
      ))}
    </group>
  );
};

export default ContinuousGardenPathway;
