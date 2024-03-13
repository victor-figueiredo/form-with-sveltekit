module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('daisyui'),
    ],
  }