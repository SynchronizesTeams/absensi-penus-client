<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-2">
      <label class="block text-gray-700 text-sm font-semibold">Kata Sandi Saat Ini</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          v-model="currentPassword"
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>
    </div>
    <div class="space-y-2">
      <label class="block text-gray-700 text-sm font-semibold">Kata Sandi Baru</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          v-model="newPassword"
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>
    </div>
    <div class="space-y-2">
      <label class="block text-gray-700 text-sm font-semibold">Konfirmasi Kata Sandi Baru</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          v-model="confirmPassword"
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>
    </div>
    <div v-if="error" class="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6 shadow-sm">
      <div class="flex items-center space-x-3">
        <Icon name="lucide:alert-circle" class="h-5 w-5 text-red-500 flex-shrink-0" />
        <span class="text-sm font-medium text-red-700">{{ error }}</span>
      </div>
    </div>
    <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4 mb-6 shadow-sm">
      <div class="flex items-center space-x-3">
        <Icon name="lucide:check-circle" class="h-5 w-5 text-green-500 flex-shrink-0" />
        <span class="text-sm font-medium text-green-700">{{ successMessage }}</span>
      </div>
    </div>
    <BaseButton
      :is-submitting="isLoading"
      text="Ubah Kata Sandi"
      icon-name="lucide:key-round"
      loading-icon-name="lucide:loader-2"
      @submit="handleSubmit"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserSettings } from '@/composables/useUserSettings';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const successMessage = ref<string | null>(null);

const { updatePassword, error, success } = useUserSettings();

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Kata sandi baru dan konfirmasi kata sandi tidak cocok.';
    successMessage.value = null;
    return;
  }

  isLoading.value = true;
  try {
    const response = await updatePassword({
      password: newPassword.value,
    });
    if (response) {
      successMessage.value = response;
      error.value = null;
    }
  } catch (e) {
    successMessage.value = null;
  } finally {
    isLoading.value = false;
  }

  if (successMessage.value) {
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  }
};
</script>

<style scoped>
</style>
