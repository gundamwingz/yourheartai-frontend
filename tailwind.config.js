/** @type {import('tailwindcss').Config} */
// prettier-ignore
module.exports = {
    content: ['./src/app/**/*.{html,ts}'],
    darkMode: ['selector', '[data-theme="dark"]'],
    theme: {
      extend: {
        colors: {
          red: {
            0: '#ff0000'
          }
        },
        maxWidth: {
          '8xl': '90rem',
          // => max-width: 90rem;
          '9xl': '100rem',
          // => max-width: 100rem;
          '10xl': '110rem'
          // => max-width: 110rem;
        },
        screens: {
          '-2xl': { max: '1535px' },
          // => @media (max-width: 1535px) { ... }
          '-xl': { max: '1279px' },
          // => @media (max-width: 1279px) { ... }
          '-lg': { max: '1023px' },
          // => @media (max-width: 1023px) { ... }
          '-md': { max: '767px' },
          // => @media (max-width: 767px) { ... }
          '-sm': { max: '639px' }
          // => @media (max-width: 639px) { ... }
        }
      }
    },
    plugins: [],
    important: true
  }
  