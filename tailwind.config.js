/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      screens: {
        xs: '420px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
        pop: '0 10px 30px -10px rgb(0 0 0 / 0.25)',
      },
      colors: {
        // Brand: gold for heads (and the main accent), indigo for tails.
        heads: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
          500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03',
        },
        tails: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
          500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b',
        },
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
