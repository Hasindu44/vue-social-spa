<script setup lang="ts">
//symbols relevant to DevPulse
const symbols = ['< >', '{ }', '[ ]', '/', ';', '#', '()', '&&', '||', '=>', '01'];

// Generate 25 random floating particles
const particles = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  symbol: symbols[Math.floor(Math.random() * symbols.length)],
  // Randomize starting positions and speeds
  left: `${Math.random() * 100}%`,
  animationDuration: `${15 + Math.random() * 20}s`,
  animationDelay: `-${Math.random() * 20}s`,
  fontSize: `${0.8 + Math.random() * 1.5}rem`,
  opacity: 0.03 + Math.random() * 0.05,
}));
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950">
    
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-blue-600/20"></div>

    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>

    <div
      v-for="p in particles"
      :key="p.id"
      class="absolute font-mono text-blue-700 dark:text-blue-400 font-bold select-none animate-float"
      :style="{
        left: p.left,
        bottom: '-10%', // Start slightly off screen below
        animationDuration: p.animationDuration,
        animationDelay: p.animationDelay,
        fontSize: p.fontSize,
        opacity: p.opacity
      }"
    >
      {{ p.symbol }}
    </div>
    
  </div>
</template>

<style scoped>

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-120vh) rotate(360deg);
  }
}

.animate-float {
  animation: float linear infinite;
}
</style>