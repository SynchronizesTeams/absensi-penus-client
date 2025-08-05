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
interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const photo = ref<string | null>(null);
const location = ref<LocationData | null>(null);
const isCapturing = ref(false);
const isSubmitting = ref(false);
const error = ref<string | null>(null);
const success = ref(false);

const emit = defineEmits(['success'])

const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung oleh browser ini"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let errorMessage = "Gagal mendapatkan lokasi";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Akses lokasi ditolak. Mohon izinkan akses lokasi.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            errorMessage = "Waktu permintaan lokasi habis.";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};

const handleCameraCapture = async () => {
  isCapturing.value = true;
  error.value = null;

  try {
    const locationData = await getCurrentLocation();
    location.value = locationData;

    const event = new Event("trigger-camera");
    document.dispatchEvent(event);
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    emit("success")

    setTimeout(() => {
      resetForm();
    }, 3000);
  } catch (err) {
    error.value = "Gagal mengirim data absen. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  photo.value = null;
  location.value = null;
  error.value = null;
  success.value = false;
};

const setPhoto = (value: string | null) => {
  photo.value = value;
};
</script>

<style></style>
