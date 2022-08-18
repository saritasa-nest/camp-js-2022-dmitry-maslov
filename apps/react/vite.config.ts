/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@js-camp/react/components': path.relative(__dirname, 'src/components'),
      '@js-camp/react/store': path.resolve(__dirname, 'src/store'),
      '@js-camp/libs': path.resolve(__dirname, '../../libs'),
      '@js-camp/core': path.resolve(__dirname, '../../libs/core'),
    },
  },
});
