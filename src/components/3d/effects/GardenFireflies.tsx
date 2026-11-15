"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface GardenFirefliesProps {
  count?: number;
}

export const GardenFireflies: React.FC<GardenFirefliesProps> = ({ count = 24 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Instanced geometry: tiny soft sphere with glow
  const fireflyGeometry = useMemo(() => new THREE.SphereGeometry(0.045, 6, 6), []);
  const fireflyMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#EBFCA5"),
        transparent: true,
        opacity: 0.92,
      }),
    []
  );

  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        x: (Math.random() - 0.5) * 8.5,
        y: 0.4 + Math.random() * 2.8,
        z: (Math.random() - 0.5) * 8.0,
        speedX: 0.2 + Math.random() * 0.4,
        speedY: 0.3 + Math.random() * 0.5,
        speedZ: 0.2 + Math.random() * 0.4,
        pulseFreq: 1.5 + Math.random() * 2.5,
        offset: Math.random() * Math.PI * 2,
        baseScale: 0.8 + Math.random() * 0.7,
      });
    }
    return list;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current || count === 0) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Organic hovering drift
      const currentX = p.x + Math.sin(time * p.speedX + p.offset) * 0.35;
      const currentY = p.y + Math.sin(time * p.speedY + p.offset) * 0.25;
      const currentZ = p.z + Math.cos(time * p.speedZ + p.offset) * 0.35;

      // Breathing glow pulse
      const pulse = Math.sin(time * p.pulseFreq + p.offset);
      const scale = Math.max(0.05, p.baseScale * (0.4 + Math.max(0, pulse) * 0.85));

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[fireflyGeometry, fireflyMaterial, count]}
      castShadow={false}
      receiveShadow={false}
    />
  );
};
