<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-2xl text-(--ui-primary)">Nuxt UI v3</h1>

    <div class="flex items-center gap-2">
      <UButton label="Login" icon="i-lucide-square-play" to="/login" />

      <UButton
        label="Dashboard"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
        to="/dashboard"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Nuxt UI v3 Home Page",
    },
  ],
});
</script>
