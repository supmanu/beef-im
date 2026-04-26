/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F0EADC',
          card: '#F8F2E4',
          deep: '#E3DAC3',
        },
        ink: '#1B1A17',
        red: {
          DEFAULT: '#CC3A2F',
          stamp: '#A84030',
        },
        navy: '#2B4A5E',
        burn: '#B85C38',
        teal: '#2E6D63',
        gold: '#C7B78F',
        highlight: '#F4EED8',
        'grid-line': 'rgba(120,100,75,0.11)',
      },
      fontFamily: {
        thai: ['Sarabun', 'sans-serif'],
        serif: ['Noto Serif Thai', 'serif'],
        display: ['Anuphan', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        hand: ['K2D', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
