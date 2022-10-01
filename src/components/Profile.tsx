<template>
    <form class="form-widget" @submit.prevent="updateProfile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="store.user.email" disabled />
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
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />
      </div>
  
      <div>
        <button class="button block" @click="signOut" :disabled="loading">
          Sign Out
        </button>
      </div>
    </form>
  </template>
  
  <script>
    import { supabase } from '../supabase'
    import { store } from '../store'
    import { onMounted, ref } from 'vue'
  
    export default {
      setup() {
        const loading = ref(true)

        const username = ref('')
        const firstName = ref('')
        const lastName = ref('')
  
        async function getProfile() {
          try {
            loading.value = true
            store.user = supabase.auth.user()
  
            let { data, error, status } = await supabase
              .from('user')
              .select(`username, first_name, last_name`)
              .eq('id', store.user.id)
              .single()
  
            if (error && status !== 406){
                throw error
            } 
  
            if (data) {
              username.value = data.username
              firstName.value = data.first_name
              lastName.value = data.last_name
            }
          } catch (error) {
            alert(error.message)
          } finally {
            loading.value = false
          }
        }
  
        async function updateProfile() {
          try {
            loading.value = true
            store.user = supabase.auth.user()
  
            const updates = {
              id: store.user.id,
              username: username.value,
              first_name: firstName.value,
              last_name: lastName.value,
              updated_at: new Date(),
            }
  
            let { error } = await supabase.from('user').upsert(updates, {
              returning: 'minimal', // Don't return the value after inserting
            })
  
            if (error) throw error
          } catch (error) {
            alert(error.message)
          } finally {
            loading.value = false
          }
        }
  
        async function signOut() {
          try {
            loading.value = true
            let { error } = await supabase.auth.signOut()
            if (error) throw error
          } catch (error) {
            alert(error.message)
          } finally {
            loading.value = false
          }
        }
  
        onMounted(() => {
          getProfile()
        })
  
        return {
          store,
          loading,
          username,
          firstName,
          lastName,
  
          updateProfile,
          signOut,
        }
      },
    }
  </script>