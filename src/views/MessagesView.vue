<template>
  <div class="flex h-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
    
    <aside class="w-full md:w-[350px] lg:w-[400px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex-shrink-0">
      
      <div class="p-4 border-b border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Messages</h1>
          <button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-900 dark:text-white">
            <Edit :size="20" />
          </button>
        </div>
        <div class="relative">
          <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
        <div 
          v-for="chat in chats" :key="chat.id"
          @click="activeChat = chat"
          class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200"
          :class="activeChat.id === chat.id ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'"
        >
          <div class="relative">
            <img :src="`https://i.pravatar.cc/150?u=${chat.user}`" class="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
            <div v-if="chat.online" class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-0.5">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white truncate">{{ chat.user }}</h4>
              <span class="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex-shrink-0">{{ chat.lastTime }}</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 truncate font-medium" :class="{'text-slate-900 dark:text-white font-bold': chat.unread}">
              {{ chat.lastMessage }}
            </p>
          </div>
          <div v-if="chat.unread" class="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
        </div>
      </div>
    </aside>

    <main class="hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-slate-900/50">
      
      <div class="h-[88px] p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex-shrink-0">
        <div class="flex items-center gap-3">
          <img :src="`https://i.pravatar.cc/150?u=${activeChat.user}`" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white leading-tight">{{ activeChat.user }}</h3>
            <p class="text-xs font-medium" :class="activeChat.online ? 'text-green-500' : 'text-slate-400'">
              {{ activeChat.online ? 'Active now' : 'Offline' }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 text-slate-900 dark:text-white">
          <button class="hover:text-blue-500 transition-colors"><Phone :size="20" /></button>
          <button class="hover:text-blue-500 transition-colors"><Video :size="20" /></button>
          <button class="hover:text-blue-500 transition-colors"><Info :size="20" /></button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <div 
          v-for="(msg, index) in activeChat.messages" :key="index"
          class="flex w-full"
          :class="msg.sender === 'me' ? 'justify-end' : 'justify-start'"
        >
          <div 
            class="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed"
            :class="msg.sender === 'me' 
              ? 'bg-blue-600 text-white rounded-br-sm' 
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-bl-sm'"
          >
            {{ msg.text }}
            <div class="text-[10px] mt-1 opacity-70 flex justify-end" :class="msg.sender === 'me' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'">
              {{ msg.time }}
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2">
          <button class="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Paperclip :size="20" />
          </button>
          <input 
            type="text" 
            placeholder="Type your message..." 
            class="flex-1 bg-transparent border-none text-sm text-slate-900 dark:text-white focus:ring-0 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button class="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
            <Send :size="14" class="ml-0.5" />
          </button>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Edit, Phone, Video, Info, Paperclip, Send } from 'lucide-vue-next'

interface Message {
  text: string;
  sender: 'me' | 'them';
  time: string;
}

interface Chat {
  id: number;
  user: string;
  online: boolean;
  unread: boolean;
  lastMessage: string;
  lastTime: string;
  messages: Message[];
}

// Dummy messages for demonstration purposes
const chats = ref<Chat[]>([
  {
    id: 1, user: "circuit_wizard", online: true, unread: true, lastMessage: "Did you push the final schematic to the repo?", lastTime: "10:42 AM",
    messages: [
      { text: "Hey! How is the ESP32 integration going?", sender: "me", time: "10:30 AM" },
      { text: "Pretty good. I had to add a pull-up resistor to the I2C line, but it's stable now.", sender: "them", time: "10:35 AM" },
      { text: "Awesome. I'll review the pull request after lunch.", sender: "me", time: "10:40 AM" },
      { text: "Did you push the final schematic to the repo?", sender: "them", time: "10:42 AM" }
    ]
  },
  {
    id: 2, user: "robotics_dev", online: false, unread: false, lastMessage: "I'll calibrate the PID loops tomorrow.", lastTime: "Yesterday",
    messages: [
      { text: "The servos are jittering under heavy load.", sender: "them", time: "Mon, 2:15 PM" },
      { text: "Try increasing the decoupling capacitors on the motor shield.", sender: "me", time: "Mon, 2:30 PM" },
      { text: "That worked! Thanks. I'll calibrate the PID loops tomorrow.", sender: "them", time: "Yesterday" }
    ]
  },
  {
    id: 3, user: "sysadmin_pro", online: true, unread: false, lastMessage: "Server memory leak fixed in v2.4.", lastTime: "Tuesday",
    messages: [
      { text: "We are seeing high latency on the production database.", sender: "me", time: "Tue, 9:00 AM" },
      { text: "Checking the logs now. Looks like a rogue query from the analytics service.", sender: "them", time: "Tue, 9:15 AM" },
      { text: "Server memory leak fixed in v2.4.", sender: "them", time: "Tuesday" }
    ]
  },
  {
    id: 4, user: "frontend_dev", online: false, unread: false, lastMessage: "Tailwind config is finally updated. Looks super clean.", lastTime: "Monday",
    messages: [
      { text: "Can we switch the secondary button to outline style?", sender: "them", time: "Mon, 4:00 PM" },
      { text: "Tailwind config is finally updated. Looks super clean.", sender: "them", time: "Monday" }
    ]
  }
])

// Set the first chat as the active chat on load
const activeChat = ref<Chat>(chats.value[0]!)
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>