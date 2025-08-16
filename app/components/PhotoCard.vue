<template>
  <div>
    <div v-if="photo" class="space-y-4">
      <div
        class="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-md"
      >
        <img :src="photo" alt="Foto absen" class="w-full h-full object-cover" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        ></div>
        <div class="absolute top-4 right-4">
          <div
            class="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          >
            <Icon name="lucide:check" class="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      <button
        @click="$emit('retake-photo')"
        class="w-full px-6 py-3 text-base font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Icon name="lucide:rotate-ccw" class="w-5 h-5" />
        <span>Ambil Foto Ulang</span>
      </button>
    </div>

    <div v-else class="space-y-4">
      <div
        class="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-300"
      >
        <div class="text-center space-y-4 p-8">
          <div class="relative">
            <div
              class="w-20 h-20 border-gray-300 border-dashed border-2 rounded-full flex items-center justify-center mx-auto"
            >
              <Icon name="lucide:camera" class="w-10 h-10 text-gray-300" />
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-lg font-medium text-gray-700">Belum ada foto</p>
            <p class="text-sm text-gray-500">
              Tap tombol di bawah untuk mengambil foto
            </p>
          </div>
        </div>
      </div>

      <button
        @click="handleCameraClick"
        :disabled="isCapturing"
        class="w-full px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
      >
        <Icon
          :name="isCapturing ? 'lucide:loader-2' : 'lucide:camera'"
          :class="['w-5 h-5', { 'animate-spin': isCapturing }]"
        />
        <span class="font-semibold">
          {{ isCapturing ? "Mengakses Kamera..." : "Ambil Foto" }}
        </span>
      </button>
    </div>

    <input
      id="cameraInput"
      type="file"
      accept="image/*"
      capture="user"
      @change="handleFileChange"
      class="hidden"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  photo: File | null;
  isCapturing: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  "capture-photo": [];
  "retake-photo": [];
  "file-change": [file: File];
}>();

const handleCameraClick = () => {
  emit("capture-photo");
  const input = document.getElementById(
    "cameraInput"
  ) as HTMLInputElement | null;
  input?.click();
};

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    emit("file-change", file);
  }
};

const photo = computed(() => {
  return props.photo ? URL.createObjectURL(props.photo) : null;
});
</script>