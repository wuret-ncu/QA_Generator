const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-green': '#8CB9B9',
        'card-pink':'#FAEBF0',
        'card-blue':'#DAFDFF',
        'card-gray':'#EEEEEE',
        white: colors.white,
      },
    },
  },
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [require("daisyui")],
}

