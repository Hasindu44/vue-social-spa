<template>
  <main class="pt-32 pb-20 bg-[#F8FAFC] min-h-screen w-full">
    <div v-if="project" class="px-6 md:px-12 lg:px-16 w-full max-w-[1600px] mx-auto">
      
      <RouterLink to="/" class="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
        <span class="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Explorer</span>
      </RouterLink>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        <div class="lg:col-span-2 space-y-10">
          <header>
            <div class="flex items-center gap-3 mb-4">
              <span v-for="tag in project.tags" :key="tag" 
                    class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-100">
                {{ tag }}
              </span>
            </div>
            <h1 class="text-5xl font-black text-slate-900 tracking-tighter">{{ project.title }}</h1>
          </header>

          <div class="aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
            <img :src="`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&sig=${project.id}`" 
     class="w-full h-full object-cover" />
          </div>

          <article class="prose prose-slate max-w-none">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Technical Specifications</h2>
            <p class="text-slate-700 text-lg leading-relaxed mb-8">
              {{ project.body }}
            </p>
            
            <div class="bg-slate-900 rounded-2xl p-8 font-mono text-sm text-slate-300 shadow-inner">
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
          <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm sticky top-32">
            <h3 class="font-black text-slate-900 text-sm uppercase tracking-widest mb-6">Build Metrics</h3>
            
            <div class="space-y-6 mb-10">
              <div class="flex justify-between items-center">
                <span class="text-slate-500 font-medium">Stars</span>
                <span class="text-xl font-bold text-slate-900">⭐ {{ project.reactions.likes }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-500 font-medium">Views</span>
                <span class="text-xl font-bold text-slate-900">👁️ {{ project.views }}</span>
              </div>
            </div>

            <button class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95 mb-4">
              Clone Repository
            </button>
            <button class="w-full border border-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
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
import type { Project } from '../types/Project'

const route = useRoute()
const project = ref<Project | null>(null) 

//Reuse technical mapping logic so the text matches the HomeView
const techThemes = [
  { title: "Autonomous Hexapod Robot", tags: ["Robotics", "C++", "Embedded"] },
  { title: "Custom ESP32 Motor Shield", tags: ["PCB", "Electronics", "Hardware"] },
  { title: "Real-time FFT Signal Processor", tags: ["Signals", "MATLAB", "DSP"] },
  { title: "Neural Network Poisoning Detector", tags: ["AI", "Python", "Cybersec"] },
  { title: "Singly Linked List Visualizer", tags: ["DSA", "C++", "Education"] },
  { title: "High-Current H-Bridge Driver", tags: ["Power", "PCB", "Hardware"] }
]

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`)
    const data = await response.json()
    
    // Use the ID to find the right theme so it matches what clicked on the home page
    const themeIndex = (Number(id) - 1) % techThemes.length
    const theme = techThemes[themeIndex] ?? techThemes[0]

    project.value = {
      ...data,
      title: theme?.title ?? "Untitled Project",
      tags: theme?.tags ?? [],
      body: `This project involves a deep-dive into ${theme?.title ?? "Engineering"} architecture. It encompasses the integration of ${(theme?.tags ?? []).join(' and ')} systems to solve complex industrial challenges. The current build version is optimized for high-performance engineering environments.`,
      views: Math.floor(Math.random() * 8000) + 500
    }
  } catch (error) {
    console.error('Fetch Error:', error)
  }
})
</script>

<style scoped>
/* Added typography helper for cleaner text */
.prose h2 {
  margin-top: 0;
}
</style>