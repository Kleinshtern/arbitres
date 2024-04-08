<template>
    <form @submit.prevent="submit">
        <v-modal
            v-model="visibly"
            name="createUserModal"
            :title="`${!user ? 'Добавление ' : 'Редактирование ' } пользователя`"
        >
            <template #body>
                <div class="v-row">
                    <div class="col-sm-12">
                        <v-text-field
                            placeholder="Имя"
                            v-model="fields.name.value.value"
                            :error-message="fields.name.errorMessage.value"
                        ></v-text-field>
                    </div>
                </div>
                <div class="v-row">
                    <div class="col-sm-12">
                        <v-text-field
                            placeholder="E-mail"
                            v-model="fields.email.value.value"
                            :error-message="fields.email.errorMessage.value"
                        ></v-text-field>
                    </div>
                </div>
                <div class="v-row">
                    <div class="col-sm-12">
                        <v-text-field
                            placeholder="Пароль"
                            v-model="fields.password.value.value"
                            :error-message="fields.password.errorMessage.value"
                            type="password"
                        ></v-text-field>
                    </div>
                </div>
            </template>
            <template #footer>
                <custom-button
                    label="Отмена"
                    color="#fb8c00"
                    variant="outline"
                    @click="visibly = false"
                ></custom-button>
                <custom-button
                    type="submit"
                    label="Сохранить"
                    color="#4caf50"
                    variant="outline"
                ></custom-button>
            </template>
        </v-modal>
    </form>
</template>

<script>
    import VModal from "../../../reusable/VModal.vue";
    import {mapStores} from "pinia";
    import {adminStore} from "../../../../stores/adminStore.js";
    import VTextField from "../../../reusable/inputs/VTextField.vue";

    import * as yup from "yup";
    import {useField, useForm} from "vee-validate";
    import CustomButton from "../../../reusable/CustomButton.vue";

    export default {
        components: { VTextField, VModal, CustomButton },
        setup: () => {
            const store = adminStore();

            const schema = yup.object({
                id: yup.number(),
                name: yup.string().required('Введите имя'),
                email: yup.string().email('Необходимо ввести Email').required('Введите логин'),
                password: yup.string().required('Введите пароль')
            });

            const { handleSubmit, resetForm } = useForm({
                validationSchema: schema,
            });

            const fields = {
                id: useField('id'),
                name: useField('name'),
                email: useField('email'),
                password: useField('password')
            }

            const submit =  handleSubmit(values => {
                store.storeUser(values);
            })

            return {
                fields, submit, resetForm
            }
        },
        props: {
            user: {
                type: Object,
                required: false,
                default: null
            }
        },
        computed: {
            ...mapStores(adminStore),

            visibly: {
                get: function () {
                    return this.adminStore.getModals.createUserModalVisibly
                },
                set: function () {
                    this.resetForm();
                    this.adminStore.changeVisiblyCreateUserModal(false);
                }
            }
        },
        watch: {
            visibly: function (val) {
                if(val && this.user) {
                    this.fields.id.setValue(this.user.id);
                    this.fields.name.setValue(this.user.name);
                    this.fields.email.setValue(this.user.email);
                    this.fields.password.setValue('passwordHashed');
                }
            }
        }
    }
</script>
