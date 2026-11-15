"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface FloatingPetalsProps {
  count?: number;
  speed?: number;
  areaWidth?: number;
  areaDepth?: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  count = 55,
  speed = 0.5,
  areaWidth = 14,
  areaDepth = 12,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Geometry: delicate slightly curved petal
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.18, 0.26, 3, 3);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      // Subtle concave curvature
      pos.setZ(i, Math.sin((y + 0.13) * Math.PI) * 0.04);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Color palette: delicate blush, soft rose and warm golden petals
  const colors = useMemo(() => {
    const palette = [
      new THREE.Color("#E8C9CA"),
      new THREE.Color("#F3D8DA"),
      new THREE.Color("#E2B8BB"),
      new THREE.Color("#DFCA9E"),
    ];
    return palette;
  }, []);

  // Per-instance initial particle states
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * areaWidth,
        y: Math.random() * 8 - 1,
        z: (Math.random() - 0.5) * areaDepth,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        rotSpeedX: (Math.random() - 0.5) * 1.5,
        rotSpeedY: (Math.random() - 0.5) * 1.5,
        rotSpeedZ: (Math.random() - 0.5) * 1.2,
        fallSpeed: 0.25 + Math.random() * 0.35,
        oscillationSpeed: 1 + Math.random() * 1.5,
        oscillationOffset: Math.random() * Math.PI * 2,
        scale: 0.7 + Math.random() * 0.6,
        colorIndex: Math.floor(Math.random() * colors.length),
      });
    }
    return temp;
  }, [count, areaWidth, areaDepth, colors.length]);

  // Set initial colors on the instanced mesh
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(i, colors[particles[i].colorIndex]);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count, colors, particles]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const actualSpeed = reducedMotion ? 0.05 : speed;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Downward drift with wind sway
      p.y -= p.fallSpeed * delta * actualSpeed;
      p.x += Math.sin(time * p.oscillationSpeed + p.oscillationOffset) * 0.006 * actualSpeed;
      p.z += Math.cos(time * p.oscillationSpeed * 0.8 + p.oscillationOffset) * 0.005 * actualSpeed;

      // Rotation tumble
      p.rotX += p.rotSpeedX * delta * actualSpeed;
      p.rotY += p.rotSpeedY * delta * actualSpeed;
      p.rotZ += p.rotSpeedZ * delta * actualSpeed;

      // Wrap-around boundary
      if (p.y < -1.2) {
        p.y = 7;
        p.x = (Math.random() - 0.5) * areaWidth;
        p.z = (Math.random() - 0.5) * areaDepth;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <meshStandardMaterial
        side={THREE.DoubleSide}
        roughness={0.7}
        metalness={0.05}
        transparent
        opacity={0.88}
      />
    </instancedMesh>
  );
};
