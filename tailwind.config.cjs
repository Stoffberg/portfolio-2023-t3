// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--inter-font)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        main: {
          dark: "#0A071B",
          medium: "#141125",
          light: "#7F79A3",
          border: "#2A263F",
        },
        accent: {
          dark: "#241ED1",
          light: "#5138EE",
        },
        info: {
          dark: "#1A1F35",
          light: "#5ABDDE",
        },
        warning: {
          dark: "#261F2A",
          light: "#C4852A",
        },
      },
      screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    },
  },
  plugins: [],
};
