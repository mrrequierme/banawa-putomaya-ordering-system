<template>
  <div class="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md mt-8">
    <h2 class="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
    <ProductForm
      v-if="product"
      mode="edit"
      :product="product"
      @submitted="router.push('/admin/products')"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/admin/product";
import ProductForm from "@/components/admin/product/ProductForm.vue";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const product = ref(null);

onMounted(async () => {
  await productStore.fetchProducts();
  product.value = productStore.products.find((p) => p.id == route.params.id);
});
</script>
