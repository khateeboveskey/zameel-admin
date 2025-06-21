import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.spec.ts'],
    deps: {
      inline: [/@nuxt/, /@vue/, /vue/, /@tanstack/, /@headlessui/],
    },
    coverage: {
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': __dirname,
      '~': __dirname,
      '#components': path.resolve(__dirname, 'tests/__mocks__/components'),
    },
  },
});
