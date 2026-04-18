<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 pb-20">
    
    <main class="max-w-[935px] mx-auto pt-8 px-4 md:px-5">
      
      <header class="flex flex-col md:flex-row gap-8 md:gap-24 mb-12 items-center md:items-start">
        
        <div class="flex-shrink-0">
          <div class="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
            <img 
              :src="profile?.image || `https://i.pravatar.cc/150?u=1`" 
              class="w-full h-full rounded-full border-4 border-white dark:border-slate-950 object-cover bg-white"
            />
          </div>
        </div>

        <div class="flex flex-col flex-1 w-full md:w-auto">
          
          <div class="flex flex-col md:flex-row md:items-center gap-4 mb-4 md:mb-6">
            <h1 class="text-xl md:text-2xl font-medium text-slate-900 dark:text-white">
              {{ profile?.username || 'loading_user...' }}
            </h1>
            <div class="flex gap-2">
              <button class="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-sm rounded-lg transition-colors">
                Edit profile
              </button>
              <button class="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-sm rounded-lg transition-colors">
                View archive
              </button>
              <button class="p-1.5 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <Settings :size="24" stroke-width="1.5" />
              </button>
            </div>
          </div>

          <ul class="flex justify-center md:justify-start gap-8 mb-6 text-slate-900 dark:text-white text-base">
            <li><span class="font-bold mr-1">{{ userPosts.length }}</span> posts</li>
            <li class="cursor-pointer"><span class="font-bold mr-1">1,248</span> followers</li>
            <li class="cursor-pointer"><span class="font-bold mr-1">342</span> following</li>
          </ul>

          <div class="text-sm text-slate-900 dark:text-white leading-relaxed text-center md:text-left">
            <h2 class="font-bold text-base mb-1">{{ profile?.firstName }} {{ profile?.lastName }}</h2>
            <p class="text-slate-500 dark:text-slate-400 mb-2">Senior {{ profile?.company.title }} @ TechCorp</p>
            <p>Building autonomous systems & mechanical keyboards. ⌨️🤖</p>
            <p>Documentation is my love language.</p>
            
            <a href="#" class="font-bold text-blue-900 dark:text-blue-200 hover:underline flex items-center justify-center md:justify-start gap-1 mt-2">
              <Link2 :size="16" />
              github.com/{{ profile?.username }}
            </a>
          </div>
        </div>
      </header>

      <div class="flex gap-4 md:gap-8 mb-12 overflow-x-auto no-scrollbar pb-4 px-2">
        <div v-for="h in ['Setups', 'Robotics', 'PCB Art', 'Hackathons']" :key="h" class="flex flex-col items-center gap-2 cursor-pointer group">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-full border border-slate-300 dark:border-slate-700 p-1 group-hover:border-slate-400 transition-colors">
            <div class="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Cpu :size="24" />
            </div>
          </div>
          <span class="text-xs font-bold text-slate-900 dark:text-white">{{ h }}</span>
        </div>
      </div>

      <div class="border-t border-slate-200 dark:border-slate-800 flex justify-center uppercase text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400">
        <button 
          class="flex items-center gap-2 py-4 px-6 md:px-8 border-t-2 border-slate-900 dark:border-white text-slate-900 dark:text-white transition-colors"
        >
          <Grid :size="14" /> POSTS
        </button>
        <button class="flex items-center gap-2 py-4 px-6 md:px-8 border-t-2 border-transparent hover:text-slate-900 dark:hover:text-white transition-colors">
          <Bookmark :size="14" /> SAVED
        </button>
        <button class="flex items-center gap-2 py-4 px-6 md:px-8 border-t-2 border-transparent hover:text-slate-900 dark:hover:text-white transition-colors">
          <UserSquare2 :size="14" /> TAGGED
        </button>
      </div>

      <div v-if="loading" class="grid grid-cols-3 gap-1 md:gap-1.5">
        <div v-for="i in 9" :key="i" class="aspect-square bg-slate-100 dark:bg-slate-800 animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-3 gap-1 md:gap-1.5">
        <div 
          v-for="post in userPosts" :key="post.id"
          @click="selectedPost = post"
          class="aspect-square relative group bg-slate-100 dark:bg-slate-900 cursor-pointer overflow-hidden"
        >
          <img 
            :src="`https://images.unsplash.com/photo-${techImages[post.id % techImages.length]}?auto=format&fit=crop&q=80&w=600`" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white font-bold backdrop-blur-[2px]">
            <span class="flex items-center gap-2"><Heart :size="24" class="fill-white" /> {{ post.reactions?.likes || 128 }}</span>
            <span class="flex items-center gap-2"><MessageCircle :size="24" class="fill-white" /> {{ (post.id % 5) + 3 }}</span>
          </div>
        </div>
      </div>

    </main>

    <PostModal 
      v-if="selectedPost" 
      :project="selectedPost" 
      @close="selectedPost = null" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Settings, Link2, Grid, Bookmark, UserSquare2, Heart, MessageCircle, Cpu } from 'lucide-vue-next'
import PostModal from '../components/PostModal.vue'
import type { Project } from '../types/Project'
import type { UserProfile } from '../types/User' // The interface we just made!

const profile = ref<UserProfile | null>(null)
const userPosts = ref<Project[]>([])
const loading = ref(true)
const selectedPost = ref<Project | null>(null)

// Same reliable image array to ensure the Modal thumbnails match perfectly
const techImages = [
  '1518770660439-4636190af475', // Circuit board macro (Blue)
  '1581091226825-a6a2a5aee158', // Code on a screen (Dark mode)
  '1498050108023-c5249f4df085', // Developer working on laptop
  '1537432376710-34f482704e19', // Arduino board
  '1526374965328-7f61d4dc18c5', // Matrix/Binary style background
  '1517077304055-6e89abbf09b0', // Soldering iron on PCB
  '1581092160562-40aa08e78837', // Server rack lights
  '1592096304832-fa3148154e1d'  // CPU socket / Motherboard
]

onMounted(async () => {
  try {
    // 1. Check local storage for the logged-in user. 
    // If they bypass the login screen, default to User 2 (Michael Williams).
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const currentUserId = storedUser.id || 2 

    const userRes = await fetch(`https://dummyjson.com/users/${currentUserId}`)
    profile.value = await userRes.json()

    const postsRes = await fetch('https://dummyjson.com/posts?limit=12')
    const postData = await postsRes.json()
    
    userPosts.value = postData.posts.map((p: any) => ({
      ...p,
      userId: currentUserId, // Dynamically assign the correct ID
      tags: ["engineering", "builds"],
      body: `Log update for build ${p.id}. ${p.body.substring(0, 50)}...`
    }))

  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>