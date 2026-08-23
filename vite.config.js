import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = import.meta.dirname;

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        human: resolve(root, 'human.html'),
        ai: resolve(root, 'ai.html'),
      },
    },
  },
});
