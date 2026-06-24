import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#3B1F5C", light: "#5B2C8F" },
        parchment: "#FFFFFF",
        gold: { DEFAULT: "#D4AF37", light: "#E8CB6B", dark: "#A6841F" },
        teal: { DEFAULT: "#A78BC9", light: "#C7B3E0", dark: "#7A5FA8" },
        slate: { DEFAULT: "#5B5468" },
      },
      fontFamily: {
        display: ["var(--font-cairo)", "sans-serif"],
        body: ["var(--font-tajawal)", "sans-serif"],
      },
      backgroundImage: {
        zellige:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-opacity='0.18' stroke-width='1'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z'/%3E%3Ccircle cx='30' cy='30' r='14'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
