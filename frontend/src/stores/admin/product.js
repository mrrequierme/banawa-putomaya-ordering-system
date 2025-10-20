import { defineStore } from "pinia";
import api from "../../plugins/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    product: null,
    loading: false,
    error: null,
  }),

  // API calls
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await api.get("/admin/products");
        this.products = res.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch products";
      } finally {
        this.loading = false;
      }
    },

    // Create a new product
    async createProduct(formData) {
      try {
        await api.post("/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        throw err.response?.data || err;
      }
    },

    // Update product
    async updateProduct(id, formData) {
      try {
        await api.post(`/admin/products/${id}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (err) {
        console.error("Error updating product:", err.response?.data || err);
        throw err;
      }
    },

    // Delete product
    async deleteProduct(id) {
      try {
        await api.delete(`/admin/products/${id}`);
        this.products = this.products.filter((p) => p.id !== id);
      } catch (err) {
        throw err.response?.data || err;
      }
    },
  },
});
