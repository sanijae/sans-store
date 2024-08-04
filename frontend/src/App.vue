<template>
  <Navbar/>
  <main class="main bg-gray-200">
    <RouterView />
  </main>
  <Footer/>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
.main{
  margin-top: 4em;
  padding: 10px;
}
</style>
