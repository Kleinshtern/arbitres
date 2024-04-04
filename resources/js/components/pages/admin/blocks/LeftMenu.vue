<template>
    <div id="left-menu">
        <menu-link
            v-for="(link, key) in menuLinks"
            :key="key"
            :label="link.label"
            :prepend-icon="link.icon"
            :route="link.route">
        </menu-link>
    </div>
</template>

<script>
    import MenuLink from "../../../reusable/MenuLink.vue";
    import {mapStores} from "pinia";

    import {adminStore} from "../../../../stores/adminStore.js";
    import {router} from "../../../../router.js";

    export default {
        methods: {
            router() {
                return router
            }
        },
        components: {MenuLink},
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
    }
</style>
