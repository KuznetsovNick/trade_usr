import './assets/main.css'
import axios from 'axios';

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store";

export const instance = axios.create({
    baseURL: 'http://localhost:4000/api',  // Установка базового URL
});

createApp(App).use(router).use(store).mount('#app')