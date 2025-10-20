import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    cart: [],
    total: 0,
    status: "None",
    userId: null,
    claimDate: null,
  }),

  actions: {
    setUser(user) {
      this.userId = user?.id || null;
      const stored = sessionStorage.getItem(`cart_${this.userId}`);
      this.cart = stored ? JSON.parse(stored) : [];
      this.calculateTotal();
    },

    getStorageKey() {
      return this.userId ? `cart_${this.userId}` : "cart_guest";
    },
    saveCart() {
      if (this.userId) {
        sessionStorage.setItem(this.getStorageKey(), JSON.stringify(this.cart));
      }
    },

    loadCart() {
      if (!this.userId) return;
      const stored = sessionStorage.getItem(this.getStorageKey());
      this.cart = stored ? JSON.parse(stored) : [];
      this.calculateTotal();
    },

    removeItem(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.calculateTotal();
      if (this.userId)
        sessionStorage.setItem(this.getStorageKey(), JSON.stringify(this.cart));
    },

    // Total price of all cart items
    calculateTotal() {
      this.total = this.cart.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );
    },

    // Add selected products to the cart
    addToCart(selectedProducts) {
      selectedProducts.forEach((newItem) => {
        const existing = this.cart.find((p) => p.id === newItem.id);

        if (existing) {
          existing.qty += Number(newItem.qty) || 1;
        } else {
          this.cart.push({
            id: newItem.id,
            name: newItem.name,
            price: Number(newItem.price) || 0,
            qty: Number(newItem.qty) || 1,
          });
        }
      });

      this.calculateTotal();
      this.status = "None";
      this.saveCart();
    },

    // Merge
    mergePendingProducts(pendingProducts = []) {
      const merged = [...this.cart];

      pendingProducts.forEach((p) => {
        const existing = merged.find((c) => c.id === p.id);

        if (existing) {
          existing.qty = Math.max(existing.qty, Number(p.qty) || 1);
          existing.price = Number(p.price) || existing.price || 0;
        } else {
          merged.push({
            id: p.id,
            name: p.name,
            price: Number(p.price) || 0,
            qty: Number(p.qty) || 1,
          });
        }
      });

      this.cart = merged;
      this.calculateTotal();
      this.saveCart();
    },

    clearCart() {
      this.cart = [];
      this.total = 0;
      if (this.userId) sessionStorage.removeItem(this.getStorageKey());
    },

    logoutClear() {
      this.clearCart();
      this.status = "None";
      this.userId = null;
      this.claimDate = null;
      Object.keys(sessionStorage)
        .filter((key) => key.startsWith("cart_"))
        .forEach((key) => sessionStorage.removeItem(key));
    },

    clearAllCarts() {
      Object.keys(sessionStorage)
        .filter((key) => key.startsWith("cart_"))
        .forEach((key) => sessionStorage.removeItem(key));
    },

    async submitOrder() {
      try {
        const payload = {
          cart: this.cart,
          claim_date: this.claimDate,
        };

        const res = await api.post("/user/orders", payload);

        if (res.status === 200 || res.status === 201) {
          this.status = "pending";
          this.clearCart();
          return res.data;
        }

        throw new Error("Unexpected response status");
      } catch (err) {
        console.error("❌ Failed to submit order:", err);
        throw err;
      }
    },

    updateQty(id, newQty) {
      const item = this.cart.find((i) => i.id === id);
      if (item) {
        item.qty = Number(newQty);
        this.calculateTotal();
        this.saveCart();
      }
    },
  },
});
