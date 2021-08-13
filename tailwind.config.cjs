const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    
    content: ['./**/**/*.html', './**/**/*.svelte'],

    options: {
      whitelistPatterns: [/svelte-/],
      defaultExtractor: (content) =>
        [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fffcf6', 
          '100': '#fef9ed', 
          '200': '#fdefd3', 
          '300': '#fbe6b8', 
          '400': '#f8d383', 
          '500': '#f5c04e', 
          '600': '#ddad46', 
          '700': '#b8903b', 
          '800': '#93732f', 
          '900': '#785e26'
      },
        secondary: colors.green
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
