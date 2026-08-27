/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0D0D0D',
          surface: '#151515',
          card: '#1B1B1B',
          border: 'rgba(255,255,255,0.08)',
          text: '#F5F3EF',
          muted: '#AAA7A2',
          orange: '#D96B32',
          'orange-hover': '#E47A3E',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
    },
  },
  plugins: [],
};
