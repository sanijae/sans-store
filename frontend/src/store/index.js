import Vuex from 'vuex';
import axios from 'axios';

export default new Vuex.Store({
  state: {
    products: [],
    filteredProducts: [],
    carts: [],
    user: null,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
      state.filteredProducts = products;
    },
    SET_FILTERED_PRODUCTS(state, products) {
      state.filteredProducts = products;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_CARTS(state, carts) {
      state.carts = carts;
    },
    ADD_TO_CART(state, product) {
      state.carts.push(product);
    },
    LOGOUT(state) {
      state.user = null;
      state.token = '';
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(product => product._id === updatedProduct._id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('http://localhost:5000/api/products');
      commit('SET_PRODUCTS', response.data);
    },
    async addUser({ commit }, user) {
      const response = await axios.post('http://localhost:5000/api/users/register', user);
      commit('SET_USER', response.data.user);
      commit('SET_TOKEN', response.data.token);
      localStorage.setItem('token', response.data.token);
    },
    async loginUser({ commit }, user) {
      const response = await axios.post('http://localhost:5000/api/users/login', user);
      commit('SET_USER', response.data.user);
      commit('SET_TOKEN', response.data.token);
      localStorage.setItem('token', response.data.token);
    },
    async addProduct({ commit, state }, product) {
      await axios.post('http://localhost:5000/api/products', product, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      const products = await axios.get('http://localhost:5000/api/products');
      commit('SET_PRODUCTS', products.data);
    },
    async deleteProduct({ commit, state }, productId) {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      const products = await axios.get('http://localhost:5000/api/products');
      commit('SET_PRODUCTS', products.data);
    },
    async addToCart({ commit, state }, { productId, userId }) {
      const response = await axios.post('http://localhost:5000/api/cart', { productId, userId }, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('ADD_TO_CART', response.data);
    },
    async fetchCart({ commit, state }) {
      console.log('User state:', state.user);
      if (!state.user || !state.user._id) {
        console.error('User is not authenticated or user ID is missing');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${state.user._id}`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        console.log(response.data);
        commit('SET_CARTS', response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },
    async deleteFromCart({ commit, state }, { itemId }) {
      if (!state.user || !state.user._id) {
        console.error('User is not authenticated or user ID is missing');
        return;
      }
      try {
        await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        const response = await axios.get(`http://localhost:5000/api/cart/${state.user._id}`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        commit('SET_CARTS', response.data);
      } catch (error) {
        console.error('Error deleting item from cart:', error);
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
      commit('SET_CARTS', '');
      localStorage.removeItem('token');
    },
    async searchProducts({ state, commit }, query) {
      const filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      commit('SET_FILTERED_PRODUCTS', filteredProducts);
    },
    async fetchProductById({ state }, productId) {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      return response.data;
    },
    async updateProduct({ commit, state }, product) {
      const response = await axios.put(`http://localhost:5000/api/products/${product._id}`, product, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      commit('UPDATE_PRODUCT', response.data);
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    }
  }
});
