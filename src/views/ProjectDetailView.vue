<template>
  <main class="pt-32 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen w-full transition-colors duration-300">
    <div v-if="project" class="px-6 md:px-12 lg:px-16 w-full max-w-[1600px] mx-auto">
      
      <RouterLink to="/" class="group flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-bold mb-8 transition-colors">
        <span class="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Explorer</span>
      </RouterLink>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        <div class="lg:col-span-2 space-y-10">
          <header>
            <div class="flex items-center gap-3 mb-4">
              <span v-for="tag in project.tags" :key="tag" 
                    class="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                {{ tag }}
              </span>
            </div>
            <h1 class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{{ project.title }}</h1>
          </header>

          <div class="aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
            <img :src="project.imageUrl" 
                 class="w-full h-full object-cover" />
          </div>

          <article class="prose prose-slate dark:prose-invert max-w-none">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">Technical Specifications</h2>
            <p class="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
              {{ project.body }}
            </p>
            
            <div class="bg-slate-900 dark:bg-black/50 rounded-2xl p-8 font-mono text-sm text-slate-300 shadow-inner border border-transparent dark:border-slate-800">
              <p class="text-blue-400 mb-4">// Project Hardware & Environment</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><span class="text-slate-500">IDENTIFIER:</span> DEV_PULSE_{{ project.id }}</p>
                <p><span class="text-slate-500">VERSION:</span> 1.0.42-stable</p>
                <p><span class="text-slate-500">AUTHOR_ID:</span> USER_{{ project.userId }}</p>
                <p><span class="text-slate-500">LATEST_DEPLOY:</span> {{ new Date().toLocaleDateString() }}</p>
              </div>
            </div>
          </article>
        </div>

        <aside class="space-y-8">
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm sticky top-32">
            <h3 class="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest mb-6">Build Metrics</h3>
            
            <div class="space-y-6 mb-10">
              <div class="flex justify-between items-center">
                <span class="text-slate-500 font-medium">Appreciate Build</span>
                
                <button @click="toggleLike" class="text-xl font-bold flex items-center gap-2 transition-transform hover:scale-110" :class="project.isLiked ? 'text-red-500' : 'text-slate-900 dark:text-white'">
                  <Heart :size="24" :class="project.isLiked ? 'fill-red-500' : ''" /> 
                  {{ project.reactions?.likes || 0 }}
                </button>

              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-500 font-medium">Views</span>
                <span class="text-xl font-bold text-slate-900 dark:text-white">👁️ {{ project.views }}</span>
              </div>
            </div>

            <button class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95 mb-4">
              Clone Repository
            </button>
            <button class="w-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Download Schematics
            </button>
          </div>
        </aside>

      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-slate-400 font-bold animate-pulse tracking-widest uppercase text-xs">Fetching Technical Specs...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Heart } from 'lucide-vue-next'
import type { Project } from '../types/Project'

const route = useRoute()
const project = ref<Project | null>(null) 

const toggleLike = () => {
  if (project.value) {
    if (project.value.isLiked) {
      project.value.reactions.likes--;
      project.value.isLiked = false;
    } else {
      project.value.reactions.likes++;
      project.value.isLiked = true;
    }
  }
}

const techThemes = [
  // Robotics
  { title: "Autonomous Hexapod Robot", tags: ["Robotics", "Embedded"], imageUrl: "https://images.unsplash.com/photo-1593376853899-fbb47a057fa0?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Industrial Arm Controller", tags: ["Robotics", "Hardware"], imageUrl: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Bipedal Drone Concept", tags: ["Robotics", "C++"], imageUrl: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  // AI
  { title: "Neural Net Poison Detector", tags: ["AI", "Python"], imageUrl: "https://images.unsplash.com/photo-1679403766665-67ed6cd2df30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Computer Vision Inference", tags: ["AI", "Machine Learning"], imageUrl: "https://images.unsplash.com/photo-1677691824188-3e266886cb27?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
  const id = route.params.id
  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`)
    const data = await response.json()
    
    const themeIndex = (Number(id) - 1) % techThemes.length
    const theme = techThemes[themeIndex] ?? techThemes[0]

    project.value = {
      ...data,
      title: theme?.title ?? "Untitled Project",
      tags: theme?.tags ?? [],
      imageUrl: theme?.imageUrl,
      isLiked: false,
      body: `This project involves a deep-dive into ${theme?.title ?? "Engineering"} architecture. It encompasses the integration of ${(theme?.tags ?? []).join(' and ')} systems to solve complex industrial challenges. The current build version is optimized for high-performance engineering environments.`,
      views: Math.floor(Math.random() * 8000) + 500
    }
  } catch (error) {
    console.error('Fetch Error:', error)
  }
})
</script>

<style scoped>
.prose h2 {
  margin-top: 0;
}
</style>