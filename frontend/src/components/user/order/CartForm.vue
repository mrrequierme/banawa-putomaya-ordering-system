<template>
  <form @submit.prevent="$emit('submit-order')" class="mt-6">
    <Information />
    <div class="mb-4">
      <label class="font-medium"
        ><i class="fa-solid fa-calendar-check"></i> Claim Date:</label
      >
      <input
        type="date"
        :value="claimDate"
        @input="$emit('update:claimDate', $event.target.value)"
        class="border p-2 rounded block w-full lg:w-max"
        :min="tomorrow"
        required
      />
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="bg-success-light hover:bg-success-dark transition cursor-pointer w-full lg:w-max text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span v-if="!loading">
        {{ pendingOrder?.status === "pending" ? "Update Order" : "Order Now" }}
      </span>
      <span v-else>
        <i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading...
      </span>
    </button>
  </form>
</template>

<script setup>
import { computed } from "vue";
import Information from "@/components/user/Information.vue";

const props = defineProps({
  pendingOrder: Object,
  loading: Boolean,
  claimDate: String,
});

const emits = defineEmits(["submit-order", "update:claimDate"]);

const tomorrow = computed(() => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split("T")[0];
});
</script>
