<template>
  <div v-if="post">
    <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
    <p class="text-gray-700">{{ post.body }}</p>
  </div>

  <div v-else class="text-center mt-10">
    Loading...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import type { Post } from "../types/Post"

const route = useRoute()
const post = ref<Post | null>(null)

onMounted(async () => {
  const response = await fetch(
    `https://dummyjson.com/posts/${route.params.id}`
  )
  post.value = await response.json()
})
</script>