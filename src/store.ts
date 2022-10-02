import { reactive } from 'vue';

import type { User } from '@supabase/supabase-js';

interface Store {
  user: User | null;
}

export const store: Store = reactive({
  user: null,
});
