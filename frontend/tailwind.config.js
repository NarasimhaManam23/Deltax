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
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a8f8',
          500: '#0e8ce9',
          600: '#026fc7',
          700: '#0358a1',
          800: '#074b85',
          900: '#0c3f6e',
          950: '#082849',
        },
        dark: {
          bg: '#090d16',
          card: '#0f172a',
          cardHover: '#1e293b',
          border: '#1e293b',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
