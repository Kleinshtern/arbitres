<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <header-component></header-component>
            </div>
        </div>
    </div>
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
