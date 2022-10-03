import { defineComponent, ref } from 'vue';

import { supabase } from '../supabase';

import type { ApiError } from '@supabase/supabase-js';

export const Auth = defineComponent({
  name: 'Auth',

  setup() {
    const loading = ref(false);
    const email = ref('');

    const handleLogin = async (e: any) => {
      e.preventDefault();

      try {
        loading.value = true;
        const { error } = await supabase.auth.signIn({ email: email.value });
        if (error) {
          throw error;
        }

        alert('Check your email for the login link!');
      } catch (error) {
        alert((error as ApiError).message);
      } finally {
        loading.value = false;
      }
    };

    return () => (
      <form class="row flex-center flex" onSubmit={handleLogin}>
        <pre>
          {JSON.stringify(email.value, null, 2)}
          {/* {loading} */}
        </pre>
        <div class="col-6 form-widget">
          <h1 class="header">Supabase + Vue 3</h1>
          <p class="description">Sign in via magic link with your email below</p>
          <div>
            <input class="inputField" type="email" placeholder="Your email" v-model={email.value} />
          </div>
          <div>
            <input
              type="submit"
              class="button block"
              value={loading.value ? 'Loading' : 'Send magic link'}
              disabled={loading.value}
            />
          </div>
        </div>
      </form>
    );
  },
});
