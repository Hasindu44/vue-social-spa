<template>
  <div class="relative min-h-screen flex items-center justify-center p-4">
    
    <AnimatedBackground />

    <div class="relative z-10 w-full max-w-md">
      
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4">
          <Cpu :size="36" class="text-white stroke-[2.5]" />
        </div>
        <h1 class="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">DEVPULSE</h1>
        <p class="text-slate-500 dark:text-slate-400 font-medium mt-1">Authenticate to access the network.</p>
      </div>

      <div class="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
        
        <form @submit.prevent="handleLogin" class="space-y-5">
          
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
            <input 
              type="text" 
              v-model="username"
              required
              placeholder="e.g., michaelw"
              class="w-full bg-white/50 dark:bg-black/20 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              :class="errorMessage ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'"
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <a href="#" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700">Forgot?</a>
            </div>
            <input 
              type="password" 
              v-model="password"
              required
              placeholder="••••••••••••"
              class="w-full bg-white/50 dark:bg-black/20 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              :class="errorMessage ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'"
            />
            
            <p v-if="errorMessage" class="text-red-500 text-xs font-bold mt-2">
              {{ errorMessage }}
            </p>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 disabled:cursor-wait text-white font-bold rounded-xl px-4 py-3.5 mt-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 flex items-center justify-center gap-2"
          >
            <span v-if="isLoading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ isLoading ? 'Authenticating...' : 'Sign In' }}
          </button>
          
        </form>

        <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
          <p class="text-xs text-slate-500 dark:text-slate-400">
            DummyJSON Test Credentials:<br/>
            User: <b class="text-slate-700 dark:text-slate-300">michaelw</b> | Pass: <b class="text-slate-700 dark:text-slate-300">michaelwpass</b>
          </p>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Cpu } from 'lucide-vue-next'
import AnimatedBackground from '../components/AnimatedBackground.vue'

const router = useRouter()

// Prefill with valid DummyJSON credentials
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
        expiresInMins: 60, 
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials')
    }

    // Success! Store token & user data
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))

    // Redirect to home feed
    router.push('/')

} catch (error: Error | unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>