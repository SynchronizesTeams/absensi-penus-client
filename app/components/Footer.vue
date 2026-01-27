<template>
    <div
        class="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 text-center"
    >
        <div
            class="flex flex-col items-center space-y-2 justify-center text-sm text-gray-600"
        >
            <div class="flex space-x-2">
                <div class="flex items-center">
                    <Icon name="lucide:shield" class="w-4 h-4 text-green-600" />
                    <span>Powered by Devaccto RPL</span>
                </div>
                <div class="w-1 h-4 bg-gray-300 rounded-full"></div>
                <div class="flex items-center">
                    <span>© {{ currentYear }} - SMK Plus PNB</span>
                </div>
            </div>
            <div class="flex items-center">
                <span>Version {{ pkg.version }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import pkg from "../../package.json";
const currentYear = computed(() => new Date().getFullYear());
</script>

<style></style>
