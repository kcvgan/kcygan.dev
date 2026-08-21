# kcygan.dev

A deliberately small personal site and writing archive. It is built with Astro,
ships static HTML, and keeps every article in a plain Markdown file.

## Run it locally

```sh
npm install
npm run dev
```

The site is available at `http://localhost:4321`.

## Publish an article

The easiest route is the browser editor at `https://kcygan.dev/admin`:

1. Choose **New article**.
2. Paste the text from Notes.
3. Add a title, date, and optional one-line description.
4. Drop images into the editor or choose a cover image.
5. Press **Publish**. The article is committed to GitHub and Netlify rebuilds the site.

The editor uses the existing GitHub and Netlify authentication setup. If GitHub
authorization ever needs to be reconnected, do it once in Netlify under
**Site configuration → Access & security → OAuth**.

### Write directly in Markdown

Create `src/content/blog/my-article.md`:

```md
---
title: A clear, human title
date: 2026-08-21
description: One optional sentence for the writing index and link previews.
draft: false
image: /images/writing/my-article/cover.jpg
imageAlt: A useful description of the cover image.
---

Paste the article here. Regular Markdown works.

![A useful description](/images/writing/my-article/another-image.jpg)
```

Put images in `public/images/writing/my-article/`. Set `draft: true` to keep an
article out of the built site while editing.

## Project map

- `src/content/blog/` — articles
- `public/images/writing/` — article images
- `src/pages/` — the home, about, writing index, and article template
- `src/styles/global.css` — the small shared design system
- `public/admin/config.yml` — browser editor fields

## Checks

```sh
npm run check
npm run build
npm run preview
```
