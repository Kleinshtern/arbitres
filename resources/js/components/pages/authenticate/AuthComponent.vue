<template>
    <div id="auth-page">
        <div class="return-button">
            <custom-button
                variant="icon"
                prepend-icon="fa-solid fa-turn-left"
                @click="$router.push({ name: 'MainPage' })"
            ></custom-button>
        </div>

        <router-view></router-view>

        <snackbar
            :message="errorMessage"
            v-model="snackbar"
            variant="error"
        ></snackbar>
    </div>
</template>

<script>
    import CustomButton from "../../reusable/CustomButton.vue";
    import Snackbar from "../../reusable/Snackbar.vue";

    import { authenticateStore } from "../../../stores/authenticateStore.js";

    export default {
        components: { Snackbar, CustomButton },
        data: () => {
            return {
                snackbar: false
            }
        },
        computed: {
            errorMessage: function () {
                return authenticateStore().getErrorMessage
            }
        },
        watch: {
            errorMessage: function (value) {
                this.snackbar = !!value;
            }
        }
    }
</script>

<style scoped>
    #auth-page {
        height: 100vh;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        .return-button {
            position: absolute;
            top: 15px;
            left: 15px;
        }
    }
</style>
