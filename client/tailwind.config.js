/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontSize: {
        sm12: "12px",
      },
      colors: {
        primary: "#1786fa",
        secondary: "#171f4e",
        backgroundPrimary: "#cce4fe",
        backgroundSecondary: "#171f4e",
        backgroundGray: "#e4e6eb",
        backgroundHeart: "#fd213b",
        colorIcon: "#8c939d",
        colorIconMenu: "#1d1f23",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      {
        dark: {
          "base-100": "#242526",
          "base-200": "#18191a",
          "base-300": "#f9fafb",
          info: "#E4E6EB",
          hoverColor: "#3a3b3c",
        },
      },
      {
        light: {
          "base-100": "#FFFFFF",
          "base-200": "#f1f5f9",
          "base-300": "#27272a",
          info: "#333333",
          hoverColor: "#f2f2f2",
        },
      },
    ],
  },
};
