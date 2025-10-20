<template>
  <div class="p-6">
    <div class="flex justify-between mb-4 items-center">
      <h1 class="text-2xl font-semibold text-gray-700">Users</h1>
      <router-link
        v-if="authStore.role === 'admin'"
        to="/admin/users/create"
        class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        Create Staff
      </router-link>
    </div>

    <LoaderMessage v-if="userStore.loading" text="Loading users..." />

    <div
      v-if="userStore.error"
      class="bg-red-100 text-red-700 p-3 mb-3 rounded"
    >
      {{ userStore.error }}
    </div>

    <div v-if="!userStore.loading && userStore.users.length">
      <UserTable :users="userStore.users" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminUserStore } from "@/stores/admin/user";
import LoaderMessage from "@/components/LoaderMessage.vue";
import UserTable from "@/components/admin/user/UserTable.vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const userStore = useAdminUserStore();

onMounted(() => {
  userStore.fetchUsers();
});
</script>
