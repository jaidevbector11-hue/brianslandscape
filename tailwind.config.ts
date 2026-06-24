import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Outdoorsy green + earth-tone palette
        forest: {
          50: "#f1f7f0",
          100: "#dcebd9",
          200: "#bcd9b6",
          300: "#92c08a",
          400: "#63a058",
          500: "#42833a",
          600: "#31682c",
          700: "#285325",
          800: "#234221",
          900: "#1e371d",
          950: "#0d1e0d",
        },
        earth: {
          50: "#faf6f1",
          100: "#f2e9dc",
          200: "#e4d1b8",
          300: "#d2b48c",
          400: "#c19a6b",
          500: "#a87f4f",
          600: "#8f6841",
          700: "#735237",
          800: "#604431",
          900: "#523a2c",
          950: "#2d1f17",
        },
        sand: {
          50: "#fbfaf7",
          100: "#f5f2ea",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
