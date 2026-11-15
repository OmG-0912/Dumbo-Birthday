"use client";

import React, { useEffect } from "react";
import { useGardenAtmosphere } from "@/context/GardenAtmosphereContext";
import { AtmosphereMode } from "@/hooks/useGardenTimeOfDay";

export interface AtmosphereURLSyncProps {
  initialTime?: AtmosphereMode;
}

export const AtmosphereURLSync: React.FC<AtmosphereURLSyncProps> = ({ initialTime }) => {
  const { setMode } = useGardenAtmosphere();

  useEffect(() => {
    if (initialTime) {
      setMode(initialTime);
    }
  }, [initialTime, setMode]);

  return null;
};
