/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Paleta da logo Frutou — verde (mão/folha) + laranja (fruta).
        // Ajustar tons finos quando os prints de design chegarem.
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
        muted: '#6B7280',
      },
    },
  },
  plugins: [],
};
