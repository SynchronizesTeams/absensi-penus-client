<template>
  <button
    @click="$emit('submit')"
    :disabled="isSubmitting"
    class="w-full px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl">
    <Icon
      v-if="iconName || loadingIconName"
      :name="isSubmitting ? (loadingIconName || 'lucide:loader-2') : (iconName || 'lucide:check-circle')"
      :class="['w-4 h-4', { 'animate-spin': isSubmitting }]" />
    <span>{{ isSubmitting ? 'Loading...' : text }}</span>
  </button>
</template>
  
<script setup lang="ts">
interface Props {
  isSubmitting: boolean;
  text: string;
  iconName?: string;
  loadingIconName?: string;
}

defineProps<Props>();

defineEmits<{
  submit: [];
}>();
</script>