<template>
  <div>
    <div v-if="photo" class="space-y-3">
      <div
        class="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img :src="photo" alt="Foto absen" class="w-full h-full object-cover" />
      </div>
      <button
        @click="$emit('retake-photo')"
        class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Ambil Foto Ulang
      </button>
    </div>

    <div v-else class="space-y-3">
      <div
        class="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
        <div class="text-center space-y-2">
          <Icon name="lucide:camera" class="w-12 h-12 text-gray-400 mx-auto" />
          <p class="text-sm text-gray-500">Belum ada foto</p>
        </div>
        <input id="fileInput" type="file" accept="image/*" capture="user" />
      </div>

      <button
        @click="handleCameraClick"
        :disabled="isCapturing"
        class="w-full px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
        <Icon
          :name="isCapturing ? 'lucide:loader-2' : 'lucide:camera'"
          :class="['w-4 h-4', { 'animate-spin': isCapturing }]" />
        <span>{{ isCapturing ? "Mengakses Kamera..." : "Ambil Foto" }}</span>
      </button>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      capture="environment"
      @change="handleFileChange"
      class="hidden" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  photo: string | null;
  isCapturing: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  "capture-photo": [];
  "retake-photo": [];
  "file-change": [file: File];
}>();

// const fileInputRef = ref<HTMLInputElement>();
const fileInput = document.getElementById("fileInput")

const handleCameraClick = () => {
  emit("capture-photo");
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    emit("file-change", file);
  }
};

onMounted(() => {
  const handleTriggerCamera = () => {
    fileInput?.click()
  };

  document.addEventListener("trigger-camera", handleTriggerCamera);

  onUnmounted(() => {
    document.removeEventListener("trigger-camera", handleTriggerCamera);
  });
});
</script>

<style></style>
