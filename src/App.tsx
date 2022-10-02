import { defineComponent } from 'vue';

import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { store } from './store';
import { supabase } from './supabase';

export const App = defineComponent({
  name: 'App',

  setup() {
    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session?.user || null;
    });

    return () => (
      <div class="container" style="padding: 50px 0 100px 0">
        <Profile v-if="store.user" />
        <Auth v-else />
      </div>
    );
  },
});
