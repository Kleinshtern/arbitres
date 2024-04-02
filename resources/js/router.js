import {createRouter, createWebHistory} from 'vue-router'

import MainPage from "./components/pages/MainPage.vue";
import { authenticateRoutes } from "./routes/authenticateRoutes.js";
import {adminRoutes} from "./routes/adminRoutes.js";

const routes = [
    {
        path: '/',
        component: MainPage,
        name: 'MainPage'
    },
    authenticateRoutes,
    adminRoutes
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
