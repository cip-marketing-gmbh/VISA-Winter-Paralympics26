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
        // Die offiziellen VISA Corporate Identity Farben
        "visa-blue": "#061354",
        "visa-gold": "#F7B600",
      },
      fontFamily: {
        // Eine saubere, moderne Schriftart
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
