<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">Create Staff</h2>

    <UserForm
      :model-value="form"
      :loading="userStore.loading"
      @submit="handleSubmit"
    />

    <p
      v-if="userStore.success"
      class="bg-green-100 text-green-700 p-2 mt-3 rounded"
    >
      {{ userStore.success }}
    </p>
    <p v-if="userStore.error" class="bg-red-100 text-red-700 p-2 mt-3 rounded">
      {{ userStore.error }}
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAdminUserStore } from "@/stores/admin/user";
import UserForm from "@/components/admin/user/UserForm.vue";

const userStore = useAdminUserStore();
const router = useRouter();

const form = reactive({
  name: "",
  gender: "",
  birthday: "",
  address: "",
  contact: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "staff",
});

const handleSubmit = async (data) => {
  await userStore.createUser(data);
  if (userStore.success) router.push("/admin/users");
};
</script>
