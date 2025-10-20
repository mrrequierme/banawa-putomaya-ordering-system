<template>
  <div>
    <p>
      Status:
      <span class="bg-blue-100 px-2 py-1 rounded capitalize">
        {{ pendingOrder?.status || "none" }}
      </span>
    </p>

    <div class="text-right text-lg font-semibold mt-4">
      Total: ₱{{ Number(total || 0).toFixed(2) }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: Number,
  pendingOrder: Object,
});
</script>
