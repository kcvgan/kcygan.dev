import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kcygan.dev',
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
