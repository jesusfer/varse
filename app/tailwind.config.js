/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        backgroundPopup: '#0000007F',
        panel: {
          background: '#18181b',
          border: '#27272a',
        },
        cta: {
          base: '#fafafa',
          hover: '#cccccc',
          text: '#18181b',
        },
        text: {
          1: '#fafafa',
          2: '#a1a1aa',
        },
        input: {
          active: '#ffffff10',
        },
        positive: '#9BFF9D',
        destructive: '#FF9B9B',
      },
    },
  },
  plugins: [],
}
