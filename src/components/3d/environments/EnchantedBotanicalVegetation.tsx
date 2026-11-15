"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { RealisticBotanicalTree } from "./RealisticBotanicalTree";

export const EnchantedBotanicalVegetation: React.FC = () => {
  // Load real botanical CC0 models from structured library
  const shrub01 = useGLTF("/models/bushes/shrub_01/shrub_01_1k.gltf");
  const shrub02 = useGLTF("/models/bushes/shrub_02/shrub_02_1k.gltf");
  const shrub03 = useGLTF("/models/bushes/shrub_03/shrub_03_1k.gltf");
  const shrub04 = useGLTF("/models/bushes/shrub_04/shrub_04_1k.gltf");
  const shrubSorrel = useGLTF("/models/bushes/shrub_sorrel_01/shrub_sorrel_01_1k.gltf");
  const gazania = useGLTF("/models/flowers/flower_gazania/flower_gazania_1k.gltf");
  const ursinia = useGLTF("/models/flowers/flower_ursinia/flower_ursinia_1k.gltf");
  const heliophila = useGLTF("/models/flowers/flower_heliophila/flower_heliophila_1k.gltf");
  const periwinkle = useGLTF("/models/flowers/periwinkle_plant/periwinkle_plant_1k.gltf");
  const dandelion = useGLTF("/models/flowers/dandelion_01/dandelion_01_1k.gltf");
  const grass = useGLTF("/models/grass/grass_medium_01/grass_medium_01_1k.gltf");

  // Helper to clone models with rock-solid alphaTest cutouts (transparent=false, depthWrite=true)
  // This guarantees crisp petal silhouettes, accurate shadow casting, and eliminates sorting artifacts.
  const setupModel = (
    sourceScene: THREE.Group,
    alphaTest = 0.45,
    tintHex?: string
  ) => {
    const clone = sourceScene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          mat.roughness = Math.max(0.62, Math.min(0.85, mat.roughness ?? 0.75));
          mat.envMapIntensity = 0.9;
          mat.transparent = false; // Standard PBR alpha-test for clean depth writing
          mat.alphaTest = alphaTest;
          mat.depthWrite = true;
          mat.depthTest = true;
          mat.side = THREE.DoubleSide;
          if (tintHex) {
            mat.color = new THREE.Color(tintHex);
          }
          mesh.material = mat;
        }
      }
    });
    return clone;
  };

  // Base Templates & Vivid Color Variants (Inspired by Reference Photos 1, 3, 5)
  const templates = useMemo(() => {
    return {
      // Base Shrubs
      shrub1: setupModel(shrub01.scene, 0.4),
      shrub2_pink: setupModel(shrub02.scene, 0.45), // natural pink flowering azalea
      shrub2_magenta: setupModel(shrub02.scene, 0.45, "#f43f5e"), // vivid fuchsia/magenta azalea (Photo 3)
      shrub2_coral: setupModel(shrub02.scene, 0.45, "#fb923c"), // warm coral/peach azalea (Photo 5)
      shrub3: setupModel(shrub03.scene, 0.4),
      shrub4: setupModel(shrub04.scene, 0.4),

      // Flowering Plants
      sorrel_pink: setupModel(shrubSorrel.scene, 0.4), // natural pink oxalis
      sorrel_blush: setupModel(shrubSorrel.scene, 0.4, "#f472b6"), // vivid blush pink
      gazania_gold: setupModel(gazania.scene, 0.45), // natural golden yellow
      gazania_amber: setupModel(gazania.scene, 0.45, "#f59e0b"), // rich amber-gold (Photo 5)
      ursinia_sun: setupModel(ursinia.scene, 0.4), // bright sunshine yellow (Photo 3)
      ursinia_lemon: setupModel(ursinia.scene, 0.4, "#facc15"), // radiant lemon yellow
      heliophila_violet: setupModel(heliophila.scene, 0.4), // royal violet/blue spires
      heliophila_lavender: setupModel(heliophila.scene, 0.4, "#a855f7"), // luminous lavender
      periwinkle: setupModel(periwinkle.scene, 0.4),
      dandelion: setupModel(dandelion.scene, 0.4),
      grass: setupModel(grass.scene, 0.35),
    };
  }, [
    shrub01.scene,
    shrub02.scene,
    shrub03.scene,
    shrub04.scene,
    shrubSorrel.scene,
    gazania.scene,
    ursinia.scene,
    heliophila.scene,
    periwinkle.scene,
    dandelion.scene,
    grass.scene,
  ]);

  // Master Garden Vegetation Placements: Dense, Layered, Multi-Colored Botanical Sanctuary
  // (Scale calibrated so flowers are waist-to-eye level and clearly visible from camera frustum)
  const vegetationDrifts = useMemo(() => {
    type PlantKey = keyof typeof templates;
    const items: {
      type: PlantKey;
      pos: [number, number, number];
      rot: [number, number, number];
      scale: number;
    }[] = [
      // =========================================================================
      // 1. FOREGROUND RIGHT BORDER: RADIANT GOLDEN YELLOW & VIOLET DRIFT (Photo 5 & 3)
      // =========================================================================
      // Sweeping golden Ursinia daisy drifts (scaled 3.2 - 4.0 so heads are 50-65cm high)
      { type: "ursinia_sun", pos: [1.2, 0.02, 3.8], rot: [0, 0.4, 0], scale: 3.6 },
      { type: "ursinia_lemon", pos: [1.55, 0.02, 3.4], rot: [0, -0.6, 0], scale: 3.8 },
      { type: "ursinia_sun", pos: [1.35, 0.02, 2.7], rot: [0, 0.8, 0], scale: 3.5 },
      { type: "ursinia_lemon", pos: [1.7, 0.02, 2.1], rot: [0, -0.3, 0], scale: 3.7 },
      { type: "ursinia_sun", pos: [1.45, 0.02, 1.4], rot: [0, 0.5, 0], scale: 3.4 },

      // Broad-headed Gazania highlights (scaled 2.0 - 2.6 for 75-100cm height)
      { type: "gazania_gold", pos: [1.0, 0.02, 3.5], rot: [0, 0.2, 0], scale: 2.4 },
      { type: "gazania_amber", pos: [1.2, 0.02, 2.9], rot: [0, -0.5, 0], scale: 2.5 },
      { type: "gazania_gold", pos: [1.3, 0.02, 1.8], rot: [0, 0.7, 0], scale: 2.3 },
      { type: "gazania_amber", pos: [1.6, 0.02, 1.0], rot: [0, -0.4, 0], scale: 2.4 },

      // Royal Violet Heliophila floral spires accenting the golden daisies
      { type: "heliophila_violet", pos: [1.8, 0.02, 3.7], rot: [0, 0.9, 0], scale: 2.2 },
      { type: "heliophila_lavender", pos: [2.0, 0.02, 2.8], rot: [0, -0.4, 0], scale: 2.3 },
      { type: "heliophila_violet", pos: [1.85, 0.02, 1.9], rot: [0, 0.3, 0], scale: 2.2 },

      // Backing Flowering Shrubs (Pink & Coral Azaleas 1.7m - 2.2m tall - Photo 5)
      { type: "shrub2_coral", pos: [2.4, 0.02, 3.3], rot: [0, -0.5, 0], scale: 1.25 },
      { type: "shrub2_pink", pos: [2.7, 0.02, 2.2], rot: [0, 0.7, 0], scale: 1.3 },
      { type: "shrub2_magenta", pos: [3.2, 0.02, 3.0], rot: [0, 0.3, 0], scale: 1.35 },
      { type: "shrub3", pos: [3.5, 0.02, 1.8], rot: [0, -0.6, 0], scale: 1.4 },

      // Softening Meadow Grass tufts along path edge
      { type: "grass", pos: [0.9, 0.02, 3.2], rot: [0, 0.2, 0], scale: 1.8 },
      { type: "grass", pos: [1.05, 0.02, 2.3], rot: [0, -0.4, 0], scale: 1.7 },

      // =========================================================================
      // 2. FOREGROUND LEFT BORDER: HOT PINK AZALEAS, SORREL, PERIWINKLE & DANDELIONS
      // =========================================================================
      // Massive Hot Pink & Magenta Azalea Banks (Photos 1 & 3)
      { type: "shrub2_magenta", pos: [-2.1, 0.02, 3.6], rot: [0, 0.6, 0], scale: 1.35 },
      { type: "shrub2_pink", pos: [-2.4, 0.02, 2.5], rot: [0, -0.4, 0], scale: 1.3 },
      { type: "shrub2_magenta", pos: [-2.7, 0.02, 1.5], rot: [0, 0.9, 0], scale: 1.35 },
      { type: "shrub1", pos: [-3.2, 0.02, 3.2], rot: [0, -0.2, 0], scale: 1.4 },

      // Pink Sorrel groundcover carpet (scaled 6.0 - 7.5 for 35-45cm height)
      { type: "sorrel_blush", pos: [-1.45, 0.02, 3.8], rot: [0, 0.3, 0], scale: 6.8 },
      { type: "sorrel_pink", pos: [-1.35, 0.02, 2.8], rot: [0, -0.6, 0], scale: 6.5 },
      { type: "sorrel_blush", pos: [-1.5, 0.02, 1.9], rot: [0, 0.8, 0], scale: 6.2 },

      // Golden Ursinia & Gazania counterpoints on left path edge
      { type: "ursinia_sun", pos: [-1.15, 0.02, 3.4], rot: [0, -0.3, 0], scale: 3.5 },
      { type: "ursinia_lemon", pos: [-1.25, 0.02, 2.4], rot: [0, 0.5, 0], scale: 3.4 },
      { type: "gazania_gold", pos: [-0.95, 0.02, 3.7], rot: [0, 0.4, 0], scale: 2.2 },
      { type: "gazania_amber", pos: [-1.05, 0.02, 2.6], rot: [0, -0.2, 0], scale: 2.3 },

      // Glossy Periwinkles & Sunny Dandelions
      { type: "periwinkle", pos: [-1.65, 0.02, 3.2], rot: [0, 0.7, 0], scale: 2.6 },
      { type: "periwinkle", pos: [-1.75, 0.02, 2.1], rot: [0, -0.5, 0], scale: 2.7 },
      { type: "dandelion", pos: [-0.85, 0.02, 3.1], rot: [0, 0.3, 0], scale: 2.4 },
      { type: "dandelion", pos: [-0.92, 0.02, 2.0], rot: [0, -0.6, 0], scale: 2.3 },
      { type: "grass", pos: [-0.8, 0.02, 2.7], rot: [0, 0.5, 0], scale: 1.8 },

      // =========================================================================
      // 3. BOTANICAL PAVILION FORECOURT & SURROUNDINGS (Right Midground x: 2.5 to 5.5)
      // =========================================================================
      { type: "shrub2_coral", pos: [2.5, 0.02, 0.2], rot: [0, 0.4, 0], scale: 1.3 },
      { type: "shrub2_magenta", pos: [3.3, 0.02, -0.5], rot: [0, -0.6, 0], scale: 1.35 },
      { type: "shrub2_pink", pos: [4.4, 0.02, -1.2], rot: [0, 0.8, 0], scale: 1.25 },
      { type: "ursinia_sun", pos: [2.2, 0.02, -0.4], rot: [0, -0.4, 0], scale: 3.5 },
      { type: "ursinia_lemon", pos: [2.6, 0.02, 0.5], rot: [0, 0.8, 0], scale: 3.4 },
      { type: "gazania_gold", pos: [2.1, 0.02, 0.8], rot: [0, 0.2, 0], scale: 2.3 },
      { type: "heliophila_violet", pos: [2.4, 0.02, -1.0], rot: [0, 0.3, 0], scale: 2.2 },
      { type: "heliophila_lavender", pos: [2.9, 0.02, -0.2], rot: [0, -0.7, 0], scale: 2.3 },
      { type: "shrub4", pos: [4.8, 0.02, -0.2], rot: [0, 0.7, 0], scale: 1.5 },

      // =========================================================================
      // 4. GRAND ENTRANCE APPROACH & GATEWAY FLANKING (Midground z: -1.8 to -4.0)
      // =========================================================================
      { type: "shrub2_pink", pos: [-2.2, 0.02, -2.2], rot: [0, 0.6, 0], scale: 1.3 },
      { type: "shrub2_magenta", pos: [2.2, 0.02, -2.3], rot: [0, -0.5, 0], scale: 1.3 },
      { type: "shrub2_coral", pos: [-1.8, 0.02, -3.2], rot: [0, 0.3, 0], scale: 1.35 },
      { type: "shrub2_pink", pos: [2.0, 0.02, -3.3], rot: [0, -0.4, 0], scale: 1.35 },
      { type: "ursinia_sun", pos: [-1.35, 0.02, -2.3], rot: [0, 0.4, 0], scale: 3.4 },
      { type: "ursinia_lemon", pos: [1.4, 0.02, -2.2], rot: [0, -0.6, 0], scale: 3.4 },
      { type: "gazania_amber", pos: [-1.15, 0.02, -2.8], rot: [0, 0.8, 0], scale: 2.3 },
      { type: "heliophila_violet", pos: [1.2, 0.02, -2.8], rot: [0, 0.3, 0], scale: 2.2 },
      { type: "sorrel_blush", pos: [-1.5, 0.02, -3.0], rot: [0, -0.4, 0], scale: 6.2 },
      { type: "periwinkle", pos: [1.6, 0.02, -3.1], rot: [0, 0.5, 0], scale: 2.6 },

      // =========================================================================
      // 5. POND GARDEN VEGETATION (Left Midground x: -4.0 to -6.5, z: -3.0 to -5.5)
      // =========================================================================
      { type: "shrub2_pink", pos: [-4.2, 0.02, -3.2], rot: [0, 0.5, 0], scale: 1.25 },
      { type: "shrub1", pos: [-5.0, 0.02, -3.4], rot: [0, -0.3, 0], scale: 1.4 },
      { type: "periwinkle", pos: [-4.0, 0.02, -4.2], rot: [0, 0.6, 0], scale: 2.6 },
      { type: "heliophila_lavender", pos: [-4.6, 0.02, -4.8], rot: [0, -0.5, 0], scale: 2.2 },
      { type: "grass", pos: [-3.8, 0.02, -3.8], rot: [0, 0.4, 0], scale: 2.0 },
      { type: "grass", pos: [-4.5, 0.02, -5.4], rot: [0, -0.2, 0], scale: 1.9 },

      // =========================================================================
      // 6. DISTANT FOREST GLADE & PATHWAY HORIZON (z: -5.0 to -8.5)
      // =========================================================================
      { type: "shrub2_magenta", pos: [-2.4, 0.02, -5.6], rot: [0, 0.4, 0], scale: 1.35 },
      { type: "shrub2_pink", pos: [2.2, 0.02, -5.8], rot: [0, -0.6, 0], scale: 1.35 },
      { type: "shrub3", pos: [-1.8, 0.02, -7.2], rot: [0, 0.7, 0], scale: 1.5 },
      { type: "shrub4", pos: [1.7, 0.02, -7.4], rot: [0, -0.4, 0], scale: 1.5 },
      { type: "ursinia_sun", pos: [-1.1, 0.02, -6.0], rot: [0, 0.3, 0], scale: 3.2 },
      { type: "heliophila_violet", pos: [1.1, 0.02, -6.2], rot: [0, -0.5, 0], scale: 2.2 },
    ];

    return items.map((item, idx) => {
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

  // COMPOSITE FLOWERING SHRUBS: Green shrubs with blooming flower clusters nestled into their foliage
  // Fulfills the user's specific request: "do add some flowers on the shrubs and make it colourfulll.. and high quality"
  const compositeFloweringShrubs = useMemo(() => {
    // Defines composite shrubs: base shrub model with 3-4 blooming floral clusters nestled across crown
    const shrubSpecs: {
      pos: [number, number, number];
      rotY: number;
      scale: number;
      base: "shrub1" | "shrub3" | "shrub4";
      flower: "ursinia_sun" | "gazania_amber" | "heliophila_violet" | "sorrel_blush";
      flowerScale: number;
    }[] = [
      // Left foreground flowering shrub (Photo 3)
      {
        pos: [-2.9, 0.02, 3.8],
        rotY: 0.4,
        scale: 1.25,
        base: "shrub1",
        flower: "sorrel_blush",
        flowerScale: 5.5,
      },
      // Right foreground golden flowering shrub
      {
        pos: [2.9, 0.02, 3.8],
        rotY: -0.5,
        scale: 1.3,
        base: "shrub3",
        flower: "ursinia_sun",
        flowerScale: 3.2,
      },
      // Near Reading Corner shady shrub with violet blooms
      {
        pos: [-3.8, 0.02, 1.4],
        rotY: 0.8,
        scale: 1.35,
        base: "shrub4",
        flower: "heliophila_violet",
        flowerScale: 2.0,
      },
      // Near Botanical Pavilion terrace with amber-gold blooms
      {
        pos: [3.8, 0.02, -1.2],
        rotY: -0.3,
        scale: 1.3,
        base: "shrub1",
        flower: "gazania_amber",
        flowerScale: 2.2,
      },
    ];

    return shrubSpecs.map((spec, sIdx) => {
      const baseClone = templates[spec.base].clone(true);

      // 4 flower clusters positioned at various heights and angles across the shrub crown
      const flOffsets: [number, number, number][] = [
        [0.22, 0.65, 0.18],
        [-0.25, 0.55, -0.15],
        [0.15, 0.8, -0.2],
        [-0.18, 0.72, 0.22],
      ];

      const flowerClones = flOffsets.map((offset, fIdx) => {
        const fl = templates[spec.flower].clone(true);
        fl.position.set(offset[0], offset[1], offset[2]);
        fl.scale.setScalar(spec.flowerScale / spec.scale);
        fl.rotation.y = fIdx * 1.5;
        return fl;
      });

      return {
        base: baseClone,
        flowers: flowerClones,
        pos: spec.pos,
        rotY: spec.rotY,
        scale: spec.scale,
        key: sIdx,
      };
    });
  }, [templates]);

  return (
    <group>
      {/* 1. Primary Layered Botanical Shrubs & Flowers Flanking the Cotswold Pathway */}
      {vegetationDrifts.map((inst) => (
        <primitive
          key={inst.key}
          object={inst.object}
          position={inst.pos}
          rotation={inst.rot}
          scale={inst.scale}
        />
      ))}

      {/* 2. Composite Flowering Shrubs with nestled blooming floral clusters */}
      {compositeFloweringShrubs.map((comp) => (
        <group
          key={`comp-${comp.key}`}
          position={comp.pos}
          rotation={[0, comp.rotY, 0]}
          scale={comp.scale}
        >
          <primitive object={comp.base} />
          {comp.flowers.map((fl, fIdx) => (
            <primitive key={fIdx} object={fl} />
          ))}
        </group>
      ))}

      {/* 3. LAYERED BOTANICAL CANOPY TREES FRAMING THE ENVIRONMENT */}
      {/* Left Foreground Spreading Jacaranda Canopy (Overarching branch proscenium) */}
      <RealisticBotanicalTree
        variant="jacaranda"
        position={[-4.5, 0, 1.2]}
        rotationY={0.35}
        scale={1.15}
      />

      {/* Right Midground Broadleaf Canopy (Shading Pavilion terrace) */}
      <RealisticBotanicalTree
        variant="island"
        position={[4.8, 0, -1.8]}
        rotationY={-0.6}
        scale={1.1}
      />

      {/* Left Midground Oak (Sheltering Pond garden) */}
      <RealisticBotanicalTree
        variant="oak"
        position={[-5.8, 0, -4.2]}
        rotationY={0.8}
        scale={1.2}
      />

      {/* Deep Background Canopy Trees creating rich forest depth */}
      <RealisticBotanicalTree
        variant="island"
        position={[-3.2, 0, -8.5]}
        rotationY={0.2}
        scale={1.25}
      />
      <RealisticBotanicalTree
        variant="jacaranda"
        position={[3.0, 0, -9.0]}
        rotationY={-0.45}
        scale={1.3}
      />
    </group>
  );
};

// Preload all real GLTF models
useGLTF.preload("/models/bushes/shrub_01/shrub_01_1k.gltf");
useGLTF.preload("/models/bushes/shrub_02/shrub_02_1k.gltf");
useGLTF.preload("/models/bushes/shrub_03/shrub_03_1k.gltf");
useGLTF.preload("/models/bushes/shrub_04/shrub_04_1k.gltf");
useGLTF.preload("/models/bushes/shrub_sorrel_01/shrub_sorrel_01_1k.gltf");
useGLTF.preload("/models/flowers/flower_gazania/flower_gazania_1k.gltf");
useGLTF.preload("/models/flowers/flower_ursinia/flower_ursinia_1k.gltf");
useGLTF.preload("/models/flowers/flower_heliophila/flower_heliophila_1k.gltf");
useGLTF.preload("/models/flowers/periwinkle_plant/periwinkle_plant_1k.gltf");
useGLTF.preload("/models/flowers/dandelion_01/dandelion_01_1k.gltf");
useGLTF.preload("/models/grass/grass_medium_01/grass_medium_01_1k.gltf");

export default EnchantedBotanicalVegetation;
