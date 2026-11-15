"use client";

import React from "react";

interface SceneLightingProps {
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({
  fogColor = "#FAF5ED",
  fogNear = 10,
  fogFar = 32,
}) => {
  return (
    <>
      {/* Warm distance atmospheric fog blending seamlessly into paper canvas */}
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />

      {/* Gentle ambient fill */}
      <ambientLight color="#FAF5ED" intensity={0.7} />

      {/* Sky and Ground subtle tint */}
      <hemisphereLight
        args={["#F8E7E7", "#D4DEC9", 0.6]}
      />

      {/* Warm Golden Sunlight */}
      <directionalLight
        position={[7, 12, 6]}
        intensity={1.4}
        color="#FFE6BA"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />
    </>
  );
};
