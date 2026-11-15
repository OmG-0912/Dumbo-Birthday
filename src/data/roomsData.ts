import { DestinationRoom } from "@/types";

export const DESTINATION_ROOMS: DestinationRoom[] = [
  {
    id: "memories",
    name: "House of Memories",
    subtitle: "A sanctuary for moments preserved in amber",
    description: "Every photograph, tender caption, candid laughter, and quiet afternoon, gently preserved in a timeless living scrapbook.",
    category: "Chronicle & Scrapbook",
    accentColor: "#C5A16B",
    badgeText: "Room I",
    route: "/spaces/memories",
    illustrationType: "memories",
    details: ["Film captures & polaroids", "Handwritten captions", "Chronological living timeline", "Video keepsakes"]
  },
  {
    id: "garden",
    name: "Garden of Becoming",
    subtitle: "Seeds of dreams blooming into milestones",
    description: "Where ambitions take root and quietly flourish. A place to celebrate growth, personal milestones, and proud triumphs.",
    category: "Milestones & Aspirations",
    accentColor: "#A7B49B",
    badgeText: "Room II",
    route: "/spaces/garden",
    illustrationType: "garden",
    details: ["Season-by-season milestones", "Seeds of intention", "Blooming achievements", "Reflection terrace"]
  },
  {
    id: "library",
    name: "Library of Words",
    subtitle: "A refuge of bound thoughts and lingering verses",
    description: "Beloved books, reading journals, heartfelt prose, quiet musings, and pages that made time stand still.",
    category: "Literature & Journal",
    accentColor: "#846D65",
    badgeText: "Room III",
    route: "/spaces/library",
    illustrationType: "library",
    details: ["Reading progress & shelf", "Underlined passages", "Private writing sanctuary", "Collected poetry"]
  },
  {
    id: "museum",
    name: "Museum of Her",
    subtitle: "An intimate gallery of artistic expression",
    description: "Sketches on napkins, finished canvases, watercolor washes, and the colors that flow straight from her imagination.",
    category: "Art & Creativity",
    accentColor: "#E8C9CA",
    badgeText: "Room IV",
    route: "/spaces/museum",
    illustrationType: "museum",
    details: ["Original artwork archive", "Canvas gallery exhibits", "Sketchbook margins", "Creative palette notes"]
  },
  {
    id: "kitchen",
    name: "Kitchen of Little Joys",
    subtitle: "Flavors, warmth, and weekend alchemy",
    description: "Sourdough aromas, cinnamon-dusted memories, inherited family recipes, and spontaneous sweet experiments.",
    category: "Culinary & Comfort",
    accentColor: "#C5A16B",
    badgeText: "Room V",
    route: "/spaces/kitchen",
    illustrationType: "kitchen",
    details: ["Secret family recipes", "Weekend bake experiments", "Tasting notes & pairings", "Pantry treasures"]
  },
  {
    id: "observatory",
    name: "Observatory of Dreams",
    subtitle: "Looking beyond the horizon toward adventures yet to come",
    description: "A brass telescope aimed at tomorrow: bucket list expeditions, wanderlust postcards, and horizons waiting for footsteps.",
    category: "Wanderlust & Future",
    accentColor: "#7A896D",
    badgeText: "Room VI",
    route: "/spaces/observatory",
    illustrationType: "observatory",
    details: ["Wanderlust destination map", "Starlit bucket list", "Adventures pending departure", "Passport dreams"]
  }
];
