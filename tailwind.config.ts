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
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            // Fix: Force strong tags to be slate-200 (primary text color)
            strong: {
              color: theme('colors.slate.200'),
              fontWeight: '700',
            },
            // Links should be teal
            a: {
              color: theme('colors.brand.teal'),
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': {
                color: theme('colors.brand.amber'),
              },
            },
            // Remove default quote marks from blockquotes
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
