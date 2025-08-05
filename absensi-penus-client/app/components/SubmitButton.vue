// filepath: /home/kurnias/Documents/Projects/Sekolah/Devaccto/absensi-penus-client/app/components/SubmitButton.vue
<template>
  <button
    @click="$emit('submit')"
    :disabled="isSubmitting"
    class="w-full px-4 py-3 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
    <Icon
      :name="isSubmitting ? 'lucide:loader-2' : 'lucide:check-circle'"
      :class="['w-4 h-4', { 'animate-spin': isSubmitting }]" />
    <span>{{ isSubmitting ? "Mengirim Data..." : "Kirim Absen" }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  isSubmitting: boolean;
}

defineProps<Props>();

defineEmits<{
  submit: [];
}>();
</script>

<style></style>