/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "camino-blue": "#0000ff",
        "camino-yellow": "#ffff00",
      },
    },
  },
  plugins: [],
}
