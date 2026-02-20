import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        electric: '#00FF85',
        'electric-dim': '#00CC6A',
        dark: {
          900: '#020202',
          800: '#0A0A0A',
          700: '#111111',
          600: '#1A1A1A',
          500: '#222222',
          400: '#2A2A2A',
        }
      },
      fontFamily: {
        display: ['var(--font-clash)', 'sans-serif'],
        body: ['var(--font-syne)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 133, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 133, 0.7)' },
        },
        'slide-up': {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        }
      },
      backgroundImage: {
        'green-glow': 'radial-gradient(ellipse at center, rgba(0,255,133,0.15) 0%, transparent 70%)',
        'grid-pattern': 'linear-gradient(rgba(0,255,133,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,133,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      }
    },
  },
  plugins: [],
}
export default config
