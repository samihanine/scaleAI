module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        primary: '#1F80C1',
        'primary-light': '#A5DDF2',
        'primary-dark': '#414C6B',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};