import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "1.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Mandatory brand tokens per SRS
        brand: {
          orange: "#ff9934", // Primary Action (Shopee Orange) — buttons, CTAs
          teal: "#2cbbc3", // Secondary/Trust — Headers, Health tags, Links
          yellow: "#f8f246", // Accent — Sale badges
          azure: "#e1f1f2", // Background — Section backgrounds
          brown: "#8c5826", // Typography — Headings
        },
        ink: {
          900: "#1f1a15",
          700: "#3d332a",
          500: "#6b5e51",
          400: "#8a8074",
          300: "#bfb7ad",
          200: "#e6e1d9",
          100: "#f5f2ed",
        },
      },
      fontFamily: {
        // Body / nav — mapped in layout.tsx via next/font
        sans: ["var(--font-be-vietnam-pro)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        // Headings — serif, premium magazine feel
        serif: ["var(--font-playfair)", "Georgia", "ui-serif", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.04)",
        lift: "0 6px 20px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      aspectRatio: {
        story: "9 / 16",
      },
    },
  },
  plugins: [],
};
export default config;
