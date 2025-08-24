<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Kata Sandi Saat Ini</span>
      </label>
      <input
        type="password"
        v-model="currentPassword"
        class="input input-bordered w-full"
        required
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Kata Sandi Baru</span>
      </label>
      <input
        type="password"
        v-model="newPassword"
        class="input input-bordered w-full"
        required
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Konfirmasi Kata Sandi Baru</span>
      </label>
      <input
        type="password"
        v-model="confirmPassword"
        class="input input-bordered w-full"
        required
      />
    </div>
    <div v-if="error" class="text-error">{{ error }}</div>
    <div v-if="success" class="text-success">{{ success }}</div>
    <button type="submit" class="btn btn-primary">
      Ubah Kata Sandi
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserSettings } from '@/composables/useUserSettings';

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const { updatePassword, error, success } = useUserSettings();

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Kata sandi baru dan konfirmasi kata sandi tidak cocok.';
    success.value = false;
    return;
  }

  await updatePassword({
    password: newPassword.value,
  });

  if (success.value) {
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  }
};
</script>

<style scoped>
/* Tambahkan gaya khusus di sini jika diperlukan */
</style>
