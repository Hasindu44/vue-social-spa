<template>
  <div v-if="project" class="pt-32 pb-20 max-w-5xl mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      <div class="lg:col-span-2">
        <RouterLink to="/" class="text-blue-600 font-bold text-sm flex items-center gap-2 mb-6 hover:underline">
          ← Back to Explorer
        </RouterLink>
        
        <h1 class="text-4xl font-black text-slate-900 mb-4">{{ project.title }}</h1>
        <div class="aspect-video rounded-2xl overflow-hidden border border-slate-200 mb-8">
           <img :src="`https://picsum.photos/seed/${project.id}/1200/675`" class="w-full h-full object-cover" />
        </div>

        <h2 class="text-xl font-bold mb-4 border-b pb-2">Technical Overview</h2>
        <p class="text-slate-700 leading-relaxed mb-6">{{ project.body }}</p>
        
        <div class="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-sm">
          <p class="text-blue-400 mb-2">// Project Configuration</p>
          <p>build_version: 1.0.{{ project.id }}</p>
          <p>status: <span class="text-green-400">Stable</span></p>
          <p>dependencies: {{ project.tags.join(', ') }}</p>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Repository Stats</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-slate-500">Stars</span>
              <span class="font-bold">⭐ {{ project.reactions.likes }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Views</span>
              <span class="font-bold">👁️ {{ project.views }}</span>
            </div>
          </div>
          <button class="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            Fork Repository
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Example project data
const project = ref({
  id: 1,
  title: 'Sample Project',
  body: 'This is a sample project description.',
  tags: ['vue', 'javascript', 'frontend'],
  reactions: {
    likes: 42
  },
  views: 1234
})
</script>