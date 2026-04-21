<template>
  <div>
    <main class="pt-8 pb-24 w-full">
      <div class="max-w-[600px] mx-auto px-4 mb-8">
        <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          <button 
            v-for="f in ['All', 'Robotics', 'Hardware', 'PCB', 'C++', 'Signals', 'AI']" :key="f" @click="selectedFilter = f"
            :class="[
              'whitespace-nowrap px-6 py-2 rounded-full border transition-all font-bold text-sm',
              selectedFilter === f 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' 
                : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
            ]"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="max-w-[600px] mx-auto px-4 space-y-8">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 h-[500px] animate-pulse"></div>
      </div>

      <div v-else class="max-w-[600px] mx-auto px-4 space-y-8">
        <ProjectCard 
          v-for="p in filteredProjects" :key="p.id" :project="p" 
          @openPost="handleOpenPost"
        />
      </div>
    </main>

    <PostModal v-if="selectedPost" :project="selectedPost" @close="selectedPost = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import PostModal from '../components/PostModal.vue'
import type { Project } from '../types/Project'

const projects = ref<Project[]>([])
const loading = ref(true)
const selectedFilter = ref('All')
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

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') return projects.value
  return projects.value.filter(p => p.tags.includes(selectedFilter.value))
})

const handleOpenPost = (post: Project) => {
  selectedPost.value = post
}

onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/posts?limit=30')
    const data = await response.json()
    projects.value = data.posts.map((post: Project, index: number) => {
      const theme = techThemes[index % techThemes.length]!
      return {
        ...post, 
        title: theme.title, 
        tags: theme.tags,
        imageUrl: theme.imageUrl,
        body: `Status Update: ${theme.title} build v1.${index} is stable. Check the documentation for pinout details.`,
        views: Math.floor(Math.random() * 9500) + 450
      }
    })
  } finally {
    loading.value = false
  }
})
</script>