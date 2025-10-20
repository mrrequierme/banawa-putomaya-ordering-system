<template>
  <div class="container mx-auto p-4">
    <AddToCartButton @add-to-cart="addSelectedToCart" />

    <ProductGrid
      :products="productStore.products"
      :quantities="quantities"
      :loading="productStore.loading"
      @increase="increaseQty"
      @decrease="decreaseQty"
      @update-quantity="updateQuantity"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import { useProductStore } from "@/stores/user/product";
import { useOrderStore } from "@/stores/user/order";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import ProductGrid from "@/components/user/product/ProductGrid.vue";
import AddToCartButton from "@/components/user/product/AddToCartButton.vue";

const productStore = useProductStore();
const orderStore = useOrderStore();
const router = useRouter();

const quantities = reactive({});

function initQuantities() {
  productStore.products.forEach((p) => {
    if (!(p.id in quantities)) quantities[p.id] = 0;
  });
}

onMounted(async () => {
  if (!productStore.products.length) await productStore.fetchProducts();
  initQuantities();
});

watch(
  () => productStore.products,
  (newVal) => {
    if (Array.isArray(newVal) && newVal.length) initQuantities();
  },
  { immediate: true }
);

function increaseQty(id) {
  quantities[id]++;
}
function decreaseQty(id) {
  if (quantities[id] > 0) quantities[id]--;
}
function updateQuantity({ id, qty }) {
  quantities[id] = qty;
}

async function addSelectedToCart() {
  const selected = productStore.products
    .filter((p) => quantities[p.id] > 0)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      qty: quantities[p.id],
    }));

  if (!selected.length) {
    await Swal.fire({
      icon: "warning",
      title: "Notice",
      text: "Please select at least one product.",
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "OK",
    });
    return;
  }

  orderStore.addToCart(selected);

  await Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    text: "Your selected products have been added.",
    showConfirmButton: false,
    timer: 1500,
  });

  router.push({ name: "UserOrders" });
}
</script>
