import '../node_modules/flowbite-vue/dist/index.css'
import './assets/main.css'
import './assets/tailwind.css';
import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(router).use(store).mount('#app')