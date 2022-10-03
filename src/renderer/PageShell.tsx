import { defineComponent } from 'vue';

import { InternalLink } from './InternalLink';

import './PageShell.css';

export const PageShell = defineComponent({
  name: 'PageShell',

  setup(_props, { slots }) {
    console.log(slots);

    return () => (
      <div class="layout">
        <div class="navigation">
          <a href="/" class="logo">
            <img src="./logo.svg" height="64" width="64" alt="logo" />
          </a>

          <InternalLink href="/">Home</InternalLink>
          {/* <InternalLink href="/about">About</InternalLink> */}
        </div>

        <div class="content">{slots.default && slots.default()}</div>
      </div>
    );
  },
});
