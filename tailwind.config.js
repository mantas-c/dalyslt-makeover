/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './app/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#16a34a',
          'green-light': '#22c55e',
          'green-dark': '#15803d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
