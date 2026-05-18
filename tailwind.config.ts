import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // WICHTIG: Er scannt alles im app-Ordner
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Und hier, falls wir später Komponenten nutzen
  ],
  theme: {
    extend: {
      colors: {
        "visa-blue": "#061354",
      },
    },
  },
  plugins: [],
};
export default config;
