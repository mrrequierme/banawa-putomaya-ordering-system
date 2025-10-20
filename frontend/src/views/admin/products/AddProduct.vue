<template>
  <div class="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md mt-8">
    <h2 class="text-2xl font-semibold mb-6 text-center">Add Product</h2>
    <ProductForm mode="add" @submitted="router.push('/admin/products')" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ProductForm from "@/components/admin/product/ProductForm.vue";

const router = useRouter();
</script>
