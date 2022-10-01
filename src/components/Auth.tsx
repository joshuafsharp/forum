
import {defineComponent} from 'vue'
    import { ref } from 'vue'
    import { supabase } from '../supabase'
  
    export default defineComponent({
      name: 'Auth',
       
      setup() {
        const loading = ref(false)
        const email = ref('')
  
        const handleLogin = async () => {
          try {
            loading.value = true
            const { error } = await supabase.auth.signIn({ email: email.value })
            if (error) throw error
            alert('Check your email for the login link!')
          } catch (error) {
            alert(error.error_description || error.message)
          } finally {
            loading.value = false
          }
        }
  
        // return {
        //   loading,
        //   email,
        //   handleLogin,
        // }
      
        return () =>  (
           <form class="row flex-center flex" onSubmit="handleLogin">
      <div class="col-6 form-widget">
        <h1 class="header">Supabase + Vue 3</h1>
        <p class="description">Sign in via magic link with your email below</p>
        <div>
          <input
            class="inputField"
            type="email"
            placeholder="Your email"
            v-model="email"
          />
        </div>
        <div>
          <input
            type="submit"
            class="button block"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
    )
  )