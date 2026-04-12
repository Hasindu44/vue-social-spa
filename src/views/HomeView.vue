<template>
  <main class="pt-24 pb-12 bg-[#F1F5F9] min-h-screen">
    <div class="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <aside class="hidden lg:block lg:col-span-3">
        <div class="bg-white rounded-3xl p-6 border border-slate-200 sticky top-24 shadow-sm">
          <div class="flex flex-col items-center text-center mb-6">
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-1 mb-4">
              <img src="https://i.pravatar.cc/150?u=myprofile" class="rounded-full border-4 border-white" />
            </div>
            <h2 class="font-black text-slate-900">Engineering Student</h2>
            <p class="text-xs text-slate-500 font-mono">@dev_pulse_lead</p>
          </div>
          <div class="space-y-4 border-t pt-4">
            <div class="flex justify-between text-sm"><span class="text-slate-500">Projects</span><span class="font-bold">12</span></div>
            <div class="flex justify-between text-sm"><span class="text-slate-500">Collaborators</span><span class="font-bold">248</span></div>
          </div>
        </div>
      </aside>

      <section class="lg:col-span-6 space-y-6">
        
        <div class="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
          <div class="flex gap-4 mb-4">
            <img src="https://i.pravatar.cc/150?u=myprofile" class="w-12 h-12 rounded-full" />
            <input type="text" placeholder="Share a new schematic or build update..." 
                   class="bg-slate-100 border-none rounded-2xl px-5 w-full text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex justify-between border-t pt-3 px-2">
            <button class="text-xs font-bold text-slate-500 flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg transition">📷 Image</button>
            <button class="text-xs font-bold text-slate-500 flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg transition">📑 Schematic</button>
            <button class="bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-black">Deploy</button>
          </div>
        </div>

        <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button v-for="f in ['All', 'Robotics', 'C++', 'PCB', 'AI']" :key="f"
                  @click="selectedFilter = f"
                  :class="[selectedFilter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border-slate-200']"
                  class="px-5 py-2 rounded-full border text-xs font-bold transition-all">
            {{ f }}
          </button>
        </div>

        <div v-if="loading" class="space-y-6">
          <div v-for="i in 3" :key="i" class="bg-white h-80 rounded-3xl animate-pulse"></div>
        </div>

        <div v-else class="space-y-8">
          <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />
        </div>
      </section>

      <aside class="hidden lg:block lg:col-span-3 space-y-6">
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 class="font-black text-xs uppercase tracking-widest text-slate-400 mb-4">Trending Builds</h3>
          <ul class="space-y-4">
            <li v-for="tag in ['#HexapodRobot', '#ESP32', '#MATLAB_DSP']" :key="tag">
              <p class="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer">{{ tag }}</p>
              <p class="text-[10px] text-slate-400 font-mono">1.2k Repositories</p>
            </li>
          </ul>
        </div>
      </aside>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import type { Project } from '../types/Project'

const projects = ref<Project[]>([])
const loading = ref(true)
const selectedFilter = ref('All')

const techThemes = [
  { title: "Autonomous Hexapod Robot", tags: ["Robotics", "C++", "Embedded"] },
  { title: "Custom ESP32 Motor Shield", tags: ["PCB", "Electronics", "Hardware"] },
  { title: "Real-time FFT Signal Processor", tags: ["Signals", "MATLAB", "DSP"] },
  { title: "Neural Network Poison Detector", tags: ["AI", "Python", "Cybersec"] }
]

const transformData = (rawPosts: any[]): Project[] => {
  return rawPosts.map((post, index) => {
    const theme = techThemes[index % techThemes.length] ?? techThemes[0]!;
    return {
      ...post,
      title: theme.title,
      tags: theme.tags,
      body: `Status Update: ${theme.title} build version ${index}.4 is now stable. Optimized for high-frequency response.`,
      views: Math.floor(Math.random() * 9500) + 450
    }
  })
}

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') return projects.value
  return projects.value.filter(p => p.tags.includes(selectedFilter.value))
})

onMounted(async () => {
  try {
    const res = await fetch('https://dummyjson.com/posts?limit=15')
    const data = await res.json()
    projects.value = transformData(data.posts)
  } finally {
    loading.value = false
  }
})
</script>