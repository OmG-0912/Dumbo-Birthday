"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { GardenEnvironmentConfig } from "@/types/garden";
import { FloatingPetals } from "../effects/FloatingPetals";
import { LivingButterflies } from "../effects/LivingButterflies";
import { GardenFireflies } from "../effects/GardenFireflies";

interface LivingGardenSceneProps {
  config: GardenEnvironmentConfig;
}

export const LivingGardenScene: React.FC<LivingGardenSceneProps> = ({ config }) => {
  const sceneRef = useRef<THREE.Group>(null);
  const foliageGroupRef = useRef<THREE.Group>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const lanternLightRef1 = useRef<THREE.PointLight>(null);
  const lanternLightRef2 = useRef<THREE.PointLight>(null);

  // Winding Flagstone Pathway Coordinates (inspired by Reference Photo 1)
  const pathwayStones = useMemo(() => {
    return [
      { x: 0.15, z: 4.8, sx: 0.82, sz: 0.55, rot: 0.08, col: "#DFD2C2" },
      { x: -0.22, z: 3.7, sx: 0.76, sz: 0.52, rot: -0.12, col: "#D6C7B6" },
      { x: 0.28, z: 2.6, sx: 0.88, sz: 0.58, rot: 0.18, col: "#E3D7C8" },
      { x: -0.1, z: 1.5, sx: 0.72, sz: 0.48, rot: -0.06, col: "#D8C9B8" },
      { x: 0.35, z: 0.4, sx: 0.8, sz: 0.54, rot: 0.14, col: "#DDD0C0" },
      { x: 0.08, z: -0.7, sx: 0.74, sz: 0.49, rot: -0.08, col: "#D3C4B4" },
      { x: -0.25, z: -1.8, sx: 0.82, sz: 0.52, rot: 0.16, col: "#DED2C2" },
      { x: 0.1, z: -2.9, sx: 0.75, sz: 0.48, rot: -0.1, col: "#D5C6B5" },
      { x: 0.32, z: -4.0, sx: 0.85, sz: 0.56, rot: 0.12, col: "#E1D5C6" },
      { x: -0.05, z: -5.1, sx: 0.78, sz: 0.5, rot: -0.05, col: "#D7C8B7" },
    ];
  }, []);

  // Mossy natural rock boulders bordering path (inspired by Reference Photo 1)
  const boulders = useMemo(() => {
    return [
      { x: -1.75, y: 0.28, z: 3.2, scale: [0.7, 0.45, 0.6] as [number, number, number], rot: 0.4 },
      { x: 1.85, y: 0.32, z: 2.1, scale: [0.85, 0.5, 0.7] as [number, number, number], rot: -0.3 },
      { x: -2.1, y: 0.35, z: 0.8, scale: [0.9, 0.55, 0.75] as [number, number, number], rot: 0.8 },
      { x: 2.3, y: 0.38, z: -0.5, scale: [0.8, 0.48, 0.65] as [number, number, number], rot: -0.5 },
      { x: -1.9, y: 0.3, z: -3.4, scale: [0.75, 0.42, 0.6] as [number, number, number], rot: 0.2 },
    ];
  }, []);

  // Climbing Rose Clusters draped over pergola (inspired by Reference Photos 2 & 5)
  const climbingRoses = useMemo(() => {
    return [
      // Left vertical trellis cascade
      { x: -1.8, y: 1.1, z: -1.75, color: "#E8C9CA", size: 0.24 },
      { x: -1.65, y: 1.7, z: -1.65, color: "#F7E1E3", size: 0.28 },
      { x: -1.75, y: 2.3, z: -1.8, color: "#E8C9CA", size: 0.26 },
      { x: -1.5, y: 2.8, z: -1.7, color: "#DDA0A4", size: 0.3 },
      // Top overhead archway canopy
      { x: -1.0, y: 3.25, z: -1.85, color: "#F7E1E3", size: 0.32 },
      { x: -0.4, y: 3.4, z: -1.8, color: "#E8C9CA", size: 0.35 },
      { x: 0.2, y: 3.45, z: -1.82, color: "#FDFDF8", size: 0.32 },
      { x: 0.8, y: 3.35, z: -1.8, color: "#E8C9CA", size: 0.34 },
      { x: 1.3, y: 3.15, z: -1.85, color: "#DDA0A4", size: 0.3 },
      // Right vertical trellis cascade
      { x: 1.7, y: 2.7, z: -1.7, color: "#F7E1E3", size: 0.29 },
      { x: 1.85, y: 2.1, z: -1.78, color: "#E8C9CA", size: 0.27 },
      { x: 1.65, y: 1.5, z: -1.65, color: "#DDA0A4", size: 0.25 },
      { x: 1.8, y: 0.9, z: -1.75, color: "#F7E1E3", size: 0.22 },
    ];
  }, []);

  // Lavender & Wildflower Bushes along pathway borders (inspired by Reference Photo 1 & 3)
  const wildflowerBeds = useMemo(() => {
    return [
      // Left border: lavender & pink rhododendrons
      { x: -1.2, z: 4.1, color: "#A89AC8", radius: 0.45, count: 6 },
      { x: -1.4, z: 2.8, color: "#8B7AA8", radius: 0.5, count: 7 },
      { x: -1.3, z: 1.4, color: "#E89AA8", radius: 0.55, count: 8 },
      { x: -1.5, z: -0.2, color: "#A89AC8", radius: 0.48, count: 6 },
      { x: -1.2, z: -1.5, color: "#F0DF9B", radius: 0.42, count: 5 },
      // Right border: golden marigolds, lavender & hydrangeas
      { x: 1.3, z: 3.9, color: "#E5BB58", radius: 0.48, count: 6 },
      { x: 1.4, z: 2.4, color: "#A89AC8", radius: 0.52, count: 7 },
      { x: 1.5, z: 0.8, color: "#8CA2D6", radius: 0.58, count: 8 },
      { x: 1.3, z: -0.5, color: "#E89AA8", radius: 0.5, count: 7 },
      { x: 1.4, z: -2.1, color: "#A89AC8", radius: 0.45, count: 6 },
    ];
  }, []);

  // Smooth environmental interpolation & continuous breeze in useFrame
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Subtle camera parallax following cursor / touch
    const targetX = state.pointer.x * 0.85;
    const targetY = 3.3 + state.pointer.y * 0.38;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.2);
    state.camera.lookAt(0, 1.4, -1.0);

    // 2. Breeze animation on foliage and climbing vines
    if (foliageGroupRef.current) {
      foliageGroupRef.current.children.forEach((child, i) => {
        child.rotation.z = Math.sin(time * 1.4 + i * 0.7) * 0.025;
        child.rotation.x = Math.cos(time * 1.1 + i * 0.5) * 0.015;
      });
    }

    // 3. Smooth lighting interpolation based on active Time-of-Day config
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

    // 4. Subtle breathing flicker for vintage lanterns
    const lanternFlicker = Math.sin(time * 2.5) * 0.12 + Math.cos(time * 3.8) * 0.08;
    const targetLanternIntensity = config.lanternIntensity > 0 ? config.lanternIntensity + lanternFlicker : 0;

    if (lanternLightRef1.current) {
      lanternLightRef1.current.intensity = THREE.MathUtils.lerp(
        lanternLightRef1.current.intensity,
        targetLanternIntensity,
        delta * 3.0
      );
    }
    if (lanternLightRef2.current) {
      lanternLightRef2.current.intensity = THREE.MathUtils.lerp(
        lanternLightRef2.current.intensity,
        targetLanternIntensity,
        delta * 3.0
      );
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Dynamic Fog blending into paper canvas */}
      <fog attach="fog" args={[config.fogColor, config.fogNear, config.fogFar]} />

      {/* Dynamic Lighting System */}
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={32}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.0004}
      />

      {/* Volumetric Sunbeam Shaft (subtle diagonal god-ray) */}
      <mesh
        position={[2.5, 3.8, -1.5]}
        rotation={[0.3, 0.4, -0.6]}
        castShadow={false}
      >
        <cylinderGeometry args={[0.6, 2.8, 8, 12, 1, true]} />
        <meshBasicMaterial
          color={config.sunColor}
          transparent
          opacity={config.sunIntensity > 1.0 ? 0.09 : 0.02}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Living Butterflies System (Daylight active, resting at night) */}
      <LivingButterflies activityLevel={config.butterflyActivity} />

      {/* Night / Golden Hour Fireflies */}
      <GardenFireflies count={config.fireflyCount} />

      {/* Floating Storybook Petals System */}
      <FloatingPetals count={48} speed={0.42} />

      {/* 1. Lush Rolling Meadow Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <planeGeometry args={[36, 36, 20, 20]} />
        <meshStandardMaterial
          color="#8BA177"
          roughness={0.9}
          metalness={0.02}
        />
      </mesh>

      {/* 2. Naturally Winding Flagstone Pathway (Reference Photo 1) */}
      <group>
        {pathwayStones.map((st, i) => (
          <mesh
            key={i}
            position={[st.x, 0.02, st.z]}
            rotation={[-Math.PI / 2, 0, st.rot]}
            receiveShadow
          >
            {/* Organic rounded stepping stone */}
            <cylinderGeometry args={[st.sx, st.sx, 0.045, 14]} />
            <meshStandardMaterial
              color={st.col}
              roughness={0.88}
              metalness={0.04}
            />
          </mesh>
        ))}
      </group>

      {/* 3. Mossy Stone Boulders (Reference Photo 1) */}
      <group>
        {boulders.map((b, i) => (
          <mesh
            key={i}
            position={[b.x, b.y, b.z]}
            rotation={[0, b.rot, 0]}
            scale={b.scale}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#8E8578" roughness={0.92} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* 4. Wooden Garden Arbor & Pergola (Reference Photos 2 & 5) */}
      <group position={[0, 0, -2]}>
        {/* Main Timber Posts */}
        <mesh position={[-1.75, 1.6, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 3.2, 0.2]} />
          <meshStandardMaterial color="#554238" roughness={0.82} />
        </mesh>
        <mesh position={[-1.75, 1.6, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 3.2, 0.2]} />
          <meshStandardMaterial color="#554238" roughness={0.82} />
        </mesh>
        <mesh position={[1.75, 1.6, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 3.2, 0.2]} />
          <meshStandardMaterial color="#554238" roughness={0.82} />
        </mesh>
        <mesh position={[1.75, 1.6, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 3.2, 0.2]} />
          <meshStandardMaterial color="#554238" roughness={0.82} />
        </mesh>

        {/* Side Lattice Panels */}
        <mesh position={[-1.75, 1.6, 0.1]} castShadow>
          <boxGeometry args={[0.04, 2.4, 0.45]} />
          <meshStandardMaterial color="#6B5548" roughness={0.8} />
        </mesh>
        <mesh position={[1.75, 1.6, 0.1]} castShadow>
          <boxGeometry args={[0.04, 2.4, 0.45]} />
          <meshStandardMaterial color="#6B5548" roughness={0.8} />
        </mesh>

        {/* Arched Top Canopy & Cross-Beams */}
        <mesh position={[0, 3.25, 0.1]} castShadow>
          <boxGeometry args={[4.0, 0.12, 0.9]} />
          <meshStandardMaterial color="#554238" roughness={0.82} />
        </mesh>
        {/* Overhead Pergola Rafters */}
        {[-1.5, -0.9, -0.3, 0.3, 0.9, 1.5].map((rx, idx) => (
          <mesh key={idx} position={[rx, 3.35, 0.1]} castShadow>
            <boxGeometry args={[0.1, 0.12, 1.2]} />
            <meshStandardMaterial color="#604A3F" roughness={0.8} />
          </mesh>
        ))}

        {/* Romantic Wooden Slatted Garden Bench (Reference Photo 5) */}
        <group position={[0, 0.45, -0.5]}>
          {/* Bench Seat Slats */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.7, 0.05, 0.45]} />
            <meshStandardMaterial color="#E8DBC9" roughness={0.75} />
          </mesh>
          {/* Bench Backrest */}
          <mesh position={[0, 0.35, -0.2]} rotation={[-0.1, 0, 0]} castShadow>
            <boxGeometry args={[1.7, 0.5, 0.05]} />
            <meshStandardMaterial color="#E8DBC9" roughness={0.75} />
          </mesh>
          {/* Bench Legs */}
          <mesh position={[-0.75, -0.22, 0.15]} castShadow>
            <boxGeometry args={[0.07, 0.45, 0.07]} />
            <meshStandardMaterial color="#554238" />
          </mesh>
          <mesh position={[0.75, -0.22, 0.15]} castShadow>
            <boxGeometry args={[0.07, 0.45, 0.07]} />
            <meshStandardMaterial color="#554238" />
          </mesh>
          <mesh position={[-0.75, -0.22, -0.15]} castShadow>
            <boxGeometry args={[0.07, 0.45, 0.07]} />
            <meshStandardMaterial color="#554238" />
          </mesh>
          <mesh position={[0.75, -0.22, -0.15]} castShadow>
            <boxGeometry args={[0.07, 0.45, 0.07]} />
            <meshStandardMaterial color="#554238" />
          </mesh>
        </group>
      </group>

      {/* 5. Cascading Climbing Roses on Pergola (Reference Photos 2 & 5) */}
      <group>
        {climbingRoses.map((cr, idx) => (
          <mesh key={idx} position={[cr.x, cr.y, cr.z]} castShadow>
            <sphereGeometry args={[cr.size, 10, 8]} />
            <meshStandardMaterial
              color={cr.color}
              roughness={0.55}
              metalness={0.02}
            />
          </mesh>
        ))}
      </group>

      {/* 6. Wildflower Beds & Lavender Spikes (Reference Photos 1, 3, 4) */}
      <group>
        {wildflowerBeds.map((bed, idx) => (
          <group key={idx} position={[bed.x, 0, bed.z]}>
            {/* Bush foliage base */}
            <mesh position={[0, 0.28, 0]} castShadow>
              <sphereGeometry args={[bed.radius, 9, 8]} />
              <meshStandardMaterial color="#6A8058" roughness={0.88} />
            </mesh>
            {/* Flower blossoms */}
            {Array.from({ length: bed.count }).map((_, fIdx) => {
              const ang = (fIdx / bed.count) * Math.PI * 2;
              const fx = Math.cos(ang) * (bed.radius * 0.75);
              const fz = Math.sin(ang) * (bed.radius * 0.75);
              return (
                <mesh
                  key={fIdx}
                  position={[fx, 0.35 + (fIdx % 3) * 0.08, fz]}
                  castShadow
                >
                  <sphereGeometry args={[0.11, 7, 6]} />
                  <meshStandardMaterial color={bed.color} roughness={0.65} />
                </mesh>
              );
            })}
          </group>
        ))}
      </group>

      {/* 7. Organic Canopy Trees with Branching Silhouette (Reference Photos 1 & 4) */}
      <group ref={foliageGroupRef}>
        {/* Left Mature Oak / Willow */}
        <group position={[-4.2, 0, -3.8]}>
          {/* Main Curved Trunk */}
          <mesh position={[0, 2.2, 0]} rotation={[0, 0, -0.08]} castShadow>
            <cylinderGeometry args={[0.26, 0.44, 4.4, 10]} />
            <meshStandardMaterial color="#4A3931" roughness={0.9} />
          </mesh>
          {/* Branch Splits */}
          <mesh position={[0.7, 3.8, 0.2]} rotation={[0, 0, -0.55]} castShadow>
            <cylinderGeometry args={[0.16, 0.24, 2.2, 8]} />
            <meshStandardMaterial color="#4A3931" roughness={0.9} />
          </mesh>
          <mesh position={[-0.8, 3.6, -0.3]} rotation={[0, 0, 0.45]} castShadow>
            <cylinderGeometry args={[0.15, 0.22, 2.0, 8]} />
            <meshStandardMaterial color="#4A3931" roughness={0.9} />
          </mesh>
          {/* Clustered Foliage Volumes */}
          <mesh position={[0.9, 4.6, 0.3]} castShadow>
            <sphereGeometry args={[1.7, 12, 10]} />
            <meshStandardMaterial color="#6B8059" roughness={0.82} />
          </mesh>
          <mesh position={[-0.7, 4.3, -0.2]} castShadow>
            <sphereGeometry args={[1.5, 12, 10]} />
            <meshStandardMaterial color="#7E946A" roughness={0.82} />
          </mesh>
          <mesh position={[0.1, 4.9, 0]} castShadow>
            <sphereGeometry args={[1.6, 12, 10]} />
            <meshStandardMaterial color="#5C704C" roughness={0.82} />
          </mesh>
        </group>

        {/* Right Canopy Tree */}
        <group position={[4.4, 0, -4.2]}>
          <mesh position={[0, 2.4, 0]} rotation={[0, 0, 0.09]} castShadow>
            <cylinderGeometry args={[0.28, 0.46, 4.8, 10]} />
            <meshStandardMaterial color="#4A3931" roughness={0.9} />
          </mesh>
          <mesh position={[-0.7, 4.1, 0.2]} rotation={[0, 0, 0.5]} castShadow>
            <cylinderGeometry args={[0.17, 0.25, 2.4, 8]} />
            <meshStandardMaterial color="#4A3931" roughness={0.9} />
          </mesh>
          <mesh position={[0.6, 4.8, 0]} castShadow>
            <sphereGeometry args={[1.8, 12, 10]} />
            <meshStandardMaterial color="#7E946A" roughness={0.82} />
          </mesh>
          <mesh position={[-0.9, 4.6, 0.3]} castShadow>
            <sphereGeometry args={[1.6, 12, 10]} />
            <meshStandardMaterial color="#6B8059" roughness={0.82} />
          </mesh>
        </group>
      </group>

      {/* 8. Vintage Wrought-Iron Lanterns with Breathing Illumination */}
      <group position={[-1.75, 0, -1.6]}>
        <mesh position={[0, 1.8, 0.25]} castShadow>
          <boxGeometry args={[0.22, 0.36, 0.22]} />
          <meshStandardMaterial color="#2B1F19" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* Luminous bulb */}
        <mesh position={[0, 1.8, 0.25]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color="#FFEEC7" />
        </mesh>
        <pointLight
          ref={lanternLightRef1}
          position={[0, 1.8, 0.25]}
          color={config.lanternColor}
          intensity={config.lanternIntensity}
          distance={6.0}
          decay={2}
        />
      </group>

      <group position={[1.75, 0, -1.6]}>
        <mesh position={[0, 1.8, 0.25]} castShadow>
          <boxGeometry args={[0.22, 0.36, 0.22]} />
          <meshStandardMaterial color="#2B1F19" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, 1.8, 0.25]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color="#FFEEC7" />
        </mesh>
        <pointLight
          ref={lanternLightRef2}
          position={[0, 1.8, 0.25]}
          color={config.lanternColor}
          intensity={config.lanternIntensity}
          distance={6.0}
          decay={2}
        />
      </group>
    </group>
  );
};
