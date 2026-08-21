import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';

export const GET: APIRoute = async ({ site }) => {
  const baseURL = site ?? new URL('https://kcygan.dev');
  const posts = await getPublishedPosts();
  const paths = ['/', '/about', '/blog', ...posts.map((post) => `/blog/${post.id}`)];
  const urls = paths
    .map((path) => `<url><loc>${new URL(path, baseURL).href}</loc></url>`)
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
