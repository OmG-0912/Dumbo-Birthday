import { TimeOfDay } from "@/types/garden";

export interface GardenVideoAtmosphere {
  id: TimeOfDay;
  label: string;
  subLabel: string;
  description: string;
  videoMp4: string;
  videoWebm: string;
  videoMobileMp4?: string;
  videoMobileWebm?: string;
  poster: string;
  accentColor: string;
  overlayStyle: {
    radialTint: string;
    ambientGlow: string;
  };
}

export const GARDEN_VIDEO_ATMOSPHERES: Record<TimeOfDay, GardenVideoAtmosphere> = {
  golden_hour: {
    id: "golden_hour",
    label: "Golden Hour Glow",
    subLabel: "Warm amber sunlight, long shadows & romantic haze",
    description: "Camera glides forward at eye-level along a winding Cotswold stone pathway bordered by flowering roses, lavender, and golden sunlight streaming through mature canopy trees.",
    videoMp4: "/videos/garden/golden_hour.mp4",
    videoWebm: "/videos/garden/golden_hour.webm",
    videoMobileMp4: "/videos/garden/golden_hour-mobile.mp4",
    videoMobileWebm: "/videos/garden/golden_hour-mobile.webm",
    poster: "/videos/garden/golden_hour-poster.jpg",
    accentColor: "#F59E0B",
    overlayStyle: {
      radialTint: "rgba(251, 191, 36, 0.08)",
      ambientGlow: "rgba(245, 158, 11, 0.12)",
    },
  },
  morning: {
    id: "morning",
    label: "Morning Awakening",
    subLabel: "Soft mist, dewy leaves & sunrise gold",
    description: "Gentle morning light breaking through mature oak and jacaranda foliage, with soft ground mist lifting above flowering borders and stone flagstones.",
    videoMp4: "/videos/garden/morning.mp4",
    videoWebm: "/videos/garden/morning.webm",
    videoMobileMp4: "/videos/garden/morning-mobile.mp4",
    videoMobileWebm: "/videos/garden/morning-mobile.webm",
    poster: "/videos/garden/morning-poster.jpg",
    accentColor: "#A7B49B",
    overlayStyle: {
      radialTint: "rgba(254, 243, 199, 0.09)",
      ambientGlow: "rgba(167, 180, 155, 0.12)",
    },
  },
  afternoon: {
    id: "afternoon",
    label: "Afternoon Sunlight",
    subLabel: "Vibrant garden greens & warm clear sky",
    description: "Sun-drenched botanical garden in peak daylight, with deep emerald turf, blooming azaleas, vibrant flowers, and crisp dappled shadows under leafy pergolas.",
    videoMp4: "/videos/garden/afternoon.mp4",
    videoWebm: "/videos/garden/afternoon.webm",
    videoMobileMp4: "/videos/garden/afternoon-mobile.mp4",
    videoMobileWebm: "/videos/garden/afternoon-mobile.webm",
    poster: "/videos/garden/afternoon-poster.jpg",
    accentColor: "#65A30D",
    overlayStyle: {
      radialTint: "rgba(240, 253, 244, 0.06)",
      ambientGlow: "rgba(101, 163, 13, 0.1)",
    },
  },
  night: {
    id: "night",
    label: "Moonlit Night",
    subLabel: "Moonlit garden, illuminated lanterns & peaceful quiet",
    description: "Deep indigo evening sky, silvery moonlight illuminating tree canopies and stone pathways, with warm copper lanterns glowing beside garden benches.",
    videoMp4: "/videos/garden/night.mp4",
    videoWebm: "/videos/garden/night.webm",
    videoMobileMp4: "/videos/garden/night-mobile.mp4",
    videoMobileWebm: "/videos/garden/night-mobile.webm",
    poster: "/videos/garden/night-poster.png",
    accentColor: "#FDE08B",
    overlayStyle: {
      radialTint: "rgba(14, 19, 36, 0.25)",
      ambientGlow: "rgba(253, 224, 139, 0.14)",
    },
  },
};
