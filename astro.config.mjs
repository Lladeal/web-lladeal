// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import svelte from '@astrojs/svelte';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

const defaultLocale = 'es';
const localeCodes = ['es', 'en', 'ru', 'zh', 'de'];
const sitemapLocales = {
  es: 'es',
  en: 'en',
  ru: 'ru-RU',
  zh: 'zh-CN',
  de: 'de-DE',
};

// https://astro.build/config
export default defineConfig({
  
  site: 'https://www.lladeal.com/', // remplazar con la URL de tu sitio web
  base: '/', // remplazar con la ruta base de tu sitio web, puede ser '/' si tu sitio web está en la raíz del dominio
  prefetch: true,
  devToolbar: {
    enabled: true
  },
  i18n: {
    defaultLocale,
    locales: localeCodes,
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
  }), sitemap({
    i18n: {
      defaultLocale,
      locales: sitemapLocales,
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
