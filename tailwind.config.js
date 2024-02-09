/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
     
    screens: {
     
      'xs': '480px',
    
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      fontFamily:{
        roboto : "'Roboto',serif",
        ubuntu : "'ubuntu',serif",
        teko : "'Teko',serif",
        opensans : "'open-sans', serif",
      }
    },
  },
  plugins: [],
}