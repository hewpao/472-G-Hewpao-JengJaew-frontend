import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#493D9E",
        secondary: "#B2A5FF",
        tertiary: "#DAD2FF",
        'dark-primary': "#221D57",
        accent: "#FFF2AF"
      },
    },
    boxShadow: {
      md: '0 4px 6px -1px rgba(34, 29, 87, 1)',
      lg: '0 10px 15px -3px rgba(34, 29, 87, 0.75)',
    }
  },
  plugins: [],
} satisfies Config;
