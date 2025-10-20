<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <button
      @click="$router.push('/admin/products/add')"
      class="bg-success text-white px-4 py-2 rounded mb-4 cursor-pointer hover:bg-success-dark"
    >
      + Add Product
    </button>
    <ProductTable
      v-if="!loading"
      :products="products"
      @edit="editProduct"
      @delete="removeProduct"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/admin/product";
import { storeToRefs } from "pinia";
import ProductTable from "@/components/admin/product/ProductTable.vue";
import Swal from "sweetalert2";

const productStore = useProductStore();
const { products, loading } = storeToRefs(productStore);
const { fetchProducts, deleteProduct } = productStore;
const router = useRouter();

onMounted(fetchProducts);

const editProduct = (product) =>
  router.push(`/admin/products/edit/${product.id}`);
const removeProduct = async (id) => {
  const res = await Swal.fire({
    title: "Delete?",
    icon: "warning",
    showCancelButton: true,
  });
  if (res.isConfirmed) {
    await deleteProduct(id);
    Swal.fire("Deleted!", "Product removed.", "success");
  }
};
</script>
