<template>
  <div class="bg-white shadow rounded-lg p-4 mb-4 border">
    <div class="grid md:grid-cols-3 gap-4">
      <CustomerInfo :customer="history" />
      <OrderInfo :order="history" />
      <StaffInfo :staff="history" />
    </div>
  </div>
</template>

<script setup>
import CustomerInfo from "./CustomerInfo.vue";
import OrderInfo from "./OrderInfo.vue";
import StaffInfo from "./StaffInfo.vue";

defineProps({
  history: Object,
});
</script>
