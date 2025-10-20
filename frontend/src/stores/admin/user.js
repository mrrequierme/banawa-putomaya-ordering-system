import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useAdminUserStore = defineStore("adminUser", {
  state: () => ({
    users: [],
    loading: false,
    success: "",
    error: "",
  }),

  // API calls
  actions: {
    async fetchUsers() {
      try {
        this.loading = true;
        const { data } = await api.get("/admin/users");
        this.users = data;
      } catch (err) {
        this.error = "Failed to fetch users";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    // Create new user
    async createUser(payload) {
      try {
        this.loading = true;
        const { data } = await api.post("/admin/users", payload);
        this.success = data.message;
        this.fetchUsers();
      } catch (err) {
        if (err.response?.data?.errors) {
          this.error = Object.values(err.response.data.errors)
            .flat()
            .join(", ");
        } else {
          this.error = "Failed to create user";
        }
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
