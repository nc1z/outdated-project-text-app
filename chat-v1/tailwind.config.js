/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        dark: 'var(--color-bg-sand)',
        white: 'var(--color-bg-white)',

        black: 'var(--color-bg-black)',
        darkBlue: 'var(--color-bg-darkBlue)',
        blue: 'var(--color-bg-blue)',
        grayBlue: 'var(--color-bg-grayBlue)',
        lightBlue: 'var(--color-bg-lightBlue)',

        input: 'var(--color-bg-input)',
        box: 'var(--color-bg-box)',
        boxDark: 'var(--color-bg-box-dark)',

      },
      textColor: {
        accent: 'var(--color-text-accent)',
        header: 'var(--color-text-header)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        light: 'var(--color-text-light)',
        sand: 'var(--color-text-sand)',
      },

      borderColor: {
        primary: 'var(--color-bg-grayBlue)',
        secondary: 'var(--color-bg-lightBlue)',
        darkBlue: 'var(--color-bg-darkBlue)',
        input: 'var(--color-bg-input)',
        accent: 'var(--color-bg-blue)',
        light: 'var(--color-bg-sand)',
      },

      backgroundImage: {
        'light': "url('./images/background-5.jpg')",
        'alt': "url('./images/background-6.jpg')",
        
      }

    },
  },
  plugins: [],
}
