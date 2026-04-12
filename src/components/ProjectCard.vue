<template>
  <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div class="p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img :src="`https://i.pravatar.cc/150?u=${project.userId}`" class="w-10 h-10 rounded-full border border-slate-100" />
        <div>
          <h4 class="text-sm font-black text-slate-900 leading-none hover:underline cursor-pointer">Dev_User_{{ project.userId }}</h4>
          <p class="text-[10px] text-slate-400 font-mono mt-1">2h ago • Version 1.0.{{ project.id }}</p>
        </div>
      </div>
      <button class="text-slate-400 hover:text-slate-900">•••</button>
    </div>

    <RouterLink :to="`/project/${project.id}`" class="block">
      <div class="px-4 pb-3">
        <p class="text-sm text-slate-700 leading-relaxed mb-3">
          <span class="font-bold text-blue-600">#{{ project.tags[0] }}</span> {{ project.body }}
        </p>
      </div>
      <div class="aspect-video bg-slate-100 overflow-hidden border-y border-slate-50">
        <img :src="`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&sig=${project.id}`" 
             class="w-full h-full object-cover" />
      </div>
    </RouterLink>

    <div class="p-3 flex items-center justify-between border-t border-slate-50 bg-slate-50/30">
      <div class="flex items-center gap-6">
        <button class="flex items-center gap-1.5 group">
          <span class="text-lg group-hover:scale-125 transition-transform">⭐</span>
          <span class="text-xs font-black text-slate-600">{{ project.reactions.likes }}</span>
        </button>
        <button class="flex items-center gap-1.5 group">
          <span class="text-lg group-hover:scale-125 transition-transform">💬</span>
          <span class="text-xs font-black text-slate-600">14</span>
        </button>
        <button class="flex items-center gap-1.5 group">
          <span class="text-lg group-hover:rotate-12 transition-transform">🔁</span>
          <span class="text-xs font-black text-slate-600">Fork</span>
        </button>
      </div>
      <div class="flex items-center gap-1 text-[10px] font-bold text-slate-400">
        👁️ {{ project.views }} VIEWS
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../types/Project'
defineProps<{ project: Project }>()
</script>