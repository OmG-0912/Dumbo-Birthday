export type TimeOfDay = "morning" | "afternoon" | "golden_hour" | "night";

export interface GardenEnvironmentConfig {
  id: TimeOfDay;
  label: string;
  subLabel: string;
  sunPosition: [number, number, number];
  sunColor: string;
  sunIntensity: number;
  ambientColor: string;
  ambientIntensity: number;
  hemisphereSkyColor: string;
  hemisphereGroundColor: string;
  hemisphereIntensity: number;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  lanternIntensity: number;
  lanternColor: string;
  fireflyCount: number;
  butterflyActivity: number; // 0 (hidden) to 1 (full flight)
  skyGradient: {
    from: string;
    via: string;
    to: string;
  };
  dewHighlight: number;
  shadowSoftness: number;
}
