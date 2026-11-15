"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { WebGLFallback } from "./WebGLFallback";

interface StorybookCanvasProps {
  children: React.ReactNode;
  className?: string;
  fallbackMessage?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

// Synchronous WebGL capability check to avoid stuck loading states
function checkWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => {};

export const StorybookCanvas: React.FC<StorybookCanvasProps> = ({
  children,
  className = "w-full h-full",
  fallbackMessage = "A serene storybook glimpse of the enchanted sanctuary.",
  cameraPosition = [0, 3.2, 8.5],
  cameraFov = 42,
}) => {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // If on server, render clean placeholder
  if (!isClient) {
    return <div className={`relative ${className} bg-parchment-100/50`} />;
  }

  // If client lacks WebGL, show graceful watercolor fallback
  if (!checkWebGL()) {
    return <WebGLFallback message={fallbackMessage} className={className} />;
  }

  return (
    <div className={`relative ${className} select-none overflow-hidden`}>
      <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
        <Canvas
          shadows={{ type: THREE.PCFSoftShadowMap }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 1.75)]}
          camera={{ position: cameraPosition, fov: cameraFov }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
          }}
          className="touch-none w-full h-full"
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default StorybookCanvas;
