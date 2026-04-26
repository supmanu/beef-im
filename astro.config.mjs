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
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
