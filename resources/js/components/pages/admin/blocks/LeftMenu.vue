<template>
    <ul id="left-menu">
        <li
            v-for="(link, key) in menuLinks"
            :key="key"
        >
            <template v-if="link.type === 'default'">
                <menu-link
                    :label="link.label"
                    :prepend-icon="link.icon"
                    :route="link.route"
                ></menu-link>
            </template>
        </li>
    </ul>
</template>

<script>
    import MenuLink from "../ui/MenuLink.vue";
    import {mapStores} from "pinia";

    import {adminStore} from "../../../../stores/adminStore.js";
    import {router} from "../../../../router.js";

    export default {
        methods: {
            router() {
                return router
            }
        },
        components: { MenuLink },
        data: () => {
            return {}
        },
        computed: {
            ...mapStores(adminStore),

            menuLinks: function () {
                return this.adminStore.getMenuLinks
            }
        }
    }
</script>

<style scoped>
    #left-menu {
        height: 100vh;
        background: var(--secondary-color);

        padding: 0;
        margin: 0;
        list-style: none;
    }
</style>
