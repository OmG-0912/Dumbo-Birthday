"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TimeOfDay, GardenEnvironmentConfig } from "@/types/garden";
import { GARDEN_ENVIRONMENTS } from "@/data/gardenEnvironmentData";

export type AtmosphereMode = "auto" | TimeOfDay;

/**
 * Maps hour of day to one of four distinct botanical garden states:
 * - Morning:     05:00 – 11:00
 * - Afternoon:   11:00 – 16:00
 * - Golden Hour: 16:00 – 19:00
 * - Night:       19:00 – 05:00
 */
export function getTimeOfDayFromHour(decimalHour: number): TimeOfDay {
  if (decimalHour >= 5 && decimalHour < 11) {
    return "morning";
  } else if (decimalHour >= 11 && decimalHour < 16) {
    return "afternoon";
  } else if (decimalHour >= 16 && decimalHour < 19) {
    return "golden_hour";
  } else {
    return "night";
  }
}

export function useGardenTimeOfDay(initialMode?: AtmosphereMode) {
  const [mode, setMode] = useState<AtmosphereMode>(() => {
    if (initialMode) return initialMode;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const timeParam = params.get("time");
      if (
        timeParam &&
        ["morning", "afternoon", "golden_hour", "night", "auto"].includes(timeParam)
      ) {
        return timeParam as AtmosphereMode;
      }
    }
    return "auto";
  });

  const [systemTimeOfDay, setSystemTimeOfDay] = useState<TimeOfDay>(() => {
    if (typeof window !== "undefined") {
      const now = new Date();
      const decimalHour = now.getHours() + now.getMinutes() / 60;
      return getTimeOfDayFromHour(decimalHour);
    }
    return "afternoon";
  });

  const [localTimeString, setLocalTimeString] = useState<string>("");

  const updateRealTime = useCallback(() => {
    const now = new Date();
    const decimalHour = now.getHours() + now.getMinutes() / 60;
    const computedState = getTimeOfDayFromHour(decimalHour);
    setSystemTimeOfDay(computedState);

    // Formatted time (e.g., "5:42 PM")
    setLocalTimeString(
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, []);

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const timeParam = params.get("time");
      if (
        timeParam &&
        ["morning", "afternoon", "golden_hour", "night", "auto"].includes(timeParam)
      ) {
        setMode(timeParam as AtmosphereMode);
      }
    }

    updateRealTime();

    // Re-check time every 30 seconds
    const interval = setInterval(updateRealTime, 30000);

    // Re-check when user switches back to browser tab
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        updateRealTime();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [initialMode, updateRealTime]);

  const activeTimeOfDay: TimeOfDay = mode === "auto" ? systemTimeOfDay : mode;
  const config: GardenEnvironmentConfig = useMemo(() => {
    return GARDEN_ENVIRONMENTS[activeTimeOfDay];
  }, [activeTimeOfDay]);

  return {
    mode,
    setMode,
    activeTimeOfDay,
    config,
    localTimeString,
    isAutomatic: mode === "auto",
  };
}
