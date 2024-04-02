<template>
    <v-card
        title="Авторизация"
        width="60%"
    >
        <template #text>
            <form @submit.prevent="submit">
                <v-text-field
                    placeholder="Логин"
                    v-model="fields.username.value.value"
                    :error-message="fields.username.errorMessage.value"
                ></v-text-field>
                <v-text-field
                    placeholder="Пароль"
                    v-model="fields.password.value.value"
                    :error-message="fields.password.errorMessage.value"
                    type="password"
                ></v-text-field>

                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-6 d-flex align-items-center">
                            <custom-button
                                variant="link"
                                label="Нет аккаунта? Зарегистрироваться"
                                text-transform="default"
                                block
                                @click="$router.push({ name: 'register' })"
                            >
                            </custom-button>
                        </div>
                        <div class="col-sm-6">
                            <custom-button
                                label="Войти"
                                variant="tonal"
                                color="#5280e2"
                                prepend-icon="fa-solid fa-right-to-bracket"
                                type="submit"
                                block
                            ></custom-button>
                        </div>
                    </div>
                </div>
            </form>
        </template>
    </v-card>
</template>

<script setup>
    import * as yup from "yup";
    import { useForm, useField } from "vee-validate";

    import { authenticateStore } from "../../../../stores/authenticateStore.js";

    const store = authenticateStore();

    const schema = yup.object({
        username: yup.string().email('Необходимо ввести Email').required('Введите логин'),
        password: yup.string().required('Введите пароль')
    });

    const { handleSubmit } = useForm({
        validationSchema: schema,
    });

    const fields = {
        username: useField('username'),
        password: useField('password')
    }

    const submit =  handleSubmit(values => {
        store.loginUser(values.username, values.password);
    })
</script>

<script>
    import VCard from "../../../reusable/VCard.vue";
    import VTextField from "../../../reusable/inputs/VTextField.vue";
    import CustomButton from "../../../reusable/CustomButton.vue";

    export default {
        name: 'Login',
        components: {
            CustomButton,
            VTextField,
            VCard
        },
        data: () => {
            return {}
        }
    }
</script>
