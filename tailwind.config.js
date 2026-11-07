/** @type {import('tailwindcss').Config} */
// Tailwind v4 uses CSS-first config in src/index.css.
// This file is kept for tooling compatibility (IDE, VS Tailwind extension).
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
