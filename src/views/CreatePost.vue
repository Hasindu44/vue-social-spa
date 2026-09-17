<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Image as ImageIcon, Link2, Code, X, Send, Sparkles, Globe } from 'lucide-vue-next';

const router = useRouter();

const postContent = ref('');
const selectedImage = ref<string | null>(null);
const isSubmitting = ref(false);

const triggerImageUpload = () => {
  selectedImage.value = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&fit=crop';
};

const removeImage = () => {
  selectedImage.value = null;
};

const handlePost = async () => {
  if (!postContent.value.trim() && !selectedImage.value) return;
  isSubmitting.value = true;
  await new Promise(resolve => setTimeout(resolve, 800));
  postContent.value = '';
  selectedImage.value = null;
  isSubmitting.value = false;
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-900 dark:via-[#020617] dark:to-[#020617] p-6 md:p-12 flex flex-col items-center">
    
    <div class="w-full max-w-3xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-400">
            Create
          </h1>
        </div>
        <button @click="router.back()" class="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          Cancel
        </button>
      </div>

      <div class="relative bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-3xl shadow-2xl dark:shadow-blue-900/10 overflow-hidden transition-all duration-500 focus-within:ring-1 focus-within:ring-blue-500/50 focus-within:border-blue-500/50">
        
        <div class="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
          <div class="flex items-center gap-3">
            <div class="p-[2px] rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500">
              <img 
                src="https://images.unsplash.com/photo-1539125530496-3ca408f9c2d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="User" 
                class="w-8 h-8 rounded-full border-2 border-white dark:border-[#0f172a] object-cover" 
              />
            </div>
            <span class="font-bold text-sm text-slate-900 dark:text-white tracking-wide">michael_w</span>
          </div>
          
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
            <Globe :size="14" class="text-blue-500" />
            Everyone
          </button>
        </div>

        <div class="p-6">
          <textarea 
            v-model="postContent"
            placeholder="What are you building?"
            class="w-full min-h-[180px] resize-none bg-transparent text-xl md:text-2xl font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none leading-relaxed"
          ></textarea>

          <div v-if="selectedImage" class="relative mt-6 rounded-2xl overflow-hidden group">
            <div class="absolute inset-0 border border-black/10 dark:border-white/10 rounded-2xl z-10 pointer-events-none"></div>
            <img :src="selectedImage" alt="Upload preview" class="w-full max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
            
            <button 
              @click="removeImage"
              class="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:bg-black/60 z-20"
            >
              <X :size="16" />
            </button>
          </div>
        </div>

        <div class="px-6 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-black/20">
          
          <div class="flex gap-1">
            <button @click="triggerImageUpload" class="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-500 transition-colors group relative">
              <ImageIcon :size="22" class="group-hover:scale-110 transition-transform" />
            </button>
            <button class="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors group">
              <Code :size="22" class="group-hover:scale-110 transition-transform" />
            </button>
            <button class="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:text-purple-500 transition-colors group">
              <Link2 :size="22" class="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <button 
            @click="handlePost"
            :disabled="!postContent.trim() && !selectedImage || isSubmitting"
            class="group relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
          >
            <span v-if="isSubmitting" class="flex items-center gap-2">
              <Sparkles :size="16" class="animate-pulse" /> Posting
            </span>
            <template v-else>
              Post <Send :size="16" class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </template>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>