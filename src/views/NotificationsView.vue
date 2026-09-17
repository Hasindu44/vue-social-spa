<script setup lang="ts">
import { ref } from 'vue';

const notifications = ref([
  { 
    id: 1, 
    user: 'sarah_jenkins', 
    avatar: 'https://i.pravatar.cc/150?u=sarah', 
    action: 'liked your post.', 
    time: '2h', 
    isUnread: true,
    type: 'like',
    thumbnailUrl: 'https://picsum.photos/seed/tech1/100/100' 
  },
  { 
    id: 2, 
    user: 'alex_codes', 
    avatar: 'https://i.pravatar.cc/150?u=alex', 
    action: 'started following you.', 
    time: '4h', 
    isUnread: true,
    type: 'follow',
    isFollowingBack: false
  },
  { 
    id: 3, 
    user: 'sysadmin_pro', 
    avatar: 'https://i.pravatar.cc/150?u=sysadmin', 
    action: 'mentioned you in a comment: "@michaelw check out this new routing setup!"', 
    time: '6h', 
    isUnread: false,
    type: 'comment',
    thumbnailUrl: 'https://picsum.photos/seed/tech2/100/100' 
  },
  { 
    id: 4, 
    user: 'emily_chen', 
    avatar: 'https://i.pravatar.cc/150?u=emily', 
    action: 'started following you.', 
    time: '1d', 
    isUnread: false,
    type: 'follow',
    isFollowingBack: true
  },
  { 
    id: 5, 
    user: 'devpulse_official', 
    avatar: 'https://i.pravatar.cc/150?u=devpulse', 
    action: 'liked your comment: "That PCB layout is insane 🔥"', 
    time: '2d', 
    isUnread: false,
    type: 'like',
    thumbnailUrl: 'https://picsum.photos/seed/tech3/100/100' 
  },
]);

const markAllAsRead = () => {
  notifications.value.forEach(n => n.isUnread = false);
};
</script>

<template>
  <div class="max-w-2xl mx-auto min-h-screen bg-white dark:bg-slate-950 border-x border-slate-100 dark:border-slate-800/50 pb-20">
    
    <div class="sticky top-0 z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-4 py-3 flex justify-between items-center">
      <h1 class="text-[20px] font-bold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
      <button 
        @click="markAllAsRead" 
        class="text-[14px] font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        Mark all read
      </button>
    </div>

    <div class="flex flex-col pt-1">
      <div 
        v-for="notif in notifications" 
        :key="notif.id"
        class="flex items-center px-4 py-3 cursor-pointer transition-colors"
        :class="notif.isUnread ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/40'"
      >
        
        <img 
          :src="notif.avatar" 
          :alt="notif.user" 
          class="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-100 dark:border-slate-800 bg-slate-200 dark:bg-slate-800" 
        />

        <div class="ml-3 flex-1 text-[14px] leading-[18px] text-slate-900 dark:text-slate-100 pr-3">
          <span class="font-semibold">{{ notif.user }}</span>
          <span class="text-slate-800 dark:text-slate-300"> {{ notif.action }} </span>
          <span class="text-slate-500 dark:text-slate-500">{{ notif.time }}</span>
        </div>

        <div class="shrink-0 ml-1">
          
          <img 
            v-if="notif.thumbnailUrl" 
            :src="notif.thumbnailUrl" 
            class="w-11 h-11 object-cover cursor-pointer hover:opacity-80 transition-opacity bg-slate-200 dark:bg-slate-800 border border-slate-100 dark:border-slate-800"
          />

          <button 
            v-else-if="notif.type === 'follow'" 
            class="h-8 px-4 rounded-lg text-[14px] font-semibold transition-colors flex items-center justify-center min-w-[90px]"
            :class="notif.isFollowingBack 
              ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'"
          >
            {{ notif.isFollowingBack ? 'Following' : 'Follow' }}
          </button>

        </div>

      </div>
    </div>

  </div>
</template>