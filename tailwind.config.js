/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Paleta da marca Frutou — verde (mão/folha) + laranja (fruta).
        primary: {
          DEFAULT: '#2E7D32',
          light: '#5BA83E',
          dark: '#1E5E2A',
        },
        accent: {
          DEFAULT: '#F5871F',
          light: '#FBA94C',
          dark: '#E06A0E',
        },
        surface: '#FFFFFF',
        background: '#FFFFFF',
        input: '#F4F5F3',
        line: '#E4E7E2',
        ink: '#1F2421',
        muted: '#6B7280',
        danger: '#DC2626',
      },
      borderRadius: {
        field: '14px',
      },
    },
  },
  plugins: [],
};
