<template>
  <div class="border rounded-2xl shadow p-4 text-center">
    <img
      :src="`http://127.0.0.1:8000/storage/${product.image}`"
      alt="Product image"
      class="rounded-xl mb-3 w-full h-40 object-cover"
    />
    <h2 class="font-semibold mb-1">{{ product.name }}</h2>
    <p class="text-gray-600 mb-1">
      ₱{{ Number(product.price || 0).toFixed(2) }}
    </p>
    <p class="text-gray-600 mb-3">{{ product.description }}</p>

    <div class="flex justify-center items-center mb-2">
      <button
        class="px-3 py-1 border rounded-l-lg hover:bg-gray-100 cursor-pointer"
        @click="$emit('decrease', product.id)"
      >
        −
      </button>
      <input
        v-model.number="quantity"
        type="number"
        min="0"
        class="w-16 text-center border-t border-b cursor-pointer"
        @input="$emit('update-quantity', { id: product.id, qty: quantity })"
      />
      <button
        class="px-3 py-1 border rounded-r-lg hover:bg-gray-100 cursor-pointer"
        @click="$emit('increase', product.id)"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  product: { type: Object, required: true },
  modelValue: { type: Number, default: 0 },
});

const emits = defineEmits(["increase", "decrease", "update-quantity"]);

const quantity = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    quantity.value = newVal;
  }
);
</script>
