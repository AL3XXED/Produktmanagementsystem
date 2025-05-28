import './assets/main.css';
import './assets/styles.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from 'axios';
import authService from '@/services/authService';

const token = authService.getToken();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
