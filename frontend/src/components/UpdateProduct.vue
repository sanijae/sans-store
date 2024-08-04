<template>
    <div class="min-h-screen bg-transparent p-4">
      <div class="container mx-auto">
        <h2 class="text-xl font-semibold mb-4">Update Product</h2>
        <form @submit.prevent="submitUpdateProduct">
          <div class="mb-4">
            <label class="block text-gray-700">Name</label>
            <input type="text" v-model="product.name" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Description</label>
            <textarea v-model="product.description" class="w-full p-2 border rounded"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Price</label>
            <input type="number" v-model="product.price" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Image URL</label>
            <input type="text" v-model="product.imageURL" class="w-full p-2 border rounded" />
          </div>
          <div class="flex justify-between items-center m-2 p-2">
            <button type="submit" class="bg-blue-800 text-white px-4 py-2 rounded">Update</button>
            <button type="button" @click="cancel" class="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'UpdateProduct',
    data() {
      return {
        product: {
          _id: '',
          name: '',
          description: '',
          price: '',
          imageURL: ''
        }
      };
    },
    methods: {
      ...mapActions(['fetchProductById', 'updateProduct']),
      async loadProduct() {
        const productId = this.$route.params.id;
        const product = await this.fetchProductById(productId);
        this.product = product;
      },
      async submitUpdateProduct() {
        try {
          await this.updateProduct(this.product);
          alert('Product updated successfully');
          this.$router.push('/');
        } catch (error) {
          console.error('Error updating product:', error);
          console.log(this.product);
        }
      },
      cancel(){
        this.$router.push('/')
    },
    },
    created() {
      this.loadProduct();
    }
  };
  </script>
  