<template>
  <div class="min-h-screen bg-transparent p-4 relative">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      <div v-if="carts.length" class="grids">
        <div v-for="item in carts" :key="item._id" class="grids-items bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mt-2">
          <h2 class="text-xl font-semibold mb-2">{{ item.product.name }}</h2>
          <p class="text-gray-600 mb-2">{{ item.product.description }}</p>
          <p class="text-blue-500 font-bold mb-4">Price: {{ item.product.price }}</p>
          <img :src="item.product.imageURL" alt="Product Image" class="w-full object-cover rounded-md mb-4">
          <button @click="deleteCart(item._id)" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out">Remove</button>
        </div>
        <button @click="checkout" class="bg-green-500 text-white mb-5 p-5 rounded-full fixed bottom-0 right-0 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
          Checkout
        </button>
      </div>
      <div v-else class="text-center text-gray-500">
        Your cart is empty.
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapState(['carts'])
  },
  methods: {
    ...mapActions(['fetchCart', 'deleteFromCart']),
    deleteCart(itemId) {
      this.deleteFromCart({ itemId })
        .then(() => {
          alert('Item removed successfully');
          this.fetchCart();
        })
        .catch(() => alert('Failed to remove item'));
    },
    checkout() {
      alert('Proceed to checkout');
    }
  },
  created() {
    this.fetchCart();
  }
};
</script>

<style scoped>
.fixed-bottom-right {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
.grids {
  display: grid;
  grid-template-columns: repeat(3, 33.3%);
}
.grids-items {
  margin-left: 5px;
  margin-right: 5px;
}
.grids-items img{
  height: 15em;
}

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
