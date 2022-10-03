import { defineComponent } from 'vue';

// import { InternalLink } from './InternalLink';

export const PageShell = defineComponent({
  name: 'PageShell',

  setup(_props, { slots }) {
    return () => <div>{slots.default && slots.default()}</div>;
  },
});
