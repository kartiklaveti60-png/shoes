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
        // === NEW PALETTE ===
        warmVanilla: '#FFF7E5',
        vintageRouge: '#D52122',
        vintageRougeDark: '#B01A1B',
        warmDark: '#1A1008',
        warmMid: '#8C6E50',
        warmSurface: '#FFF0D0',
        warmBorder: '#E8D5B0',
        // Legacy aliases mapped to new palette
        bgPrimary: '#FFF7E5',
        bgCard: '#FFF0D0',
        bgCardHover: '#FFE8B8',
        accent: '#D52122',
        cyberOrange: '#D52122',
        cyberRed: '#D52122',
        chicagoRed: '#D52122',
        chicagoRedDark: '#B01A1B',
        cyberGold: '#D52122',
        cyberSuccess: '#16A34A',
        cyberError: '#D52122',
        glassBorder: 'rgba(213, 33, 34, 0.12)',
        glassBg: 'rgba(255, 247, 229, 0.92)'
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montreal: ['Neue Montreal', 'sans-serif'],
        display: ['Syncopate', 'sans-serif']
      },
      boxShadow: {
        'glow-orange': '0 10px 30px -5px rgba(213, 33, 34, 0.3)',
        'glow-red': '0 10px 30px -5px rgba(213, 33, 34, 0.3)',
        'glow-black': '0 10px 30px -5px rgba(26, 16, 8, 0.15)',
        'glass-card': '0 10px 30px -10px rgba(26, 16, 8, 0.08)',
        'warm-sm': '0 4px 16px -4px rgba(213, 33, 34, 0.15)',
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
