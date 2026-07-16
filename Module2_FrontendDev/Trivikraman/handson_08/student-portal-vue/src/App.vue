<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <!-- Global navigation header -->
  <Header />

  <!-- Core layout routing viewport -->
  <main>
    <RouterView />
  </main>

  <!-- Copyright footer -->
  <Footer />
</template>

<style>
/* App-wide global styles are loaded via index.css */
</style>
