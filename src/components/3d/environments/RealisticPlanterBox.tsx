"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

interface RealisticPlanterBoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const RealisticPlanterBox: React.FC<RealisticPlanterBoxProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1.0,
}) => {
  const { scene } = useGLTF("/models/props/planter_box_01/planter_box_01_1k.gltf");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.88;
          mat.envMapIntensity = 0.85;
        }
      }
    });
    return clone;
  }, [scene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

useGLTF.preload("/models/props/planter_box_01/planter_box_01_1k.gltf");

export default RealisticPlanterBox;
