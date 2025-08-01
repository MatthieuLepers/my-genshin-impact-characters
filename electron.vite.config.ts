import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      swcPlugin(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@renderer': resolve(__dirname, './src/renderer'),
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@renderer': resolve(__dirname, './src/renderer'),
        '~js': resolve(__dirname, './src/renderer/js'),
        '~styles': resolve(__dirname, './src/renderer/assets/styles'),
        '~fonts': resolve(__dirname, './src/renderer/assets/fonts'),
      },
    },
    plugins: [vue()],
  },
});
