<template>
  <router-link
    :to="`/post/${post.id}`"
    class="block bg-white shadow p-4 rounded hover:shadow-lg transition"
  >
    <h2 class="font-bold text-lg">{{ post.title }}</h2>
    <p class="text-gray-600 mt-2 line-clamp-3">
      {{ post.body }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import type { Post } from "../types/Post"

const props = defineProps<{
  post: Post
}>()
</script>