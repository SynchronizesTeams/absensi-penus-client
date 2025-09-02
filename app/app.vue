<template>
  <NuxtPwaManifest />
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
  if ($pwa?.offlineReady) alert("Offline ready");
});
</script>
<script setup lang="ts">
const { $pwa } = useNuxtApp();

onMounted(() => {
  if ($pwa?.offlineReady) alert("Offline ready");
  if (process.env.NODE_ENV === 'development') {
    import('eruda').then(eruda => {
      eruda.init();
    });
  }
});
</script>