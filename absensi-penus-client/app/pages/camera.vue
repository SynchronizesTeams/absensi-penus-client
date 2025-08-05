<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-bold mb-4">Capture Photo</h2>
      <video ref="video" class="w-full h-auto rounded-lg" autoplay></video>
      <div class="mt-4 flex justify-between">
        <button @click="capturePhoto" class="px-4 py-2 bg-blue-600 text-white rounded">Capture</button>
        <button @click="stopCamera" class="px-4 py-2 bg-red-600 text-white rounded">Stop</button>
      </div>
      <canvas ref="canvas" class="hidden"></canvas>
      <div v-if="photo" class="mt-4">
        <h3 class="text-lg font-semibold">Captured Photo:</h3>
        <img :src="photo" alt="Captured Photo" class="mt-2 rounded-lg" />
        <button @click="retakePhoto" class="mt-2 px-4 py-2 bg-gray-300 rounded">Retake</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const photo = ref<string | null>(null);
let stream: MediaStream | null = null;

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};

const retakePhoto = () => {
  photo.value = null;
};

onMounted(() => {
  startCamera();
});

onUnmounted(() => {
  stopCamera();
});
</script>

<style>
/* Add any additional styles here */
</style>