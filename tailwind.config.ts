import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6A1B9A", // Rich Electric Purple
        secondary: "#4A0E6B", // Deep Violet
        accent: "#B57EDC", // Soft Lavender Glow
        cloud: "#F5F3FF", // Cloud Lavender (background)
        plum: "#22142F", // Dark Plum (text)
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(106, 27, 154, 0.45)",
        "glow-lg": "0 0 120px -20px rgba(106, 27, 154, 0.55)",
        glass: "0 8px 32px 0 rgba(74, 14, 107, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(20px,-10px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
