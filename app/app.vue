<template>
  <NuxtPwaManifest />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <div v-show="$pwa?.needRefresh">
      <span> New content available, click on reload button to update. </span>

      <button @click="$pwa?.updateServiceWorker()">Reload</button>
    </div>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();

onMounted(() => {
  if ($pwa?.offlineReady) {
    // Optional: show a less intrusive notification instead of alert
    console.log("App is ready for offline use.");
  }

  if (import.meta.dev) {
    import('eruda').then((eruda: any) => {
      eruda.init();
    });
  }
});
</script>
