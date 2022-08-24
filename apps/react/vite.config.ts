/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin({ eslintOptions: { cache: false } })],
  resolve: {
    alias: {
      '@js-camp/react': path.resolve(__dirname, '../react/src'),
      '@js-camp/core': path.resolve(__dirname, '../../libs/core'),
      '@js-camp/utils': path.resolve(__dirname, '../../libs/utils'),
      '@js-camp': path.resolve(__dirname, '../..'),
    },
  },
});
