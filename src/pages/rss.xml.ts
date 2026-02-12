import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? 'https://locusamoenus.com';
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map((post) => {
      const link = `${base}/blog/${post.slug}/`;
      return `    <item>\n      <title>${escapeXml(post.data.title)}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>\n      <description>${escapeXml(post.data.description)}</description>\n    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Locus Amoenus Blog</title>\n    <link>${base}/blog/</link>\n    <description>Research and product notes on immersive memory design and virtual reality presence.</description>\n${items}\n  </channel>\n</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
};
