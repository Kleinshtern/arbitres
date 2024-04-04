<template>
    <template v-if="isAuthenticated && $route.path.split('/')[1] !== 'admin'">
        <div id="auth-block">
            <div id="user-info">
                <b>{{ userInfo.user.name }} ({{ userInfo.user.email }})</b>
            </div>
            <div id="actions">
                <a id="admin-panel" @click="$router.push('/admin')">
                    <i class="fa-solid fa-gear"></i>
                    <span class="label">
                        Адм. панель
                    </span>
                </a>
                <a id="logout" @click="logout">
                    <i class="fa-solid fa-door-open"></i>
                    <span class="label">
                        Выход
                    </span>
                </a>
            </div>
        </div>
    </template>

    <router-view />

    <snackbar
        :message="error"
        v-model="snackbar"
        variant="error"
    ></snackbar>
</template>

<script>
    import {mapStores} from "pinia";
    import {authenticateStore} from "../stores/authenticateStore.js";
    import CustomButton from "./reusable/CustomButton.vue";
    import Snackbar from "./reusable/Snackbar.vue";

    export default {
        components: { Snackbar, CustomButton },
        data: () => {
            return {
                snackbar: false
            }
        },
        computed: {
            ...mapStores(authenticateStore),

            isAuthenticated() {
                return this.authenticateStore.getIsAuthenticated;
            },
            userInfo() {
                return this.authenticateStore.getAuthenticatedUser;
            },
            error() {
                return this.authenticateStore.getErrorMessage;
            }
        },
        methods: {
            logout: function () {
                this.authenticateStore.logoutUser();
            }
        },
        watch: {
            errorMessage: function (value) {
                this.snackbar = !!value;
            }
        }
    }
</script>

<style scoped lang="scss">

    #auth-block {
        background: var(--secondary-color);
        padding: 10px 15px;

        position: sticky;
        top: 0;
        z-index: 9999;

        box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);

        display: flex;
        justify-content: space-between;

        #logout, #admin-panel {
            padding: 0 10px;

            text-decoration: none;
            cursor: pointer;

            &:hover {
                .label {
                    text-decoration: underline;
                }
            }
        }
    }

</style>
