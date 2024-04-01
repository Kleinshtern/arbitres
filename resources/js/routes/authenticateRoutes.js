import Login from "../components/pages/authenticate/pages/Login.vue";
import AuthComponent from "../components/pages/authenticate/AuthComponent.vue";
import Register from "../components/pages/authenticate/pages/Register.vue";

export const authenticateRoutes = {
    path: '/authenticate',
    component: AuthComponent,
    children: [
        { path: 'login', component: Login },
        { path: 'register', component: Register },
    ]
}
