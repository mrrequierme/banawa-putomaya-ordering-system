<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Order History</h1>

    <LoaderMessage
      v-if="historyStore.loading"
      text="Loading order history..."
    />

    <div v-else>
      <HistoryCard
        v-for="(history, index) in historyStore.histories"
        :key="index"
        :history="history"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminHistoryStore } from "@/stores/admin/history";
import LoaderMessage from "@/components/LoaderMessage.vue";
import HistoryCard from "@/components/admin/histories/HistoryCard.vue";

const historyStore = useAdminHistoryStore();

onMounted(() => {
  historyStore.fetchHistories();
});
</script>
