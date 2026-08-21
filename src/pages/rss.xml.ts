import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const baseURL = site ?? new URL('https://kcygan.dev');
  const posts = await getPublishedPosts();
  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${post.id}`, baseURL).href;

      return `<item>
  <title>${escapeXml(post.data.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${post.data.date.toUTCString()}</pubDate>
  ${post.data.description ? `<description>${escapeXml(post.data.description)}</description>` : ''}
</item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Kacper Cygan</title>
  <link>${baseURL.href}</link>
  <description>Writing about software, products, and work.</description>
  <language>en</language>
  ${items}
</channel>
</rss>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
