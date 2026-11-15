"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface LivingButterfliesProps {
  activityLevel?: number; // 0 (hidden/asleep) to 1 (full daylight activity)
}

interface ButterflyInstance {
  basePosition: [number, number, number];
  color: string;
  accentColor: string;
  size: number;
  flapSpeed: number;
  flightRadiusX: number;
  flightRadiusZ: number;
  heightVariation: number;
  speed: number;
  timeOffset: number;
  perchTime: number;
  perchPosition: [number, number, number];
}

// Single Butterfly with realistic flapping wings attached to an organic flight path
const Butterfly: React.FC<{
  config: ButterflyInstance;
  activityLevel: number;
  index: number;
}> = ({ config, activityLevel, index }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  // Wing geometry: delicate tear-drop butterfly wing shape with curved edge
  const wingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.1, 0.25, 0.35, 0.45, 0.45, 0.3);
    shape.bezierCurveTo(0.55, 0.15, 0.4, -0.1, 0.25, -0.25);
    shape.bezierCurveTo(0.15, -0.35, 0.05, -0.15, 0, 0);

    const geom = new THREE.ShapeGeometry(shape, 8);
    geom.center();
    // Offset pivot so rotation happens strictly along the inner hinge
    geom.translate(0.22, 0, 0);
    return geom;
  }, []);

  // Soft wing materials with delicate alpha translucency
  const wingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.color),
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });
  }, [config.color]);

  const bodyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#3D2E28",
      roughness: 0.9,
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !leftWingRef.current || !rightWingRef.current) return;

    // Scale visibility according to day-night activity
    const targetScale = config.size * Math.max(0.001, activityLevel);
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 2
    );

    // If completely inactive at night, park the butterfly quietly
    if (activityLevel < 0.05) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    const t = state.clock.getElapsedTime() * config.speed + config.timeOffset;

    // Realistic burst flapping: cycle between active flutter and glide
    const flapCycle = Math.sin(t * 1.5);
    const isGliding = flapCycle > 0.65;
    const flapFrequency = isGliding ? 2.5 : config.flapSpeed;
    const flapAmount = Math.sin(t * flapFrequency);

    // Flap wings symmetrically along hinge
    const maxFlap = isGliding ? 0.35 : 1.15;
    leftWingRef.current.rotation.y = -flapAmount * maxFlap;
    rightWingRef.current.rotation.y = flapAmount * maxFlap;

    // Gentle body bobbing with flap
    leftWingRef.current.rotation.z = Math.sin(t * 0.8) * 0.1;
    rightWingRef.current.rotation.z = -Math.sin(t * 0.8) * 0.1;

    // Organic 3D flight trajectory: Lissajous flower-visiting paths
    const posX =
      config.basePosition[0] +
      Math.sin(t) * config.flightRadiusX +
      Math.sin(t * 2.3 + index) * 0.6;
    const posY =
      config.basePosition[1] +
      Math.sin(t * 1.8 + config.timeOffset) * config.heightVariation +
      Math.cos(t * 0.7) * 0.3;
    const posZ =
      config.basePosition[2] +
      Math.cos(t * 0.85) * config.flightRadiusZ +
      Math.cos(t * 1.7) * 0.5;

    // Calculate forward heading / tangent for realistic banking into turns
    const nextPosX =
      config.basePosition[0] +
      Math.sin(t + 0.05) * config.flightRadiusX +
      Math.sin((t + 0.05) * 2.3 + index) * 0.6;
    const nextPosZ =
      config.basePosition[2] +
      Math.cos((t + 0.05) * 0.85) * config.flightRadiusZ +
      Math.cos((t + 0.05) * 1.7) * 0.5;

    const angleY = Math.atan2(nextPosX - posX, nextPosZ - posZ);

    groupRef.current.position.set(posX, posY, posZ);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      angleY,
      delta * 4
    );
    // Natural banking roll when turning
    const turnRate = angleY - groupRef.current.rotation.y;
    groupRef.current.rotation.z = THREE.MathUtils.clamp(turnRate * 1.2, -0.35, 0.35);
  });

  return (
    <group ref={groupRef} position={config.basePosition}>
      {/* Tiny butterfly body (thorax & abdomen) */}
      <mesh material={bodyMaterial} scale={[0.04, 0.16, 0.04]}>
        <capsuleGeometry args={[1, 1, 4, 8]} />
      </mesh>

      {/* Left Wing Group (hinged at x = 0) */}
      <group ref={leftWingRef} position={[-0.01, 0, 0]}>
        <mesh
          geometry={wingGeometry}
          material={wingMaterial}
          rotation={[0.1, 0, 0]}
          castShadow={false}
        />
      </group>

      {/* Right Wing Group (hinged at x = 0, mirrored) */}
      <group ref={rightWingRef} position={[0.01, 0, 0]} scale={[-1, 1, 1]}>
        <mesh
          geometry={wingGeometry}
          material={wingMaterial}
          rotation={[0.1, 0, 0]}
          castShadow={false}
        />
      </group>
    </group>
  );
};

