/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: '#f00'
      },
      fontFamily: {
        poppins: ["Poppins", 'sans-serif'],
      },
    },
  },
  plugins: [],
}

