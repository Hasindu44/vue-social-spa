<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 pb-20">
    
    <main class="max-w-[935px] mx-auto pt-8 px-4 md:px-5">
      
      <header class="flex flex-col md:flex-row gap-8 md:gap-24 mb-12 items-center md:items-start">
        <div class="flex-shrink-0">
          <div class="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
            <img 
            src="https://images.unsplash.com/photo-1539125530496-3ca408f9c2d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
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
            <p class="text-slate-500 dark:text-slate-400 mb-2">Senior {{ profile?.company?.title || 'Engineer' }} @ TechCorp</p>
            <p>Building autonomous systems & mechanical keyboards. ⌨️🤖</p>
            <p>Documentation is my love language.</p>
            
            <a href="#" class="font-bold text-blue-900 dark:text-blue-200 hover:underline flex items-center justify-center md:justify-start gap-1 mt-2">
              <Link2 :size="16" />
              github.com/{{ profile?.username || 'dev' }}
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
        <button class="flex items-center gap-2 py-4 px-6 md:px-8 border-t-2 border-slate-900 dark:border-white text-slate-900 dark:text-white transition-colors">
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
            :src="post.imageUrl" 
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
import type { UserProfile } from '../types/User'

const profile = ref<UserProfile | null>(null)
const userPosts = ref<Project[]>([])
const loading = ref(true)
const selectedPost = ref<Project | null>(null)

const techThemes = [
  // Robotics
  { title: "Autonomous Hexapod Robot", tags: ["Robotics", "Embedded"], imageUrl: "https://images.unsplash.com/photo-1593376853899-fbb47a057fa0?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Industrial Arm Controller", tags: ["Robotics", "Hardware"], imageUrl: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Bipedal Drone Concept", tags: ["Robotics", "C++"], imageUrl: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  // AI
  { title: "Neural Net Poison Detector", tags: ["AI", "Python"], imageUrl: "https://images.unsplash.com/photo-1679403766665-67ed6cd2df30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Computer Vision Inference", tags: ["AI", "Machine Learning"], imageUrl: "https://images.unsplash.com/photo-1677691824188-3e266886cb27?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, // NEW AI IMAGE HERE!
  // Hardware
  { title: "High-Current H-Bridge Driver", tags: ["Hardware", "Power"], imageUrl: "https://images.unsplash.com/photo-1591238372338-22d30c883a86?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Custom ESP32 Motor Shield", tags: ["Hardware", "Electronics"], imageUrl: "https://images.unsplash.com/photo-1591238372408-8b98667c0460?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Server Rack Management", tags: ["Hardware", "Sysadmin"], imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  // PCB
  { title: "4-Layer Impedance Matched Board", tags: ["PCB", "Hardware"], imageUrl: "https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "SMD Soldering Practice Kit", tags: ["PCB", "DIY"], imageUrl: "https://images.unsplash.com/photo-1651340527836-263c5072968e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Flexible PCB Prototype", tags: ["PCB", "Wearables"], imageUrl: "https://images.unsplash.com/photo-1631378961385-21bee7eb41ad?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "High-Frequency Routing Design", tags: ["PCB", "RF"], imageUrl: "https://images.unsplash.com/photo-1642229408339-572fa3328d10?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  // C++
  { title: "Singly Linked List Visualizer", tags: ["C++", "DSA"], imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Vulkan API Rendering Engine", tags: ["C++", "Graphics"], imageUrl: "https://plus.unsplash.com/premium_photo-1678566154673-a728037f3f00?q=80&w=1002&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Real-Time OS Kernel", tags: ["C++", "Embedded"], imageUrl: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Physics Engine Optimization", tags: ["C++", "Math"], imageUrl: "https://images.unsplash.com/photo-1604964432806-254d07c11f32?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  // Signals
  { title: "Real-time FFT Signal Processor", tags: ["Signals", "DSP"], imageUrl: "https://images.unsplash.com/photo-1754734387891-36fcbb96f830?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "RF Spectrum Analyzer", tags: ["Signals", "SDR"], imageUrl: "https://plus.unsplash.com/premium_photo-1663043443501-6be2dc5ea9a6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Audio Synthesizer Oscillators", tags: ["Signals", "Audio"], imageUrl: "https://images.unsplash.com/photo-1535612731405-1348d22b842f?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Radar Tracking System", tags: ["Signals", "Telemetry"], imageUrl: "https://images.unsplash.com/photo-1652715648725-c84d5035e9a2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
]

onMounted(async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    const currentUserId = storedUser.id || 2 

    const userRes = await fetch(`https://dummyjson.com/users/${currentUserId}`)
    profile.value = await userRes.json()

    const postsRes = await fetch('https://dummyjson.com/posts?limit=12')
    const postData = await postsRes.json()
    
    userPosts.value = postData.posts.map((p: Project, index: number) => {
      const theme = techThemes[index % techThemes.length]!
      return {
        ...p,
        userId: currentUserId,
        title: theme.title,
        tags: theme.tags,
        imageUrl: theme.imageUrl,
        body: `Log update for build ${p.id}. ${p.body.substring(0, 50)}...`
      }
    })

  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>