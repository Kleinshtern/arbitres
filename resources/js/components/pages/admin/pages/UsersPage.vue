<template>
    <div class="container">
        <header class="header">
            <div class="col-md-12">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h3>Управление пользователями</h3>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <custom-button
                            variant="flat"
                            color="#5280e2"
                            text-transform="default"
                            prepend-icon="fa-solid fa-plus"
                            label="Добавить пользователя"
                            @click="showAddModal(null)"
                        ></custom-button>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <v-table
                :items="list"
                :headers="headers"
            >
                <template #header.actions>
                    <i class="fa-solid fa-cog"></i>
                </template>
                <template #item.actions="{ rootState }">
                    <custom-button
                        @click="showAddModal(rootState)"
                        variant="plain"
                        prepend-icon="fa-solid fa-pencil"
                        color="#5280e2"
                        with-out-paddings
                    ></custom-button>
                    <custom-button
                        variant="plain"
                        prepend-icon="fa-solid fa-close"
                        color="#b00020"
                        with-out-paddings
                    ></custom-button>
                </template>
            </v-table>

            <create-user-modal
                :user="editableUser"
            ></create-user-modal>
        </main>
    </div>
</template>

<script lang="ts">
    import {adminStore} from "../../../../stores/adminStore.js";
    import {mapStores} from "pinia";
    import VTable from "../../../reusable/VTable.vue";
    import CustomButton from "../../../reusable/CustomButton.vue";
    import CreateUserModal from "../modals/CreateUserModal.vue";

    export default {
        components: { CreateUserModal, CustomButton, VTable },
        data: () => {
            return {
                headers: [
                    { key: "id", title: "№", alignment: "center" },
                    { key: "name", title: "Имя", alignment: "center" },
                    { key: "email", title: "Email", alignment: "center" },
                    { key: "created_at", title: "Дата создания" },
                    { key: "actions", title: '' }
                ],

                editableUser: null
            }
        },
        created() {
            const store = adminStore();

            store.loadUsersList();
        },
        computed: {
            ...mapStores(adminStore),

            list: function() {
                return this.adminStore.getUsersList;
            }
        },
        methods: {
            showAddModal: function (user) {
                this.editableUser = user;

                this.adminStore.changeVisiblyCreateUserModal(true);
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        padding: 10px 0;

        display: flex;
        align-items: center;
    }
</style>
