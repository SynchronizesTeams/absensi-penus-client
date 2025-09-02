<template>
  <div
    class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Icon name="lucide:bar-chart-3" class="w-5 h-5 text-white" />
        </div>
        <h2 class="text-xl font-semibold text-gray-800">
          Rekap Absensi Bulan Ini
        </h2>
      </div>
    </div>

    <div
      v-if="rekap"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
      <div class="bg-gray-50 rounded-lg p-4 text-center">
        <p class="text-sm font-medium text-gray-500">Hadir</p>
        <p class="text-2xl font-bold text-gray-800">
          {{ rekap.total_hadir || 0 }}
        </p>
      </div>
      <div class="bg-gray-50 rounded-lg p-4 text-center">
        <p class="text-sm font-medium text-gray-500">Izin</p>
        <p class="text-2xl font-bold text-gray-800">
          {{ rekap.total_izin || 0 }}
        </p>
      </div>
      <div class="bg-gray-50 rounded-lg p-4 text-center">
        <p class="text-sm font-medium text-gray-500">Sakit</p>
        <p class="text-2xl font-bold text-gray-800">
          {{ rekap.total_sakit || 0 }}
        </p>
      </div>
      <div class="bg-gray-50 rounded-lg p-4 text-center">
        <p class="text-sm font-medium text-gray-500">Cuti</p>
        <p class="text-2xl font-bold text-gray-800">
          {{ rekap.total_cuti || 0 }}
        </p>
      </div>
      <div
        class="bg-gray-50 rounded-lg p-4 text-center col-span-2 md:col-span-1 lg:col-span-1">
        <p class="text-sm font-medium text-gray-500">Tanpa Keterangan</p>
        <p class="text-2xl font-bold text-red-500">
          {{ rekap.total_tidak_hadir || 0 }}
        </p>
      </div>
    </div>
    <div v-else class="p-6">
      <p class="text-gray-600 text-center">Data rekap tidak ditemukan.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Recap } from "~/types";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const user_id = computed(() => user.user_id);
const rekap = ref<Recap | null>(null);

const fetchRekap = async () => {
  const BASE_URL = useRuntimeConfig().public.apiUrl;
  if (!user_id.value) {
    console.error("User ID not found in local storage.");
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/v1/absen/recap/${user_id.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    rekap.value = data.rekap;
  } catch (error) {
    console.error("Error fetching rekap:", error);
  }
};

onMounted(() => {
  fetchRekap();
});
</script>

<style scoped></style>
