/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgPrimary: '#FFFFFF',
        bgCard: '#F8F8F9',
        bgCardHover: '#F1F1F3',
        accent: '#000000',
        cyberOrange: '#FF5A1F',
        cyberGold: '#EAB308',
        cyberSuccess: '#16A34A',
        cyberError: '#DC2626',
        glassBorder: 'rgba(0, 0, 0, 0.08)',
        glassBg: 'rgba(255, 255, 255, 0.85)'
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montreal: ['Neue Montreal', 'sans-serif'],
        display: ['Syncopate', 'sans-serif']
      },
      boxShadow: {
        'glow-orange': '0 10px 30px -5px rgba(255, 90, 31, 0.3)',
        'glow-black': '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
        'glass-card': '0 10px 30px -10px rgba(0, 0, 0, 0.08)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
