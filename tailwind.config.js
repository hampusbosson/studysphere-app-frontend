/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000212",
        accent: "#4762FF",
        accentHover: "#3F56E6",
        silver: '#E5E5E5',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(rgb(42, 255, 255) 12%, rgb(71, 98, 255) 79%)', 
        'shiny-silver': 'linear-gradient(90deg, #C0C0C0, #E5E5E5, #C0C0C0)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Adds Lato font family
        raleway: ['Raleway', 'sans-serif'], // Adds Montserrat font family
      },
      fontWeight: {
        hairline: 100,
        'extra-light': 100,
        thin: 200,
         light: 300,
         normal: 400,
         medium: 500,
        semibold: 600,
         bold: 700,
        extrabold: 800,
        'extra-bold': 800,
         black: 900,
       },
       boxShadow: {
        'glow-accent': '0 0 4px #4762FF, 0 0 8px #4762FF', // Dimmer default glow
        'glow-accent-active': '0 0 8px #4762FF, 0 0 16px #4762FF', // Brighter glow for hover/active
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'html, body': { fontFamily: 'raleway, sans-serif' }, // Set Montserrat as the default font
      });
    },
    tailwindScrollbar({ nocompatible: true }),
  ],
};
