<template>
  <div
    class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Icon name="lucide:history" class="w-5 h-5 text-white" />
        </div>
        <h2 class="text-xl font-semibold text-gray-800">Aktivitas Terkini</h2>
      </div>
    </div>

    <div v-if="recentActivities.length" class="divide-y divide-gray-100">
      <div
        v-for="activity in recentActivities"
        :key="activity.id"
        class="p-6 hover:bg-gray-50 transition-colors duration-200">
        <div class="flex items-center space-x-4">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center shadow-sm bg-green-100">
            <Icon name="lucide:log-in" class="w-6 h-6 text-green-600" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="font-medium text-gray-800">
                Presensi {{ activity.status }}
              </p>
              <span class="text-sm text-gray-500">{{
                new Date(activity.created_at).toLocaleDateString()
              }}</span>
            </div>
            <p class="text-sm text-gray-600 mt-1 capitalize">
              {{ activity.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="p-6">
      <p class="text-gray-600 text-center">
        Aktivitas tidak ditemukan
      </p>
    </div>

    <!-- <div v-if="recentActivities.length >= 4" class="p-6 bg-gray-50 text-center">
      <button
        class="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
        Lihat Semua Aktivitas
      </button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import type { Activity } from '~/types';

const user = JSON.parse(localStorage.getItem("user") || "{}");
const user_id = computed(() => user.user_id);

const recentActivities = ref<Activity[]>([]);

const fetchHistory = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const BASE_URL = useRuntimeConfig().public.apiUrl;

  if (!user.id) {
    console.error("User ID or BASE_URL not found in local storage.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/v1/log/user/${user_id.value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    recentActivities.value = data.map((activity: any) => ({
      id: activity.id,
      status: activity.status,
      created_at: activity.created_at,
      time: activity.time,
      description: `Absen ${activity.status} pada pukul ${activity.time}`
    }));

  } catch (error) {
    console.error("Error fetching history:", error);
  }
};

onMounted(() => {
  fetchHistory();
});
</script>

<style></style>
