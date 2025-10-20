<template>
  <div
    v-if="!loading && products.length"
    class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
  >
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      :model-value="quantities[p.id]"
      @increase="$emit('increase', $event)"
      @decrease="$emit('decrease', $event)"
      @update-quantity="$emit('update-quantity', $event)"
    />
  </div>

  <LoaderMessage v-else-if="loading" text="Loading products..." />

  <div v-else class="text-center py-10 text-gray-500">
    No products available.
  </div>
</template>

<script setup>
import ProductCard from "@/components/user/product/ProductCard.vue";
import LoaderMessage from "@/components/LoaderMessage.vue";
const props = defineProps({
  products: Array,
  quantities: Object,
  loading: Boolean,
});

const emits = defineEmits(["increase", "decrease", "update-quantity"]);
</script>
