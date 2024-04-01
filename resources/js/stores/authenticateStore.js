import { defineStore } from "pinia";

export const authenticateStore = defineStore('authenticateStore', {
    state: () => ({
       errorMessage: ""
    }),
    getters: {
        getErrorMessage: (state) => state.errorMessage
    },
    actions: {
        loginUser(username, password) {
            this.errorMessage = '';

            return new Promise(resolve => {
                axios.get('/sanctum/csrf-token')
                    .then(() => {
                        axios.post('/api/users/login', {
                            username, password
                        })
                            .then((response) => {

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
        registerUser(username, password) {
            this.errorMessage = "";

            return new Promise(resolve => {
                axios.post('/api/users/register', {
                    username, password
                })
                    .then((response) => {

                    })
                    .catch(error => {
                        this.errorMessage = error.response.data.message;
                    })
                    .finally(() => {
                        resolve();
                    })
            })
        }
    }
});
