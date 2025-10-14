/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
