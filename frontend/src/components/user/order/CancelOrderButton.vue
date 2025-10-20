<template>
  <div v-if="pendingOrder?.status === 'pending'" class="mt-4 text-center">
    <button
      @click="$emit('cancel-order', pendingOrder.id)"
      class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      :disabled="loading"
    >
      <span v-if="!loading">
        <i class="fa-solid fa-ban mr-1"></i> Cancel Order
      </span>
      <span v-else>
        <i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading...
      </span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  pendingOrder: Object,
  loading: Boolean,
});
defineEmits(["cancel-order"]);
</script>
