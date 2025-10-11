/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    {
      pattern: /bg-yellow-.*/,
    },
    'backdrop-blur-lg',
    'border-2',
    'border-yellow-400',
    'rounded-2xl',
    'shadow-2xl',
    'p-6',
    'text-yellow-900',
    'animate-scale-in',
    'font-bold',
    'text-2xl',
    'text-yellow-800',
    'drop-shadow-sm',
    'text-base',
    'leading-relaxed',
    'bg-gradient-to-tr',
    'from-yellow-300',
    'to-yellow-500',
    'text-yellow-950',
    'font-semibold',
    'rounded-lg',
    'px-5',
    'py-2',
    'shadow-md',
    'hover:from-yellow-400',
    'hover:to-yellow-300',
    'transition',
    'duration-200',
    'ease-in-out',
    'mt-4'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-gray': '#0b0b0b',
        'neutral-gray': '#333533',
        'cream': '#f2ecdd',
        'warm-yellow': '#f5cb5c',
        'golden-brown': '#cd9c20'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}