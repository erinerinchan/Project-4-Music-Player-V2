module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1500px",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        },
      },
      animation: {
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif']
    }
  },
  variants: {
    extend: {},
    scrollbar: ["rounded"]
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")
  ]
}
