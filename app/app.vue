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

if (import.meta.client) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/eruda";
  script.onload = () => {
    if (window.eruda) {
      window.eruda.init();
    }
  };
  document.body.appendChild(script);
}
</script>
