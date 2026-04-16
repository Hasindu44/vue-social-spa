<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10" @click.self="$emit('close')">
    <button @click="$emit('close')" class="absolute top-6 right-8 text-white text-4xl hover:scale-110 transition-transform font-light">&times;</button>

    <div class="bg-white dark:bg-slate-950 w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-slate-200 dark:border-slate-800">
      
      <div class="w-full md:w-[60%] bg-black flex items-center justify-center relative border-r border-slate-200 dark:border-slate-800">
        <img 
          :src="`https://images.unsplash.com/photo-${techImages[project.id % techImages.length]}?auto=format&fit=contain&q=80&w=1200`" 
          class="w-full h-full object-contain"
        />
      </div>

      <div class="w-full md:w-[40%] flex flex-col h-full bg-white dark:bg-slate-950">
        
        <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <img :src="`https://i.pravatar.cc/150?u=${project.userId}`" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800" />
          <div>
            <h4 class="font-black text-sm text-slate-900 dark:text-white cursor-pointer hover:underline">Dev_User_{{ project.userId }}</h4>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Location: Main Branch</p>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          <div class="flex gap-3">
            <img :src="`https://i.pravatar.cc/150?u=${project.userId}`" class="w-8 h-8 rounded-full flex-shrink-0" />
            <p class="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              <span class="font-black mr-2 cursor-pointer hover:underline text-slate-900 dark:text-white">Dev_User_{{ project.userId }}</span>
              <span class="font-bold text-blue-600 dark:text-blue-400 mr-1">#{{ project.tags[0] }}</span> 
              {{ project.body }}
            </p>
          </div>

          <div v-for="(comment, index) in postComments" :key="index" class="flex gap-3 group">
            <img :src="`https://i.pravatar.cc/150?u=${comment.user}`" class="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer" />
            <div class="text-sm text-slate-800 dark:text-slate-200 flex-1">
              <span class="font-bold mr-2 cursor-pointer hover:underline text-slate-900 dark:text-white">{{ comment.user }}</span>
              {{ comment.text }}
              <div class="flex items-center gap-4 mt-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                <span>{{ (index * 3 + 2) }}h</span>
                <button class="hover:text-slate-900 dark:hover:text-white">Reply</button>
              </div>
            </div>
            <button class="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart :size="14" :stroke-width="2" />
            </button>
          </div>
        </div>

        <div class="border-t border-slate-100 dark:border-slate-800 p-4 bg-white dark:bg-slate-950">
          <div class="flex justify-between items-center mb-3">
            <div class="flex gap-4 text-slate-900 dark:text-white">
              <button class="hover:text-slate-500 transition-colors"><Heart :size="26" :stroke-width="1.5" /></button>
              <button class="hover:text-slate-500 transition-colors"><MessageCircle :size="26" :stroke-width="1.5" /></button>
              <button class="hover:text-slate-500 transition-colors"><Send :size="26" :stroke-width="1.5" /></button>
            </div>
            <button class="text-slate-900 dark:text-white hover:text-slate-500 transition-colors">
              <Bookmark :size="26" :stroke-width="1.5" />
            </button>
          </div>
          
          <p class="font-bold text-sm text-slate-900 dark:text-white mb-4">{{ project.reactions?.likes || 128 }} likes</p>
          
          <div class="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?u=myprofile" class="w-8 h-8 rounded-full" />
            <input type="text" placeholder="Add a technical comment..." 
                   class="flex-1 bg-transparent border-none px-0 py-2 text-sm focus:ring-0 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" />
            <button class="text-blue-600 dark:text-blue-400 font-bold text-sm hover:text-blue-800 dark:hover:text-blue-300">Post</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-vue-next'
import type { Project } from '../types/Project'

const props = defineProps<{ project: Project }>()
defineEmits(['close'])

const techImages = [
  '1518770660439-4636190af475', '1581091226825-a6a2a5aee158', 
  '1537432376710-34f482704e19', '1555664424717-71b69eb0a4f5', 
  '1526374965328-7f61d4dc18c5', '1517077304055-6e89abbf09b0', 
  '1581092160562-40aa08e78837', '1611162617474-5b21e879e113'
]

interface TechComment { user: string; text: string; }

const allComments: TechComment[] = [
  { user: "circuit_wizard", text: "Clean routing on that PCB. Which EDA software did you use? Altium or KiCad?" },
  { user: "robotics_dev", text: "What's the latency on the serial communication? Looks incredibly smooth." },
  { user: "embedded_guy", text: "I ran into a similar issue with the ESP32 power draw. A 100uF cap across the rails fixed it." },
  { user: "sysadmin_pro", text: "Is the source code available on GitHub? Would love to fork this." },
  { user: "ai_researcher", text: "Fascinating approach. Did you consider using a quantized model for edge deployment?" },
  { user: "hardware_hacker", text: "Looks solid! Did you check the thermal limits on that build under full load?" },
  { user: "frontend_dev", text: "The dashboard UI for the controller looks so clean. Vue or React?" },
  { user: "maker_space", text: "Adding this to my weekend project list. Amazing work!" },
  { user: "data_nerd", text: "What sample rate are you getting on those ADCs?" },
  { user: "security_ninja", text: "Make sure you sanitize those inputs if this is connected to the web over MQTT!" }
]

const postComments = computed<TechComment[]>(() => {
  if (!props.project || typeof props.project.id !== 'number') return [allComments[0]!]; 
  const seed = props.project.id;
  const numComments = (seed % 3) + 3; 
  const selected: TechComment[] = []; 
  for (let i = 0; i < numComments; i++) {
    const commentIndex = Math.abs(seed + (i * 7)) % allComments.length;
    selected.push(allComments[commentIndex]!);
  }
  return selected;
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>