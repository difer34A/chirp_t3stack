/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
        display: ["group-hover"],
    },
    },
};

module.exports = config;
