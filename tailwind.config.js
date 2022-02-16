module.exports = {
  mode: 'jit',
  content: ['./index.html'],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
    },
    extend: {
      colors: {
        'very-light-red': 'hsl(13, 100%, 72%)',
        'border-grey': '#F1F1F1',
        'border-darker-grey': '#dedede',
        'active-button': '#3CB4AB',
        'theme-green': '#3CB4AB',
      },
      backgroundImage: {
        'desktop-banner': "url('../assets/desktops.jpg')",
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xl: { max: '1440px' },
        // => @media (max-width: 1440px) { ... }

        lg: { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        md: { max: '767px' },
        // => @media (max-width: 767px) { ... }

        sm: { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};
