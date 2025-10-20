import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useAdminHistoryStore = defineStore("adminHistory", {
  state: () => ({
    histories: [],
    loading: false,
  }),
  // API calls
  actions: {
    async fetchHistories() {
      try {
        this.loading = true;
        const { data } = await api.get("/admin/histories");
        this.histories = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Failed to fetch histories:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
