/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/page.tsx',
    './src/app/layout.tsx',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1C2331',
        'dash': '#203a63',
        'black-blue': '#1A2C4E',
        'primary-blue': '#003049',
        'secondary-blue': '#0b3f59',
        'teal-light': '#00756C',
        'skeleton': '#DFDFDF',
        transaction: '#726A8C',
        instagram: ' #d92e7f',
        'money': '#94cc5a'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-gradient-blue': {
          backgroundImage: 'linear-gradient(to bottom, #14B8A6, #87e8dd)'
        },
        '.bg-gradient-teal': {
          backgroundImage: 'linear-gradient(to bottom, #00C4B4, #00756C)'
        },
        '.bg-gradient-dark-teal': {
          backgroundImage: 'linear-gradient(to bottom, #109385, #16736b)'
        },
        '.bg-gradient-dark-blue': {
          backgroundImage: 'linear-gradient(to bottom, #1A3051 , #171F3F )'
        },
        '.sidebar': {
          transition: 'all .2s ease-in-out'
        }
      };
      addUtilities(newUtilities, {
        variants: ['responsive']
      });
    }
  ]
};
