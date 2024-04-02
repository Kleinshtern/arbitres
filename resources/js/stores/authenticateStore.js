import { defineStore } from "pinia";
import axios from "axios";

export const authenticateStore = defineStore('authenticate', {
    state: () => ({
        errorMessage: "",
        isAuthenticated: false,
        authenticatedUser: null,
    }),
    getters: {
        getErrorMessage: (state) => state.errorMessage,
        getAuthenticatedUser: (state) => state.authenticatedUser,
        getIsAuthenticated: (state) => state.isAuthenticated,
    },
    actions: {
        loginUser(username, password, name) {
            this.errorMessage = '';
            return new Promise(resolve => {
                axios.get('/sanctum/csrf-token')
                    .then(() => {
                        axios.post('/api/users/login', {
                            username, password, name
                        })
                            .then((response) => {
                                this.$router.go({ name: 'MainPage' });
                            })
                            .catch(error => {
                                this.errorMessage = error.response.data.message;
                            })
                            .finally(() => {
                                resolve();
                            })
                    })
            })
        },
        registerUser(username, password, name) {
            this.errorMessage = "";

            return new Promise(resolve => {
                axios.post('/api/users/register', {
                    username, password, name
                })
                    .then((response) => {
                        this.$router.go({ name: 'MainPage' });
                    })
                    .catch(error => {
                        this.errorMessage = error.response.data.message;
                    })
                    .finally(() => {
                        resolve();
                    })
            })
        },
        logoutUser() {
            return new Promise(resolve => {
                axios.get('/api/users/logout')
                    .then(response => {
                        this.isAuthenticated = false;
                        this.authenticatedUser = null;

                        this.$router.go({ name: 'MainPage' });
                    })
                    .catch(error => {
                        this.errorMessage = error.response.data.message;
                    })
                    .finally(() => {
                        resolve();
                    })
            });
        },
        checkAuth() {
            return new Promise(resolve => {
                axios.get('/api/user')
                    .then(response => {
                        this.isAuthenticated = true;
                        this.authenticatedUser = {
                            user: response.data.user,
                            permissions: response.data.permissions
                        };
                    })
                    .catch(error => {
                        this.isAuthenticated = false;
                        this.authenticatedUser = null;
                    })
                    .finally(() => {
                        resolve();
                    })
            })
        }
    }
});
