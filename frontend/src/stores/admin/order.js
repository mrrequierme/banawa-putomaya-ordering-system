import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useAdminOrderStore = defineStore("adminOrder", {
  state: () => ({
    orders: [],
    loading: false,
    success: "",
    error: "",
  }),

  getters: {
    groupedOrders: (state) => {
      if (!Array.isArray(state.orders)) return {};
      return state.orders.reduce((acc, order) => {
        const date = order.claim_date?.split("T")[0] ?? "Unknown";
        if (!acc[date]) acc[date] = [];
        acc[date].push(order);
        return acc;
      }, {});
    },
  },
  // API calls
  actions: {
    async fetchPending() {
      this.loading = true;
      this.success = "";
      this.error = "";
      try {
        const { data } = await api.get("/admin/orders/pending");
        this.orders = Array.isArray(data) ? data : data.data ?? [];
      } catch (err) {
        console.error(err);
        this.error =
          err.response?.data?.message || "Failed to load pending orders.";
      } finally {
        this.loading = false;
      }
    },

    async fetchApproved() {
      this.loading = true;
      this.success = "";
      this.error = "";
      try {
        const { data } = await api.get("/admin/orders/approved");
        this.orders = Array.isArray(data) ? data : data.data ?? [];
      } catch (err) {
        console.error(err);
        this.error =
          err.response?.data?.message || "Failed to load approved orders.";
      } finally {
        this.loading = false;
      }
    },
    // Approve
    async approveOrder(orderId) {
      try {
        await api.patch(`/admin/orders/${orderId}/approve`);
        this.success = "Order approved successfully!";
        await this.fetchPending();
      } catch (err) {
        console.error(err);
        this.error = "Failed to approve order.";
      }
    },

    // Mark as done
    async markDone(orderId) {
      try {
        await api.patch(`/admin/orders/${orderId}/done`);
        this.success = "Order marked as done!";
        await this.fetchApproved();
      } catch (err) {
        console.error(err);
        this.error = "Failed to mark order as done.";
      }
    },

    //Mark as unclaimed
    async markUnclaimed(orderId) {
      try {
        await api.patch(`/admin/orders/${orderId}/unclaimed`);
        this.success = "Order marked as unclaimed!";
        await this.fetchApproved();
      } catch (err) {
        console.error(err);
        this.error = "Failed to mark order as unclaimed.";
      }
    },
  },
});
