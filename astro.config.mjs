import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://beef.im',
  srcDir: './src',
  publicDir: './public',
  // Removed sitemap() temporarily because it throws _routes.reduce is not a function with current version combination
  // Exact error: Cannot read properties of undefined (reading 'reduce') at astro:build:done (node_modules/@astrojs/sitemap/dist/index.js:85:37)
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
