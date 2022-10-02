import { defineComponent } from 'vue';

interface Props {
  is404?: boolean
}

export const ErrorPage = defineComponent({
  name: 'ErrorPage',

  setup() {
    const props = defineProps<Props>();

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
