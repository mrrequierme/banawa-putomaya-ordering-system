<template>
  <div>
    <h2 class="font-semibold mb-1">Order</h2>

    <div v-for="p in order.products" :key="p.id" class="border-b pb-1 mb-1">
      <div class="capitalize">
        <span class="text-gray-500 text-sm">Name:</span> {{ p.name }}
      </div>
      <div>
        <span class="text-gray-500 text-sm">Price:</span> ₱{{
          Number(p.price).toFixed(2)
        }}
      </div>
      <div><span class="text-gray-500 text-sm">Qty:</span> {{ p.qty }}</div>
      <div>
        <span class="text-gray-500 text-sm">Subtotal:</span> ₱{{
          Number(p.subtotal).toFixed(2)
        }}
      </div>
    </div>

    <div>
      <span class="text-gray-500 text-sm">Total:</span>
      <b> ₱{{ Number(order.total).toFixed(2) }}</b>
    </div>
    <div>
      <span class="text-gray-500 text-sm">Claim Date:</span>
      {{ formatDate(order.claim_date) }}
    </div>
    <div>
      <span class="text-gray-500 text-sm">Status:</span>
      <span
        :class="[
          'px-2 py-1 rounded text-white text-sm capitalize',
          order.status === 'done' ? 'bg-success-light' : 'bg-red-500',
        ]"
      >
        {{ order.status }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: Object,
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
</script>
