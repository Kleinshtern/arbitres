import { defineStore } from "pinia";
import axios from "axios";

export const adminStore = defineStore("admin", {
    state: () => ({
        menuLinks: [
            { label: "Вернуться на главную", icon: "fa-solid fa-chevron-left", route: { name: "MainPage" } },
            { label: "Список пользователей", icon: "fa-solid fa-list", route: { name: "usersList" } },
            { label: "Роли и привилегии", icon: "fa-solid fa-user", route: { name: "rolesList" } },
        ],

        usersList: []
    }),
    getters: {
        getMenuLinks: state => state.menuLinks,
        getUsersList: state => state.usersList
    },
    actions: {
        loadUsersList() {
            return new Promise(resolve => {
                axios.get('/api/admin/users')
                    .then(response => {
                        this.usersList = response.data.users;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        resolve();
                    })
            })
        }
    }
})
