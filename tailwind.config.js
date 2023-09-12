/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        25: "25%",
        90: "90%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
