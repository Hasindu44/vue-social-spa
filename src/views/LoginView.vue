<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300 p-4">
    
    <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8">
      
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
          <Cpu :size="32" class="text-blue-600 dark:text-blue-400 stroke-[2.5]" />
        </div>
        <h1 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Welcome to DevPulse</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">Sign in to access your engineering dashboard.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <div>
          <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Username</label>
          <input 
            v-model="username"
            type="text" 
            required
            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
          <input 
            v-model="password"
            type="password" 
            required
            class="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
            placeholder="••••••••"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-red-500 font-medium text-center">
          {{ errorMessage }}
        </p>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Authenticating...' : 'Sign In' }}
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
        <p class="text-xs text-slate-400 dark:text-slate-500">
          DummyJSON Test Credentials:<br/>
          User: <b>michaelw</b> | Pass: <b>michaelwpass</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Cpu } from 'lucide-vue-next'

const router = useRouter()

// Pre-fill with valid credentials for easier testing
const username = ref('michaelw')
const password = ref('michaelwpass')

const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        expiresInMins: 60, //requests a token valid for 60 minutes
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials')
    }

    // Success! Store the token in localStorage to persist the session
    localStorage.setItem('token', data.token)
    
    // Optional: Store the user data so you can display their name/avatar globally later
    localStorage.setItem('user', JSON.stringify(data))

    // Redirect to the home feed
    router.push('/')

  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>