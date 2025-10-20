<template>
  <div>
    <h2 class="font-semibold mb-1">Managed By</h2>
    <div>
      <span class="text-gray-500 text-sm">Name:</span>
      {{ staff.staff_name }}
    </div>
    <div>
      <span class="text-gray-500 text-sm">Email:</span>
      {{ staff.staff_email }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  staff: Object,
});
</script>
