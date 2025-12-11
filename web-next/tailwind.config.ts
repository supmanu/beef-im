import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./context/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
        "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-teal': '#2bb1bb',  // Logic/Primary
                'brand-amber': '#F59E0B', // Action/Warning
                'brand-dark': '#0B1D35'   // Background
            },
            typography: {
                DEFAULT: {
                    css: {
                        'blockquote p:first-of-type::before': { content: 'none' },
                        'blockquote p:first-of-type::after': { content: 'none' },
                    },
                },
            },
            animation: {
                'zoom-out': 'zoom-out 2s ease-out forwards',
                'fade-up': 'fade-up 1s ease-out forwards',
                'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
            },
            fontFamily: {
                prompt: ['Prompt', 'sans-serif'],
                sarabun: ['Sarabun', 'sans-serif'],
            },
            keyframes: {
                'zoom-out': {
                    '0%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1.0)' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in-right': {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
