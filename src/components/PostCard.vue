<template>
  <div class="bg-white border border-gray-200 mb-6 rounded-sm md:rounded-lg overflow-hidden max-w-[470px] mx-auto">
    <div class="flex items-center p-3 gap-3">
      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px]">
        <img :src="`https://i.pravatar.cc/150?u=${post.userId}`" class="w-full h-full rounded-full border-2 border-white object-cover" />
      </div>
      <router-link :to="`/user/${post.userId}`" class="font-semibold text-sm hover:underline">
        User_{{ post.userId }}
      </router-link>
    </div>

    <router-link :to="`/post/${post.id}`">
      <img :src="post.image" class="w-full aspect-square object-cover" />
    </router-link>
<template>
  <article class="bg-white border border-gray-100 rounded-2xl mb-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <img :src="`https://i.pravatar.cc/150?u=${post.userId}`" class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-50" />
        <div>
          <p class="text-sm font-bold text-slate-900 leading-none">user_{{ post.userId }}</p>
          <p class="text-xs text-slate-400 mt-1">Suggested for you</p>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600">•••</button>
    </div>

    <div class="aspect-square bg-slate-100 overflow-hidden">
      <img 
        :src="post.image" 
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
        loading="lazy"
      />
    </div>

    <div class="p-4">
      <div class="flex gap-4 mb-4 text-slate-700">
        <button class="hover:text-red-500 transition"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></button>
        <button class="hover:text-blue-500 transition"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></button>
      </div>

      <div class="space-y-1">
        <p class="text-sm font-bold text-slate-900">1,248 likes</p>
        <p class="text-sm text-slate-800">
          <span class="font-bold mr-2">user_{{ post.userId }}</span>
          {{ post.title }}
        </p>
      </div>
      
      <p class="text-[10px] font-semibold text-slate-400 mt-3 uppercase tracking-widest">24 minutes ago</p>
    </div>
  </article>
</template>
    <div class="p-3">
      <div class="flex gap-4 mb-2">
        <button class="hover:text-gray-500 text-2xl">♡</button>
        <button class="hover:text-gray-500 text-2xl">💬</button>
        <button class="hover:text-gray-500 text-2xl">✈️</button>
      </div>
      
      <div class="text-sm">
        <span class="font-semibold mr-2">User_{{ post.userId }}</span>
        <span class="text-gray-800">{{ post.title }}</span>
      </div>
      
      <p class="text-gray-400 text-xs mt-2 uppercase tracking-tight">2 Hours Ago</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '../types/Post'
defineProps<{ post: Post & { userId?: number } }>()
</script>