import {createRouter, createWebHistory} from 'vue-router'

import MainPage from "./components/pages/MainPage.vue";
import { authenticateRoutes } from "./routes/authenticateRoutes.js";

const routes = [
    {
        path: '/',
        component: MainPage,
        name: 'MainPage'
    },
    authenticateRoutes
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
