import AdminDashboard from "../components/pages/admin/AdminDashboard.vue";
import {authenticateStore} from "../stores/authenticateStore.js";
import UserPage from "../components/pages/admin/pages/UsersPage.vue";
import RolesPage from "../components/pages/admin/pages/RolesPage.vue";
import {pagesRoutes} from "./admin/pagesRoutes.js";

const children = [
    { path: "users", component: UserPage, name: "usersList" },
    { path: "roles", component: RolesPage, name: "rolesList" },
    pagesRoutes
];

export const adminRoutes = {
    path: '/admin',
    component: AdminDashboard,
    children: children,
    name: 'admin',
    beforeEnter: function (to, from, next) {
        const store = authenticateStore();

        if(!store.isAuthenticated) {
            next('/login');
        }
        next()
    }
}
