import type { APIRoute } from 'astro';

const BASE_URL = import.meta.env.BASE_URL;

const buildSitemapPath = () => {
  const normalizedBase = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');
  return `${normalizedBase}/sitemap-index.xml`;
};

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Missing site URL for robots.txt generation.', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const sitemapURL = new URL(buildSitemapPath(), site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
