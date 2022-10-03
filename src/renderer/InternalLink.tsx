import { defineComponent } from 'vue';

import { usePageContext } from './usePageContext';

export const InternalLink = defineComponent({
  name: 'InternalLink',

  setup(_props, { slots, attrs }) {
    const pageContext = usePageContext();

    return () => (
      <a class={{ active: pageContext.urlPathname === attrs.href }}>
        {slots.default && slots.default()}
      </a>
    );
  },
});
