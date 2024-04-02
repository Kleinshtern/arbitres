<template>
    <v-card
        title="Регистрация"
        width="60%"
    >
        <template #text>
            <form @submit.prevent="submit">
                <v-text-field
                    placeholder="Имя"
                    v-model="fields.name.value.value"
                    :error-message="fields.name.errorMessage.value"
                >
                </v-text-field>
                <v-text-field
                    placeholder="Email"
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
                                label="Назад"
                                text-transform="default"
                                block
                                @click="$router.push({ name: 'login' })"
                            >
                            </custom-button>
                        </div>
                        <div class="col-sm-6">
                            <custom-button
                                label="Зарегистрироваться"
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
        username: yup.string().email('Необходимо ввести Email').required('Введите Email'),
        password: yup.string()
            .required('Введите пароль')
            .min(8, 'Пароль должен иметь длину минимум 8 символов'),
        name: yup.string().required('Введите Ваше имя')
    });

    const { handleSubmit } = useForm({
        validationSchema: schema,
    });

    const fields = {
        username: useField('username'),
        password: useField('password'),
        name: useField('name'),
    }

    const submit =  handleSubmit(values => {
        store.registerUser(values.username, values.password, values.name);
    })
</script>

<script>
    import VCard from "../../../reusable/VCard.vue";
    import VTextField from "../../../reusable/inputs/VTextField.vue";
    import CustomButton from "../../../reusable/CustomButton.vue";

    export default {
        name: 'Register',
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
