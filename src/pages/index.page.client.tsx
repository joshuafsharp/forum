import { defineComponent } from 'vue';

// import { Auth } from '~/components/Auth';
import { Home } from '~/components/home/Home';
// import { Profile } from '~/components/Profile';
import { store } from '~/store';
import { supabase } from '~/supabase';

export const Page = defineComponent({
  name: 'HomePage',

  setup() {
    store.user = supabase.auth.user();
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session?.user || null;
    });

    return () => (
      <div class="container" style="padding: 50px 0 100px 0">
        {/* {store.user ? <Profile /> : <Auth />} */}
        <Home />
      </div>
    );
  },
});

// TODO: Need to fix ssr, page currently needs to be .client.tsx, but should also support server render
