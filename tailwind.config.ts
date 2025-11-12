import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      colors: {
        // Enable slash opacity like text-cream/90, border-gold/20, bg-deepgreen/50, etc.
        cream: "rgb(247 243 234 / <alpha-value>)",
        deepgreen: "rgb(21 50 38 / <alpha-value>)",
        gold: "rgb(192 160 98 / <alpha-value>)",
      },
      boxShadow: {
        lg: "0 10px 30px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
