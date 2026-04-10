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
import { computed } from "vue"
import { onMounted, ref } from "vue"
import PostCard from "../components/PostCard.vue"
import type { Post } from "../types/Post"

const posts = ref<Post[]>([])

onMounted(async () => {
  const response = await fetch("https://dummyjson.com/posts")
  const data = await response.json()
  posts.value = data.posts.map((post: any) => ({
  ...post,
  image: `https://picsum.photos/seed/${post.id}/600/400`
  }))
  loading.value = false
})

const searchQuery = ref("")

const filteredPosts = computed(() => {
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function handleSearch(q: string) {
  searchQuery.value = q
}
</script>