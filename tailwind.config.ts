import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Scans all files inside src/
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Includes App Router files
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Includes UI components
  ],
  theme: {
    extend: {
      colors: {
        "ct-dark-600": "#222",
        "ct-dark-200": "#e5e7eb",
        "ct-dark-100": "#f5f6f7",
        "ct-blue-600": "#2363eb",
        "ct-yellow-600": "#f9d13e",
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1125px",
          xl: "1125px",
          "2xl": "1125px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
