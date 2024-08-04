<template>
  <div class="search-container mb-4 bg-black">
    <div class="search">
      <input 
        type="text" 
        v-model="searchInput" 
        @input="onInput" 
        placeholder="Search products..." 
        class=" p-2 border-none border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:border-none"
      />
      <button 
        @click="onSearch" 
        class="bg-gray-800 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors duration-300"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchInput: ''
    };
  },
  methods: {
    onInput() {
      this.$emit('search', this.searchInput);
    },
    onSearch() {
      this.$emit('search', this.searchInput);
    }
  }
};
</script>
<style>
.search-container{
  width: 100%;
  background-color: transparent;
}
.search{
  width: 100%;
  background: transparent;
}
.search input{
  width: 80%;
}
.search button{
  width: 20%;
}
</style>