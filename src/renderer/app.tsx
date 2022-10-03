import { createSSRApp, defineComponent } from 'vue';

import { PageShell } from './PageShell';
import { setPageContext } from './usePageContext';

import type { PageContext } from '~/types/viteSsr';

import '~/assets/css/tailwind.css';

export const createApp = (pageContext: PageContext) => {
  const { Page, pageProps } = pageContext;

  const PageWithLayout = defineComponent({
    name: 'PageWithLayout',

    setup() {
      return () => {
        if (Page) {
          return (
            <PageShell>
              <Page {...pageProps} />
            </PageShell>
          );
        }

        return <PageShell />;
      };
    },
  });

  const app = createSSRApp(PageWithLayout);

  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext);

  return app;
};
