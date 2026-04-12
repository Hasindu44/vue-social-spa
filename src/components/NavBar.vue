<template>
  <nav class="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
    <div class="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
      
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="font-mono text-xl font-black tracking-tighter text-slate-900">
          DEV<span class="text-blue-600">PULSE</span>
        </span>
      </RouterLink>

      <div class="flex items-center gap-8">
        <RouterLink to="/" class="nav-link" active-class="text-blue-600">
          <span class="text-2xl">🏠</span>
          <span class="hidden md:inline text-xs font-black uppercase tracking-widest ml-1">Home</span>
        </RouterLink>

        <RouterLink to="/explore" class="nav-link" active-class="text-blue-600">
          <span class="text-2xl">🧭</span>
          <span class="hidden md:inline text-xs font-black uppercase tracking-widest ml-1">Explore</span>
        </RouterLink>

        <button class="nav-link">
          <span class="text-2xl">➕</span>
        </button>
      </div>

      <RouterLink to="/user/1" class="flex items-center gap-2 border-l pl-6">
        <img src="https://i.pravatar.cc/150?u=myprofile" class="w-8 h-8 rounded-full border-2 border-slate-200" />
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
@reference "../style.css";

.nav-link {
  @apply flex items-center text-slate-400 hover:text-slate-900 transition-colors cursor-pointer;
}
</style>