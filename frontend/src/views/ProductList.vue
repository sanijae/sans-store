<template>
    <div>
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.imageURL" alt="Product Image">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
      </div>
    </div>
  </template>
  
  <script>
  
  </script>
  
  <style scoped>

  </style>
  