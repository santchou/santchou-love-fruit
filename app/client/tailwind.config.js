module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "svg-image": "url('./img/endless-constellation.svg')",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
