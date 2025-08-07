<template>
  <div
    class="flex items-center justify-between sticky top-0 z-30 px-4 py-4 bg-white shadow-lg border-b border-gray-100">
    <div class="flex items-center space-x-2">
      <SideBar />
      <h1 class="text-xl font-bold text-gray-900">{{ getTitle() }}</h1>
    </div>
    <span
      :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        isOnline ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200']">
      <span :class="['w-2 h-2 mr-1.5 rounded-full', isOnline ? 'bg-green-400' : 'bg-red-400']"></span>
      {{ isOnline ? 'Online' : 'Offline' }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const isOnline = ref(navigator.onLine)

const updateOnlineStatus = () => {
  isOnline.value = true
}
const updateOfflineStatus = () => {
  isOnline.value = false
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOfflineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOfflineStatus)
})

function getTitle() {
  const path = useRoute().path
  switch (path) {
    case '/':
      return 'Beranda'
    case '/absen':
      return 'Absen'
    case '/settings':
      return 'Pengaturan'
    default:
      return 'Unknown Page'
  }
}
</script>

<style>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.bg-green-400 {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>