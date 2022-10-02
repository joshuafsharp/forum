import { createSSRApp, defineComponent } from 'vue';

import { PageShell } from './PageShell';
import { setPageContext } from './usePageContext';

import type { PageContext } from '~/types/viteSsr';

export { createApp };

function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;

  const PageWithLayout = defineComponent({
    name: 'PageWithLayout',

    setup() {
      return () => <PageShell>{Page ? <Page {...pageProps} /> : <></>}</PageShell>;
    },
  });

  const app = createSSRApp(PageWithLayout);

  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext);

  return app;
}
