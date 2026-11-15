"use client";

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { GardenBackgroundScene } from "./GardenBackgroundScene";
import { useGardenTimeOfDay, AtmosphereMode } from "@/hooks/useGardenTimeOfDay";
import {
  Clock,
  RotateCcw,
  Sunrise,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";

export const GardenBackgroundCanvas: React.FC = () => {
  const {
    mode,
    setMode,
    activeTimeOfDay,
    config,
    localTimeString,
    isAutomatic,
  } = useGardenTimeOfDay();

  const atmosphereOptions: { id: AtmosphereMode; label: string; icon: React.ElementType }[] = [
    { id: "morning", label: "Morning", icon: Sunrise },
    { id: "afternoon", label: "Afternoon", icon: Sun },
    { id: "golden_hour", label: "Golden Hour", icon: Sunset },
    { id: "night", label: "Night", icon: Moon },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0">
      {/* 3D WebGL Canvas filling the full hero section */}
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 2.0, 7.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <GardenBackgroundScene config={config} />
        </Suspense>
      </Canvas>

      {/* Floating Atmosphere & Local Clock Control Pill (Top Right, comfortably below Floating Header) */}
      <div className="absolute top-20 sm:top-24 right-3 sm:right-6 z-30 flex items-center gap-1.5 sm:gap-2 bg-alabaster/90 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-gold/40 shadow-storybook text-xs">
        {/* Live Clock & State Tag */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-gold/25">
          <Clock className="w-3.5 h-3.5 text-gold-deep" />
          <span className="font-medium text-cocoa font-mono text-[11px]">
            {localTimeString || "Live"}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              activeTimeOfDay === "night"
                ? "bg-celestial-gold"
                : activeTimeOfDay === "golden_hour"
                ? "bg-amber-500"
                : "bg-sage-deep"
            } animate-pulse ml-0.5`}
          />
          <span className="hidden md:inline font-serif italic text-cocoa-light text-[11px]">
            {config.label}
          </span>
        </div>

        {/* Atmosphere Selector Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMode("auto")}
            title="Automatically track real-time local atmosphere"
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all duration-200 flex items-center gap-1 ${
              isAutomatic
                ? "bg-cocoa text-alabaster shadow-xs"
                : "text-cocoa-light hover:text-cocoa"
            }`}
          >
            <RotateCcw className="w-3 h-3 text-gold" />
            <span>Auto</span>
          </button>

          {atmosphereOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = !isAutomatic && mode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMode(opt.id)}
                title={`Preview ${opt.label} atmosphere`}
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all duration-200 flex items-center gap-1 ${
                  isSelected
                    ? "bg-cocoa text-alabaster shadow-xs"
                    : "text-cocoa-light hover:text-cocoa"
                }`}
              >
                <Icon className="w-3 h-3 text-gold" />
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GardenBackgroundCanvas;
