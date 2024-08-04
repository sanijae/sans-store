<template>
  <div class="flex items-center justify-center min-h-screen bg-transparent mt-6 py-3 mb-6">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-6 mb-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-medium mb-2">Username:</label>
          <input 
            type="text" 
            v-model="username" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
          <input 
            type="email" 
            v-model="email" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">Password:</label>
          <input 
            type="password" 
            v-model="password" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        <div class="text-center">
          <button 
            type="submit" 
            class="w-full px-4 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
          <p class="w-full p-2 m-2">Already have account 
            <router-link to="/login" class="text-blue-800 underline" >Login</router-link> </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['addUser']),
    async registerUser() {
      try {
        await this.addUser({ username: this.username, email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
