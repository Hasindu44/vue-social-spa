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
        <img :src="project.imageUrl" 
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
    </div>

    <div class="px-4 pt-4 bg-white dark:bg-slate-950 mt-auto">
      <div class="flex justify-between items-center mb-3 text-slate-900 dark:text-white">
        <div class="flex items-center gap-4">
          <button @click="toggleLike" class="transition-colors hover:scale-110" :class="project.isLiked ? 'text-red-500' : 'hover:text-slate-500'">
            <Heart :size="26" :stroke-width="1.5" :class="project.isLiked ? 'fill-red-500' : ''" />
          </button>
          
          <button @click="$emit('openPost', project)" class="hover:text-slate-500 transition-colors"><MessageCircle :size="26" :stroke-width="1.5" /></button>
          <button class="hover:text-slate-500 transition-colors"><Send :size="26" :stroke-width="1.5" /></button>
        </div>
        <button class="hover:text-slate-500 transition-colors"><Bookmark :size="26" :stroke-width="1.5" /></button>
      </div>
      
      <div class="text-sm font-bold text-slate-900 dark:text-white mb-2">
        {{ project.reactions?.likes || 0 }} likes
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

const props = defineProps<{ project: Project }>()
defineEmits(['openPost'])

// Toggle the like count up and down
const toggleLike = () => {
  if (props.project.isLiked) {
    props.project.reactions.likes--;
    props.project.isLiked = false;
  } else {
    props.project.reactions.likes++;
    props.project.isLiked = true;
  }
}
</script>