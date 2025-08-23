<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-6">
          <div
            class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl"
          >
            <Icon name="lucide:calendar" class="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          {{ getGreeting() }}, {{ name }} Selamat Datang di
          <span class="text-blue-600">Trabsen</span>
        </h1>
        <p class="text-gray-600 text-lg">
          Sistem absensi online untuk staff dan guru
        </p>
      </div>

      <!-- Aktivitaas -->
      <History />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "main",
});

const user = JSON.parse(localStorage.getItem("user") || "{}");
const name = computed(() => user.name);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 10) {
    return "Selamat Pagi";
  }
  if (hour >= 10 && hour < 15) {
    return "Selamat Siang";
  }
  if (hour >= 15 && hour < 18) {
    return "Selamat Sore";
  }
  return "Selamat Malam";
};
</script>
