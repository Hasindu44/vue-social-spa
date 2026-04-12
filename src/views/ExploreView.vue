<template>
  <div class="w-full max-w-[1000px] mx-auto pt-8 px-4">
    <div v-if="loading" class="grid grid-cols-3 gap-1 md:gap-4">
      <div v-for="i in 12" :key="i" class="aspect-square bg-slate-100 animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-3 gap-1 md:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
      <div 
        v-for="(p, index) in projects" 
        :key="p.id"
        :class="getGridClass(index)"
        class="relative group overflow-hidden"
      >
        <RouterLink :to="`/project/${p.id}`" class="block h-full w-full">
          <img 
            :src="`https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&sig=${p.id}`" 
            class="w-full h-full object-cover"
          />
          <div class="absolute top-3 right-3 text-white drop-shadow-md">
            <span v-if="index % 2 === 0">▶️</span>
            <span v-else>⧉</span>
          </div>
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
            <span>❤️ {{ p.reactions.likes }}</span>
            <span>💬 {{ Math.floor(Math.random() * 50) }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Project } from '../types/Project'

const projects = ref<Project[]>([])
const loading = ref(true)

const getGridClass = (index: number) => {
  // Pattern: Every 10 items, item 2 and item 7 are large
  const pos = index % 10;
  if (pos === 2) return 'col-span-1 row-span-2' // Tall block
  if (pos === 5) return 'col-span-2 row-span-2' // Big square
  return 'col-span-1 row-span-1'
}

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/posts?limit=30')
  const data = await res.json()
  projects.value = data.posts
  loading.value = false
})
</script>