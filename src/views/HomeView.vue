<template>
  <div>
    <main class="pt-8 pb-24 w-full">
      <div class="max-w-[600px] mx-auto px-4 mb-8">
        <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          <button 
            v-for="f in ['All', 'Robotics', 'C++', 'PCB', 'Signals', 'AI']" :key="f" @click="selectedFilter = f"
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
  { title: "Autonomous Hexapod Robot", tags: ["Robotics", "C++"] },
  { title: "Custom ESP32 Motor Shield", tags: ["PCB", "Hardware"] },
  { title: "Real-time FFT Processor", tags: ["Signals", "MATLAB"] },
  { title: "Neural Net Poison Detector", tags: ["AI", "Python"] }
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
    const response = await fetch('https://dummyjson.com/posts?limit=15')
    const data = await response.json()
    projects.value = data.posts.map((post: any, index: number) => {
      const theme = techThemes[index % techThemes.length] || techThemes[0]!
      return {
        ...post, title: theme.title, tags: theme.tags,
        body: `Status Update: ${theme.title} build v1.${index} is stable. Check the documentation for pinout details.`,
        views: Math.floor(Math.random() * 9500) + 450
      }
    })
  } finally {
    loading.value = false
  }
})
</script>