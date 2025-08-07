<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-30 bg-black/40 transition-opacity duration-300"
      @click="isOpen = false"></div>
    <button
      @click="isOpen = !isOpen"
      type="button"
      class="inline-flex items-center p-3 text-gray-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md">
      <span class="sr-only">Open sidebar</span>
      <Icon name="lucide:menu" class="w-6 h-6" />
    </button>
    <aside
      :class="[
        'fixed top-0 left-0 z-40 w-72 h-screen transition-all duration-300 ease-out bg-white shadow-2xl',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
      aria-label="Sidebar">
      <div
        class="flex items-center justify-between p-6 border-b border-gray-100">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Icon name="lucide:user" class="w-5 h-5 text-white" />
          </div>
          <h2 class="text-xl font-medium text-gray-800">Absen Pro MAX</h2>
        </div>
        <button
          @click="isOpen = false"
          type="button"
          class="inline-flex items-center p-2 text-gray-400 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200">
          <span class="sr-only">Close sidebar</span>
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>
      <div class="h-full px-4 py-6 overflow-y-auto">
        <nav class="space-y-2">
          <NuxtLink
            to="/"
            class="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
              <Icon
                name="lucide:layout-dashboard"
                class="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
            </div>
            <span class="ml-3 font-medium">Beranda</span>
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
              <Icon
                name="lucide:settings"
                class="w-5 h-5 text-gray-600 group-hover:text-blue-700" />
            </div>
            <span class="ml-3 font-medium">Pengaturan</span>
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
              <Icon
                name="lucide:settings"
                class="w-5 h-5 text-gray-600 group-hover:text-blue-700" />
            </div>
            <span class="ml-3 font-medium">Pengaturan</span>
          </NuxtLink>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>

<style scoped>
@reference '@/assets/css/main.css';
.router-link-exact-active {
  @apply bg-blue-100 text-blue-700 shadow-sm;
}

.router-link-exact-active .bg-gray-100,
.router-link-exact-active .bg-blue-50 {
  @apply bg-blue-100;
}

.router-link-exact-active .text-gray-600,
.router-link-exact-active .text-blue-600 {
  @apply text-blue-700;
}

.group:hover {
  transform: translateY(-1px);
}

.router-link-exact-active {
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}
</style>
