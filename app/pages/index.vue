<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <AbsenSucsess
      v-if="success"
      :current-time="currentTime"
      @reset="resetForm" />

    <template v-else>
      <Header />

      <div class="p-4 space-y-4">
        <TimeCard :current-time="currentTime" />

        <AbsenCard @success="handleSuccess" />

        <InfoCard />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

const success = ref(false);
const currentTime = ref(new Date());

onMounted(() => {
  const timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);

  onUnmounted(() => {
    clearInterval(timer);
  });
});

const handleSuccess = () => {
  success.value = true;

  setTimeout(() => {
    success.value = false;
  }, 3000);
};

const resetForm = () => {
  success.value = false;
};
</script>
