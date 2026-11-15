import { MemorySnapshot, DailyNote } from "@/types";

export const SAMPLE_MEMORIES: MemorySnapshot[] = [
  {
    id: "memory-1",
    title: "Golden Hour Through Sheer Curtains",
    caption: "The way the late afternoon sunlight carved quiet warmth across the wooden floor and book pages.",
    dateLabel: "Autumn Snapshot",
    locationLabel: "The Reading Nook",
    roomTag: "House of Memories",
    photoAspect: "portrait",
    colorPalette: {
      bg: "from-[#FBF7F0] to-[#F3E7D7]",
      border: "border-gold/30",
      accent: "#C5A16B"
    }
  },
  {
    id: "memory-2",
    title: "The First Wildflower of the Season",
    caption: "Tucked between the heavy pages of an antique poetry anthology to dry until forever.",
    dateLabel: "Early Spring",
    locationLabel: "Garden Trail",
    roomTag: "Garden of Becoming",
    photoAspect: "landscape",
    colorPalette: {
      bg: "from-[#F4F7F2] to-[#E3EBDC]",
      border: "border-sage/30",
      accent: "#A7B49B"
    }
  },
  {
    id: "memory-3",
    title: "Flour Dust & Fresh Rosemary",
    caption: "Proofing dough on the marble slab while the kettle whistled its soft accompaniment.",
    dateLabel: "Quiet Saturday",
    locationLabel: "The Kitchen Hearth",
    roomTag: "Kitchen of Little Joys",
    photoAspect: "square",
    colorPalette: {
      bg: "from-[#FCF8F5] to-[#F1E5DF]",
      border: "border-blush/40",
      accent: "#E8C9CA"
    }
  },
  {
    id: "memory-4",
    title: "Palette Swatches in Prussian Blue",
    caption: "Mixing tempera and watercolor washes until the sea met the horizon just as envisioned.",
    dateLabel: "Studio Afternoon",
    locationLabel: "At the Easel",
    roomTag: "Museum of Her",
    photoAspect: "portrait",
    colorPalette: {
      bg: "from-[#FBF8F5] to-[#EADFD8]",
      border: "border-cocoa/20",
      accent: "#604A42"
    }
  }
];

export const CURRENT_DAILY_NOTE: DailyNote = {
  quote: "And into the enchanted garden she wandered, not to lose herself, but to discover how many worlds she carries within.",
  authorOrSource: "The Living Storybook Chronicle",
  reflection: "May today offer quiet spaces between moments—time to breathe in the fragrance of blooming thoughts, notice the light drifting through the trees, and remember that every gentle step is already part of your masterpiece.",
  dateDisplay: "Vol. I • Chronicle Entry",
  parchmentSealDate: "Today's Living Page"
};
