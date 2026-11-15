"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export const RealisticGroundTerrain: React.FC = () => {
  // Poly Haven CC0 Leafy Grass PBR Texture Set (Vibrant Lush Green Turf)
  const textures = useTexture({
    map: "/textures/leafy_grass/leafy_grass_diffuse_1k.jpg",
    normalMap: "/textures/leafy_grass/leafy_grass_nor_gl_1k.jpg",
    roughnessMap: "/textures/leafy_grass/leafy_grass_arm_1k.jpg",
    aoMap: "/textures/leafy_grass/leafy_grass_arm_1k.jpg",
    displacementMap: "/textures/leafy_grass/leafy_grass_displacement_1k.jpg",
  });

  const terrainMaterial = useMemo(() => {
    Object.values(textures).forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
    });

    const repeatX = 6;
    const repeatY = 6;
    textures.map.colorSpace = THREE.SRGBColorSpace;
    textures.map.repeat.set(repeatX, repeatY);
    textures.normalMap.repeat.set(repeatX, repeatY);
    textures.roughnessMap.repeat.set(repeatX, repeatY);
    textures.aoMap.repeat.set(repeatX, repeatY);
    textures.displacementMap.repeat.set(repeatX, repeatY);

    return new THREE.MeshStandardMaterial({
      map: textures.map,
      normalMap: textures.normalMap,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughnessMap: textures.roughnessMap,
      aoMap: textures.aoMap,
      aoMapIntensity: 1.2,
      displacementMap: textures.displacementMap,
      displacementScale: 0.05,
      roughness: 0.85,
      metalness: 0.02,
    });
  }, [textures]);

  // Sculpted garden landscape mesh with natural terrain undulation
  const terrainGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(38, 38, 64, 64);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Natural gentle garden berms away from the center path
      const mound = Math.sin(x * 0.16) * Math.cos(y * 0.14) * 0.38;
      // Slight depression along path center line
      const dist = Math.abs(x);
      const pathValley = Math.exp(-Math.pow(dist / 1.7, 2)) * -0.06;
      pos.setZ(i, mound + pathValley);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <group position={[0, -0.05, 0]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={terrainGeometry}
        material={terrainMaterial}
        receiveShadow
      />
    </group>
  );
};

export default RealisticGroundTerrain;
