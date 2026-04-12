<template>
  <div class="flex min-h-screen bg-white font-sans antialiased text-black">
    
    <nav 
      class="fixed left-0 top-0 z-50 h-screen bg-white border-r border-slate-200 p-3
             w-[72px] hover:w-64 transition-all duration-300 ease-in-out group flex flex-col"
    >
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
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path" 
          class="flex items-center p-3 rounded-xl hover:bg-slate-100 transition-all group/link overflow-hidden"
          active-class="bg-slate-50"
        >
          <div class="min-w-[24px] flex justify-center transition-transform duration-200 group-hover/link:scale-110">
            <component 
              :is="item.icon" 
              :size="24" 
              :stroke-width="isActive(item.path) ? 2.5 : 1.5"
              :class="isActive(item.path) ? 'text-black' : 'text-slate-500'"
            />
          </div>
          
          <span 
            class="ml-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            :class="isActive(item.path) ? 'font-bold text-black' : 'text-slate-600'"
          >
            {{ item.name }}
          </span>
        </RouterLink>
      </div>

      <div class="mt-auto pb-4">
        <button class="flex items-center p-3 rounded-xl hover:bg-slate-100 w-full transition-all overflow-hidden text-slate-500 hover:text-black">
          <div class="min-w-[24px] flex justify-center">
            <Menu :size="24" :stroke-width="1.5" />
          </div>
          <span class="ml-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            More
          </span>
        </button>
      </div>
    </nav>

    <main class="flex-1 ml-[72px] overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// Import professional icons
import { 
  Home, 
  Compass, 
  Heart, 
  PlusSquare, 
  User, 
  Cpu, 
  Menu,
  MessageSquare
} from 'lucide-vue-next'

const route = useRoute()

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Messages', path: '/messages', icon: MessageSquare },
  { name: 'Notifications', path: '/notifications', icon: Heart },
  { name: 'Create', path: '/create', icon: PlusSquare },
  { name: 'Profile', path: '/user/1', icon: User },
]

const isActive = (path: string) => route.path === path
</script>