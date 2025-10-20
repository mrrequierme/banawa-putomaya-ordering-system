<template>
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm text-left border-collapse">
      <thead class="bg-gray-100">
        <tr class="border-b text-gray-700">
          <th class="py-2 px-3 whitespace-nowrap">Customer</th>
          <th class="py-2 px-3 whitespace-nowrap sm:table-cell">Email</th>
          <th class="py-2 px-3 whitespace-nowrap md:table-cell">Contact</th>
          <th class="py-2 px-3 whitespace-nowrap">Status</th>
          <th class="py-2 px-3 text-right whitespace-nowrap">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="hover:bg-gray-50 border-b last:border-b-0"
        >
          <td class="py-2 px-3 capitalize">{{ order.user.name }}</td>
          <td class="py-2 px-3 sm:table-cell">{{ order.user.email }}</td>
          <td class="py-2 px-3 md:table-cell">
            {{ order.user.contact }}
          </td>
          <td class="py-2 px-3">
            <span
              class="px-2 py-1 rounded text-white capitalize text-xs sm:text-sm"
              :class="{
                'bg-yellow-500': order.status === 'pending',
                'bg-green-500': order.status === 'approved',
                'bg-gray-400': order.status === 'done',
              }"
            >
              {{ order.status }}
            </span>
          </td>

          <td class="text-right py-2 px-3">
            <button
              @click="$emit('toggleProducts', order.id)"
              class="text-white bg-primary-light px-3 py-1 rounded hover:bg-primary-dark text-xs sm:text-sm cursor-pointer"
            >
              View Products
            </button>

            <OrderProducts
              v-if="expandedOrders.includes(order.id)"
              :order="order"
              :viewApproved="viewApproved"
              @approve="$emit('approve', $event)"
              @done="$emit('done', $event)"
              @unclaimed="$emit('unclaimed', $event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import OrderProducts from "./OrderProducts.vue";

defineProps({
  orders: Array,
  expandedOrders: Array,
  viewApproved: Boolean,
});
defineEmits(["toggleProducts", "approve", "done", "unclaimed"]);
</script>
