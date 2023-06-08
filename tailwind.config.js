const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./original_components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)"],
      },
      minHeight: {
        screen_90: "90vh",
        screen_88: "88vh",
        screen_80: "80vh",
        screen_70: "70vh",
        screen_75: "75vh",
        screen_60: "60vh",
        screen_65: "65vh",
        screen_50: "50vh",
        screen_40: "40vh",
        screen_39: "39vh",
        screen_30: "30vh",
        screen_20: "20vh",
        screen_10: "10vh",
      },
      colors: {
        transparent: "transparent",
        primary: "#7DCFFA",
        secondary: "#B5E1F9",
        thirdinary: "#F4BBA2",
        accent: "#F9CDB5",
        accentMono: "#F5AD86",
        accentAnalogousOne: "#F9EFB5",
        accentAnalogousTwo: "#F9B5BF",
        accentTriad: "#B5F9CD",
        accentTriad: "#CDB5F9",
        accentTetraTwo: "#BFF9B5",
        accentTetraThree: "#B5E1F9",
        accentTetraFour: "#EFB5F9",
        slateSevenHundred: "#334155",
        slateEightHundred: "#1e293b",
        slateNineHundred: "#0f172a",
      },
      keyframes: {
        fade_in: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-30deg)" },
          "5%": { transform: "rotate(-30deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-2px)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(2px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      translate: {
        "-full": "-100%",
        "-1/2": "-50%",
        "-1/3": "-33.333333%",
        "-1/4": "-25%",
        "-2/3": "-66.666667%",
        "-2/5": "-40%",
        "-3/4": "-75%",
        "-3/5": "-60%",
        "-4/5": "-80%",
        "-9/10": "-90%",
      },
      animation: {
        fade_in: "fade_in 2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wiggle: "wiggle 10s ease-out",
        bounce: "bounce 1s ease-in-out infinite",
        "bounce-one": "bounce 2s ease-in-out 0s infinite",
        "bounce-two": "bounce 2s ease-in-out 0.12s infinite",
        "bounce-three": "bounce 2s ease-in-out 0.24s infinite",
        "bounce-four": "bounce 2s ease-in-out .36s infinite",
        "bounce-five": "bounce 2s ease-in-out .48s infinite",
        "bounce-six": "bounce 2s ease-in-out .50s infinite",
        "bounce-seven": "bounce 2s ease-in-out .62s infinite",
        "bounce-eight": "bounce 2s ease-in-out .74s infinite",
        "bounce-nine": "bounce 2s ease-in-out .86s infinite",
        "bounce-ten": "bounce 2s ease-in-out .98s infinite",
        "spin-slow": "spin 1s linear infinite",
        "spin-slower": "spin 4s linear infinite",
        "spin-fast": "spin 0.3s linear infinite",
      },
    },
  },
}
