<template>
  <div class="min-h-screen bg-transparent p-4">
    <div class="container mx-auto">
      <SearchBar @search="filterProducts" />
      <div v-if="paginatedProducts.length" class="grids">
        <div v-for="product in paginatedProducts" :key="product._id" class="grids-items bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mt-2">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xl font-semibold">{{ product.name }}</h2>
            <span v-if="user" @click="editProduct(product._id)" class="text-xs cursor-pointer bg-blue-900 text-white p-2 rounded-lg">Edit</span>
          </div>
          <p class="text-gray-600 mb-2">{{ product.description }}</p>
          <p class="text-blue-500 font-bold mb-4">Price: {{ product.price }}</p>
          <img :src="product.imageURL" alt="Product Image" class="w-full object-cover rounded-md mb-4">
          <div class="flex justify-between items-center">
            <button @click="submitToCart(product)" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out">Add to Cart</button>
            <button v-if="user" @click="deleteProduct(product._id)" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out ml-2">Delete</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        No products available.
      </div>
      <div class="flex justify-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mx-1 bg-gray-300 rounded">Previous</button>
        <button v-for="page in totalPages" :key="page" @click="setPage(page)" :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-300': currentPage !== page}" class="px-4 py-2 mx-1 rounded">{{ page }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-1 bg-gray-300 rounded">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';
import { computed } from 'vue';

const isAuthenticated = computed(() => store.getters.isAuthenticated);
export default {
  name: 'Home',
  components: {
    SearchBar
  },
  data() {
    return {
      searchQuery: '',
      filteredProducts: [],
      currentPage: 1,
      productsPerPage: 30
    };
  },
  computed: {
    ...mapState(['products', 'user']),
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      const end = start + this.productsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.productsPerPage);
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'deleteProduct', 'addToCart']),
    filterProducts(query) {
      this.searchQuery = query;
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      this.currentPage = 1; // Reset to first page on new search
    },
    async submitToCart(product) {
      console.log('User state:', this.user);
      if (!this.user) {
        alert('Please login to add items to your cart.');
        this.$router.push('/login');
        return;
      }
      try {
        await this.addToCart({ productId: product._id, userId: this.user._id });
        alert('Product added to cart.');
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },
    editProduct(productId) {
      this.$router.push(`/edit/${productId}`);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    setPage(page) {
      this.currentPage = page;
    }
  },
  created() {
    this.fetchProducts().then(() => {
      this.filteredProducts = this.products;
    });
  }
};
</script>

<style>
.grids {
  display: grid;
  grid-template-columns: repeat(3, 33.3%);
}
.grids-items {
  margin-left: 5px;
  margin-right: 5px;
}
.grids-items img{
  height: 16em;
}
/* @media only screen and (max-width: 800px) {
  .grids {
    grid-template-columns: repeat(3, auto);
  }
} */
@media only screen and (max-width: 800px) {
  .grids {
    grid-template-columns: repeat(2, 50%);
  }
}
@media only screen and (max-width: 500px) {
  .grids {
    grid-template-columns: repeat(1, 100%);
  }
}
</style>
