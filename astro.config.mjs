// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import svelte from '@astrojs/svelte';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The `site` property specifies the base URL for your site.
  // Be sure to update this to your own domain (e.g., "https://yourdomain.com") before deploying.
  site: 'https://damocles99.github.io',
  base: '/web-lladeal',
  prefetch: true,
  devToolbar: {
    enabled: true
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ru', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  trailingSlash: 'never',
  experimental: {
    clientPrerender: true,
  },
  integrations: [react(), markdoc(), svelte(), icon({
    iconDir: 'public/uploads/icons',
  }), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});