import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#2bb1bb',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        prompt: ['var(--font-prompt)'],
        sarabun: ['var(--font-sarabun)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
