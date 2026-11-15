"use client";

import React from "react";
import Image from "next/image";
import {
  Clock,
  RotateCcw,
  Sunrise,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { AtmosphereMode } from "@/hooks/useGardenTimeOfDay";
import { TimeOfDay } from "@/types/garden";
import { GARDEN_ATMOSPHERES } from "@/data/gardenAtmosphereData";

const ATMOSPHERE_CONTROLS: {
  id: AtmosphereMode;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}[] = [
  { id: "morning", label: "Morning Serenity", shortLabel: "Morning", icon: Sunrise },
  { id: "afternoon", label: "Afternoon Bloom", shortLabel: "Afternoon", icon: Sun },
  { id: "golden_hour", label: "Golden Hour", shortLabel: "Golden", icon: Sunset },
  { id: "night", label: "Midnight Sanctuary", shortLabel: "Midnight", icon: Moon },
];

export const CinematicGardenBackground: React.FC = () => {
  const {
    mode,
    setMode,
    activeTimeOfDay,
    localTimeString,
    isAutomatic,
    isNight,
    currentAtmosphere,
  } = useGardenAtmosphere();

  const statesList: TimeOfDay[] = ["morning", "afternoon", "golden_hour", "night"];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0 bg-[#0F201C]">
      {/* =========================================================================
          1. FOUR DISTINCT GARDEN BACKGROUND STATES (Enhanced High Resolution, Smooth Crossfade)
         ========================================================================= */}
      {statesList.map((tod) => {
        const state = GARDEN_ATMOSPHERES[tod];
        const isActive = activeTimeOfDay === tod;

        return (
          <div
            key={tod}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Full-bleed, high-clarity responsive background image with tailored object-position */}
            <Image
              src={state.image}
              alt={`${state.title} - Anavi's World Botanical Sanctuary`}
              fill
              priority={isActive}
              unoptimized
              quality={100}
              sizes="100vw"
              style={{ objectPosition: state.objectPosition }}
              className="object-cover w-full h-full transform scale-100 select-none pointer-events-none transition-all duration-1000 contrast-[1.03] saturate-[1.04]"
            />
          </div>
        );
      })}

      {/* =========================================================================
          2. SUBTLE ADAPTIVE READABILITY OVERLAYS (No heavy white/black blocks)
         ========================================================================= */}
      {/* Top Header Scrim: delicate dark vignette so floating navigation & logo are crisp */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none z-20" />

      {/* Central Adaptive Radial Scrim: ensures headline readability without hiding garden details */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-1000 ease-in-out"
        style={{
          background: currentAtmosphere.overlayStyle.radialScrim,
        }}
      />

      {/* Minimal Bottom Section Fade: blends seamlessly into storybook pages below without obscuring garden stones */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-20 transition-all duration-1000 ${
          isNight
            ? "bg-gradient-to-t from-[#12221F] via-[#12221F]/40 to-transparent"
            : "bg-gradient-to-t from-[#F7F1E7] via-[#F7F1E7]/40 to-transparent"
        }`}
      />

      {/* =========================================================================
          3. FLOATING DAY-NIGHT ATMOSPHERE SWITCHER PILL (Top Right)
         ========================================================================= */}
      <div
        className={`absolute top-16 sm:top-24 right-3 sm:right-6 lg:right-8 z-30 max-w-[calc(100vw-1.5rem)] flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border transition-all duration-300 text-xs ${
          isNight
            ? "bg-[#132521]/90 backdrop-blur-md border-[#B88B4A]/50 shadow-[0_8px_32px_rgba(0,0,0,0.55)] text-[#F7F1E7]"
            : "bg-[#F7F1E7]/90 backdrop-blur-md border-[#B88B4A]/35 shadow-[0_4px_20px_rgba(23,45,41,0.08)] text-[#60463E]"
        }`}
      >
        {/* Live Clock & State Tag */}
        <div
          className={`flex items-center gap-1.5 pr-2 border-r shrink-0 ${
            isNight ? "border-[#B88B4A]/35" : "border-[#B88B4A]/25"
          }`}
        >
          <Clock
            className={`w-3.5 h-3.5 ${
              isNight ? "text-[#FDE08B]" : "text-[#B88B4A]"
            }`}
          />
          <span
            className={`font-medium font-mono text-[11px] ${
              isNight ? "text-[#F7F1E7]" : "text-[#60463E]"
            }`}
          >
            {localTimeString || "Live"}
          </span>
          <span
            className="w-2 h-2 rounded-full animate-pulse ml-0.5"
            style={{
              backgroundColor: isNight ? "#FDE08B" : currentAtmosphere.accentHex,
            }}
          />
          <span
            className={`hidden xl:inline font-serif italic text-[11px] ${
              isNight ? "text-[#F7F1E7]/80" : "text-[#60463E]/80"
            }`}
          >
            {currentAtmosphere.title}
          </span>
        </div>

        {/* Atmosphere Controls (Auto + 4 Garden States) */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {/* Automatic Mode Toggle */}
          <button
            type="button"
            onClick={() => setMode("auto")}
            title="Automatic Mode: synchronizes with your local time of day"
            className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[11px] font-medium transition-all duration-200 flex items-center gap-1 ${
              isAutomatic
                ? isNight
                  ? "bg-[#B88B4A] text-[#132521] font-semibold shadow-xs"
                  : "bg-[#60463E] text-[#F7F1E7] shadow-xs"
                : isNight
                  ? "text-[#F7F1E7]/75 hover:text-[#F7F1E7] hover:bg-white/10"
                  : "text-[#60463E]/75 hover:text-[#60463E] hover:bg-[#B88B4A]/10"
            }`}
          >
            <RotateCcw
              className={`w-3 h-3 ${
                isAutomatic && isNight ? "text-[#132521]" : "text-[#B88B4A]"
              }`}
            />
            <span className="hidden sm:inline">Auto</span>
          </button>

          {/* Four Garden State Buttons */}
          {ATMOSPHERE_CONTROLS.map((ctrl) => {
            const Icon = ctrl.icon;
            const isSelected = !isAutomatic && mode === ctrl.id;

            return (
              <button
                key={ctrl.id}
                type="button"
                onClick={() => setMode(ctrl.id)}
                title={ctrl.label}
                className={`p-1 sm:p-1.5 sm:px-2.5 rounded-full text-[11px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? isNight
                      ? "bg-[#B88B4A] text-[#132521] font-semibold shadow-xs"
                      : "bg-[#60463E] text-[#F7F1E7] shadow-xs"
                    : isNight
                      ? "text-[#F7F1E7]/75 hover:text-[#F7F1E7] hover:bg-white/10"
                      : "text-[#60463E]/75 hover:text-[#60463E] hover:bg-[#B88B4A]/10"
                }`}
              >
                <Icon
                  className={`w-3 h-3 ${
                    isSelected
                      ? isNight
                        ? "text-[#132521]"
                        : "text-[#B88B4A]"
                      : isNight
                        ? "text-[#FDE08B]/90"
                        : "text-[#B88B4A]/80"
                  }`}
                />
                <span className="hidden lg:inline">{ctrl.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CinematicGardenBackground;
