import type { APIRoute } from 'astro';
import { allPagePairs } from '@/lib/sitemap';

/** sitemap.xml with hreflang alternates (fr-CA, en-CA, x-default → French). */
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const pairs = await allPagePairs();

  const urls = pairs.flatMap((pair) =>
    (['fr', 'en', 'fa'] as const)
      .filter((lang) => pair[lang])
      .map(
        (lang) => `  <url>
    <loc>${esc(abs(pair[lang]!))}</loc>${pair.lastmod ? `\n    <lastmod>${pair.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${esc(abs(pair.fr))}"/>
    <xhtml:link rel="alternate" hreflang="en-CA" href="${esc(abs(pair.en))}"/>${
      pair.fa
        ? `
    <xhtml:link rel="alternate" hreflang="fa" href="${esc(abs(pair.fa))}"/>`
        : ''
    }
    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(pair.fr))}"/>
  </url>`,
      ),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
