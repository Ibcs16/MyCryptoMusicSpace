module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      16: "4rem",
      animated: "250% 200%",
    },
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      primary: "rgb(194, 255, 182)",
      danger: "rgb(255, 163, 182)",
      secondary: "rgb(221, 169, 255)",
      tertiary: "rgb(162, 209, 255)",
    }),
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: "1rem",
    //     sm: "16px",
    //     md: "120px",
    //     xl: "100px",
    //   },
    // },
    container: false,
    fontSize: {
      xs: "14px",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
    extend: {
      animation: {
        attention: "jump 0.6s ease infinite alternate",
        bg: "waves 5s ease infinite",
      },
      keyframes: {
        waves: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        jump: {
          "0%": {
            transform: "scale(1)",
            "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.15)",
          },
          "100%": {
            transform: "scale(1.05)",
            "box-shadow": "0 4px 20px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [],
};
