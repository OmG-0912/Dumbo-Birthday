"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useGardenTimeOfDay, AtmosphereMode } from "@/hooks/useGardenTimeOfDay";
import { TimeOfDay, GardenEnvironmentConfig } from "@/types/garden";
import {
  GARDEN_ATMOSPHERES,
  GardenAtmosphereState,
} from "@/data/gardenAtmosphereData";

export interface GardenAtmosphereContextType {
  mode: AtmosphereMode;
  setMode: (mode: AtmosphereMode) => void;
  activeTimeOfDay: TimeOfDay;
  isNight: boolean;
  localTimeString: string;
  isAutomatic: boolean;
  config: GardenEnvironmentConfig;
  currentAtmosphere: GardenAtmosphereState;
}

const GardenAtmosphereContext = createContext<GardenAtmosphereContextType | null>(null);

export interface GardenAtmosphereProviderProps {
  children: ReactNode;
  initialAtmosphere?: AtmosphereMode;
}

export const GardenAtmosphereProvider: React.FC<GardenAtmosphereProviderProps> = ({
  children,
  initialAtmosphere,
}) => {
  const gardenTime = useGardenTimeOfDay(initialAtmosphere);
  const isNight = gardenTime.activeTimeOfDay === "night";
  const currentAtmosphere =
    GARDEN_ATMOSPHERES[gardenTime.activeTimeOfDay] ?? GARDEN_ATMOSPHERES.golden_hour;

  return (
    <GardenAtmosphereContext.Provider
      value={{
        ...gardenTime,
        isNight,
        currentAtmosphere,
      }}
    >
      {children}
    </GardenAtmosphereContext.Provider>
  );
};

export function useGardenAtmosphere(): GardenAtmosphereContextType {
  const ctx = useContext(GardenAtmosphereContext);
  if (!ctx) {
    const isNight = false;
    return {
      mode: "auto",
      setMode: () => {},
      activeTimeOfDay: "golden_hour",
      isNight: false,
      localTimeString: "",
      isAutomatic: true,
      config: undefined as unknown as GardenEnvironmentConfig,
      currentAtmosphere: GARDEN_ATMOSPHERES.golden_hour,
    };
  }
  return ctx;
}
