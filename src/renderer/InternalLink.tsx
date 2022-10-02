import { defineComponent } from 'vue';

import { usePageContext } from './usePageContext';
import './InternalLink.css'


export const InternalLink = defineComponent({
  name: 'InternalLink',
  
  setup(_props, { attrs }) {
    const pageContext = usePageContext();
    
    return () => (
      <a class={{ active: pageContext.urlPathname === attrs.href }}>
        <slot />
      </a>
    );
  },
});
