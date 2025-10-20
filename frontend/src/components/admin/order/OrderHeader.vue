<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3"
  >
    <h2 class="text-2xl font-bold text-gray-700">
      {{ viewApproved ? "Approved Orders" : "Pending Orders" }}
    </h2>
    <button
      @click="$emit('toggleView')"
      class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark w-full sm:w-auto cursor-pointer"
    >
      {{ viewApproved ? "View Pending Orders" : "View Approved Orders" }}
    </button>
  </div>
</template>

<script setup>
defineProps({ viewApproved: Boolean });
defineEmits(["toggleView"]);
</script>
