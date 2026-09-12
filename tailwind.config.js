/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        elevia: {
          purple: '#4C2A85',
          purpleDeep: '#2E1A57',
          lilac: '#9B7FD4',
          lilacSoft: '#EDE7FA',
          blue: '#2E4FA3',
          aqua: '#22B8A0',
          aquaSoft: '#E3F7F3',
          ink: '#1E1A2B',
          gray: '#F4F4F7',
          grayLine: '#E2E1EA',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(30, 26, 43, 0.06), 0 8px 24px -8px rgba(46, 26, 87, 0.12)',
      },
    },
  },
  plugins: [],
}
