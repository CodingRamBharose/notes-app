/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgreen: "#00B46E",
        darkgreen: "#004440",
        light: "#F5F5F5",
        dark: "#161616",
        mygray: "#475157",
        cream: "#F3E7D1" 

      },
  },
},
plugins: [],
}

