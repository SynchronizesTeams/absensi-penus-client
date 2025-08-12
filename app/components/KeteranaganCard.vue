<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-100">
    <div class="p-8 pb-6">
      <h2 class="text-2xl font-medium text-center text-gray-800 mb-2">
        Pilih Izin
      </h2>
      <p class="text-center text-gray-600 text-sm">
        Wajar mukaku burik karena mainku dibawah terik
      </p>
    </div>
    <form class="max-w-sm mx-auto px-5">
      <div v-for="r in radio" class="flex items-center mb-4">
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
    </form>
  </div>
</template>

<script lang="ts" setup>
const selectedKeterangan = ref("Izin");

const radio = [
  {
    id: "radio-izin",
    name: "Izin",
  },
  {
    id: "radio-sakit",
    name: "Sakit",
  },
  {
    id: "radio-cuti",
    name: "Cuti"
  }
]
</script>