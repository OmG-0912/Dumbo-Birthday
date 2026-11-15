"use client";

import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type AssetFocusTarget =
  | "overview"
  | "tree"
  | "flowering_bush"
  | "flower_gazania"
  | "flower_ursinia"
  | "flower_heliophila"
  | "bench"
  | "pathway"
  | "lantern";

export type LightingPreset = "golden" | "daylight" | "twilight";
export type RenderMode = "pbr" | "wireframe" | "normals";

interface AssetShowcaseSceneProps {
  focusTarget: AssetFocusTarget;
  lightingPreset: LightingPreset;
  renderMode: RenderMode;
  onSelectTarget: (target: AssetFocusTarget) => void;
}

// Camera framing coordinates for each showcase element
const TARGET_CAMERA_CONFIG: Record<
  AssetFocusTarget,
  { target: [number, number, number]; position: [number, number, number] }
> = {
  overview: {
    target: [0, 1.2, 0],
    position: [0, 4.5, 7.5],
  },
  tree: {
    target: [-2.2, 2.4, -1.2],
    position: [-2.2, 3.2, 3.2],
  },
  flowering_bush: {
    target: [2.0, 1.0, -0.8],
    position: [2.0, 1.8, 1.8],
  },
  flower_gazania: {
    target: [-0.9, 0.35, 0.9],
    position: [-0.9, 0.85, 2.0],
  },
  flower_ursinia: {
    target: [0.0, 0.4, 1.4],
    position: [0.0, 0.9, 2.5],
  },
  flower_heliophila: {
    target: [0.9, 0.35, 0.7],
    position: [0.9, 0.85, 1.9],
  },
  bench: {
    target: [1.8, 0.6, -1.8],
    position: [1.8, 1.5, 0.6],
  },
  pathway: {
    target: [0.0, 0.2, 0.0],
    position: [0.0, 2.8, 2.5],
  },
  lantern: {
    target: [0.85, 0.45, 1.8],
    position: [0.85, 0.95, 2.8],
  },
};

