<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <AbsenStatus
      v-if="showStatus"
      :status="status"
      :message="statusMessage"
      :current-time="currentTime"
      @reset="resetForm"
    />

    <template v-else>
      <div class="p-4 space-y-4">
        <TimeCard :current-time="currentTime" />
        <template v-if="!hasAbsenMasuk || !hasAbsenPulang">
          <AbsenCard @success="handleSuccess" @error="handleError" />
        </template>
        <template v-else>
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <h2 class="text-2xl font-medium text-gray-800 mb-2">
              Terima kasih! Anda sudah melakukan absen hari ini.
            </h2>
            <p class="text-gray-600">
              Anda sudah melakukan absen masuk dan absen pulang.
            </p>
          </div>
        </template>
        <InfoCard />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useAbsen } from "~/composables/useAbsen";

const { checkAbsenMasukStatus, checkAbsenPulangStatus } = useAbsen();

const showStatus = ref(false);
const status = ref<"success" | "error">("success");
const statusMessage = ref("");
const currentTime = ref(new Date());
const hasAbsenMasuk = ref(false);
const hasAbsenPulang = ref(false);

const isPulang = computed(() => new Date().getHours() >= 13);

definePageMeta({
  layout: "main",
});

onMounted(async () => {
  const timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);

  try {
    navigator.geolocation.getCurrentPosition((pos) => console.log(pos));
  } catch (error) {
    console.error(error);
  }

  hasAbsenMasuk.value = await checkAbsenMasukStatus();
  hasAbsenPulang.value = await checkAbsenPulangStatus();

  onUnmounted(() => {
    clearInterval(timer);
  });
});

const handleSuccess = (msg = "") => {
  status.value = "success";
  statusMessage.value = msg || "Data absen Anda telah berhasil dikirim pada";
  showStatus.value = true;
  if (isPulang.value) {
    hasAbsenPulang.value = true;
  } else {
    hasAbsenMasuk.value = true;
  }
};

const handleError = (msg = "") => {
  status.value = "error";
  statusMessage.value = msg || "Data absen gagal dikirim. Silakan coba lagi.";
  showStatus.value = true;
};

const resetForm = () => {
  showStatus.value = false;
};
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>