export const LivingButterflies: React.FC<LivingButterfliesProps> = ({
  activityLevel = 1.0,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  // 4 distinctly designed storybook butterflies
  const butterflyConfigs: ButterflyInstance[] = useMemo(
    () => [
      {
        // Pale Primrose Swallowtail - wanders near left lavender & foreground path
        basePosition: [-1.8, 1.4, 1.2],
        color: "#FFF4C2",
        accentColor: "#E2BA65",
        size: 0.55,
        flapSpeed: 14,
        flightRadiusX: 1.4,
        flightRadiusZ: 1.6,
        heightVariation: 0.45,
        speed: 0.75,
        timeOffset: 0.2,
        perchTime: 3.0,
        perchPosition: [-2.1, 0.8, 1.0],
      },
      {
        // Dusty Blush & Muted Peach - dances near climbing rose trellis archway
        basePosition: [0.3, 2.2, -1.6],
        color: "#F6D2D4",
        accentColor: "#DF9A9F",
        size: 0.6,
        flapSpeed: 16,
        flightRadiusX: 1.7,
        flightRadiusZ: 1.2,
        heightVariation: 0.6,
        speed: 0.68,
        timeOffset: 2.4,
        perchTime: 4.2,
        perchPosition: [0.8, 2.6, -1.8],
      },
      {
        // Soft Pearl White Pieris - glides along the center stone pathway and towards camera
        basePosition: [0.1, 1.6, 2.0],
        color: "#FDFDF8",
        accentColor: "#DFCA9E",
        size: 0.48,
        flapSpeed: 18,
        flightRadiusX: 1.5,
        flightRadiusZ: 2.2,
        heightVariation: 0.5,
        speed: 0.82,
        timeOffset: 4.8,
        perchTime: 2.5,
        perchPosition: [0.15, 0.4, 2.3],
      },
      {
        // Warm Amber / Marigold Wanderer - flutters around right shrubs & bench
        basePosition: [1.9, 1.3, 0.5],
        color: "#F9DEB5",
        accentColor: "#DDA463",
        size: 0.52,
        flapSpeed: 15,
        flightRadiusX: 1.6,
        flightRadiusZ: 1.5,
        heightVariation: 0.4,
        speed: 0.72,
        timeOffset: 7.1,
        perchTime: 3.8,
        perchPosition: [2.2, 0.7, 0.9],
      },
    ],
    []
  );

  if (reducedMotion || activityLevel <= 0.02) {
    return null;
  }

  return (
    <group>
      {butterflyConfigs.map((cfg, i) => (
        <Butterfly
          key={i}
          config={cfg}
          activityLevel={activityLevel}
          index={i}
        />
      ))}
    </group>
  );
};
