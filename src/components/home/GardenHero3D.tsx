"use client";

import React, { useState } from "react";
import { StorybookCanvas } from "../3d/core/StorybookCanvas";
import { LivingGardenScene } from "../3d/environments/LivingGardenScene";
import { WatercolorGardenView } from "./WatercolorGardenView";
import { useGardenTimeOfDay, AtmosphereMode } from "@/hooks/useGardenTimeOfDay";
import {
  Sparkles,
  Eye,
  Compass,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Clock,
  RotateCcw,
} from "lucide-react";

export const GardenHero3D: React.FC = () => {
  const [viewMode, setViewMode] = useState<"3d" | "watercolor">("3d");
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
    <div className="relative w-full max-w-6xl mx-auto mt-8 sm:mt-12 rounded-3xl p-3 sm:p-4 bg-alabaster/95 backdrop-blur-md border border-gold/40 shadow-storybook-lg overflow-hidden">
      {/* 1. Header Control Bar: Atmosphere Selector & View Switcher */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 px-3 py-2.5 border-b border-gold/25 mb-3">
        {/* Left: Dynamic Time Status & Automatic Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cream/80 border border-gold/30 text-xs">
            <Clock className="w-3.5 h-3.5 text-gold-deep" />
            <span className="font-serif italic text-cocoa-light">Local Time:</span>
            <span className="font-medium text-cocoa">{localTimeString || "Synchronising..."}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-parchment-200/90 border border-gold/25 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                activeTimeOfDay === "night"
                  ? "bg-celestial-gold"
                  : activeTimeOfDay === "golden_hour"
                  ? "bg-amber-500"
                  : "bg-sage-deep"
              } animate-pulse`}
            />
            <span className="font-serif font-semibold text-cocoa">
              {config.label}
            </span>
            {isAutomatic && (
              <span className="text-[10px] uppercase tracking-wider text-gold-deep font-mono ml-1">
                (Live Auto)
              </span>
            )}
          </div>
        </div>

        {/* Center: Atmosphere Selector (Auto, Morning, Afternoon, Golden Hour, Night) */}
        <div className="flex flex-wrap items-center justify-center gap-1 bg-parchment-100/90 p-1 rounded-full border border-gold/30 text-xs">
          <button
            type="button"
            onClick={() => setMode("auto")}
            title="Automatically track your actual local time"
            className={`px-3 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 ${
              isAutomatic
                ? "bg-cocoa text-alabaster shadow-sm"
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
                className={`px-2.5 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-cocoa text-alabaster shadow-sm"
                    : "text-cocoa-light hover:text-cocoa"
                }`}
              >
                <Icon className="w-3 h-3 text-gold" />
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: 3D vs. 2D Watercolor Mode Switcher */}
        <div className="flex items-center gap-1 bg-parchment-100/90 p-1 rounded-full border border-gold/30 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 ${
              viewMode === "3d"
                ? "bg-cocoa text-alabaster shadow-sm"
                : "text-cocoa-light hover:text-cocoa"
            }`}
          >
            <Sparkles className="w-3 h-3 text-gold" />
            <span>3D Living Garden</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("watercolor")}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 ${
              viewMode === "watercolor"
                ? "bg-cocoa text-alabaster shadow-sm"
                : "text-cocoa-light hover:text-cocoa"
            }`}
          >
            <Eye className="w-3 h-3 text-gold" />
            <span>2D Watercolor View</span>
          </button>
        </div>
      </div>

      {/* 2. Main Viewport Container */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[540px] rounded-2xl overflow-hidden border border-gold/30 bg-parchment-50 transition-colors duration-700">
        {viewMode === "3d" ? (
          <StorybookCanvas
            className="w-full h-full"
            cameraPosition={[0, 3.3, 8.8]}
            cameraFov={38}
          >
            <LivingGardenScene config={config} />
          </StorybookCanvas>
        ) : (
          <WatercolorGardenView />
        )}

        {/* Bottom Ambient Navigation Hint (3D View Only) */}
        {viewMode === "3d" && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-alabaster/85 backdrop-blur-md border border-gold/35 shadow-sm flex items-center gap-2 text-[11px] text-cocoa font-serif italic">
            <Compass className="w-3.5 h-3.5 text-gold-deep" />
            <span>Move cursor or touch gently to look around the garden</span>
          </div>
        )}

        {/* Corner Deckle & Filigree Accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/40 rounded-tl pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/40 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/40 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/40 rounded-br pointer-events-none" />
      </div>

      {/* 3. Bottom Narrative Inscription */}
      <div className="mt-3 px-2 flex flex-col sm:flex-row items-center justify-between text-xs text-cocoa-muted gap-2">
        <span className="font-serif italic text-gold-deep">
          &ldquo;{config.subLabel}&rdquo;
        </span>
        <span className="text-[11px] text-cocoa-light font-sans">
          Four living phases of light • Rose pergola, lavender beds &amp; butterflies
        </span>
      </div>
    </div>
  );
};
