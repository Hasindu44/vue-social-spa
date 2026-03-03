<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits<{
  (e: "search", query: string): void
}>()

const query = ref("")

function submit() {
  emit("search", query.value)
}
</script>

<template>
  <div class="mb-4 flex gap-2">
    <input
      v-model="query"
      placeholder="Search posts..."
      class="border p-2 flex-1"
    />
    <button
      @click="submit"
      class="bg-blue-600 text-white px-4 py-2"
    >
      Search
    </button>
  </div>
</template>