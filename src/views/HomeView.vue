<template>
<div v-if="loading">Loading posts...</div>
  <div>
    <h1 class="text-2xl font-bold mb-4">Home Feed</h1>

    <div class="grid gap-4 md:grid-cols-2">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
import { onMounted, ref } from "vue"
import PostCard from "../components/PostCard.vue"
import type { Post } from "../types/Post"

const posts = ref<Post[]>([])

onMounted(async () => {
  const response = await fetch("https://dummyjson.com/posts")
  const data = await response.json()
  posts.value = data.posts
  loading.value = false
})
</script>