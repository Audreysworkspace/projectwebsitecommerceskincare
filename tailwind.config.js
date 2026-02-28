/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', 'system-ui', 'sans-serif'], // atau ganti font favoritmu
      },
      colors: {
        'bubblegum': '#ff9ecd',
        'softblue': '#a3d8ff',
        'mint': '#c4f4e9',
      },
    },
  },
  plugins: [],
}