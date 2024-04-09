import { defineStore } from "pinia";
import axios from "axios";

export const adminStore = defineStore("admin", {
    state: () => ({
        menuLinks: [
            { id: 1, label: "Вернуться на главную", icon: "fa-solid fa-chevron-left", route: { name: "MainPage" }, type: 'default' },
            { id: 2, label: "Список пользователей", icon: "fa-solid fa-list", route: { name: "usersList" }, type: 'default' },
            { id: 3, label: "Роли и привилегии", icon: "fa-solid fa-user", route: { name: "rolesList" }, type: 'default' },
            {
                id: 4,
                label: "Структура сайта",
                icon: "fa-solid fa-memo-circle-info",
                type: "dropdown",
                children: [
                    { id: 5, label: "Главная", icon: "fa-regular fa-page ", route: { name: "settingMainPage" }, type: 'default' },
                ]
            },
            { id: 6, label: "Ссылка 2", icon: "fa-solid fa-link", type: 'default' }
        ],

        usersList: [],

        modals: {
            createUserModalVisibly: false
        }
    }),
    getters: {
        getMenuLinks: state => state.menuLinks,
        getUsersList: state => state.usersList,
        getModals: state => state.modals
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
        },
        changeVisiblyCreateUserModal(value) {
            this.modals.createUserModalVisibly = value;
        },
        storeUser(values) {
            return new Promise(resolve => {
                let method = values.id ? 'PUT' : 'POST';
                let url = values.id ? `/api/admin/users/${values.id}/update`  : '/api/admin/users/create';

                axios({
                    method: method,
                    url: url,
                    params: values
                })
                    .then(response => {
                        let idx = this.usersList.findIndex(user => response.data.user.id === user.id);
                        if(idx !== -1) {
                            this.usersList[idx] = response.data.user;
                        }
                        else this.usersList.unshift(response.data.user);

                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.changeVisiblyCreateUserModal(false);
                        resolve();
                    })
            })
        }
    }
})
