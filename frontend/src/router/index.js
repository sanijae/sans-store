import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '../views/Register.vue';
import AddProduct from '../views/AddProduct.vue';
import Cart from "@/views/Cart.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/add-product', name: 'AddProduct', component: AddProduct },
  { path: '/edit/:id', name: 'UpdateProduct', component: UpdateProduct, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;
