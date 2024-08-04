<template>
  <div class="flex items-center justify-center min-h-screen bg-transparent mt-3 py-3 mb-3">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg py-8">
      <h1 class="text-2xl font-bold mb-4 text-center">Add Product</h1>
      <form @submit.prevent="submitProduct">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-medium mb-2">Name:</label>
          <input 
            type="text" 
            v-model="name" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea
            type="text" 
            v-model="description" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="6"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="price" class="block text-gray-700 font-medium mb-2">Price:</label>
          <input 
            type="number" 
            v-model="price" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        <div class="mb-6">
          <label for="imageURL" class="block text-gray-700 font-medium mb-2">Image URL:</label>
          <input 
            type="text" 
            v-model="imageURL" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        <div class="text-center">
          <button 
            type="submit" 
            class="w-full px-4 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      description: '',
      price: '',
      imageURL: ''
    };
  },
  methods: {
    ...mapActions(['addProduct']),
    async submitProduct() {
      try {
        await this.addProduct({ name: this.name, description: this.description, price: this.price, imageURL: this.imageURL });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
