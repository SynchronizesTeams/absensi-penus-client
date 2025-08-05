<template>
  <div class="bg-green-50 border border-green-200 rounded-lg p-3">
    <div class="flex items-center space-x-2">
      <Icon name="lucide:map-pin" class="w-4 h-4 text-green-600" />
      <span class="text-sm font-medium text-green-800">Lokasi Terdeteksi</span>
    </div>
    <div class="mt-1 text-xs text-green-600">
      Lat: {{ location.latitude.toFixed(6) }}, Lng:
      {{ location.longitude.toFixed(6) }}
      <br />
      Akurasi: {{ location.accuracy }} meter
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocationData } from "~/types";

interface Props {
  location: LocationData;
}

defineProps<Props>();
</script>

<style></style>