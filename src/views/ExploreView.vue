<template>
  <div>
    <div class="w-full max-w-[1000px] mx-auto pt-8 px-4 pb-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      <div class="mb-8 relative max-w-xl mx-auto">
        <input type="text" placeholder="Search schematics, code, or hardware..." 
          class="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full py-4 px-6 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500" />
      </div>

      <div v-if="loading" class="grid grid-cols-3 gap-1 md:gap-4">
        <div v-for="i in 12" :key="i" class="aspect-square bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl"></div>
      </div>

      <div v-else class="grid grid-cols-3 gap-1 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
        <div 
          v-for="(p, index) in projects" :key="p.id" :class="getGridClass(index)"
          class="relative group overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-xl shadow-sm cursor-pointer"
          @click="handleOpenPost(p)" 
        >
          <img 
            :src="`https://images.unsplash.com/photo-${techImages[p.id % techImages.length]}?auto=format&fit=crop&q=80&w=800`" 
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
import { ref, onMounted } from 'vue'
import { Heart, MessageCircle } from 'lucide-vue-next'
import PostModal from '../components/PostModal.vue'
import type { Project } from '../types/Project'

const projects = ref<Project[]>([])
const loading = ref(true)
const selectedPost = ref<Project | null>(null)

// Updated with highly reliable Unsplash Tech IDs
const techImages = [
  '1518770660439-4636190af475', 
  '1581091226825-a6a2a5aee158', 
  '1498050108023-c5249f4df085',
  '1592096304832-fa3148154e1d',
  '1526374965328-7f61d4dc18c5', 
  '1517077304055-6e89abbf09b0', 
  '1581092160562-40aa08e78837', 
  '1611162617474-5b21e879e113'
]

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
  projects.value = data.posts
  loading.value = false
})
</script>