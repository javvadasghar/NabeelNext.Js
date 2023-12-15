import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#151516",
        "grey-light": "#999999",
        dark: "#0D0E0E",
        "dark-2": "#111111",
        "bright-green": "#03F719",
        "bright-yellow": "#DDFD00",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
