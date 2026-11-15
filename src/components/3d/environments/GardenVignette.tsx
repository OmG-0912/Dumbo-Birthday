"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { SceneLighting } from "../core/SceneLighting";
import { FloatingPetals } from "../effects/FloatingPetals";

export const GardenVignette: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const lanternLightRef1 = useRef<THREE.PointLight>(null);
  const lanternLightRef2 = useRef<THREE.PointLight>(null);

  // Cobblestone stepping stones coordinates for winding path
  const stones = useMemo(() => {
    return [
      { x: 0.1, z: 3.5, rx: 0.6, rz: 0.45, rot: 0.1 },
      { x: -0.2, z: 2.3, rx: 0.55, rz: 0.4, rot: -0.15 },
      { x: 0.15, z: 1.2, rx: 0.65, rz: 0.45, rot: 0.2 },
      { x: -0.1, z: 0.1, rx: 0.5, rz: 0.38, rot: -0.1 },
      { x: 0.2, z: -1.0, rx: 0.6, rz: 0.42, rot: 0.12 },
      { x: 0.05, z: -2.1, rx: 0.52, rz: 0.36, rot: -0.08 },
      { x: -0.15, z: -3.2, rx: 0.58, rz: 0.4, rot: 0.15 },
    ];
  }, []);

  // Flowering rose clusters along the archway & borders
  const flowerClusters = useMemo(() => {
    return [
      { x: -1.6, y: 1.2, z: -1.8, color: "#E8C9CA", size: 0.24 },
      { x: -1.4, y: 2.1, z: -1.7, color: "#F3D8DA", size: 0.28 },
      { x: -0.8, y: 2.8, z: -1.9, color: "#E8C9CA", size: 0.26 },
      { x: 0.8, y: 2.8, z: -1.9, color: "#DFCA9E", size: 0.25 },
      { x: 1.5, y: 2.0, z: -1.7, color: "#E8C9CA", size: 0.27 },
      { x: 1.6, y: 1.1, z: -1.8, color: "#F3D8DA", size: 0.23 },
      // Foreground garden bush roses
      { x: -2.3, y: 0.6, z: 1.2, color: "#E8C9CA", size: 0.22 },
      { x: -2.1, y: 0.7, z: 0.8, color: "#F3D8DA", size: 0.2 },
      { x: 2.4, y: 0.6, z: 0.9, color: "#DFCA9E", size: 0.22 },
      { x: 2.2, y: 0.7, z: 1.4, color: "#E8C9CA", size: 0.2 },
    ];
  }, []);

  useFrame((state, delta) => {
    // Parallax camera lerp
    const targetX = state.pointer.x * 0.9;
    const targetY = 3.2 + state.pointer.y * 0.4;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.5);
    state.camera.lookAt(0, 1.2, -0.5);

    // Subtle breathing lantern intensity
    const time = state.clock.getElapsedTime();
    if (lanternLightRef1.current) {
      lanternLightRef1.current.intensity = 1.1 + Math.sin(time * 2.2) * 0.15;
    }
    if (lanternLightRef2.current) {
      lanternLightRef2.current.intensity = 1.1 + Math.cos(time * 2.0) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Scene Atmospheric Lighting & Paper Fog */}
      <SceneLighting fogColor="#FAF5ED" fogNear={8} fogFar={28} />

      {/* 2. Floating Storybook Petals System */}
      <FloatingPetals count={50} speed={0.45} />

      {/* 3. Rolling Meadow Terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[30, 30, 16, 16]} />
        <meshStandardMaterial color="#9EB092" roughness={0.9} metalness={0.02} />
      </mesh>

      {/* 4. Cobblestone Winding Path */}
      <group>
        {stones.map((st, i) => (
          <mesh
            key={i}
            position={[st.x, 0.02, st.z]}
            rotation={[-Math.PI / 2, 0, st.rot]}
            receiveShadow
          >
            <cylinderGeometry args={[st.rx, st.rx, 0.04, 12]} />
            <meshStandardMaterial color="#DDD0C0" roughness={0.85} metalness={0.05} />
          </mesh>
        ))}
      </group>

      {/* 5. Garden Trellis / Rose Archway */}
      <group position={[0, 0, -2]}>
        {/* Left post */}
        <mesh position={[-1.6, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.07, 0.08, 3, 10]} />
          <meshStandardMaterial color="#604A42" roughness={0.8} />
        </mesh>
        {/* Right post */}
        <mesh position={[1.6, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.07, 0.08, 3, 10]} />
          <meshStandardMaterial color="#604A42" roughness={0.8} />
        </mesh>
        {/* Arched beam */}
        <mesh position={[0, 2.9, 0]} rotation={[0, 0, 0]} castShadow>
          <torusGeometry args={[1.6, 0.07, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#604A42" roughness={0.8} />
        </mesh>
        {/* Climbing vines */}
        <mesh position={[-1.5, 1.6, 0.05]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, 2.6, 8]} />
          <meshStandardMaterial color="#7A896D" roughness={0.7} />
        </mesh>
        <mesh position={[1.5, 1.6, 0.05]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, 2.6, 8]} />
          <meshStandardMaterial color="#7A896D" roughness={0.7} />
        </mesh>
      </group>

      {/* 6. Flowering Roses on Arch & Borders */}
      <group>
        {flowerClusters.map((fl, idx) => (
          <mesh key={idx} position={[fl.x, fl.y, fl.z]} castShadow>
            <sphereGeometry args={[fl.size, 10, 8]} />
            <meshStandardMaterial color={fl.color} roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* 7. Storybook Willow & Shrub Foliage */}
      {/* Left Tree */}
      <group position={[-3.8, 0, -3.2]}>
        <mesh position={[0, 2, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.35, 4, 10]} />
          <meshStandardMaterial color="#55413A" roughness={0.85} />
        </mesh>
        {/* Foliage canopies */}
        <mesh position={[0.2, 3.8, 0]} castShadow>
          <sphereGeometry args={[1.5, 12, 10]} />
          <meshStandardMaterial color="#7A896D" roughness={0.8} />
        </mesh>
        <mesh position={[-0.5, 3.4, 0.4]} castShadow>
          <sphereGeometry args={[1.2, 12, 10]} />
          <meshStandardMaterial color="#8EA180" roughness={0.8} />
        </mesh>
        <mesh position={[0.6, 3.2, -0.3]} castShadow>
          <sphereGeometry args={[1.1, 12, 10]} />
          <meshStandardMaterial color="#6A7A5D" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Tree */}
      <group position={[3.6, 0, -3.8]}>
        <mesh position={[0, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.38, 4.4, 10]} />
          <meshStandardMaterial color="#55413A" roughness={0.85} />
        </mesh>
        <mesh position={[0, 4.1, 0]} castShadow>
          <sphereGeometry args={[1.6, 12, 10]} />
          <meshStandardMaterial color="#8EA180" roughness={0.8} />
        </mesh>
        <mesh position={[-0.5, 3.5, 0.3]} castShadow>
          <sphereGeometry args={[1.3, 12, 10]} />
          <meshStandardMaterial color="#7A896D" roughness={0.8} />
        </mesh>
      </group>

      {/* Foreground Foliage Bushes */}
      <mesh position={[-2.4, 0.4, 1.0]} castShadow>
        <sphereGeometry args={[0.7, 10, 8]} />
        <meshStandardMaterial color="#8EA180" roughness={0.85} />
      </mesh>
      <mesh position={[2.5, 0.4, 1.1]} castShadow>
        <sphereGeometry args={[0.75, 10, 8]} />
        <meshStandardMaterial color="#7A896D" roughness={0.85} />
      </mesh>

      {/* 8. Wrought-Iron Garden Lanterns with Warm Point Lights */}
      {/* Left Lantern */}
      <group position={[-1.7, 0, 0.6]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 1.6, 8]} />
          <meshStandardMaterial color="#3D2E28" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Lantern Cage */}
        <mesh position={[0, 1.65, 0]} castShadow>
          <boxGeometry args={[0.24, 0.32, 0.24]} />
          <meshStandardMaterial color="#C5A16B" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Glowing bulb */}
        <mesh position={[0, 1.65, 0]}>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshBasicMaterial color="#FFF1CC" />
        </mesh>
        <pointLight
          ref={lanternLightRef1}
          position={[0, 1.65, 0]}
          color="#FFE2A3"
          intensity={1.2}
          distance={5.5}
          decay={2}
        />
      </group>

      {/* Right Lantern */}
      <group position={[1.7, 0, 0.6]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 1.6, 8]} />
          <meshStandardMaterial color="#3D2E28" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.65, 0]} castShadow>
          <boxGeometry args={[0.24, 0.32, 0.24]} />
          <meshStandardMaterial color="#C5A16B" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.65, 0]}>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshBasicMaterial color="#FFF1CC" />
        </mesh>
        <pointLight
          ref={lanternLightRef2}
          position={[0, 1.65, 0]}
          color="#FFE2A3"
          intensity={1.2}
          distance={5.5}
          decay={2}
        />
      </group>
    </group>
  );
};
