import { defineComponent } from 'vue';

import type { PropType } from 'vue';

export const ErrorPage = defineComponent({
  name: 'ErrorPage',

  props: {
    is404: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  setup(props) {
    return () => (
      <div>
        {props.is404 ? (
          <>
            <h1>404 Page Not Found</h1>
            <p>This page could not be found.</p>
          </>
        ) : (
          <>
            <h1>500 Internal Server Error</h1>
            <p>Something went wrong.</p>
          </>
        )}
      </div>
    );
  },
});
