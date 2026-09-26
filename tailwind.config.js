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
        coin: {
          gold: {
            light: '#ffd700',
            DEFAULT: '#f59e0b',
            dark: '#b45309',
            edge: '#78350f'
          },
          silver: {
            light: '#f1f5f9',
            DEFAULT: '#94a3b8',
            dark: '#475569',
            edge: '#334155'
          },
          bronze: {
            light: '#fdba74',
            DEFAULT: '#ea580c',
            dark: '#9a3412',
            edge: '#7c2d12'
          },
          cyber: {
            light: '#67e8f9',
            DEFAULT: '#06b6d4',
            dark: '#0e7490',
            edge: '#164e63'
          }
        }
      },
      keyframes: {
        'coin-lift': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-48px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' }
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
