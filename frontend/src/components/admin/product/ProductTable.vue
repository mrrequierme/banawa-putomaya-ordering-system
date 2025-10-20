<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border border-gray-300 text-sm md:text-base">
      <thead class="bg-gray-100">
        <tr class="text-left">
          <th class="px-4 py-2">Image</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Price</th>
          <th class="px-4 py-2 hidden sm:table-cell">Description</th>
          <th class="px-4 py-2">Managed By</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
        >
          <td class="px-4 py-2">
            <img
              :src="`http://127.0.0.1:8000/storage/${product.image}`"
              class="w-16 h-16 rounded object-cover"
            />
          </td>
          <td class="px-4 py-2">{{ product.name }}</td>
          <td class="px-4 py-2">₱ {{ product.price }}</td>
          <td class="px-4 py-2 hidden sm:table-cell truncate max-w-[150px]">
            {{ product.description }}
          </td>
          <td class="px-4 py-2 hidden sm:table-cell truncate max-w-[150px]">
            {{ product.user ? product.user.email : "N/A" }}
          </td>
          <td class="px-4 py-2 whitespace-nowrap">
            <button
              @click="$emit('edit', product)"
              class="bg-primary-light hover:bg-primary-dark text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              @click="$emit('delete', product.id)"
              class="bg-danger-light hover:bg-danger-dark text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({ products: Array });
defineEmits(["edit", "delete"]);
</script>
