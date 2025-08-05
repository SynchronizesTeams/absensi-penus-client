<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 pb-4">
      <h2 class="text-lg font-semibold text-center text-gray-900 mb-4">
        Ambil Foto untuk Absen
      </h2>
    </div>
    <div class="px-6 pb-6 space-y-4">
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
        <div class="flex items-center space-x-2">
          <Icon name="lucide:alert-circle" class="h-4 w-4 text-red-600" />
          <span class="text-sm text-red-800">{{ error }}</span>
        </div>
      </div>

      <PhotoCard
        :photo="photo"
        :is-capturing="isCapturing"
        @capture-photo="handleCameraCapture"
        @retake-photo="() => setPhoto(null)"
        @file-change="handleFileChange" />

      <LocationStatus v-if="location" :location="location" />

      <SubmitButton
        v-if="photo && location"
        :is-submitting="isSubmitting"
        @submit="handleSubmitAttendance" />
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  photo,
  location,
  isCapturing,
  isSubmitting,
  error,
  success,
  getCurrentLocation,
  submitAttendance,
  resetForm,
} = useAbsen();

const AttendanceData = ref({
  photo: null as string | null,
  location: null as { latitude: number; longitude: number } | null,
  timestamp: new Date(),
});

const emit = defineEmits(["success"]);

const handleCameraCapture = async () => {
  isCapturing.value = true;
  error.value = null;

  try {
    const locationData = await getCurrentLocation();
    location.value = locationData;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Terjadi kesalahan";
    isCapturing.value = false;
  }
};

const handleFileChange = (file: File) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photo.value = e.target?.result as string;
      isCapturing.value = false;
    };
    reader.readAsDataURL(file);
  } else {
    isCapturing.value = false;
  }
};

const handleSubmitAttendance = async () => {
  if (!photo.value || !location.value) {
    error.value = "Foto dan lokasi diperlukan untuk absen";
    return;
  }

  isSubmitting.value = true;
  error.value = null;
  try {
    AttendanceData.value.photo = photo.value;
    AttendanceData.value.location = location.value;
    AttendanceData.value.timestamp = new Date();
    await submitAttendance(AttendanceData.value);
    emit("success");
    setTimeout(() => {
      resetForm();
    }, 3000);
  } catch (err) {
    error.value = "Gagal mengirim data absen. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
};

const setPhoto = (value: string | null) => {
  photo.value = value;
};
</script>

<style></style>
