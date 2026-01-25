import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
            base: "var(--gold-base)",
            light: "var(--gold-light)",
            hover: "var(--gold-hover)",
        }
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
          "pulsing-branch": "pulse-opacity 3s ease-in-out infinite",
      },
      keyframes: {
          "pulse-opacity": {
              "0%, 100%": { opacity: "0.4" },
              "50%": { opacity: "0.7" },
          }
      }
    },
  },
  plugins: [],
};
export default config;
