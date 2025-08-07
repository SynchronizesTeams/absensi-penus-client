<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-6">
          <div
            class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
            <Icon name="lucide:calendar" class="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          Selamat Datang di Absen Pro MAX 
        </h1>
        <p class="text-gray-600 text-lg">
          Sistem absensi online untuk staff dan guru
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200">
          <div class="flex items-center space-x-4">
            <div
              :class="['w-14 h-14 rounded-xl flex items-center justify-center shadow-md', 
                isCheckedIn ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-yellow-500 to-yellow-600']">
              <Icon :name="isCheckedIn ? 'lucide:calendar-check' : 'lucide:calendar'" class="w-7 h-7 text-white" />
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
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform hover:scale-105 transition-all duration-200">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
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

      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Icon name="lucide:history" class="w-5 h-5 text-white" />
            </div>
            <h2 class="text-xl font-semibold text-gray-800">
              Aktivitas Terkini
            </h2>
          </div>
        </div>

        <div class="divide-y divide-gray-100">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center shadow-sm bg-green-100">
                <Icon
                  name="lucide:log-in"
                  class="w-6 h-6 text-green-600" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-gray-800">{{ activity.title }}</p>
                  <span class="text-sm text-gray-500">{{ activity.time }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">
                  {{ activity.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-gray-50 text-center">
          <button
            class="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "main",
});

const attendanceRate = ref(90);
const isCheckedIn = ref(false);
const lastCheckInTime = ref("08:30 WIB");

// Dummy data histori
const recentActivities = ref([
  {
    id: 1,
    type: "check-in",
    title: "Check-in Berhasil",
    description: "Absensi masuk pada 08:30 WIB",
    time: "2 jam lalu",
  },
  {
    id: 2,
    type: "check-in",
    title: "Check-in Berhasil",
    description: "Absensi masuk pada 08:25 WIB",
    time: "1 hari lalu",
  },
  {
    id: 3,
    type: "check-in",
    title: "Check-in Berhasil",
    description: "Absensi masuk pada 08:35 WIB",
    time: "2 hari lalu",
  },
]);

onMounted(() => {
  const lastCheckIn = localStorage.getItem("lastCheckIn");
  const today = new Date().toDateString();

  if (lastCheckIn && new Date(lastCheckIn).toDateString() === today) {
    isCheckedIn.value = true;
    lastCheckInTime.value = new Date(lastCheckIn).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  }
});
</script>

<style scoped></style>
