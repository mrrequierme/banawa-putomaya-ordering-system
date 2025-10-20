<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
