import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#FAF5ED",
          50: "#FCFAF6",
          100: "#FAF5ED",
          200: "#F5ECE0",
          300: "#EEDFCE",
        },
        alabaster: "#FFFDF9",
        cream: "#F6EFE3",
        // Cinematic Botanical Palette
        pearl: "#F7F1E7",
        "forest-sage": {
          DEFAULT: "#526B50",
          light: "#6E8B6C",
          deep: "#3D523C",
        },
        "dusty-rose": {
          DEFAULT: "#D6A0A0",
          light: "#E5BEBE",
          deep: "#B87F7F",
        },
        "antique-gold": {
          DEFAULT: "#B88B4A",
          light: "#D4A968",
          deep: "#916B32",
        },
        "warm-cocoa": {
          DEFAULT: "#60463E",
          light: "#7D5D54",
          deep: "#3D2A24",
        },
        "deep-forest": {
          DEFAULT: "#172D29",
          surface: "#1E3B36",
          abyss: "#0F1F1C",
        },
        blush: {
          DEFAULT: "#E8C9CA",
          light: "#F7EAEA",
          muted: "#DFC2C3",
          deep: "#C48F91",
        },
        sage: {
          DEFAULT: "#A7B49B",
          light: "#CAD4C2",
          muted: "#96A489",
          deep: "#6E7C61",
        },
        gold: {
          DEFAULT: "#C5A16B",
          light: "#E3CE9F",
          muted: "#B89257",
          deep: "#916F34",
        },
        cocoa: {
          DEFAULT: "#604A42",
          light: "#846D65",
          muted: "#A8948D",
          deep: "#3D2E28",
        },
        celestial: {
          DEFAULT: "#0E1324",
          abyss: "#070A14",
          surface: "#171F38",
          card: "#1C2544",
          border: "#2F3B66",
          gold: "#FDE08B",
          twilight: "#221C38",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        script: ["'Cormorant Garamond'", "Georgia", "cursive", "serif"],
      },
      boxShadow: {
        'storybook': '0 10px 30px -10px rgba(96, 74, 66, 0.08), 0 4px 6px -2px rgba(96, 74, 66, 0.04)',
        'storybook-lg': '0 20px 40px -15px rgba(96, 74, 66, 0.12), 0 8px 16px -4px rgba(96, 74, 66, 0.06)',
        'celestial-glow': '0 0 40px -10px rgba(253, 224, 139, 0.25), 0 0 80px -20px rgba(167, 180, 155, 0.15)',
        'gold-glow': '0 0 25px -5px rgba(197, 161, 107, 0.35)',
      },
      backgroundImage: {
        'deckle-edge': 'radial-gradient(circle at 50% 0, rgba(197, 161, 107, 0.15) 0%, transparent 70%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
          '100%': { opacity: '0.4' },
        },
        drift: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(10px) translateY(-8px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
