<template>
  <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-screen-md mx-auto px-4 h-16 flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-extrabold tracking-tight text-slate-900">
        VUE<span class="text-blue-600">SOCIAL</span>
      </RouterLink>

      <div class="flex items-center gap-6">
        <RouterLink to="/" class="text-gray-500 hover:text-blue-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </RouterLink>
        <div class="w-8 h-8 rounded-full bg-slate-200 cursor-pointer overflow-hidden border border-gray-100">
          <img src="https://i.pravatar.cc/150?u=me" alt="profile" />
        </div>
      </div>
    </div>
  </nav>
</template>