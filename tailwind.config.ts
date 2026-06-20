import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0F172A", light: "#1E293B" },
        parchment: "#FAF7F0",
        gold: { DEFAULT: "#C9942C", light: "#E0B45C", dark: "#9C7220" },
        teal: { DEFAULT: "#0E7C7B", light: "#13A3A1", dark: "#0A5E5D" },
        slate: { DEFAULT: "#475569" },
      },
      fontFamily: {
        display: ["var(--font-cairo)", "sans-serif"],
        body: ["var(--font-tajawal)", "sans-serif"],
      },
      backgroundImage: {
        zellige:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23C9942C' stroke-opacity='0.15' stroke-width='1'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z'/%3E%3Ccircle cx='30' cy='30' r='14'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
