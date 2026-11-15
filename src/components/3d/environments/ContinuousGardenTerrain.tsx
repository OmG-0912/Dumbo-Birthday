"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export const ContinuousGardenTerrain: React.FC = () => {
  // 1. Lush Green Botanical Grass PBR Texture Set (Poly Haven CC0)
  const grassTextures = useTexture({
    map: "/textures/ground/leafy_grass/leafy_grass_diffuse_1k.jpg",
    normalMap: "/textures/ground/leafy_grass/leafy_grass_nor_gl_1k.jpg",
    roughnessMap: "/textures/ground/leafy_grass/leafy_grass_arm_1k.jpg",
    aoMap: "/textures/ground/leafy_grass/leafy_grass_arm_1k.jpg",
  });

  // 2. Rich Dark Forest Soil & Mulch PBR Texture Set for flowerbeds (Poly Haven CC0)
  const soilTextures = useTexture({
    map: "/textures/ground/forest_ground_04/forest_ground_04_diffuse_1k.jpg",
    normalMap: "/textures/ground/forest_ground_04/forest_ground_04_nor_gl_1k.jpg",
    roughnessMap: "/textures/ground/forest_ground_04/forest_ground_04_arm_1k.jpg",
    aoMap: "/textures/ground/forest_ground_04/forest_ground_04_arm_1k.jpg",
  });

  // Grass Material configuration: rich, vibrant emerald botanical green matching Reference Photos 1 & 3
  const grassMaterial = useMemo(() => {
    Object.values(grassTextures).forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
    });

    const repeat = 26; // 26 repeats over 72 meters (~2.7m per tile)
    grassTextures.map.colorSpace = THREE.SRGBColorSpace;
    grassTextures.map.repeat.set(repeat, repeat);
    grassTextures.normalMap.repeat.set(repeat, repeat);
    grassTextures.roughnessMap.repeat.set(repeat, repeat);
    grassTextures.aoMap.repeat.set(repeat, repeat);

    return new THREE.MeshStandardMaterial({
      map: grassTextures.map,
      color: new THREE.Color("#4d782e"), // rich sunlit botanical lawn green (Photos 1, 3)
      normalMap: grassTextures.normalMap,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughnessMap: grassTextures.roughnessMap,
      aoMap: grassTextures.aoMap,
      aoMapIntensity: 1.2,
      roughness: 0.82,
      metalness: 0.0,
    });
  }, [grassTextures]);

  // Dark Loam Soil / Bark Mulch Material for organic flower bed mounds (Photos 3, 5, 9)
  const soilMaterial = useMemo(() => {
    Object.values(soilTextures).forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
    });

    const repeat = 6;
    soilTextures.map.colorSpace = THREE.SRGBColorSpace;
    soilTextures.map.repeat.set(repeat, repeat);
    soilTextures.normalMap.repeat.set(repeat, repeat);
    soilTextures.roughnessMap.repeat.set(repeat, repeat);
    soilTextures.aoMap.repeat.set(repeat, repeat);

    return new THREE.MeshStandardMaterial({
      map: soilTextures.map,
      color: new THREE.Color("#362519"), // deep moist dark brown loam
      normalMap: soilTextures.normalMap,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: soilTextures.roughnessMap,
      aoMap: soilTextures.aoMap,
      aoMapIntensity: 1.3,
      roughness: 0.92,
      metalness: 0.0,
    });
  }, [soilTextures]);

  // Wide continuous sculpted terrain mesh (72m x 72m)
  const terrainGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(72, 72, 128, 128);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // maps to -Z in world coords after rotation

      // Gentle rolling landscape berms on the sides and background
      const sideBerms = (Math.cos(x * 0.08) * -0.45 + Math.sin(y * 0.06) * 0.35) * (Math.abs(x) > 4 ? 1.0 : 0.2);

      // Hollow for the reflective garden pond on the left midground
      const pondDist = Math.hypot(x - -5.4, y - 4.5);
      const pondDepression = Math.exp(-Math.pow(pondDist / 3.2, 2)) * -0.52;

      // Slight depression along the central S-curve path
      const pathDist = Math.abs(x - (Math.sin(y * 0.18) * 0.9 + 0.3));
      const pathValley = Math.exp(-Math.pow(pathDist / 1.8, 2)) * -0.05;

      pos.setZ(i, sideBerms + pondDepression + pathValley);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Organic curved flowerbed geometries that smoothly follow the pathway curves
  const leftBedGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Smooth curvilinear organic border following the path's left flank
    shape.moveTo(-0.9, 4.2);
    shape.bezierCurveTo(-1.1, 2.5, -1.3, 0.8, -1.0, -1.5);
    shape.bezierCurveTo(-0.9, -2.8, -1.4, -4.2, -2.4, -4.5);
    shape.bezierCurveTo(-3.6, -4.2, -3.8, -2.0, -3.6, 0.5);
    shape.bezierCurveTo(-3.5, 2.8, -3.2, 4.5, -2.0, 4.6);
    shape.bezierCurveTo(-1.4, 4.6, -1.0, 4.4, -0.9, 4.2);
    return new THREE.ShapeGeometry(shape, 32);
  }, []);

  const rightBedGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Smooth curvilinear organic border flanking the path's right curve
    shape.moveTo(0.9, 4.2);
    shape.bezierCurveTo(1.2, 2.6, 1.4, 1.0, 1.3, -1.2);
    shape.bezierCurveTo(1.2, -2.6, 1.6, -4.2, 2.6, -4.4);
    shape.bezierCurveTo(3.8, -4.0, 4.2, -2.2, 4.0, 0.2);
    shape.bezierCurveTo(3.8, 2.4, 3.4, 4.4, 2.2, 4.5);
    shape.bezierCurveTo(1.5, 4.5, 1.1, 4.3, 0.9, 4.2);
    return new THREE.ShapeGeometry(shape, 32);
  }, []);

  return (
    <group position={[0, -0.04, 0]}>
      {/* 1. Main Continuous Grass Landscape (72m x 72m) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={terrainGeometry}
        material={grassMaterial}
        receiveShadow
      />

      {/* 2. Left Botanical Bed Dark Mulch Soil Layer (Photos 1, 3, 9) */}
      <mesh
        position={[0, 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={leftBedGeometry}
        material={soilMaterial}
        receiveShadow
      />

      {/* 3. Right Botanical Bed Dark Mulch Soil Layer (Photos 3, 5, 9) */}
      <mesh
        position={[0, 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={rightBedGeometry}
        material={soilMaterial}
        receiveShadow
      />
    </group>
  );
};

export default ContinuousGardenTerrain;
