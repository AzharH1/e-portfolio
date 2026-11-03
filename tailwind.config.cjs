/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0B1215",
        secondary: "#A8B8B5",
        tertiary: "#152126",
        "black-100": "#152126",
        "black-200": "#101B20",
        "white-100": "#F2F5F0",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #08100E",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(ellipse at 70% 55%, #173D354D 0%, transparent 65%)",
      },
    },
  },
  plugins: [],
};
