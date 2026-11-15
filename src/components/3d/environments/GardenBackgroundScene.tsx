"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { GardenEnvironmentConfig } from "@/types/garden";
import { ContinuousGardenTerrain } from "./ContinuousGardenTerrain";
import { ContinuousGardenPathway } from "./ContinuousGardenPathway";
import { GardenGrandEntrance } from "./GardenGrandEntrance";
import { GardenBotanicalPavilion } from "./GardenBotanicalPavilion";
import { GardenReadingCorner } from "./GardenReadingCorner";
import { GardenPondWater } from "./GardenPondWater";
import { RealisticMossyRocks } from "./RealisticMossyRocks";
import { EnchantedBotanicalVegetation } from "./EnchantedBotanicalVegetation";
import { FloatingPetals } from "../effects/FloatingPetals";
import { GardenFireflies } from "../effects/GardenFireflies";

interface GardenBackgroundSceneProps {
  config: GardenEnvironmentConfig;
}

export const GardenBackgroundScene: React.FC<GardenBackgroundSceneProps> = ({ config }) => {
  const sceneRef = useRef<THREE.Group>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  // Smooth environmental interpolation & subtle ground-level camera parallax in useFrame
  useFrame((state, delta) => {
    // 1. Subtle, organic camera parallax (ground-level perspective)
    const targetX = state.pointer.x * 0.45;
    const targetY = 2.2 + state.pointer.y * 0.18;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.2);
    state.camera.lookAt(0.1, 1.4, -2.2);

    // 2. Dynamic sunlight interpolation based on active Time-of-Day config
    if (sunLightRef.current) {
      sunLightRef.current.intensity = THREE.MathUtils.lerp(
        sunLightRef.current.intensity,
        config.sunIntensity,
        delta * 3.0
      );
      sunLightRef.current.color.lerp(new THREE.Color(config.sunColor), delta * 3.0);
      sunLightRef.current.position.set(
        config.sunPosition[0],
        config.sunPosition[1],
        config.sunPosition[2]
      );
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        ambientLightRef.current.intensity,
        config.ambientIntensity,
        delta * 3.0
      );
      ambientLightRef.current.color.lerp(new THREE.Color(config.ambientColor), delta * 3.0);
    }
  });

  return (
    <group ref={sceneRef}>
      {/* 1. Natural Atmospheric Sky Color & Fog */}
      <color attach="background" args={[config.skyGradient.via]} />
      <fog attach="fog" args={[config.fogColor, Math.max(14, config.fogNear), Math.max(38, config.fogFar)]} />

      {/* 2. HDRI Forest Slope Environmental Reflection & Sky Irradiance (Poly Haven CC0) */}
      <Environment files="/environments/forest_slope_1k.hdr" background={false} environmentIntensity={0.82} />

      {/* 3. Physically Based Key & Fill Illumination */}
      <ambientLight ref={ambientLightRef} color={config.ambientColor} intensity={config.ambientIntensity} />
      <hemisphereLight
        args={[config.hemisphereSkyColor, config.hemisphereGroundColor, config.hemisphereIntensity]}
      />
      <directionalLight
        ref={sunLightRef}
        position={config.sunPosition}
        color={config.sunColor}
        intensity={config.sunIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={42}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.00012}
        shadow-normalBias={0.035}
      />

      {/* Rim Sun Light for backlight glow through tree leaves */}
      <directionalLight
        position={[-config.sunPosition[0], 4, -config.sunPosition[2]]}
        intensity={config.sunIntensity * 0.28}
        color={config.sunColor}
      />

      {/* 4. Broad Ground Contact Shadows grounding the entire landscape */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.68}
        scale={36}
        blur={2.4}
        far={6.0}
        color="#1b1712"
      />

      {/* 5. STEP 1: Continuous 72m x 72m Sculpted Terrain with PBR Grass & Mulch */}
      <ContinuousGardenTerrain />

      {/* 6. STEP 3 & 6: S-Curved 22-meter Cotswold Stone Pathway leading into distance */}
      <ContinuousGardenPathway />

      {/* 7. Natural Scanned Granite Boulders (Poly Haven CC0) */}
      <RealisticMossyRocks />

      {/* 8. STEP 3 & AREA A: Grand Entrance Gate with Stone Pillars & Lanterns */}
      <GardenGrandEntrance
        position={[0.1, 0, -3.8]}
        rotationY={0.04}
        scale={1.1}
        lanternIntensity={config.lanternIntensity}
        lanternColor={config.lanternColor}
      />

      {/* 9. STEP 5 & AREA D: Botanical Pavilion Terrace (Inspired by Photo 32d77fb2.jpg) */}
      <GardenBotanicalPavilion
        position={[5.4, 0, -2.8]}
        rotationY={-0.42}
        scale={1.05}
        lanternIntensity={config.lanternIntensity}
        lanternColor={config.lanternColor}
      />

      {/* 10. STEP 5 & AREA C: Secluded Reading Corner with Teak Bench & Wooden Table */}
      <GardenReadingCorner
        position={[-3.5, 0, 0.2]}
        rotationY={0.55}
        scale={1.05}
        lanternIntensity={config.lanternIntensity}
        lanternColor={config.lanternColor}
      />

      {/* 11. STEP 6 & AREA E: Reflective Pond Garden with Water Lilies & Mossy Edging */}
      <GardenPondWater
        position={[-5.4, -0.12, -4.5]}
        scale={1.15}
      />

      {/* 12. STEP 2 & 4: Rich Botanical Vegetation (Trees, Flowering Shrubs, 3D Flowerbeds) */}
      <EnchantedBotanicalVegetation />

      {/* 13. Subtle Floating Storybook Petals System */}
      <FloatingPetals count={32} speed={0.32} />

      {/* 14. Golden Hour & Night Luminous Fireflies */}
      <GardenFireflies count={config.fireflyCount} />
    </group>
  );
};

export default GardenBackgroundScene;
