<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-2">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>

      <form @submit.prevent="handleRegister">
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        <div class="mb-2">
          <label class="block text-sm font-medium">Name</label>
          <input
            v-model="name"
            type="text"
            maxlength="255"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>
        <!-- Gender -->
        <div class="mb-2">
          <label class="block text-sm font-medium">Gender</label>
          <select
            v-model="gender"
            required
            class="w-full border rounded-lg p-2 mt-1 bg-white"
          >
            <option value="" disabled selected>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <!-- Birthday -->
        <div class="mb-2">
          <label class="block text-sm font-medium">Birthday</label>
          <input
            v-model="birthday"
            type="date"
            required
            class="w-full border rounded-lg p-2 mt-1"
            :max="new Date().toISOString().split('T')[0]"
          />
        </div>

        <div class="mb-2">
          <label class="block text-sm font-medium">Address</label>
          <input
            v-model="address"
            type="text"
            maxlength="255"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>
        <div class="mb-2">
          <label class="block text-sm font-medium">Contact</label>
          <input
            v-model="contact"
            type="text"
            maxlength="13"
            minlength="11"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div class="mb-2">
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            maxlength="255"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div class="mb-2">
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Confirm Password</label>
          <input
            v-model="password_confirmation"
            type="password"
            required
            class="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        <p class="text-center mt-4 text-sm">
          Already have an account?
          <RouterLink to="/login" class="text-blue-600 hover:underline">
            Login
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

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const gender = ref("");
const birthday = ref("");
const contact = ref("");
const address = ref("");
const errorMessage = ref("");

const auth = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  try {
    await auth.register(
      name.value,
      gender.value,
      birthday.value,
      address.value,
      contact.value,
      email.value,
      password.value,
      password_confirmation.value
    );

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "Your account has been created. Please login.",
      confirmButtonText: "Go to Login",
    }).then(() => {
      router.push("/login");
    });
  } catch (err) {
    console.error(err.response?.data || err);
    let errorText = "Please check your inputs and try again.";
    const errors = err.response?.data?.errors;

    if (errors) {
      errorText = Object.values(errors).flat().join("\n");
    } else if (err.response?.data?.message) {
      errorText = err.response.data.message;
    }

    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: errorText,
    });
  }
};
</script>
