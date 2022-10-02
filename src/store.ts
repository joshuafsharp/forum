import { User } from "@supabase/supabase-js";
import { reactive } from "vue";

interface Store {
  user: User | null;
}

export const store: Store = reactive({
  user: null,
});
