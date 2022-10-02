import * as path from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), ssr(), eslintPlugin()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '/src'),
    },
  },
});
