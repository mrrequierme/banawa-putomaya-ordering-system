<template>
  <tr class="border-b hover:bg-gray-50">
    <td class="p-2 capitalize">{{ user.name }}</td>
    <td class="p-2">{{ formatDate(user.birthday) }}</td>
    <td class="p-2 capitalize">{{ user.gender }}</td>
    <td class="p-2">{{ user.email }}</td>
    <td class="p-2">{{ user.contact }}</td>
    <td class="p-2 capitalize">{{ user.address }}</td>
    <td
      class="p-2 capitalize font-semibold"
      :class="user.role === 'admin' ? 'text-blue-600' : 'text-green-600'"
    >
      {{ user.role }}
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  user: Object,
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
</script>
