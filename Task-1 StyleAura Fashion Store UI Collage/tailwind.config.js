/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E5094C', // Primary Red
          dark: '#C80036',    // Hover/Darker Red
          light: '#FF4D79',   // Light Red Accent
          soft: '#FFF0F3',    // Soft Light Red Background
        },
        brand: {
          dark: '#121214',
          gray: '#1E1E22',
          light: '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
