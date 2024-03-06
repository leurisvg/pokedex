import colors from 'tailwindcss/colors.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
      },
      screens: {
        '3xl': '1900px',
      }
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"]
    },
    colors: {
      primary: {
        500: '#f5f5f5',
        400: '#F8F8FF',
      },
      secondary: {
        500: '#191F38',
        400: '#5E6273',
        lightGray: '#DADADA'
      },
      types: {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
      },
      pokemon: {
        black: '#676767',
        blue: '#CAE3FF',
        brown: '#CAA36F',
        gray: '#E0E0E0',
        green: '#E3FFCA',
        pink: '#FFCAE3',
        purple: '#CAA3FF',
        red: '#FFCAC5',
        white: '#F8F8FF',
        yellow: '#FFFFCA',
      },

      gray: colors.gray,
      green: colors.green,
      zinc: colors.zinc,
      white: '#FFFFFF',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
