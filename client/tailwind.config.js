/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accRed: "#e12729",
        accGreen: "#007f4e",
        accOrange: "#f37324",
        accLightGreen: "#72b043",
        // Greys - zinc
        lightGrey: "#3f3f46",
        grey: "#27272a",
        darkGrey: "#18181b",
      }
    },
  },
  plugins: [],
}

