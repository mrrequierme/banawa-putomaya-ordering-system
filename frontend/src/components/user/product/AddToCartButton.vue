<template>
  <div class="sticky top-20 p-2 text-end">
    <button
      @click="$emit('add-to-cart')"
      class="bg-primary-light hover:bg-primary-dark text-white px-4 py-2 rounded-lg cursor-pointer"
    >
      <i class="fa-solid fa-cart-shopping"></i>
      Add to Cart
    </button>
  </div>
</template>
