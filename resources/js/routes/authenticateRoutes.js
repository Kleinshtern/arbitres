import Login from "../components/pages/authenticate/pages/Login.vue";
import AuthComponent from "../components/pages/authenticate/AuthComponent.vue";
import Register from "../components/pages/authenticate/pages/Register.vue";
import {authenticateStore} from "../stores/authenticateStore.js";

export const authenticateRoutes = {
    path: '/',
    component: AuthComponent,
    children: [
        {
            path: 'login',
            component: Login,
            name: 'login',
            beforeEnter: function (to, from, next) {
                const store = authenticateStore();

                if(store.isAuthenticated) {
                    next('/')
                }
                next();
            }
        },
        {
            path: 'register',
            component: Register,
            name: 'register',
            beforeEnter: function (to, from, next) {
                const store = authenticateStore();

                if(store.isAuthenticated) {
                    next('/')
                }
                next();
            }
        },
    ]
}
