<template>
  <div class="mt-10">
    <h3 class="text-xl font-semibold text-center mb-3">
      <i class="fa-solid fa-file-lines"></i> Records
    </h3>

    <div v-if="!orders.length" class="text-center text-gray-500">
      No completed or approved orders yet.
    </div>

    <div
      v-for="order in orders"
      :key="order.id"
      class="border rounded-lg p-4 shadow mb-4"
    >
      <div
        class="inline-block px-2 py-1 rounded text-sm font-semibold mb-2 capitalize"
        :class="{
          'bg-blue-100 text-blue-700': ['approved', 'done'].includes(
            order.status
          ),
          'bg-red-100 text-red-700': !['approved', 'done'].includes(
            order.status
          ),
        }"
      >
        {{ order.status }}
      </div>

      <ul class="list-disc pl-5 mb-2 capitalize">
        <li v-for="p in order.products" :key="p.id">
          {{ p.name }} – {{ p.pivot.qty }} pcs @ ₱{{
            Number(p.pivot.price).toFixed(2)
          }}
        </li>
      </ul>

      <p><strong>Total:</strong> ₱{{ Number(order.total).toFixed(2) }}</p>

      <div class="flex flex-col sm:flex-row justify-between text-sm mt-2">
        <p><strong>Date Ordered:</strong> {{ formatDate(order.created_at) }}</p>
        <p><strong>Claim Date:</strong> {{ formatDate(order.claim_date) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ orders: Array });

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
</script>