export const AssetShowcaseScene: React.FC<AssetShowcaseSceneProps> = ({
  focusTarget,
  lightingPreset,
  renderMode,
  onSelectTarget,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Load genuine CC0 3D models from structured library
  const treeGltf = useGLTF("/models/trees/tree_small_02/tree_small_02_1k.gltf");
  const bushGltf = useGLTF("/models/bushes/shrub_02/shrub_02_1k.gltf");
  const gazaniaGltf = useGLTF("/models/flowers/flower_gazania/flower_gazania_1k.gltf");
  const ursiniaGltf = useGLTF("/models/flowers/flower_ursinia/flower_ursinia_1k.gltf");
  const heliophilaGltf = useGLTF("/models/flowers/flower_heliophila/flower_heliophila_1k.gltf");
  const benchGltf = useGLTF("/models/furniture/painted_wooden_bench/painted_wooden_bench_1k.gltf");
  const lanternGltf = useGLTF("/models/decorations/wooden_lantern_01/wooden_lantern_01_1k.gltf");
  const rockGltf = useGLTF("/models/decorations/rock_moss_set_01/rock_moss_set_01_1k.gltf");
  const grassGltf = useGLTF("/models/grass/grass_medium_01/grass_medium_01_1k.gltf");

  // Load PBR Textures for Terrain Sample
  const grassTextures = useTexture({
    map: "/textures/ground/leafy_grass/leafy_grass_diffuse_1k.jpg",
    normalMap: "/textures/ground/leafy_grass/leafy_grass_nor_gl_1k.jpg",
    roughnessMap: "/textures/ground/leafy_grass/leafy_grass_arm_1k.jpg",
    aoMap: "/textures/ground/leafy_grass/leafy_grass_arm_1k.jpg",
  });

  // Load PBR Textures for Stone Pathway Section
  const stoneTextures = useTexture({
    map: "/textures/stone/stone_pathway_02/stone_pathway_02_diffuse_1k.jpg",
    normalMap: "/textures/stone/stone_pathway_02/stone_pathway_02_nor_gl_1k.jpg",
    roughnessMap: "/textures/stone/stone_pathway_02/stone_pathway_02_arm_1k.jpg",
    aoMap: "/textures/stone/stone_pathway_02/stone_pathway_02_arm_1k.jpg",
  });

  // Helper to prepare model with shadows, alpha testing, double side & renderMode
  const setupModel = (sourceScene: THREE.Group, alphaTest = 0.35) => {
    const clone = sourceScene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (renderMode === "wireframe") {
          mesh.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x22c55e,
          });
        } else if (renderMode === "normals") {
          mesh.material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
          });
        } else {
          // Photorealistic PBR Mode
          if (mesh.material) {
            const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
            mat.roughness = Math.max(0.7, mat.roughness ?? 0.8);
            mat.envMapIntensity = 0.95;
            mat.transparent = true;
            mat.alphaTest = alphaTest;
            mat.side = THREE.DoubleSide;
            mesh.material = mat;
          }
        }
      }
    });
    return clone;
  };

  // Cloned Model Instances
  const treeModel = useMemo(() => setupModel(treeGltf.scene, 0.35), [treeGltf.scene, renderMode]);
  const bushModel = useMemo(() => setupModel(bushGltf.scene, 0.35), [bushGltf.scene, renderMode]);
  const gazaniaModel = useMemo(() => setupModel(gazaniaGltf.scene, 0.4), [gazaniaGltf.scene, renderMode]);
  const ursiniaModel = useMemo(() => setupModel(ursiniaGltf.scene, 0.35), [ursiniaGltf.scene, renderMode]);
  const heliophilaModel = useMemo(() => setupModel(heliophilaGltf.scene, 0.35), [heliophilaGltf.scene, renderMode]);
  const benchModel = useMemo(() => setupModel(benchGltf.scene, 0.1), [benchGltf.scene, renderMode]);
  const lanternModel = useMemo(() => setupModel(lanternGltf.scene, 0.1), [lanternGltf.scene, renderMode]);
  const rockModel = useMemo(() => setupModel(rockGltf.scene, 0.1), [rockGltf.scene, renderMode]);
  const grassModel = useMemo(() => setupModel(grassGltf.scene, 0.3), [grassGltf.scene, renderMode]);

  // Configure Terrain Material
  const terrainMaterial = useMemo(() => {
    if (renderMode === "wireframe") {
      return new THREE.MeshBasicMaterial({ wireframe: true, color: 0x3b82f6 });
    }
    if (renderMode === "normals") {
      return new THREE.MeshNormalMaterial();
    }
    Object.values(grassTextures).forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
    });
    grassTextures.map.colorSpace = THREE.SRGBColorSpace;
    grassTextures.map.repeat.set(3, 3);
    grassTextures.normalMap.repeat.set(3, 3);
    grassTextures.roughnessMap.repeat.set(3, 3);
    grassTextures.aoMap.repeat.set(3, 3);

    return new THREE.MeshStandardMaterial({
      map: grassTextures.map,
      normalMap: grassTextures.normalMap,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughnessMap: grassTextures.roughnessMap,
      aoMap: grassTextures.aoMap,
      aoMapIntensity: 1.2,
      roughness: 0.88,
      metalness: 0.02,
    });
  }, [grassTextures, renderMode]);

  // Configure Stone Pathway Material
  const stoneMaterial = useMemo(() => {
    if (renderMode === "wireframe") {
      return new THREE.MeshBasicMaterial({ wireframe: true, color: 0xf59e0b });
    }
    if (renderMode === "normals") {
      return new THREE.MeshNormalMaterial();
    }
    Object.values(stoneTextures).forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
    });
    stoneTextures.map.colorSpace = THREE.SRGBColorSpace;
    stoneTextures.map.repeat.set(1.5, 3.5);
    stoneTextures.normalMap.repeat.set(1.5, 3.5);
    stoneTextures.roughnessMap.repeat.set(1.5, 3.5);
    stoneTextures.aoMap.repeat.set(1.5, 3.5);

    return new THREE.MeshStandardMaterial({
      map: stoneTextures.map,
      normalMap: stoneTextures.normalMap,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughnessMap: stoneTextures.roughnessMap,
      aoMap: stoneTextures.aoMap,
      aoMapIntensity: 1.15,
      roughness: 0.82,
      metalness: 0.03,
    });
  }, [stoneTextures, renderMode]);

  // Camera animation interpolation towards chosen focus target
  const targetLookAt = useRef(new THREE.Vector3(...TARGET_CAMERA_CONFIG.overview.target));
  const targetCamPos = useRef(new THREE.Vector3(...TARGET_CAMERA_CONFIG.overview.position));

  useEffect(() => {
    const cfg = TARGET_CAMERA_CONFIG[focusTarget] || TARGET_CAMERA_CONFIG.overview;
    targetLookAt.current.set(...cfg.target);
    targetCamPos.current.set(...cfg.position);
  }, [focusTarget]);

  useFrame((_, delta) => {
    if (controlsRef.current) {
      // Smooth lerp of camera target
      controlsRef.current.target.lerp(targetLookAt.current, Math.min(1, delta * 3.5));
      // Smooth lerp of camera position
      camera.position.lerp(targetCamPos.current, Math.min(1, delta * 2.8));
      controlsRef.current.update();
    }
  });

  // Lighting configuration based on selected preset
  const lighting = useMemo(() => {
    switch (lightingPreset) {
      case "golden":
        return {
          ambientColor: "#594838",
          ambientIntensity: 0.75,
          sunColor: "#ffe1a8",
          sunIntensity: 2.2,
          sunPos: [8, 5, 6] as [number, number, number],
          rimColor: "#ffd493",
          rimIntensity: 0.6,
          lanternPointIntensity: 0.8,
        };
      case "twilight":
        return {
          ambientColor: "#1d2538",
          ambientIntensity: 0.55,
          sunColor: "#9bb8ff",
          sunIntensity: 0.7,
          sunPos: [-6, 3, -4] as [number, number, number],
          rimColor: "#e09067",
          rimIntensity: 0.8,
          lanternPointIntensity: 3.5,
        };
      case "daylight":
      default:
        return {
          ambientColor: "#e2ecf5",
          ambientIntensity: 0.95,
          sunColor: "#fff8ee",
          sunIntensity: 1.85,
          sunPos: [5, 8, 5] as [number, number, number],
          rimColor: "#b2d6a7",
          rimIntensity: 0.45,
          lanternPointIntensity: 0.2,
        };
    }
  }, [lightingPreset]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        maxPolarAngle={Math.PI / 2 - 0.03}
        minDistance={0.5}
        maxDistance={18}
      />

      {/* Realistic HDRI Sky Fill from CC0 forest slope */}
      <Environment files="/environments/forest_slope_1k.hdr" background={false} environmentIntensity={0.65} />

      {/* Dynamic Lighting System */}
      <ambientLight color={lighting.ambientColor} intensity={lighting.ambientIntensity} />
      <directionalLight
        position={lighting.sunPos}
        intensity={lighting.sunIntensity}
        color={lighting.sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.00015}
      />
      <directionalLight position={[-lighting.sunPos[0], 2, -lighting.sunPos[2]]} intensity={lighting.rimIntensity} color={lighting.rimColor} />

      {/* Plinth Base: Grass & Soil Terrain Sample */}
      <group position={[0, -0.05, 0]}>
        {/* Round Grass Mound Disk (Diameter 9m) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={terrainMaterial}>
          <cylinderGeometry args={[4.6, 4.8, 0.25, 48]} />
        </mesh>

        {/* Stone Pathway Section with Cotswold Flagstone Relief */}
        <mesh
          position={[0, 0.14, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          castShadow
          material={stoneMaterial}
          onClick={(e) => {
            e.stopPropagation();
            onSelectTarget("pathway");
          }}
        >
          <planeGeometry args={[1.9, 7.5, 32, 64]} />
        </mesh>
      </group>

      {/* Grounding Contact Shadows */}
      <ContactShadows position={[0, 0.08, 0]} opacity={0.65} scale={9.5} blur={2.0} far={4} color="#1b2416" />

      {/* 1. SHOWCASE TREE: Scanned CC0 Botanical Tree (tree_small_02) */}
      <group
        position={[-2.2, 0.1, -1.2]}
        rotation={[0, 0.4, 0]}
        scale={1.05}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTarget("tree");
        }}
      >
        <primitive object={treeModel} />
      </group>

      {/* 2. SHOWCASE FLOWERING BUSH: Scanned CC0 Flowering Shrub (shrub_02) */}
      <group
        position={[2.0, 0.1, -0.8]}
        rotation={[0, -0.6, 0]}
        scale={1.25}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTarget("flowering_bush");
        }}
      >
        <primitive object={bushModel} />
      </group>

      {/* 3. SHOWCASE FLOWER 1: Gazania (flower_gazania - 3D Petals & Leaves) */}
      <group
        position={[-0.9, 0.12, 0.9]}
        rotation={[0, 0.3, 0]}
        scale={1.35}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTarget("flower_gazania");
        }}
      >
        <primitive object={gazaniaModel} />
      </group>

      {/* 4. SHOWCASE FLOWER 2: Ursinia (flower_ursinia - Vibrant Orange Daisies with 3D Petals) */}
      <group
        position={[0.0, 0.12, 1.4]}
        rotation={[0, 0.8, 0]}
        scale={1.4}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTarget("flower_ursinia");
        }}
      >
        <primitive object={ursiniaModel} />
      </group>

      {/* 5. SHOWCASE FLOWER 3: Heliophila (flower_heliophila - Delicate Violet Floral Clusters) */}
      <group
        position={[0.9, 0.12, 0.7]}
        rotation={[0, -0.5, 0]}
        scale={1.35}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTarget("flower_heliophila");
        }}
      >
        <primitive object={heliophilaModel} />
      </group>

      {/* Natural Clump Grass accents along stone border */}
      <group position={[-1.0, 0.12, -0.2]} scale={1.1}>
        <primitive object={grassModel} />
      </group>

      {/* 6. SHOWCASE BENCH: Weathered Slatted Teak Bench (painted_wooden_bench) */}
      <group
        position={[1.8, 0.12, -1.8]}
        rotation={[0, -0.4, 0]}
        scale={1.15}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTarget("bench");
        }}
      >
        <primitive object={benchModel} />
      </group>

      {/* 7. SHOWCASE LANTERN & MOSSY ROCKS: CC0 Photogrammetry Accents */}
      <group
        position={[0.85, 0.12, 1.8]}
        rotation={[0, 0.6, 0]}
        scale={0.9}
        onClick={(e) => {
          e.stopPropagation();
          onSelectTarget("lantern");
        }}
      >
        <primitive object={lanternModel} />
        {/* Warm Candle Light within Lantern */}
        <pointLight
          position={[0, 0.35, 0]}
          color="#ffb74d"
          intensity={lighting.lanternPointIntensity}
          distance={4.5}
          decay={2}
          castShadow
        />
      </group>

      <group position={[-1.85, 0.12, 1.6]} rotation={[0, 1.2, 0]} scale={0.85}>
        <primitive object={rockModel} />
      </group>
    </>
  );
};

// Preload models for immediate instant rendering
useGLTF.preload("/models/trees/tree_small_02/tree_small_02_1k.gltf");
useGLTF.preload("/models/bushes/shrub_02/shrub_02_1k.gltf");
useGLTF.preload("/models/flowers/flower_gazania/flower_gazania_1k.gltf");
useGLTF.preload("/models/flowers/flower_ursinia/flower_ursinia_1k.gltf");
useGLTF.preload("/models/flowers/flower_heliophila/flower_heliophila_1k.gltf");
useGLTF.preload("/models/furniture/painted_wooden_bench/painted_wooden_bench_1k.gltf");
useGLTF.preload("/models/decorations/wooden_lantern_01/wooden_lantern_01_1k.gltf");
useGLTF.preload("/models/decorations/rock_moss_set_01/rock_moss_set_01_1k.gltf");
useGLTF.preload("/models/grass/grass_medium_01/grass_medium_01_1k.gltf");

export default AssetShowcaseScene;
