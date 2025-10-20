<template>
  <div class="overflow-x-auto mt-4">
    <table
      class="min-w-full border text-center text-sm sm:text-base border-collapse"
    >
      <thead class="bg-gray-100">
        <tr class="border-b">
          <th class="py-2 px-3 whitespace-nowrap">Product</th>
          <th class="py-2 px-3 whitespace-nowrap">Qty</th>
          <th class="py-2 px-3 whitespace-nowrap sm:table-cell">Price</th>
          <th class="py-2 px-3 whitespace-nowrap sm:table-cell">Subtotal</th>
          <th class="py-2 px-3 whitespace-nowrap text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in cart"
          :key="item.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="py-2 px-3 break-words">{{ item.name }}</td>

          <td class="py-2 px-3">
            <input
              type="number"
              v-model.number="item.qty"
              min="1"
              class="w-16 text-center border rounded"
              @change="$emit('update-qty', item.id, item.qty)"
            />
          </td>

          <td class="py-2 px-3 sm:table-cell">
            ₱{{ Number(item.price || 0).toFixed(2) }}
          </td>

          <td class="py-2 px-3 sm:table-cell">
            ₱{{ Number(item.qty * (item.price || 0)).toFixed(2) }}
          </td>

          <td class="py-2 px-3">
            <button
              @click="$emit('delete-item', item.id)"
              class="text-red-600 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="!cart.length">
          <td colspan="5" class="text-gray-500 py-3">No items in cart</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  cart: { type: Array, required: true },
});
defineEmits(["update-qty", "delete-item"]);
</script>
