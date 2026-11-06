import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050816",
          900: "#070B1A",
          850: "#0A0F24",
          800: "#0C1226",
          750: "#0E152E",
        },
        card: {
          DEFAULT: "#0D1328",
          border: "#1E2644",
          hover: "#111833",
        },
        accent: {
          DEFAULT: "#7C6CFF",
          light: "#9485FF",
          dark: "#5B6CFF",
        },
        brand: {
          purple: "#7C5CFF",
          blue: "#5B6CFF",
        },
        pill: {
          bg: "#1A1B3A",
          border: "#2C2F63",
        },
        muted: "#9AA3B8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(90deg, #5B6CFF 0%, #7C5CFF 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(20, 27, 56, 0.6) 0%, rgba(13, 19, 40, 0.9) 100%)",
        "portrait-gradient": "linear-gradient(135deg, #6B5BFF 0%, #8A5CFF 60%, #B35CFF 100%)",
      },
      boxShadow: {
        "glow-purple": "0 0 80px -10px rgba(124, 92, 255, 0.4)",
        "glow-card": "0 10px 30px -10px rgba(91, 108, 255, 0.15)",
        "glow-btn": "0 4px 20px -2px rgba(124, 92, 255, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;

