<template>
  <div class="border rounded-lg mb-4">
    <!-- Date Header -->
    <div
      class="flex justify-between items-center bg-gray-100 px-4 py-2 cursor-pointer"
      @click="$emit('toggleDate', date)"
    >
      <span class="font-semibold">{{ formatDate(date) }}</span>
      <span>{{ expandedDates.includes(date) ? "▲" : "▼" }}</span>
    </div>

    <!-- Orders in specific date group -->
    <div v-if="expandedDates.includes(date)" class="p-4">
      <OrderTable
        :orders="orders"
        :viewApproved="viewApproved"
        :expandedOrders="expandedOrders"
        @toggleProducts="$emit('toggleProducts', $event)"
        @approve="$emit('approve', $event)"
        @done="$emit('done', $event)"
        @unclaimed="$emit('unclaimed', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import OrderTable from "./OrderTable.vue";

defineProps({
  date: String,
  orders: Array,
  viewApproved: Boolean,
  expandedDates: Array,
  expandedOrders: Array,
});
defineEmits(["toggleDate", "toggleProducts", "approve", "done", "unclaimed"]);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
</script>
