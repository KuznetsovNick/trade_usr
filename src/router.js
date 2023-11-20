import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/components/login.vue";
import Menu from "@/components/menu.vue";
import Profile from "@/components/profile.vue";
import Trades from "@/components/trades.vue";
const routes = [
    { path: '/', name: 'Home', component: Login },
    { path: '/menu', name: 'Menu', component: Menu },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/trades', name: 'Trades', component: Trades},
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router