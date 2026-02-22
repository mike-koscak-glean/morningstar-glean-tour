/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glean-blue': '#1C5BE0',
        'glean-gray': '#5F6368',
        'glean-border': '#E8EAED',
        'glean-text': '#1F1F1F',
        'glean-bubble': '#F1F3F4',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
