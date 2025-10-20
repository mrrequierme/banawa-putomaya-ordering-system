import { defineStore } from "pinia";
import api from "../plugins/axios";

import { useOrderStore } from "@/stores/user/order";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === "admin",
    isStaff: (state) => state.role === "staff",
    isUser: (state) => state.role === "user",
  },

  actions: {
    async register(
      name,
      gender,
      birthday,
      address,
      contact,
      email,
      password,
      password_confirmation
    ) {
      try {
        const res = await api.post("/register", {
          name,
          gender,
          birthday,
          address,
          contact,
          email,
          password,
          password_confirmation,
        });

        this._setAuthData(res.data.user, res.data.token);
        return res.data;
      } catch (err) {
        console.error("Registration failed:", err.response?.data || err);
        throw err;
      }
    },

    async login(email, password) {
      try {
        const res = await api.post("/login", { email, password });
        this._setAuthData(res.data.user, res.data.token);
        return true;
      } catch (err) {
        console.error("Login failed:", err.response?.data || err);
        return false;
      }
    },

    async fetchUser() {
      if (!this.token) return;
      try {
        const res = await api.get("/user");
        this._setAuthData(res.data, this.token);
      } catch (err) {
        console.warn("Failed to fetch user, logging out...", err);
        this.logout();
      }
    },

    async logout() {
      try {
        await api.post("/logout");
      } catch (err) {
        console.warn("Logout request failed, clearing local data anyway");
      }

      const orderStore = useOrderStore();
      orderStore.logoutClear();
      this._clearAuthData();
    },

    _setAuthData(user, token) {
      this.user = user;
      this.token = token;
      this.role = user.role;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    _clearAuthData() {
      this.user = null;
      this.token = null;
      this.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      delete api.defaults.headers.common["Authorization"];
    },
  },
});
