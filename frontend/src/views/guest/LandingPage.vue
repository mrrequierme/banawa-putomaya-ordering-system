<template>
  <div>
    <HomeIntro class="home" />
    <ProductList />
    <AboutUs />
    <Footer />
  </div>
</template>

<script setup>
import HomeIntro from "@/components/guest/HomeIntro.vue";
import ProductList from "@/components/guest/ProductList.vue";
import AboutUs from "@/components/guest/AboutUs.vue";
import Footer from "@/components/Footer.vue";
</script>
<style scoped>
.home {
  scroll-margin-top: 80px;
}
</style>
