import { createApp } from './app';

import type { PageContextClient } from '../types/viteSsr';

export { render };

async function render(pageContext: PageContextClient) {
  const app = createApp(pageContext);
  app.mount('#app');
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
