"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { gardenPBR } from "../textures/GardenPBRTextures";

export const DetailedTerrainAndGrass: React.FC = () => {
  const grassMeshRef = useRef<THREE.InstancedMesh>(null);

  // 1. Rolling Terrain Geometry with slight depression along the pathway
  const terrainGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(42, 42, 36, 36);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Gentle rolling hillocks away from the center path
      const distFromCenter = Math.abs(x);
      const mound = Math.sin(x * 0.18) * Math.cos(y * 0.16) * 0.45;
      const pathDip = Math.exp(-Math.pow(distFromCenter / 1.6, 2)) * -0.06;
      pos.setZ(i, mound + pathDip);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Terrain PBR material
  const terrainMaterial = useMemo(() => {
    if (typeof window === "undefined") {
      return new THREE.MeshStandardMaterial({ color: "#5F7547" });
    }
    const { map, normalMap } = gardenPBR.getGrassTexture();
    return new THREE.MeshStandardMaterial({
      map,
      normalMap,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughness: 0.86,
      metalness: 0.02,
      color: "#F6FFF0",
    });
  }, []);

  // 2. Instanced 3D Grass Tufts along pathway edges and boulders
  const grassCount = 650;
  const grassTuftGeometry = useMemo(() => {
    // 2 crossed angled planes resembling real grass blades
    const geom = new THREE.BufferGeometry();
    const w = 0.18;
    const h = 0.35;
    // prettier-ignore
    const vertices = new Float32Array([
      // Plane 1
      -w, 0, 0,   w, 0, 0,   w, h, 0,
      -w, 0, 0,   w, h, 0,  -w, h, 0,
      // Plane 2 (rotated 90 deg)
      0, 0, -w,   0, 0, w,   0, h, w,
      0, 0, -w,   0, h, w,   0, h, -w,
    ]);
    geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  const grassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#6D874E",
      roughness: 0.75,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
  }, []);

  const tuftData = useMemo(() => {
    const list: {
      x: number;
      z: number;
      scale: number;
      rotY: number;
      color: THREE.Color;
      windOffset: number;
    }[] = [];
    const colors = [new THREE.Color("#6E8A52"), new THREE.Color("#59733F"), new THREE.Color("#82A362"), new THREE.Color("#7A965A")];

    for (let i = 0; i < grassCount; i++) {
      // Concentrate grass along pathway sides (|x| between 0.6 and 3.5)
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (0.8 + Math.random() * 2.8);
      const z = (Math.random() - 0.5) * 11;
      const scale = 0.75 + Math.random() * 0.7;
      const rotY = Math.random() * Math.PI * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      list.push({ x, z, scale, rotY, color, windOffset: Math.random() * Math.PI * 2 });
    }
    return list;
  }, [grassCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const initializedRef = useRef(false);

  useFrame((state) => {
    if (!grassMeshRef.current) return;
    const time = state.clock.getElapsedTime();

    if (!initializedRef.current) {
      tuftData.forEach((td, i) => {
        grassMeshRef.current!.setColorAt(i, td.color);
      });
      if (grassMeshRef.current.instanceColor) {
        grassMeshRef.current.instanceColor.needsUpdate = true;
      }
      initializedRef.current = true;
    }

    // Gentle wave rolling across the grass blades
    tuftData.forEach((td, i) => {
      const sway = Math.sin(time * 2.2 + td.x * 0.8 + td.z * 0.6) * 0.08;
      dummy.position.set(td.x, 0.02, td.z);
      dummy.rotation.set(sway * 0.8, td.rotY, sway);
      dummy.scale.setScalar(td.scale);
      dummy.updateMatrix();
      grassMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    grassMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Undulating Meadow Terrain Mesh */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        geometry={terrainGeometry}
        material={terrainMaterial}
        receiveShadow
      />

      {/* 3D Instanced Wind-Swaying Grass Tufts */}
      <instancedMesh
        ref={grassMeshRef}
        args={[grassTuftGeometry, grassMaterial, grassCount]}
        receiveShadow
      />
    </group>
  );
};
