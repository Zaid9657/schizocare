import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-atkinson)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        text: {
          DEFAULT: "#1A1A2E",
          soft: "#4A4A68",
          light: "#7A7A96",
        },
        bg: {
          DEFAULT: "#FFFFFF",
          warm: "#F9F8F6",
          section: "#F3F1ED",
        },
        border: {
          DEFAULT: "#E0DDD7",
          light: "#EEECE8",
        },
        teal: {
          DEFAULT: "#0B7B6F",
          bg: "#E8F5F2",
          hover: "#096B60",
        },
        "blue-bg": "#E8F0FA",
        amber: {
          DEFAULT: "#9E6D1B",
          bg: "#FBF3E3",
        },
        red: {
          DEFAULT: "#C03030",
          bg: "#FDECEC",
        },
        green: {
          DEFAULT: "#2E7D50",
          bg: "#E8F5EC",
        },
        purple: {
          DEFAULT: "#6B3FA0",
          bg: "#F0EBF8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
