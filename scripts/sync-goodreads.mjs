import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const GOODREADS_USER_ID = '32242336';
const SHELF = 'read';
const PAGE_SIZE = 100;
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(projectRoot, 'src/data/books.json');

function decodeEntities(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .trim();
}

function readTag(xml, tag) {
  const match = xml.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`),
  );

  return decodeEntities(match?.[1] ?? match?.[2] ?? '');
}

function toDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date.toISOString().slice(0, 10);
}

function parseBook(item) {
  const id = readTag(item, 'book_id');
  const dateRead = toDate(readTag(item, 'user_read_at'));
  const dateAdded = toDate(readTag(item, 'user_date_added'));
  const shelves = readTag(item, 'user_shelves')
    .split(',')
    .map((shelf) => shelf.trim())
    .filter(Boolean);
  const shelfYear = shelves.find((shelf) => /^20\d{2}$/.test(shelf));

  return {
    id,
    title: readTag(item, 'title'),
    author: readTag(item, 'author_name').replace(/\s+/g, ' '),
    cover: readTag(item, 'book_large_image_url'),
    url: `https://www.goodreads.com/book/show/${id}`,
    rating: Number(readTag(item, 'user_rating')) || null,
    dateRead,
    dateAdded,
    yearRead: dateRead?.slice(0, 4) ?? shelfYear ?? null,
    yearPublished: Number(readTag(item, 'book_published')) || null,
    pages: Number(readTag(item, 'num_pages')) || null,
  };
}

async function fetchPage(page) {
  const url = new URL(`https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}`);
  url.searchParams.set('shelf', SHELF);
  url.searchParams.set('page', String(page));

  const response = await fetch(url, {
    headers: { 'user-agent': 'kcygan.dev bookshelf sync' },
  });

  if (!response.ok) {
    throw new Error(`Goodreads returned ${response.status} for page ${page}.`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => parseBook(match[1]));
}

const books = [];

for (let page = 1; ; page += 1) {
  const pageBooks = await fetchPage(page);
  books.push(...pageBooks);

  if (pageBooks.length < PAGE_SIZE) break;
}

const uniqueBooks = [...new Map(books.map((book) => [book.id, book])).values()].sort((a, b) => {
  const aDate = a.dateRead ?? a.dateAdded ?? '';
  const bDate = b.dateRead ?? b.dateAdded ?? '';
  return bDate.localeCompare(aDate) || a.title.localeCompare(b.title);
});

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(uniqueBooks, null, 2)}\n`);

console.log(`Synced ${uniqueBooks.length} books from Goodreads.`);
