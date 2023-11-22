import type { Config } from "tailwindcss"
import { nextui } from "@nextui-org/react"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#101419",
            secondary: "#FF9F21",
            content1: "#181E25",
            content2: "#0c1012",
            content3: "#101419",
            content4: "#202832",
            default: {
              "50": "#F3F5F7",
              "100": "#E7EBEF",
              "200": "#DAE0E7",
              "300": "#CED6DF",
              "400": "#C1CBD7",
              "500": "#B4C0CF",
              "600": "#A8B6C7",
              "700": "#9BACBF",
              "800": "#8FA2B7",
              "900": "#8398AF",
              foreground: "#C1CBD7",
              DEFAULT: "#303C4A",
            },
            foreground: "#9EA1A9",
          },
        },
      },
    }),
    require("tw-elements/dist/plugin.cjs"),
  ],
}
export default config
