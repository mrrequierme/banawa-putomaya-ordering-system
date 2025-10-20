<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const isOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await auth.logout();
  router.push("/login");
};

function goToSection(section) {
  if (router.currentRoute.value.path !== "/") {
    router.push({ path: "/", hash: `#${section}` });
  } else {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      router.replace({ hash: `#${section}` });
    }
  }
}
</script>

<template>
  <nav class="bg-white border-b sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center">
          <img src="/images/logo.jpg" alt="logo" class="h-10 w-auto" />
        </RouterLink>

        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-6 items-center">
          <!-- Guest -->
          <template v-if="!auth.user">
            <a href="#home" @click.prevent="goToSection('home')">Home</a>
            <a href="#products" @click.prevent="goToSection('products')"
              >Products</a
            >
            <a href="#about" @click.prevent="goToSection('about')">About</a>
            <RouterLink
              to="/login"
              class="bg-blue-600 !text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <i class="bi bi-box-arrow-in-right mr-1"></i> Login
            </RouterLink>
          </template>

          <!-- Admin -->
          <template v-else-if="auth.role === 'admin' || auth.role === 'staff'">
            <RouterLink to="/admin/orders" class="hover:text-blue-600"
              >Orders</RouterLink
            >
            <RouterLink to="/admin/products" class="hover:text-blue-600"
              >Products</RouterLink
            >
            <RouterLink to="/admin/users" class="hover:text-blue-600"
              >Users</RouterLink
            >
            <RouterLink to="/admin/history" class="hover:text-blue-600"
              >History</RouterLink
            >
            <button
              @click="handleLogout"
              class="bg-danger text-white px-4 py-2 rounded-lg hover:bg-danger-dark transition cursor-pointer"
            >
              Logout
            </button>
          </template>

          <!-- User -->
          <template v-else-if="auth.role === 'user'">
            <RouterLink to="/orders" class="hover:text-blue-600"
              >My Orders</RouterLink
            >
            <RouterLink to="/products" class="hover:text-blue-600"
              >Products</RouterLink
            >
            <button
              @click="handleLogout"
              class="bg-danger text-white px-4 py-2 rounded-lg hover:bg-danger-dark transition cursor-pointer"
            >
              Logout
            </button>
          </template>
        </div>

        <!-- Mobile menu btn -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <i v-if="!isOpen" class="bi bi-list text-2xl"></i>
          <i v-else class="bi bi-x-lg text-2xl"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t">
      <div class="px-4 pt-2 pb-3 space-y-2">
        <template v-if="!auth.user">
          <a @click="goToSection('home')" class="block hover:text-blue-600"
            >Home</a
          >
          <a @click="goToSection('products')" class="block hover:text-blue-600"
            >Products</a
          >
          <a @click="goToSection('about')" class="block hover:text-blue-600"
            >About</a
          >
          <RouterLink
            to="/login"
            class="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
          >
            Login
          </RouterLink>
        </template>

        <template v-if="auth.role === 'admin' || auth.role === 'staff'">
          <RouterLink
            to="/admin/orders"
            class="block text-center px-4 py-2 hover:text-blue-600"
            >Orders</RouterLink
          >
          <RouterLink
            to="/admin/products"
            class="block text-center px-4 py-2 hover:text-blue-600"
            >Products</RouterLink
          >
          <RouterLink
            to="/admin/users"
            class="block text-center px-4 py-2 hover:text-blue-600"
            >Users</RouterLink
          >
          <RouterLink
            to="/admin/history"
            class="block text-center px-4 py-2 hover:text-blue-600"
            >History</RouterLink
          >
          <button
            @click="handleLogout"
            class="bg-danger text-white block px-4 py-2 rounded-lg hover:bg-danger-dark mt-2 md:mt-0 mx-auto cursor-pointer"
          >
            Logout
          </button>
        </template>

        <!-- User -->
        <template v-else-if="auth.role === 'user'">
          <RouterLink
            to="/orders"
            class="block text-center px-4 py-2 hover:text-blue-600"
            >My Orders</RouterLink
          >
          <RouterLink
            to="/products"
            class="block text-center px-4 py-2 hover:text-blue-600"
            >Products</RouterLink
          >
          <button
            @click="handleLogout"
            class="bg-danger text-white block px-4 py-2 rounded-lg hover:bg-danger-dark mt-2 md:mt-0 mx-auto cursor-pointer"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  color: #374151;
  font-weight: 500;
  transition: color 0.2s;
}
a:hover {
  color: #2563eb;
}
</style>
