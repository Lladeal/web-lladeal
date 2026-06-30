import type { APIRoute } from 'astro';

import { generateLlmsFullTxt } from '@utils/llms';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Missing site URL for llms-full.txt generation.', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new Response(await generateLlmsFullTxt(site), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
