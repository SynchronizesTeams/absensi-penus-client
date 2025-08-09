<template>
  <div
    class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div class="p-8 pb-6">
      <h2 class="text-2xl font-medium text-center text-gray-800 mb-2">
        Ambil Foto untuk Absen
      </h2>
      <p class="text-center text-gray-600 text-sm">
        Pastikan wajah Anda terlihat jelas dalam foto
      </p>
    </div>

    <div class="px-8 pb-8 space-y-6">
      <PhotoCard
        :photo="photo"
        :is-capturing="isCapturing"
        @capture-photo="handleCameraCapture"
        @retake-photo="() => setPhoto(null)"
        @file-change="handleFileChange" />

      <LocationStatus v-if="location" :location="location" />

      <BaseButton
        v-if="photo && location"
        :is-submitting="isSubmitting"
        @submit="handleSubmitAttendance"
        text="Kirim Absen"
        iconName="lucide:check-circle"
        loadingIconName="lucide:loader-2" />

      <!-- Tombol sinkronisasi manual -->
      <div v-if="offlineCount > 0" class="mt-4 text-center">
        <button
          @click="syncOfflineData"
          :disabled="isSubmitting"
          class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
          <Icon name="lucide:refresh-cw" class="mr-2" />
          Sinkronkan {{ offlineCount }} Absen Offline
        </button>
        <p class="text-xs text-gray-500 mt-2">
          Data absen offline akan dikirim ke server
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const {
  photo,
  location,
  isCapturing,
  isSubmitting,
  error,
  success,
  offlineCount,
  getCurrentLocation,
  submitAttendance,
  syncOfflineData,
  initOfflineCount
} = useAbsen();

const AttendanceData = ref({
  photo: null as File | null,
  location: null as { latitude: number; longitude: number } | null,
  timestamp: new Date(),
});

const emit = defineEmits(["success", "error"]);

const handleCameraCapture = async () => {
  try {
    const locationData = await getCurrentLocation();
    location.value = locationData;
    isCapturing.value = true;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Terjadi kesalahan";
    isCapturing.value = false;
    emit("error", error.value);
  }
};

const handleFileChange = (file: File) => {
  if (file) {
    photo.value = file;
    isCapturing.value = false;
  }
};

const handleSubmitAttendance = async () => {
  if (!photo.value || !location.value) {
    error.value = "Foto dan lokasi diperlukan untuk absen";
    emit("error", error.value);
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  try {
    AttendanceData.value.photo = photo.value;
    AttendanceData.value.location = location.value;
    await submitAttendance(AttendanceData.value);

    // Jika offline, error akan ditangkap di catch block
    emit("success");
  } catch (err: any) {
    if (err.message === 'offline') {
      emit("success", "offline");
    } else {
      error.value = err instanceof Error ? err.message : "Terjadi kesalahan, silahkan coba lagi nanti";
      emit("error", error.value);
    }
  } finally {
    isSubmitting.value = false;
  }
};

const setPhoto = (value: File | null) => {
  photo.value = value;
};

// Sinkronkan otomatis saat online
onMounted(async () => {
  await initOfflineCount();

  window.addEventListener('online', async () => {
    if (offlineCount.value > 0) {
      await syncOfflineData();
    }
  });
});
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
