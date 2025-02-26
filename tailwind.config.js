/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Ensures all files inside src/ are scanned
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Includes App Router files
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Includes UI components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
