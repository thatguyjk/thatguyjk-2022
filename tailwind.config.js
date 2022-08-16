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
    fontFamily: {
      'nunito': ['nunito', 'sans-serif'],
      'roboto': ['roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: 'currentColor',
        'offwhite': '#f8f8ff',
        'olive': '#99a68d',
        'bluegrey': '#5a736c',
        'red': '#8c2c08',
        'pink': '#d9808b', 
      },
    },
  },
  plugins: [],
}
