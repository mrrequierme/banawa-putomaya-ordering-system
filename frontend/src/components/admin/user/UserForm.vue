<template>
  <form @submit.prevent="$emit('submit', form)" class="space-y-3">
    <input
      v-model="form.name"
      placeholder="Full Name"
      class="border rounded w-full p-2"
      required
    />
    <select v-model="form.gender" class="border rounded w-full p-2" required>
      <option disabled value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>

    <input
      v-model="form.birthday"
      type="date"
      class="border rounded w-full p-2"
      :max="new Date().toISOString().split('T')[0]"
      required
    />
    <input
      v-model="form.address"
      placeholder="Address"
      class="border rounded w-full p-2"
      required
    />
    <input
      v-model="form.contact"
      placeholder="Contact"
      class="border rounded w-full p-2"
      required
    />
    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
      class="border rounded w-full p-2"
      required
    />
    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="border rounded w-full p-2"
      required
    />
    <input
      v-model="form.password_confirmation"
      type="password"
      placeholder="Confirm Password"
      class="border rounded w-full p-2"
      required
    />

    <select v-model="form.role" class="border rounded w-full p-2" required>
      <option value="staff">Staff</option>
      <option value="admin">Admin</option>
    </select>

    <button
      type="submit"
      class="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
    >
      {{ loading ? "Saving..." : "Submit" }}
    </button>
  </form>
</template>

<script setup>
import { reactive, toRefs } from "vue";

const props = defineProps({
  modelValue: Object,
  loading: Boolean,
});
const emits = defineEmits(["submit"]);

const form = reactive({ ...props.modelValue });
</script>
