"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export const RealisticStonePathway: React.FC = () => {
  const textures = useTexture({
    map: "/textures/stone_pathway_02/stone_pathway_02_diffuse_1k.jpg",
    normalMap: "/textures/stone_pathway_02/stone_pathway_02_nor_gl_1k.jpg",
    roughnessMap: "/textures/stone_pathway_02/stone_pathway_02_arm_1k.jpg",
    aoMap: "/textures/stone_pathway_02/stone_pathway_02_arm_1k.jpg",
    displacementMap: "/textures/stone_pathway_02/stone_pathway_02_displacement_1k.jpg",
  });

  const stoneMaterial = useMemo(() => {
    Object.values(textures).forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
    });

    textures.map.colorSpace = THREE.SRGBColorSpace;
    textures.map.repeat.set(1.4, 6.0);
    textures.normalMap.repeat.set(1.4, 6.0);
    textures.roughnessMap.repeat.set(1.4, 6.0);
    textures.aoMap.repeat.set(1.4, 6.0);
    textures.displacementMap.repeat.set(1.4, 6.0);

    return new THREE.MeshStandardMaterial({
      map: textures.map,
      normalMap: textures.normalMap,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: textures.roughnessMap,
      aoMap: textures.aoMap,
      aoMapIntensity: 1.1,
      displacementMap: textures.displacementMap,
      displacementScale: 0.045,
      roughness: 0.85,
      metalness: 0.02,
    });
  }, [textures]);

  // Curved pathway ribbon matching the garden S-curve (Photos 1, 7, 9)
  const pathGeometry = useMemo(() => {
    // 2.2m wide pathway geometry with resolution for displacement
    const geom = new THREE.PlaneGeometry(2.3, 14.0, 32, 120);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i); // along length (-7 to +7)
      // Gentle S-curve lateral offset
      const curveOffset = Math.sin(y * 0.35) * 0.42 + Math.cos(y * 0.2) * 0.15;
      pos.setX(i, pos.getX(i) + curveOffset);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <group position={[0.15, 0.03, -0.2]}>
      {/* PBR Cotswold Flagstone Pathway */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={pathGeometry}
        material={stoneMaterial}
        receiveShadow
        castShadow
      />
    </group>
  );
};

export default RealisticStonePathway;
