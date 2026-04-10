<template>
  <div v-if="user" class="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg">
    <div class="flex items-center gap-4 mb-6">
      <img :src="user.image" class="w-24 h-24 rounded-full border-2 border-blue-600" />
      <div>
        <h1 class="text-3xl font-bold">{{ user.firstName }} {{ user.lastName }}</h1>
        <p class="text-gray-500">{{ user.company.title }}</p>
      </div>
    </div>
    
    <div class="border-t pt-4">
      <h2 class="font-bold mb-2">Contact Information</h2>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
  <div v-else class="text-center">Loading profile...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import type { User } from "../types/User"

const route = useRoute()
const user = ref<User | null>(null)

onMounted(async () => {
  const response = await fetch(`https://dummyjson.com/users/${route.params.id}`)
  user.value = await response.json()
})
</script>