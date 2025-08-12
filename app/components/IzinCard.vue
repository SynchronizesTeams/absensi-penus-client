<template>
  <div
    class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div class="p-8 pb-6">
      <h2 class="text-2xl font-medium text-center text-gray-800 mb-2">
        Keterangan Tidak Hadir
      </h2>
      <p class="text-center text-gray-600 text-sm">
        Lengkapi data berikut untuk mengajukan izin.
      </p>
    </div>

    <div class="px-8 pb-8 space-y-6">
      <div>
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
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
            <label
              :for="r.id"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ r.name }}</label
            >
          </div>
        </div>
      </div>

      <div>
        <label
          for="keterangan_masuk"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Detail Keterangan</label
        >
        <textarea
          id="keterangan_masuk"
          rows="4"
          v-model="keteranganMasuk"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Jelaskan alasan Anda tidak hadir"></textarea>
      </div>

      <PhotoCard
        :photo="photo"
        :is-capturing="isCapturing"
        @capture-photo="handleCameraCapture"
        @retake-photo="() => setPhoto(null)"
        @file-change="handleFileChange" />

      <BaseButton
        v-if="photo"
        :is-submitting="isSubmitting"
        @submit="handleSubmit"
        text="Kirim"
        iconName="lucide:send"
        loadingIconName="lucide:loader-2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { photo, isCapturing, isSubmitting, error, submitAbsent } =
  useAbsen();

const selectedKeterangan = ref("Izin");
const keteranganMasuk = ref("");

const emit = defineEmits(["success", "error"]);

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

const setPhoto = (value: File | null) => {
  photo.value = value;
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