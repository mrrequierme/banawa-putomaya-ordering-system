import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      if (this.loading) return;
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get("/products");
        this.products = Array.isArray(res.data.data) ? res.data.data : res.data;
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        this.error = err.response?.data?.message || "Failed to load products.";
      } finally {
        this.loading = false;
      }
    },
  },
});
