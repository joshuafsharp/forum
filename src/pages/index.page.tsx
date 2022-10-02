import { defineComponent } from 'vue';

import { Auth } from '~/components/Auth';
import { Profile } from '~/components/Profile';
import { store } from '~/store';
import { supabase } from '~/supabase';

export const Page = defineComponent({
  name: 'Page',

  setup() {
    console.log('sumthin');
    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session?.user || null;
    });

    return () => (
      <div class="container" style="padding: 50px 0 100px 0">
        {store.user ? <Profile /> : <Auth />}
      </div>
    );
  },
});
