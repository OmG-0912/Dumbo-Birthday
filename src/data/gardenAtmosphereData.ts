import { TimeOfDay } from "@/types/garden";

export interface GardenAtmosphereState {
  id: TimeOfDay;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  objectPosition: string;
  accentColor: string;
  accentHex: string;
  pillBadgeColor: string;
  overlayStyle: {
    radialScrim: string;
    ambientVignette: string;
  };
}

export const GARDEN_ATMOSPHERES: Record<TimeOfDay, GardenAtmosphereState> = {
  morning: {
    id: "morning",
    title: "Morning Serenity",
    subtitle: "05:00 – 11:00 • Golden morning rays, dewy foliage & peaceful sunlit pavilion",
    description: "Gentle morning sunbeams break through the forest canopy onto lush botanical borders and a winding brick pathway beside the garden pavilion.",
    image: "/images/garden/morning.jpg",
    objectPosition: "center 38%",
    accentColor: "forest-sage",
    accentHex: "#526B50",
    pillBadgeColor: "#526B50",
    overlayStyle: {
      radialScrim: "radial-gradient(ellipse at 50% 48%, rgba(247, 241, 231, 0.20) 0%, rgba(247, 241, 231, 0.08) 50%, rgba(23, 45, 41, 0.12) 85%)",
      ambientVignette: "from-black/35 via-transparent to-[#F7F1E7]/70",
    },
  },
  afternoon: {
    id: "afternoon",
    title: "Afternoon Bloom",
    subtitle: "11:00 – 16:00 • Radiant midday light, vibrant blossoms & rambling rose pergola",
    description: "Vibrant pink florals and climbing roses frame the wooden pergola archway, bathed in luminous midday sunlight along the garden walk.",
    image: "/images/garden/afternoon.jpg",
    objectPosition: "center 42%",
    accentColor: "dusty-rose",
    accentHex: "#D6A0A0",
    pillBadgeColor: "#B87F7F",
    overlayStyle: {
      radialScrim: "radial-gradient(ellipse at 50% 48%, rgba(247, 241, 231, 0.22) 0%, rgba(247, 241, 231, 0.08) 50%, rgba(23, 45, 41, 0.12) 85%)",
      ambientVignette: "from-black/35 via-transparent to-[#F7F1E7]/70",
    },
  },
  golden_hour: {
    id: "golden_hour",
    title: "Golden Hour",
    subtitle: "16:00 – 19:00 • Warm amber glow, reflective lily pond & tranquil lakeside gazebo",
    description: "Warm amber light cascades over the garden gazebo, illuminating stepping stones that wind past flowering water lilies and serene pond waters.",
    image: "/images/garden/golden-hour.jpg",
    objectPosition: "center 45%",
    accentColor: "antique-gold",
    accentHex: "#B88B4A",
    pillBadgeColor: "#B88B4A",
    overlayStyle: {
      radialScrim: "radial-gradient(ellipse at 50% 48%, rgba(247, 241, 231, 0.22) 0%, rgba(247, 241, 231, 0.09) 50%, rgba(23, 45, 41, 0.14) 85%)",
      ambientVignette: "from-black/40 via-transparent to-[#F7F1E7]/70",
    },
  },
  night: {
    id: "night",
    title: "Midnight Sanctuary",
    subtitle: "19:00 – 05:00 • Moonlit dusk, warm glowing lanterns & romantic rose archways",
    description: "Warm lantern light illuminates the flagstone pathway beneath climbing red roses and twilight skies in peaceful evening serenity.",
    image: "/images/garden/night.jpg",
    objectPosition: "center 50%",
    accentColor: "deep-forest",
    accentHex: "#E3A857",
    pillBadgeColor: "#E3A857",
    overlayStyle: {
      radialScrim: "radial-gradient(ellipse at 50% 48%, rgba(23, 45, 41, 0.30) 0%, rgba(23, 45, 41, 0.15) 50%, rgba(15, 31, 28, 0.40) 85%)",
      ambientVignette: "from-black/55 via-transparent to-[#172D29]/65",
    },
  },
};
