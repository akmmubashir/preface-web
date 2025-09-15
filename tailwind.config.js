// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#ffffff", 
        "secondary-color": "#000000", 
        "tertiary-color": "#d5d5d5", 
      },
    },
  },
  plugins: [],
};
