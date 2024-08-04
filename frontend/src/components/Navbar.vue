<template>
  <nav class="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center cursor-pointer">
        <router-link to="/"class="text-white text-xl font-semibold">Sans store</router-link>
      </div>
      <div class="flex md:hidden">
        <button @click="toggleMenu" class="text-gray-400 hover:text-white focus:outline-none focus:text-white">
          <svg v-if="!isMenuOpen" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="hidden md:flex items-center space-x-4">
        <router-link to="/" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
        <router-link to="/cart" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cart</router-link>
        <router-link v-if="isAuthenticated" to="/add-product" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Product</router-link>
        <router-link v-else to="/register" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
        <router-link v-else to="/login" class="block bg-blue-800 text-white px-3 py-2 rounded-md text-base font-medium cursor-pointer">Login</router-link>
        <button v-if="isAuthenticated" @click="logout" class="block bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium cursor-pointer">Logout</button>
      </div>
    </div>
    <div :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="md:hidden mobile fixed z-50 w-full bg-gray-800 p-5 left-0 right-0 transition-all duration-300 ease-in-out">
      <router-link @click="toggleMenu" to="/" class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</router-link>
      <router-link @click="toggleMenu" to="/cart" class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Cart</router-link>
      <router-link v-if="isAuthenticated" @click="toggleMenu" to="/add-product" class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Add Product</router-link>
      <router-link v-else @click="toggleMenu" to="/register" class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Register</router-link>
      <router-link v-else @click="toggleMenu" to="/login" class="block bg-blue-800 text-white px-3 py-2 rounded-md text-base font-medium cursor-pointer">Login</router-link>
      <button v-if="isAuthenticated" @click="logout" class="block bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium cursor-pointer">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const logout = () => {
  store.dispatch('logout');
  this.$router.push('/');
};
</script>

<style scoped>
nav {
  height: 4em;
}
</style>
