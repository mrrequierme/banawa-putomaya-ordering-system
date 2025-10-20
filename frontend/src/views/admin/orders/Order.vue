<template>
  <div class="p-6">
    <OrderHeader :viewApproved="viewApproved" @toggleView="toggleView" />

    <!-- Success Message -->
    <div
      v-if="orderStore.success"
      class="bg-green-100 text-green-700 p-3 rounded mb-4"
    >
      {{ orderStore.success }}
    </div>

    <!-- Loader -->
    <LoaderMessage v-if="orderStore.loading" text="Loading orders..." />

    <!-- Orders List -->
    <div v-else>
      <OrderGroup
        v-for="(orders, date) in orderStore.groupedOrders"
        :key="date"
        :date="date"
        :orders="orders"
        :viewApproved="viewApproved"
        :expandedDates="expandedDates"
        :expandedOrders="expandedOrders"
        @toggleDate="toggleDate"
        @toggleProducts="toggleProducts"
        @approve="approve"
        @done="done"
        @unclaimed="unclaimed"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAdminOrderStore } from "@/stores/admin/order";
import Swal from "sweetalert2";
import OrderHeader from "@/components/admin/order/OrderHeader.vue";
import OrderGroup from "@/components/admin/order/OrderGroup.vue";
import LoaderMessage from "@/components/LoaderMessage.vue";

const orderStore = useAdminOrderStore();
const viewApproved = ref(false);
const expandedDates = ref([]);
const expandedOrders = ref([]);

const toggleView = async () => {
  viewApproved.value = !viewApproved.value;
  if (viewApproved.value) await orderStore.fetchApproved();
  else await orderStore.fetchPending();
};

const toggleDate = (date) => {
  expandedDates.value = expandedDates.value.includes(date)
    ? expandedDates.value.filter((d) => d !== date)
    : [...expandedDates.value, date];
};

const toggleProducts = (orderId) => {
  expandedOrders.value = expandedOrders.value.includes(orderId)
    ? expandedOrders.value.filter((id) => id !== orderId)
    : [...expandedOrders.value, orderId];
};

const approve = async (id) => {
  const res = await Swal.fire({
    title: "Approve Order?",
    text: "Are you sure you want to approve this order?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#6b7280",
  });
  if (res.isConfirmed) {
    await orderStore.approveOrder(id);
    Swal.fire("Approved!", "The order has been approved.", "success");
  }
};

const done = async (id) => {
  const res = await Swal.fire({
    title: "Mark as Done?",
    text: "Confirm this order was successfully claimed.",
    icon: "info",
    showCancelButton: true,
  });
  if (res.isConfirmed) {
    await orderStore.markDone(id);
    Swal.fire("Done!", "Order moved to history.", "success");
  }
};

const unclaimed = async (id) => {
  const res = await Swal.fire({
    title: "Mark as Unclaimed?",
    text: "Customer didn’t pick up?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
  });
  if (res.isConfirmed) {
    await orderStore.markUnclaimed(id);
    Swal.fire("Marked!", "The order was marked unclaimed.", "success");
  }
};

onMounted(() => orderStore.fetchPending());
</script>
