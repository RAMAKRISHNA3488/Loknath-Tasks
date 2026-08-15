/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soundpure: {
          dark: '#0B0F17',
          darker: '#06080D',
          card: '#131A29',
          cardHover: '#1A2438',
          border: '#1F2B42',
          accent: '#00F0FF',
          accentHover: '#00D6E6',
          purple: '#7B2CBF',
          gold: '#FFD700',
          muted: '#94A3B8',
          // Light theme tokens from SoundPure visual references:
          lightBg: '#F0F5FA',
          lightCard: '#FFFFFF',
          lightBorder: '#E2E8F0',
          textDark: '#0F172A',
          textMuted: '#64748B',
          brandBlue: '#0284C7',
          brandNavy: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
