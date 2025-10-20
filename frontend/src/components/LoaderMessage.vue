<template>
  <div class="flex flex-col items-center justify-center py-6 text-gray-600">
    <i class="fa-solid fa-spinner fa-spin text-3xl mb-2"></i>
    <p class="text-base">{{ text || "Loading..." }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "Loading...",
  },
});
</script>
