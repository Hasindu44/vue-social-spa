<template>
  <router-link :to="`/user/${user.id}`" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition">
    <img :src="user.image" class="w-10 h-10 rounded-full" />
    <div>
      <p class="font-semibold text-sm">{{ user.firstName }} {{ user.lastName }}</p>
      <p class="text-xs text-gray-500">{{ user.company.title }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { User } from '../types/User'
defineProps<{ user: User }>()
</script>