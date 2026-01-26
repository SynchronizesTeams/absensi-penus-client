<template>
  <div
    class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
  >
    <div class="p-8 pb-6">
      <h2 class="text-2xl font-medium text-center text-gray-800 mb-2">
        Keterangan Tidak Hadir
      </h2>
      <p class="text-center text-gray-600 text-sm">
        Lengkapi data berikut untuk mengajukan izin.
      </p>
    </div>

    <div class="px-8 pb-8 space-y-6">
      <div v-if="!hasSubmitted && !isAbsenToday">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Jenis Keterangan</label
        >
        <div class="flex items-center space-x-6">
          <div v-for="r in radio" :key="r.id" class="flex items-center">
            <input
              :id="r.id"
              :value="r.name"
              name="keterangan"
              type="radio"
              v-model="selectedKeterangan"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              :for="r.id"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ r.name }}</label
            >
          </div>
        </div>
      </div>

      <div v-if="!hasSubmitted && !isAbsenToday">
        <label
          for="keterangan_masuk"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Detail Keterangan</label
        >
        <textarea
          id="keterangan_masuk"
          rows="4"
          v-model="keteranganMasuk"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Jelaskan alasan Anda tidak hadir"
        ></textarea>
      </div>

      <PhotoCard
        v-if="!hasSubmitted && !isAbsenToday"
        :photo="photo"
        :is-capturing="isCapturing"
        @capture-photo="handleCameraCapture"
        @retake-photo="() => setPhoto(null)"
        @file-change="handleFileChange"
      />

      <BaseButton
        v-if="photo && !hasSubmitted && !isAbsenToday"
        :is-submitting="isSubmitting"
        @submit="handleSubmit"
        text="Kirim"
        iconName="lucide:send"
        loadingIconName="lucide:loader-2"
      />

      <div v-if="hasSubmitted" class="text-center text-green-600 font-semibold text-lg">
        Pengajuan izin Anda telah berhasil dikirim.
      </div>

      <div v-if="isAbsenToday" class="text-center text-gray-600 font-semibold text-lg">
        Anda sudah absen masuk atau pulang hari ini. Tidak dapat mengajukan izin.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAbsen } from "~/composables/useAbsen";

const { photo, isCapturing, isSubmitting, error, submitAbsent, setPhoto, checkAbsenMasukStatus, checkAbsenPulangStatus } =
  useAbsen();

const selectedKeterangan = ref("Izin");
const keteranganMasuk = ref("");
const hasSubmitted = ref(false);
const isAbsenToday = ref(false);

const emit = defineEmits(["success", "error"]);

onMounted(async () => {
  const checkedIn = await checkAbsenMasukStatus();
  const checkedOut = await checkAbsenPulangStatus();
  isAbsenToday.value = checkedIn || checkedOut;
});

const radio = [
  { id: "radio-izin", name: "Izin" },
  { id: "radio-sakit", name: "Sakit" },
  { id: "radio-cuti", name: "Cuti" },
];

const handleCameraCapture = () => {
  isCapturing.value = true;
};

const handleFileChange = (file: File) => {
  if (file) {
    photo.value = file;
    isCapturing.value = false;
  }
};

const handleSubmit = async () => {
  if (!photo.value || !keteranganMasuk.value) {
    const errorMessage = "Harap lengkapi semua data (jenis, detail, dan foto).";
    error.value = errorMessage;
    emit("error", errorMessage);
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  try {
    const absentData = {
      photo: photo.value,
      keterangan: selectedKeterangan.value,
      keterangan_masuk: keteranganMasuk.value,
    };

    await submitAbsent(absentData);
    hasSubmitted.value = true; // Set hasSubmitted to true on success
    emit("success", "Pengajuan izin Anda telah berhasil dikirim.");
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan, silahkan coba lagi nanti";
    error.value = errorMessage;
    emit("error", errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
