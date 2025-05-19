/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js, ts, jsx, tsx}",
    "./components/**/*.{js, ts, jsx, tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        offwhite: "#f8f8ff",
        carbon: "#a9a9a9",
        bluegrey: "#5a736c",
        red: "#ff3b3f",
        pink: "#d9808b",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
