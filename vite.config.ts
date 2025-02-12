import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/my-genshin-impact-characters/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@renderer': resolve(__dirname, './src/renderer'),
      '~js': resolve(__dirname, './src/renderer/js'),
      '~styles': resolve(__dirname, './src/renderer/assets/styles'),
      '~fonts': resolve(__dirname, './src/renderer/assets/fonts'),
    },
  },
  publicDir: 'src/renderer/public',
});
