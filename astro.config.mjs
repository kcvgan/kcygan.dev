import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kcygan.dev',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
