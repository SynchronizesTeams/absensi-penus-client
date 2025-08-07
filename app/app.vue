<template>
  <NuxtPwaManifest />
  <NuxtPage />
</template>

<script setup>
if (process.client && process.env.NODE_ENV === "development") {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/eruda";
  script.onload = () => window.eruda && window.eruda.init();
  document.body.appendChild(script);
}
</script>
