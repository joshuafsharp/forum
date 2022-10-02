import * as path from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), ssr()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '/src'),
    },
  },
});
