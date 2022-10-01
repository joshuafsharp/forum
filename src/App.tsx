import {defineComponent} from 'vue'
  import { store } from './store'
  import { supabase } from './supabase'
  import Auth from './components/Auth.vue'
  import Profile from './components/Profile.vue'

  export default defineComponent({
    setup() {
      store.user = supabase.auth.user()
      supabase.auth.onAuthStateChange((_, session) => {
        store.user = session.user
      })

      return {
        store,
      }
    },


render() {
return (

  <div class="container" style="padding: 50px 0 100px 0">
    <Profile v-if="store.user" />
    <Auth v-else />
  </div>
    )
}
  })