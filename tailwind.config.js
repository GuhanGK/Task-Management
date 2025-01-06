/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  corePlugins: {
    important: true, // Enable important variants
  },

  theme: {
    extend: {},
  },
  plugins: [],
}

