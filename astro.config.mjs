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
  
  site: 'https://lladeal.github.io', // remplazar con la URL de tu sitio web
  base: '/web-lladeal', // remplazar con la ruta base de tu sitio web, puede ser '/' si tu sitio web está en la raíz del dominio
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