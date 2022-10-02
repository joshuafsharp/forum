import { defineComponent, onMounted, ref } from 'vue';

import { store } from '../store';
import { supabase } from '../supabase';

import type { PostgrestError } from '@supabase/supabase-js';

export const Profile = defineComponent({
  name: 'Profile',

  setup() {
    const loading = ref(true);

    const username = ref('');
    const firstName = ref('');
    const lastName = ref('');

    async function getProfile() {
      try {
        loading.value = true;
        store.user = supabase.auth.user();

        const { data, error, status } = await supabase
          .from('user')
          .select(`username, first_name, last_name`)
          .eq('id', store.user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          username.value = data.username;
          firstName.value = data.first_name;
          lastName.value = data.last_name;
        }
      } catch (error) {
        alert((error as PostgrestError).message);
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;
        store.user = supabase.auth.user();

        if (!store.user) {
          throw new Error('User is not authenticated');
        }

        const updates = {
          id: store.user.id,
          username: username.value,
          first_name: firstName.value,
          last_name: lastName.value,
          updated_at: new Date(),
        };

        const { error } = await supabase.from('user').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });

        if (error) {
          throw error;
        }
      } catch (error) {
        alert((error as PostgrestError).message);
      } finally {
        loading.value = false;
      }
    }

    async function signOut() {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
      } catch (error) {
        alert((error as PostgrestError).message);
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      getProfile();
    });

    return () => (
      <form class="form-widget" onSubmit={updateProfile}>
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" value={store.user?.email} disabled />
        </div>
        <div>
          <label for="username">Username</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <div>
          <label for="firstName">First name</label>
          <input id="firstName" type="website" v-model="firstName" />
        </div>
        <div>
          <label for="lastName">Last name</label>
          <input id="lastName" type="website" v-model="lastName" />
        </div>

        <div>
          <input
            type="submit"
            class="button primary block"
            value={loading.value ? 'Loading ...' : 'Update'}
            disabled={loading.value}
          />
        </div>

        <div>
          <button class="button block" onClick={signOut} disabled={loading.value}>
            Sign Out
          </button>
        </div>
      </form>
    );
  },
});
