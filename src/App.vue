<template>
  <div class="min-h-screen bg-[#FAFAFA] font-sans antialiased text-slate-900">
    <NavBar />

    <main class="pt-20 pb-10 px-4">
      <div class="max-w-[480px] mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>