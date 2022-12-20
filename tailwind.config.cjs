/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './src/**/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xxl: '1600px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
};
