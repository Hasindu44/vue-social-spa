<template>
  <div>
    <div class="w-full max-w-[1000px] mx-auto pt-8 px-4 pb-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 min-h-screen">
      
      <div class="mb-8 relative max-w-xl mx-auto">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search schematics, code, or hardware..." 
          class="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full py-4 px-6 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" 
        />
      </div>

      <div v-if="loading" class="grid grid-cols-3 gap-1 md:gap-4">
        <div v-for="i in 12" :key="i" class="aspect-square bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl"></div>
      </div>

      <div v-else-if="filteredProjects.length === 0" class="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <p class="text-lg font-bold">No projects found.</p>
        <p class="text-sm">Try searching for different keywords.</p>
      </div>

      <div v-else class="grid grid-cols-3 gap-1 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
        <div 
          v-for="(p, index) in filteredProjects" :key="p.id" :class="getGridClass(index)"
          class="relative group overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-xl shadow-sm cursor-pointer"
          @click="handleOpenPost(p)" 
        >
          <img 
            :src="p.imageUrl" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold backdrop-blur-[2px]">
            <span class="flex items-center gap-2"><Heart :size="20" class="fill-white" /> {{ p.reactions?.likes || 128 }}</span>
            <span class="flex items-center gap-2"><MessageCircle :size="20" class="fill-white" /> 14</span>
          </div>
        </div>
      </div>
    </div>

    <PostModal v-if="selectedPost" :project="selectedPost" @close="selectedPost = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Heart, MessageCircle } from 'lucide-vue-next'
import PostModal from '../components/PostModal.vue'
import type { Project } from '../types/Project'

const projects = ref<Project[]>([])
const loading = ref(true)
const selectedPost = ref<Project | null>(null)
const searchQuery = ref('')

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
  if (!searchQuery.value) return projects.value;
  const query = searchQuery.value.toLowerCase();
  return projects.value.filter(p => 
    (p.title && p.title.toLowerCase().includes(query)) ||
    (p.body && p.body.toLowerCase().includes(query)) ||
    (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
  );
})

const handleOpenPost = (post: Project) => selectedPost.value = post

const getGridClass = (index: number) => {
  const pos = index % 10;
  if (pos === 2) return 'col-span-1 row-span-2'
  if (pos === 5) return 'col-span-2 row-span-2'
  return 'col-span-1 row-span-1'
}

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/posts?limit=30')
  const data = await res.json()
  
  projects.value = data.posts.map((post: Project, index: number) => {
    const theme = techThemes[index % techThemes.length]!
    return {
      ...post, title: theme.title, tags: theme.tags, imageUrl: theme.imageUrl,
      body: `Status Update: ${theme.title} build v1.${index} is stable. Check the documentation for pinout details.`
    }
  })
  
  loading.value = false
})
</script>