"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Clock,
  RotateCcw,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Pause,
  Play,
  VolumeX,
} from "lucide-react";
import { useGardenTimeOfDay, AtmosphereMode } from "@/hooks/useGardenTimeOfDay";
import { TimeOfDay } from "@/types/garden";
import {
  GARDEN_VIDEO_ATMOSPHERES,
  GardenVideoAtmosphere,
} from "@/data/gardenVideoData";

const ATMOSPHERE_OPTIONS: {
  id: AtmosphereMode;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "morning", label: "Morning", icon: Sunrise },
  { id: "afternoon", label: "Afternoon", icon: Sun },
  { id: "golden_hour", label: "Golden Hour", icon: Sunset },
  { id: "night", label: "Night", icon: Moon },
];

export const CinematicGardenVideo: React.FC = () => {
  const {
    mode,
    setMode,
    activeTimeOfDay,
    localTimeString,
    isAutomatic,
  } = useGardenTimeOfDay();

  // Active atmosphere config
  const currentAtmosphere: GardenVideoAtmosphere =
    GARDEN_VIDEO_ATMOSPHERES[activeTimeOfDay] ??
    GARDEN_VIDEO_ATMOSPHERES.golden_hour;

  // Track playback state & browser capabilities
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [videoLoadedMap, setVideoLoadedMap] = useState<Record<TimeOfDay, boolean>>({
    morning: false,
    afternoon: false,
    golden_hour: false,
    night: false,
  });
  const [videoErrorMap, setVideoErrorMap] = useState<Record<TimeOfDay, boolean>>({
    morning: false,
    afternoon: false,
    golden_hour: false,
    night: false,
  });

  // Video element references for each atmosphere to enable seamless crossfades
  const videoRefs = useRef<Record<TimeOfDay, HTMLVideoElement | null>>({
    morning: null,
    afternoon: null,
    golden_hour: null,
    night: null,
  });

  // 1. Listen for user OS reduced-motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 2. Play active video and pause inactive videos for optimal performance
  useEffect(() => {
    if (prefersReducedMotion) return;

    Object.entries(videoRefs.current).forEach(([key, videoEl]) => {
      if (!videoEl) return;
      const isCurrent = key === activeTimeOfDay;

      if (isCurrent && isPlaying) {
        // Attempt to play with error handling for missing files / autoplay policies
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Video playback prevented or video asset not yet placed on disk
          });
        }
      } else {
        videoEl.pause();
      }
    });
  }, [activeTimeOfDay, isPlaying, prefersReducedMotion]);

  // Toggle Play / Pause manually
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      const activeEl = videoRefs.current[activeTimeOfDay];
      if (activeEl) {
        if (next) {
          activeEl.play().catch(() => {});
        } else {
          activeEl.pause();
        }
      }
      return next;
    });
  }, [activeTimeOfDay]);

  // Handle successful video load
  const handleVideoCanPlay = (tod: TimeOfDay) => {
    setVideoLoadedMap((prev) => ({ ...prev, [tod]: true }));
    setVideoErrorMap((prev) => ({ ...prev, [tod]: false }));
  };

  // Handle video error (e.g. video file not yet on disk before user uploads it)
  const handleVideoError = (tod: TimeOfDay) => {
    setVideoErrorMap((prev) => ({ ...prev, [tod]: true }));
    setVideoLoadedMap((prev) => ({ ...prev, [tod]: false }));
  };

  const atmospheresList: TimeOfDay[] = ["morning", "afternoon", "golden_hour", "night"];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0 bg-[#141814]">
      {/* =========================================================================
          1. CINEMATIC VIDEO PLAYERS (Full bleed, object-fit: cover, crossfading)
         ========================================================================= */}
      {atmospheresList.map((tod) => {
        const atmo = GARDEN_VIDEO_ATMOSPHERES[tod];
        const isActive = activeTimeOfDay === tod;
        const isLoaded = videoLoadedMap[tod];
        const hasError = videoErrorMap[tod];

        return (
          <div
            key={tod}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* A. High-Resolution Poster Image (Visible during load, error, or reduced motion) */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                isLoaded && !hasError && !prefersReducedMotion
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <Image
                src={atmo.poster}
                alt={`${atmo.label} - Anavi's World Living Garden`}
                fill
                priority={isActive}
                sizes="100vw"
                className="object-cover object-center w-full h-full transform scale-100 transition-transform duration-10000 ease-out"
              />
            </div>

            {/* B. HTML5 Video Element (Only rendered if reduced motion is disabled) */}
            {!prefersReducedMotion && (
              <video
                ref={(el) => {
                  videoRefs.current[tod] = el;
                }}
                autoPlay
                muted
                loop
                playsInline
                preload={isActive ? "auto" : "metadata"}
                poster={atmo.poster}
                onCanPlay={() => handleVideoCanPlay(tod)}
                onError={() => handleVideoError(tod)}
                className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-1000 ${
                  isLoaded && !hasError ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Mobile-optimized video source (portrait/compact) if provided */}
                {atmo.videoMobileWebm && (
                  <source
                    src={atmo.videoMobileWebm}
                    type="video/webm"
                    media="(max-width: 768px)"
                  />
                )}
                {atmo.videoMobileMp4 && (
                  <source
                    src={atmo.videoMobileMp4}
                    type="video/mp4"
                    media="(max-width: 768px)"
                  />
                )}

                {/* Primary Master Desktop Sources */}
                <source src={atmo.videoWebm} type="video/webm" />
                <source src={atmo.videoMp4} type="video/mp4" />
              </video>
            )}
          </div>
        );
      })}

      {/* =========================================================================
          2. DELICATE CINEMATIC READABILITY OVERLAYS (No heavy opaque boxes)
         ========================================================================= */}
      {/* Top Header Scrim: subtle dark vignette ensuring navigation, logo & time controls are effortlessly readable */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/45 via-black/15 to-transparent pointer-events-none z-20" />

      {/* Central Gentle Ambient Radial Wash: provides soft editorial contrast behind headlines without hiding the garden */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(255, 253, 249, 0.42) 0%, rgba(255, 253, 249, 0.18) 45%, rgba(0, 0, 0, 0.1) 80%)`,
        }}
      />

      {/* Bottom Section Fade: organic transition into following storybook pages below the fold */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#FAF5ED] via-[#FAF5ED]/65 to-transparent pointer-events-none z-20" />

      {/* =========================================================================
          3. FLOATING TIME-OF-DAY ATMOSPHERE & PLAYBACK CONTROL PILL
         ========================================================================= */}
      <div className="absolute top-16 sm:top-24 right-3 sm:right-6 z-30 max-w-[calc(100vw-1.5rem)] flex items-center gap-1 sm:gap-2 bg-alabaster/94 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gold/40 shadow-storybook text-xs">
        {/* Live Clock & State Tag */}
        <div className="flex items-center gap-1 sm:gap-1.5 pr-1.5 sm:pr-2 border-r border-gold/25 shrink-0">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-deep" />
          <span className="font-medium text-cocoa font-mono text-[10px] sm:text-[11px]">
            {localTimeString || "Live"}
          </span>
          <span
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ml-0.5"
            style={{ backgroundColor: currentAtmosphere.accentColor }}
          />
          <span className="hidden xl:inline font-serif italic text-cocoa-light text-[11px]">
            {currentAtmosphere.label}
          </span>
        </div>

        {/* Atmosphere Selector Buttons */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setMode("auto")}
            title="Automatically track real-time local atmosphere"
            className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium transition-all duration-200 flex items-center gap-0.5 sm:gap-1 ${
              isAutomatic
                ? "bg-cocoa text-alabaster shadow-xs"
                : "text-cocoa-light hover:text-cocoa"
            }`}
          >
            <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
            <span className="hidden sm:inline">Auto</span>
          </button>

          {ATMOSPHERE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = !isAutomatic && mode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMode(opt.id)}
                title={opt.label}
                className={`p-1 sm:p-1.5 sm:px-2 rounded-full text-[10px] sm:text-[11px] font-medium transition-all duration-200 flex items-center gap-1 ${
                  isSelected
                    ? "bg-cocoa text-alabaster shadow-xs"
                    : "text-cocoa-light hover:text-cocoa hover:bg-gold/10"
                }`}
              >
                <Icon className="w-3 h-3 text-gold" />
                <span className="hidden 2xl:inline">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Video Play / Pause / Muted Indicator */}
        <div className="pl-1 sm:pl-1.5 border-l border-gold/25 flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={togglePlayPause}
            title={isPlaying ? "Pause background video" : "Play background video"}
            className="p-0.5 sm:p-1 rounded-full text-cocoa-light hover:text-cocoa hover:bg-gold/10 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-deep" />
            ) : (
              <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-deep" />
            )}
          </button>
          <span title="Ambient video audio is muted" className="hidden sm:inline">
            <VolumeX className="w-3 h-3 text-cocoa-muted" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CinematicGardenVideo;
