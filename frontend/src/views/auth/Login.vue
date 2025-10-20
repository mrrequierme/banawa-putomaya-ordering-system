<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <p class="text-center mt-4 text-sm">
          Don’t have an account?
          <RouterLink to="/register" class="text-blue-600 hover:underline">
            Register
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useOrderStore } from "@/stores/user/order";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const orderStore = useOrderStore(); // ✅ add this
const router = useRouter();

const handleLogin = async () => {
  try {
    const success = await auth.login(email.value, password.value);

    if (success) {
      orderStore.setUser(auth.user);
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Logged in as ${auth.role}.`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect based on role
      if (auth.role === "admin" || auth.role === "staff") {
        router.push("/admin/orders");
      } else if (auth.role === "user") {
        router.push("/orders");
      } else {
        router.push("/");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Unexpected error",
      text: "Something went wrong. Please try again later.",
    });
  }
};
</script>
