<template>
  <div class="flex items-center justify-center min-h-screen bg-transparent mt-6 py-3 mb-6">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg py-6 mt-6 mb-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <form @submit.prevent="validateAndLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
          <input 
            type="email" 
            v-model="email" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">Password:</label>
          <input 
            type="password" 
            v-model="password" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>
        <div class="text-center">
          <button 
            type="submit" 
            class="w-full px-4 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
          <p class="w-full p-2 m-2">Don't have an account? 
            <router-link to="/register" class="text-blue-800 underline">Register</router-link>
          </p>
        </div>
        <p v-if="errors.general" class="text-red-500 text-center mt-4">{{ errors.general }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    validateEmail(email) {
      const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    },
    validatePassword(password) {
      return password.length >= 6;
    },
    async validateAndLogin() {
      this.errors = {}; 
      let valid = true;

      // Email validation
      if (!this.validateEmail(this.email)) {
        this.errors.email = 'Invalid email format';
        valid = false;
      }

      // Password validation
      if (!this.validatePassword(this.password)) {
        this.errors.password = 'Password must be at least 6 characters long';
        valid = false;
      }

      if (valid) {
        try {
          await this.loginUser({ email: this.email, password: this.password });
          this.$router.push('/');
        } catch (error) {
          if (error.response && error.response.data) {
            this.handleValidationError(error.response.data);
          } else {
            console.error(error);
          }
        }
      }
    },
    handleValidationError(data) {
      if (data.errors) {
        for (const [field, messages] of Object.entries(data.errors)) {
          this.errors[field] = messages.join(' ');
        }
      } else {
        this.errors.general = data.message || 'An error occurred. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
nav {
  height: 4em;
}
</style>
