import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['17px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '6xl': ['68px', '78px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'heading-color': "#c4cfde",
        'primary': "#0e0402",
        "slate-gray": "#5f583d",
        "dark-yellow": "#f79622",
        "white-400": "rgba(255, 255, 255, 0.80)",
        "custom-green": "#1aa852",
        "herobg-gray": "#f5f5f5",
        "coral-red": "#d4374c",
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'shadow-1': '10px 10px 19px #1c1e22, -10px -10px 19px #262a2e',
        'shadow-2': 'inset 21px 21px 19px #181a1d, inset -21px -21px 19px #202225',
        'inner-shadow': '1px 4px 2px -3px rgba(0, 0, 0, 0.7) inset, -1px -3px 3px -2px rgba(255, 255, 255, 0.2) inset',
      },
    },
  },
  plugins: [],
};
export default config;
