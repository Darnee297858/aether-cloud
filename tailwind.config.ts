import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          green: "#00FF66",
          dark: "#050508",
          card: "rgba(10, 10, 15, 0.75)",
        },
      },
    },
  },
  plugins: [],
};
export default config;