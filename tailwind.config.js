/** @types {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,scss,css}'],
  theme: {
    screens: {
      sm: { max: '360px' },
      md: { max: '850px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }
      lg: { min: '1024px', max: '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
      xl: { min: '1280px', max: '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
    },
    extend: {
      colors: {
        accent: {
          100: '#73a5ff',
          300: '#4c8dff',
          500: '#397df6',
          700: '#2f68cc',
          900: '#234e99',
        },
        success: {
          100: '#80ffbf',
          300: '#22e584',
          500: '#14cc70',
          700: '#0f9954',
          900: '#0a6638',
        },
        danger: {
          100: '#ff8099',
          300: '#f23d61',
          500: '#cc1439',
          700: '#990f2b',
          900: '#660a1d',
        },
        warning: {
          100: '#ffd073',
          300: '#e5ac39',
          500: '#d99000',
          700: '#996600',
          900: '#664400',
        },
        dark: {
          100: '#4C4C4C',
          300: '#333333',
          500: '#171717',
          700: '#0D0D0D',
          900: '#000000',
        },
        light: {
          100: '#ffffff',
          300: '#f7fbff',
          500: '#edf3fa',
          700: '#d5dae0',
          900: '#bdc1c7',
        },
        secondBgColor: '#171717',
        bgColor: '#0d0d0d',
        bgLog: '#101010',
        bgLogBorder: '#333333',
      },
    },
  },
  variants: {},
  plugins: [],
}
