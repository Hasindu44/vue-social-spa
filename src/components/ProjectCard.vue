<template>
  <div class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full pb-4">
    
    <div class="p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img :src="`https://i.pravatar.cc/150?u=${project.userId}`" class="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800" />
        <div>
          <h4 class="text-sm font-black text-slate-900 dark:text-white leading-none cursor-pointer hover:underline">Dev_User_{{ project.userId }}</h4>
          <p class="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">Version 1.0.{{ project.id }}</p>
        </div>
      </div>
      <button class="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold">•••</button>
    </div>

    <div @click="$emit('openPost', project)" class="block cursor-pointer flex-grow flex flex-col">
      <div class="aspect-square md:aspect-[4/5] bg-slate-100 dark:bg-slate-900 overflow-hidden border-y border-slate-50 dark:border-slate-800 relative group">
        <img :src="`https://images.unsplash.com/photo-${techImages[project.id % techImages.length]}?auto=format&fit=crop&q=80&w=800`" 
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
    </div>

    <div class="px-4 pt-4 bg-white dark:bg-slate-950 mt-auto">
      <div class="flex justify-between items-center mb-3 text-slate-900 dark:text-white">
        <div class="flex items-center gap-4">
          <button class="hover:text-slate-500 transition-colors"><Heart :size="26" :stroke-width="1.5" /></button>
          <button @click="$emit('openPost', project)" class="hover:text-slate-500 transition-colors"><MessageCircle :size="26" :stroke-width="1.5" /></button>
          <button class="hover:text-slate-500 transition-colors"><Send :size="26" :stroke-width="1.5" /></button>
        </div>
        <button class="hover:text-slate-500 transition-colors"><Bookmark :size="26" :stroke-width="1.5" /></button>
      </div>
      
      <div class="text-sm font-bold text-slate-900 dark:text-white mb-2">
        {{ project.reactions?.likes || 128 }} likes
      </div>
      
      <p class="text-sm text-slate-800 dark:text-slate-200 leading-relaxed line-clamp-2">
        <span class="font-black mr-1 cursor-pointer hover:underline text-slate-900 dark:text-white">Dev_User_{{ project.userId }}</span>
        <span class="font-bold text-blue-600 dark:text-blue-400 mr-1">#{{ project.tags[0] }}</span> 
        {{ project.body }}
      </p>
      
      <p @click="$emit('openPost', project)" class="text-sm text-slate-400 dark:text-slate-500 mt-2 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 font-medium">
        View all {{ (project.id % 5) + 3 }} comments
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-vue-next'
import type { Project } from '../types/Project'

defineProps<{ project: Project }>()
defineEmits(['openPost'])

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
</script>