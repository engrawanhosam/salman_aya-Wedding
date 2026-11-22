import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF7F0", cream: "#F4ECDF", sand: "#E9DCC8", champagne: "#C9AE82", gold: "#A58650",
        burgundy: "#6E1F34", wine: "#4A1424", ink: "#3B2A2D", taupe: "#86716C", line: "#E2D3BF", blush: "#F3E7E1",
      },
      fontFamily: {
        naskh: ["var(--font-amiri)", "serif"],
        sans: ["var(--font-tajawal)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
        names: ["var(--font-aref)", "var(--font-amiri)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
