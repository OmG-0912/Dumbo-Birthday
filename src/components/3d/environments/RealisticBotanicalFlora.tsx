"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { SunflowerCluster } from "./SunflowerCluster";
import { HydrangeaMound } from "./HydrangeaMound";

export const RealisticBotanicalFlora: React.FC = () => {
  // Load real botanical 3D models (Poly Haven CC0)
  const shrub01 = useGLTF("/models/environments/shrub_01/shrub_01_1k.gltf");
  const shrub02 = useGLTF("/models/environments/shrub_02/shrub_02_1k.gltf");
  const shrub03 = useGLTF("/models/environments/shrub_03/shrub_03_1k.gltf");
  const shrub04 = useGLTF("/models/environments/shrub_04/shrub_04_1k.gltf");
  const pottedPlant = useGLTF("/models/props/potted_plant_01/potted_plant_01_1k.gltf");
  const gazania = useGLTF("/models/environments/flower_gazania/flower_gazania_1k.gltf");
  const periwinkle = useGLTF("/models/environments/periwinkle_plant/periwinkle_plant_1k.gltf");
  const dandelion = useGLTF("/models/environments/dandelion_01/dandelion_01_1k.gltf");

  // Helper to clone and configure shadows & alpha test
  const setupModel = (sourceScene: THREE.Group, alphaTest = 0.35) => {
    const clone = sourceScene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.85;
          mat.envMapIntensity = 0.82;
          mat.transparent = true;
          mat.alphaTest = alphaTest;
          mat.side = THREE.DoubleSide;
        }
      }
    });
    return clone;
  };

  // Cloned base templates
  const templates = useMemo(() => {
    return {
      shrub1: setupModel(shrub01.scene, 0.3),
      shrub2: setupModel(shrub02.scene, 0.35),
      shrub3: setupModel(shrub03.scene, 0.35),
      shrub4: setupModel(shrub04.scene, 0.35),
      potted: setupModel(pottedPlant.scene, 0.3),
      gazania: setupModel(gazania.scene, 0.4),
      periwinkle: setupModel(periwinkle.scene, 0.35),
      dandelion: setupModel(dandelion.scene, 0.35),
    };
  }, [shrub01.scene, shrub02.scene, shrub03.scene, shrub04.scene, pottedPlant.scene, gazania.scene, periwinkle.scene, dandelion.scene]);

  // Natural garden bed placements flanking the Cotswold stone pathway (Photos 1, 3, 7, 9 & Reference Photo)
  const instances = useMemo(() => {
    const list: {
      type: "shrub1" | "shrub2" | "shrub3" | "shrub4" | "potted" | "gazania" | "periwinkle" | "dandelion";
      pos: [number, number, number];
      rot: [number, number, number];
      scale: number;
    }[] = [
      // 1. Left Foreground Flowerbed (near boulder & reading corner)
      { type: "shrub2", pos: [-2.8, 0.02, 3.8], rot: [0, 0.4, 0], scale: 1.15 },
      { type: "shrub1", pos: [-2.2, 0.02, 4.6], rot: [0, 1.2, 0], scale: 1.1 },
      { type: "potted", pos: [-2.4, 0.02, 2.9], rot: [0, 0.6, 0], scale: 0.9 },
      { type: "gazania", pos: [-1.4, 0.02, 4.4], rot: [0, 0.2, 0], scale: 1.1 },
      { type: "periwinkle", pos: [-1.6, 0.02, 3.6], rot: [0, -0.6, 0], scale: 1.4 },
      { type: "dandelion", pos: [-1.2, 0.02, 4.0], rot: [0, 0.8, 0], scale: 1.3 },
      { type: "shrub4", pos: [-1.15, 0.02, 4.8], rot: [0, 0.5, 0], scale: 1.5 },

      // 2. Right Foreground Flowerbed (near entrance arbor)
      { type: "shrub2", pos: [2.8, 0.02, 3.6], rot: [0, -0.5, 0], scale: 1.2 },
      { type: "shrub3", pos: [2.2, 0.02, 4.2], rot: [0, 0.7, 0], scale: 1.4 },
      { type: "potted", pos: [2.3, 0.02, 2.5], rot: [0, -0.4, 0], scale: 0.95 },
      { type: "gazania", pos: [1.5, 0.02, 3.8], rot: [0, 0.9, 0], scale: 1.0 },
      { type: "periwinkle", pos: [1.6, 0.02, 3.0], rot: [0, -0.3, 0], scale: 1.5 },
      { type: "dandelion", pos: [1.3, 0.02, 3.4], rot: [0, 0.4, 0], scale: 1.2 },
      { type: "shrub4", pos: [1.2, 0.02, 4.5], rot: [0, -0.8, 0], scale: 1.4 },

      // 3. Left Midground (along pathway S-curve)
      { type: "shrub1", pos: [-2.9, 0.02, 1.4], rot: [0, 1.2, 0], scale: 1.3 },
      { type: "shrub2", pos: [-2.5, 0.02, 0.2], rot: [0, -0.3, 0], scale: 1.1 },
      { type: "shrub3", pos: [-2.0, 0.02, 1.9], rot: [0, -0.8, 0], scale: 1.5 },
      { type: "gazania", pos: [-1.3, 0.02, 1.2], rot: [0, 0.5, 0], scale: 1.2 },
      { type: "periwinkle", pos: [-1.5, 0.02, 0.5], rot: [0, 1.1, 0], scale: 1.3 },
      { type: "dandelion", pos: [-1.2, 0.02, 0.9], rot: [0, -0.4, 0], scale: 1.25 },
      { type: "shrub4", pos: [-1.15, 0.02, 1.6], rot: [0, 0.3, 0], scale: 1.3 },

      // 4. Right Midground (bordering bench & arbor)
      { type: "shrub3", pos: [1.8, 0.02, 0.8], rot: [0, 0.3, 0], scale: 1.5 },
      { type: "shrub2", pos: [3.2, 0.02, 0.4], rot: [0, 0.8, 0], scale: 1.15 },
      { type: "gazania", pos: [1.4, 0.02, 0.2], rot: [0, -0.7, 0], scale: 1.1 },
      { type: "periwinkle", pos: [1.5, 0.02, -0.4], rot: [0, 0.6, 0], scale: 1.4 },
      { type: "dandelion", pos: [1.3, 0.02, -0.1], rot: [0, -1.0, 0], scale: 1.2 },
      { type: "shrub4", pos: [1.2, 0.02, 0.5], rot: [0, -0.4, 0], scale: 1.3 },

      // 5. Background Glade (leading toward pond & glade)
      { type: "shrub1", pos: [-2.4, 0.02, -2.5], rot: [0, 0.7, 0], scale: 1.4 },
      { type: "shrub2", pos: [-2.6, 0.02, -4.2], rot: [0, -0.6, 0], scale: 1.2 },
      { type: "shrub3", pos: [-1.8, 0.02, -3.4], rot: [0, -0.9, 0], scale: 1.5 },
      { type: "gazania", pos: [-1.2, 0.02, -2.8], rot: [0, 0.3, 0], scale: 1.0 },
      { type: "periwinkle", pos: [1.6, 0.02, -2.6], rot: [0, -0.4, 0], scale: 1.3 },
      { type: "shrub3", pos: [2.2, 0.02, -3.2], rot: [0, 0.5, 0], scale: 1.6 },
      { type: "shrub2", pos: [3.4, 0.02, -4.0], rot: [0, 1.1, 0], scale: 1.25 },
      { type: "dandelion", pos: [1.2, 0.02, -3.0], rot: [0, 0.8, 0], scale: 1.2 },
    ];

    return list.map((item, idx) => {
      const template = templates[item.type];
      const clone = template.clone(true);
      return {
        object: clone,
        pos: item.pos,
        rot: item.rot,
        scale: item.scale,
        key: idx,
      };
    });
  }, [templates]);

  return (
    <group>
      {/* 1. Scanned Botanical Bushes & Flowering Groundcover */}
      {instances.map((inst) => (
        <primitive
          key={inst.key}
          object={inst.object}
          position={inst.pos}
          rotation={inst.rot}
          scale={inst.scale}
        />
      ))}

      {/* 2. Dense Royal Purple & Blush Pink Hydrangea Mounds (From Reference Photo) */}
      <HydrangeaMound position={[-1.7, 0, 4.2]} scale={1.15} palette="purple" />
      <HydrangeaMound position={[1.7, 0, 3.2]} scale={1.1} palette="purple" />
      <HydrangeaMound position={[-1.8, 0, 1.8]} scale={1.2} palette="blush" />
      <HydrangeaMound position={[1.7, 0, 1.2]} scale={1.1} palette="purple" />
      <HydrangeaMound position={[-1.9, 0, -0.8]} scale={1.15} palette="purple" />
      <HydrangeaMound position={[1.8, 0, -2.2]} scale={1.25} palette="blush" />

      {/* 3. Tall Golden Sunflowers Catching the Sunlight (From Reference Photo) */}
      <SunflowerCluster position={[-2.3, 0, 3.2]} rotationY={0.3} scale={1.15} count={3} />
      <SunflowerCluster position={[2.1, 0, 2.2]} rotationY={-0.4} scale={1.2} count={3} />
      <SunflowerCluster position={[-2.4, 0, 0.8]} rotationY={0.5} scale={1.25} count={3} />
      <SunflowerCluster position={[2.2, 0, -1.2]} rotationY={-0.3} scale={1.1} count={3} />
      <SunflowerCluster position={[-2.0, 0, -3.2]} rotationY={0.2} scale={1.15} count={3} />
    </group>
  );
};

// Preload models
useGLTF.preload("/models/environments/shrub_01/shrub_01_1k.gltf");
useGLTF.preload("/models/environments/shrub_02/shrub_02_1k.gltf");
useGLTF.preload("/models/environments/shrub_03/shrub_03_1k.gltf");
useGLTF.preload("/models/environments/shrub_04/shrub_04_1k.gltf");
useGLTF.preload("/models/props/potted_plant_01/potted_plant_01_1k.gltf");
useGLTF.preload("/models/environments/flower_gazania/flower_gazania_1k.gltf");
useGLTF.preload("/models/environments/periwinkle_plant/periwinkle_plant_1k.gltf");
useGLTF.preload("/models/environments/dandelion_01/dandelion_01_1k.gltf");

export default RealisticBotanicalFlora;
