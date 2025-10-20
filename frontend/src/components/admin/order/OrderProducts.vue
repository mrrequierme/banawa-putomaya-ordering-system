<template>
  <div class="mt-2 pt-2">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b">
          <th class="text-left">Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in order.products" :key="p.id">
          <td class="text-left">{{ p.name }}</td>
          <td>₱{{ Number(p.pivot.price).toFixed(2) }}</td>
          <td class="text-center">{{ p.pivot.qty }}</td>
          <td>₱{{ (p.pivot.price * p.pivot.qty).toFixed(2) }}</td>
        </tr>
        <tr class="font-semibold border-t">
          <td colspan="3" class="text-right">Total:</td>
          <td>₱{{ Number(order.total).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Action Buttons -->
    <div class="mt-2 flex gap-2 justify-end">
      <button
        v-if="!viewApproved"
        @click="$emit('approve', order.id)"
        class="bg-success-light text-white px-3 py-1 rounded hover:bg-success-dark cursor-pointer"
      >
        Approve
      </button>

      <button
        v-if="viewApproved"
        @click="$emit('done', order.id)"
        class="bg-primary-light text-white px-3 py-1 rounded hover:bg-primary-dark cursor-pointer"
      >
        Done
      </button>

      <button
        v-if="viewApproved"
        @click="$emit('unclaimed', order.id)"
        class="bg-danger-light text-white px-3 py-1 rounded hover:bg-danger-dark cursor-pointer"
      >
        Unclaimed
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: Object,
  viewApproved: Boolean,
});
defineEmits(["approve", "done", "unclaimed"]);
</script>
