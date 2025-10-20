<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
      <i class="fa-solid fa-cart-shopping"></i> Cart
    </h2>

    <LoaderMessage v-if="loading" text="Please wait..." />

    <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-3">
      {{ error }}
    </div>
    <div v-if="success" class="bg-green-100 text-green-700 p-3 rounded mb-3">
      {{ success }}
    </div>

    <CartSummary :pendingOrder="pendingOrder" :total="orderStore.total" />

    <CartTable
      :cart="orderStore.cart"
      @update-qty="orderStore.updateQty"
      @delete-item="confirmDelete"
    />

    <CartForm
      :pendingOrder="pendingOrder"
      :loading="loading"
      :claimDate="claimDate"
      @update:claimDate="claimDate = $event"
      @submit-order="submitOrder"
    />

    <CancelOrderButton
      :pendingOrder="pendingOrder"
      :loading="loading"
      @cancel-order="cancelOrder"
    />

    <OrderRecords :orders="filteredOrders" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useOrderStore } from "@/stores/user/order";
import { useAuthStore } from "@/stores/auth";
import api from "@/plugins/axios";
import Swal from "sweetalert2";

import LoaderMessage from "@/components/LoaderMessage.vue";
import CartTable from "@/components/user/order/CartTable.vue";
import CartSummary from "@/components/user/order/CartSummary.vue";
import CartForm from "@/components/user/order/CartForm.vue";
import CancelOrderButton from "@/components/user/order/CancelOrderButton.vue";
import OrderRecords from "@/components/user/order/OrderRecords.vue";

const orderStore = useOrderStore();
const authStore = useAuthStore();

const loading = ref(false);
const pendingOrder = ref(null);
const orders = ref([]);
const claimDate = ref("");
const error = ref("");
const success = ref("");

const filteredOrders = computed(() =>
  orders.value.filter(
    (o) => o.user_id === authStore.user?.id && o.status !== "pending"
  )
);

onMounted(async () => {
  orderStore.loadCart();
  await fetchOrders();
});

async function fetchOrders() {
  loading.value = true;
  try {
    const res = await api.get("/user/orders");
    pendingOrder.value = res.data.pending;
    orders.value = res.data.records || [];

    if (pendingOrder.value?.status === "approved") {
      orderStore.clearCart();
    } else if (pendingOrder.value?.status === "pending") {
      const pendingProducts = pendingOrder.value.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.pivot.price,
        qty: p.pivot.qty,
      }));
      orderStore.mergePendingProducts(pendingProducts);
      claimDate.value = pendingOrder.value.claim_date.split("T")[0];
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch orders.";
  } finally {
    loading.value = false;
  }
}

async function submitOrder() {
  if (!orderStore.cart.length) {
    error.value = "Please add at least one product.";
    return;
  }

  loading.value = true;
  try {
    orderStore.claimDate = claimDate.value;
    const res = await orderStore.submitOrder();
    success.value = res.message || "Order placed successfully!";
    await fetchOrders();
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      Object.values(err.response?.data?.errors || {})[0]?.[0] ||
      "Order submission failed.";
  } finally {
    loading.value = false;
  }
}

function confirmDelete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      orderStore.removeItem(id);
      Swal.fire({
        title: "Deleted!",
        text: "The item has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

async function cancelOrder(orderId) {
  const confirm = await Swal.fire({
    title: "Cancel Order?",
    text: "Are you sure you want to cancel your pending order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it",
  });

  if (!confirm.isConfirmed) return;

  loading.value = true;
  try {
    const res = await api.delete(`/user/orders/${orderId}/cancel`);
    Swal.fire("Cancelled", res.data.message, "success");
    await fetchOrders();
    orderStore.clearCart();
  } catch (err) {
    Swal.fire(
      "Error",
      err.response?.data?.message || "Failed to cancel order.",
      "error"
    );
  } finally {
    loading.value = false;
  }
}
</script>
