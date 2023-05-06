/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        boxShadow: {
          tableShadow: '0px 16px 40px -2px rgba(46, 72, 133, 0.2)',
          'btnAccentHover': '0px 16px 40px -2px rgba(255, 202, 42, 0.2)',
          'btnPrimary': '0px 2px 8px -2px rgba(20, 38, 86, 0.16)',
          catalogShadow: "0px 16px 40px -2px rgba(46, 72, 133, 0.2)",
        },
        fontFamily: {
          rubik:  ['"Rubik"', "sans-serif"],
        },
        fontWeight: {
          light: "600",
        },
        colors: {
          primary: {
            "00": "#E6E9F0",
            "20": "#98A5C4",
            "40": "#53699C",
            "60": "#2E4885",
            "90": "#142656",
          },
          secondary: {
            "00": "#FFF8E1",
            "20": "#FFE083",
            "30": "#FFC123",
            "40": "#FFCA2A",
            "60": "#FFB306",
            "90": "#FE6F04",
          },
          white: {
            "00": "#FFFFFF",
            "10": "#FAFAFA",
            "20": "#F5F5F5",
            "30": "#F0F0F0",
            "60": "#F6F7F9",
            "70": "#E6E9F0"
          },
          black: {
            "00": "#C2C2C2",
            "10": "#979797",
            "20": "#818181",
            "30": "#606060",
            "40": "#3C3C3C"
          },
          green: {
            "00": "#E6F5EB",
            "20": "#9AD6AE",
            "40": "#4FBA77",
            "60": "#1F9F55",
            "90": "#005D2B"
          },
          red: {
            "00": "#CB2D3E",
            "20": "#EC9C9D",
            "40": "#EB5757",
            "60": "#E13F3D",
            "90": "#B32425"
          },
          blue: {
            "00": "#2F80ED"
          }
        },
        screens: {
          '2xl': '1320px'
        }
      },
    },
    plugins: [],
  }

export default config;