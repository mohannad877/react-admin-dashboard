/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0D9488',
          hover: '#0f766e',
        },
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      }
    },
  },
  plugins: [],
}
