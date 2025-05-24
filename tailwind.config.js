/** @type {import('tailwindcss').Config} */

module.exports = {
  safelist: [
    
  ],
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // for App Router structure
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        fredericka: ['var(--font-fredericka)', 'sans-serif'],
        ubuntu: ['var(--font-ubuntu)', 'sans-serif'],
        rubik: ['var(--font-rubik)', 'sans-serif'],
        satisfy: ['var(--font-satisfy)', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#00ff88',
          dark: '#00cc6a',
        },
      },
    },
  },
  plugins: [],
};
