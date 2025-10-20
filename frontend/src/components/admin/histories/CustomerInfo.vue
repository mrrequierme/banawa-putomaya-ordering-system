<template>
  <div>
    <h2 class="font-semibold mb-1">Customer</h2>
    <div class="capitalize">
      <span class="text-gray-500 text-sm">Name:</span>
      {{ customer.customer_name }}
    </div>
    <div>
      <span class="text-gray-500 text-sm">Email:</span>
      {{ customer.customer_email }}
    </div>
    <div>
      <span class="text-gray-500 text-sm">Contact:</span>
      {{ customer.customer_contact }}
    </div>
    <div class="capitalize">
      <span class="text-gray-500 text-sm">Gender:</span>
      {{ customer.customer_gender }}
    </div>
    <div class="capitalize">
      <span class="text-gray-500 text-sm">Address:</span>
      {{ customer.customer_address }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  customer: Object,
});
</script>
