/** @type {import('tailwindcss').Config} */
// Tailwind v4 uses CSS-first config in app/globals.css.
// This file is kept for tooling compatibility (IDE, VS Tailwind extension).
// Content paths include app/ and src/ for all components and pages.
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}