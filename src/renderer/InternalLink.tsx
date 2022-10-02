import { defineComponent } from 'vue';

import { usePageContext } from './usePageContext';
import './InternalLink.css';

export const InternalLink = defineComponent({
  name: 'InternalLink',

  setup(_props, { slots, attrs }) {
    const pageContext = usePageContext();

    console.log(slots.default && slots.default());
    return () => (
      <a class={{ active: pageContext.urlPathname === attrs.href }}>
        {slots.default && slots.default()}
      </a>
    );
  },
});
