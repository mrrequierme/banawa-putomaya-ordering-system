<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full bg-white border border-gray-300 rounded-lg text-sm md:text-base"
    >
      <thead class="bg-gray-100">
        <tr class="text-left">
          <th class="p-2 whitespace-nowrap">Name</th>
          <th class="p-2 whitespace-nowrap">Birthday</th>
          <th class="p-2 whitespace-nowrap">Gender</th>
          <th class="p-2 whitespace-nowrap">Email</th>
          <th class="p-2 whitespace-nowrap">Contact</th>
          <th class="p-2 whitespace-nowrap">Address</th>
          <th class="p-2 whitespace-nowrap">Role</th>
        </tr>
      </thead>

      <tbody>
        <UserTableRow v-for="u in users" :key="u.id" :user="u" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import UserTableRow from "./UserTableRow.vue";
defineProps({
  users: Array,
});
</script>
