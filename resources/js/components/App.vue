<template>
    <header-component></header-component>
    <main>
        <router-view />
    </main>
</template>

<script>
    import HeaderComponent from "./system/HeaderComponent.vue";

    export default {
        data: () => {
            return {}
        },
        components: {
            HeaderComponent
        }
    }
</script>
