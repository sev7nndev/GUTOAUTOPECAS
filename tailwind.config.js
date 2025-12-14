/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D90429',
          darkRed: '#8D0801',
          dark: '#050505',
          charcoal: '#111111',
          gray: '#F4F4F5',
          silver: '#E5E7EB',
          offWhite: '#F9FAFB',
        }
      },
      fontFamily: {
        sans: ['"Exo 2"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll 80s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'neon': '0 0 20px rgba(217, 4, 41, 0.5)',
      }
    },
  },
  plugins: [],
}