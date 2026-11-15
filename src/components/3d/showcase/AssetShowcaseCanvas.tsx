"use client";

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { AssetShowcaseScene, AssetFocusTarget, LightingPreset, RenderMode } from "./AssetShowcaseScene";

interface AssetShowcaseCanvasProps {
  focusTarget: AssetFocusTarget;
  lightingPreset: LightingPreset;
  renderMode: RenderMode;
  onSelectTarget: (target: AssetFocusTarget) => void;
}

const ShowcaseLoader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/70 backdrop-blur-md z-30 pointer-events-none">
      <div className="w-12 h-12 border-2 border-amber-300/30 border-t-amber-400 rounded-full animate-spin mb-4" />
      <p className="text-sm tracking-widest uppercase font-serif text-amber-200/90">
        Streaming Photogrammetry Assets...
      </p>
      <p className="text-xs text-stone-400 mt-1">Tree • Bush • 3D Flowers • Bench • Cotswold Pathway</p>
    </div>
  );
};

export const AssetShowcaseCanvas: React.FC<AssetShowcaseCanvasProps> = ({
  focusTarget,
  lightingPreset,
  renderMode,
  onSelectTarget,
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 4.5, 7.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <AssetShowcaseScene
            focusTarget={focusTarget}
            lightingPreset={lightingPreset}
            renderMode={renderMode}
            onSelectTarget={onSelectTarget}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AssetShowcaseCanvas;
