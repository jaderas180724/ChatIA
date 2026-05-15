/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0B0F19',
        'dark-secondary': '#1A1F2E',
        'dark-tertiary': '#242B38',
        'accent-cyan': '#00D9FF',
        'accent-purple': '#9D4EDD',
        'accent-pink': '#FF006E',
        'accent-blue': '#0099FF',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
