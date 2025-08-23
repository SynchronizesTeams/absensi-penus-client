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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer"
          @click="!isCheckedIn && navigateTo('/absen')"
        >
          <div class="flex items-center space-x-4">
            <div
              :class="[
                'w-14 h-14 rounded-xl flex items-center justify-center shadow-md',
                isCheckedIn
                  ? 'bg-gradient-to-br from-green-500 to-green-600'
                  : 'bg-gradient-to-br from-yellow-500 to-yellow-600',
              ]"
            >
              <Icon
                :name="
                  isCheckedIn ? 'lucide:calendar-check' : 'lucide:calendar'
                "
                class="w-7 h-7 text-white"
              />
            </div>
            <div>
              <p class="text-gray-600 font-medium">Absen Hari Ini</p>
              <h3 class="text-xl font-bold text-gray-800">
                <span v-if="isCheckedIn" class="text-green-500"
                  >✓ Sudah Absen</span
                >
                <span v-else class="text-yellow-500">Belum Absen</span>
              </h3>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200"
        >
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md"
            >
              <Icon name="lucide:trending-up" class="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-800">
                {{ attendanceRate }}%
              </h3>
              <p class="text-gray-600 font-medium">Tingkat Kehadiran</p>
            </div>
          </div>
        </div>
      </div>

      <History />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "main",
});

const attendanceRate = ref(90);
const isCheckedIn = ref(false);
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
