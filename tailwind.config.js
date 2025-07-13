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
        mono: ['var(--font-geist-mono)', 'sans-serif'],
        ubuntu: ['var(--font-ubuntu-mono)', 'sans-serif'],
        satisfy: ['var(--font-satisfy)', 'sans-serif'],
        fredericka: ['var(--font-fredericka)', 'sans-serif'],
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
