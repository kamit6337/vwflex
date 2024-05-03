/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        my_bg: "#10100F",
        my_white: "#FCF9F8",
        my_hover: "#191616",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        laptop: { max: "1280px" },
        // => @media (max-width: 1279px) { ... }

        sm_lap: { max: "900px" },
        // => @media (max-width: 1023px) { ... }

        tablet: { max: "680px" },
        // => @media (max-width: 767px) { ... }

        mobile: { max: "640px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};
