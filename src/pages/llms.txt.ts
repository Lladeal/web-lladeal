import type { APIRoute } from 'astro';

import { generateLlmsTxt } from '@utils/llms';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Missing site URL for llms.txt generation.', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new Response(generateLlmsTxt(site), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
