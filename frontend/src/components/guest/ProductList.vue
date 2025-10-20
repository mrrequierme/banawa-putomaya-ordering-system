<template>
  <section id="products" class="max-w-6xl mx-auto px-4 py-10">
    <h3 class="text-center text-2xl font-semibold mb-6">Our Latest Products</h3>

    <LoaderMessage v-if="loading" text="Loading products..." />

    <div
      v-else-if="products.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col showcard"
      >
        <img
          :src="product.image_url"
          :alt="product.name"
          class="rounded-md object-cover h-48 w-full"
        />
        <div class="mt-4 text-center flex-grow">
          <h5 class="text-lg font-semibold capitalize mb-1">
            {{ product.name }}
          </h5>
          <h6 class="text-gray-500 mb-2">
            ₱{{ Number(product.price).toFixed(2) }}
          </h6>
          <p class="text-sm text-gray-600 text-left">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-6">
      No products available.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoaderMessage from "@/components/LoaderMessage.vue";
import api from "@/plugins/axios";

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await api.get("/products");
    products.value = res.data.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>
#products {
  scroll-margin-top: 40px;
  height: auto;
}

.showcard {
  animation: cardslide 2.5s ease-in;
}
@keyframes cardslide {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  #products {
    height: auto;
  }
}
</style>
