/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1CA343",
        "primary-dark": "#1B4D24",
        ink: "#1A5C2A",
        surface: "#E3F4E2",
        card: "#B9E4BF",
        "card-soft": "#DDF5DF",
        line: "#7FD08A",
        muted: "#7FA88A",
      },
    },
  },
  plugins: [],
};
