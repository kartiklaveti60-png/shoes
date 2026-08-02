/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#FFFFFF',
        bgCard: '#F8F8F9',
        cyberOrange: '#FF5A1F',
        cyberGold: '#EAB308',
        cyberSuccess: '#16A34A'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
