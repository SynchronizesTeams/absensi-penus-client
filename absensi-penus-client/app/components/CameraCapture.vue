<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h2 class="text-2xl font-bold mb-4">Capture Photo</h2>
    <video ref="video" class="w-full max-w-md border-2 border-gray-300" autoplay></video>
    <div class="mt-4">
      <button @click="capturePhoto" class="px-4 py-2 bg-blue-600 text-white rounded">Capture</button>
    </div>
    <canvas ref="canvas" class="hidden"></canvas>
    <div v-if="photo" class="mt-4">
      <h3 class="text-lg font-semibold">Captured Photo:</h3>
      <img :src="photo" alt="Captured Photo" class="w-full max-w-md border-2 border-gray-300" />
      <button @click="retakePhoto" class="mt-2 px-4 py-2 bg-gray-600 text-white rounded">Retake Photo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const photo = ref<string | null>(null);

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (video.value) {
      video.value.srcObject = stream;
    }
  } catch (error) {
    console.error("Error accessing the camera: ", error);
  }
};

const capturePhoto = () => {
  if (canvas.value && video.value) {
    const context = canvas.value.getContext('2d');
    if (context) {
      canvas.value.width = video.value.videoWidth;
      canvas.value.height = video.value.videoHeight;
      context.drawImage(video.value, 0, 0);
      photo.value = canvas.value.toDataURL('image/png');
    }
  }
};

const retakePhoto = () => {
  photo.value = null;
};

onMounted(() => {
  startCamera();
});

onUnmounted(() => {
  if (video.value && video.value.srcObject) {
    const stream = video.value.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  }
});
</script>

<style scoped>
.hidden {
  display: none;
}
</style>