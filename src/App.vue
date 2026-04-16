<template>
  <div class="flex min-h-screen font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
    
    <nav class="fixed left-0 top-0 z-50 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-3 w-[72px] hover:w-64 transition-all duration-300 ease-in-out group flex flex-col">
      <div class="mb-10 h-10 flex items-center px-3 overflow-hidden">
        <div class="min-w-[24px]">
          <Cpu :size="28" class="text-blue-600 stroke-[2.5]" />
        </div>
        <span class="ml-4 text-xl font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          DEVPULSE
        </span>
      </div>
      
      <div class="flex-grow space-y-2">
        <RouterLink 
          v-for="item in navItems" :key="item.path" :to="item.path" 
          class="flex items-center p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group/link overflow-hidden"
          active-class="bg-slate-50 dark:bg-slate-800"
        >
          <div class="min-w-[24px] flex justify-center transition-transform duration-200 group-hover/link:scale-110">
            <component 
              :is="item.icon" :size="24" :stroke-width="isActive(item.path) ? 2.5 : 1.5"
              :class="isActive(item.path) ? 'text-black dark:text-white' : 'text-slate-500 dark:text-slate-400'"
            />
          </div>
          <span 
            class="ml-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            :class="isActive(item.path) ? 'font-bold text-black dark:text-white' : 'text-slate-600 dark:text-slate-400'"
          >
            {{ item.name }}
          </span>
        </RouterLink>
      </div>

      <div class="mt-auto pb-4 space-y-2">
        <button @click="toggleTheme" class="flex items-center p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 w-full transition-all overflow-hidden text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white">
          <div class="min-w-[24px] flex justify-center">
            <component :is="isDark ? Sun : Moon" :size="24" :stroke-width="1.5" />
          </div>
          <span class="ml-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </span>
        </button>

        <button class="flex items-center p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 w-full transition-all overflow-hidden text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white">
          <div class="min-w-[24px] flex justify-center">
            <Menu :size="24" :stroke-width="1.5" />
          </div>
          <span class="ml-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            More
          </span>
        </button>
      </div>
    </nav>

    <main class="flex-1 ml-[72px] overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Home, Compass, Heart, PlusSquare, User, Cpu, Menu, MessageSquare, Moon, Sun } from 'lucide-vue-next'

const route = useRoute()
const isDark = ref(false)

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Messages', path: '/messages', icon: MessageSquare },
  { name: 'Notifications', path: '/notifications', icon: Heart },
  { name: 'Create', path: '/create', icon: PlusSquare },
  { name: 'Profile', path: '/user/1', icon: User },
]

const isActive = (path: string) => route.path === path

// Handle Dark Mode Toggle
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  // Check system preference on load
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>