<template>
    <div id="admin-panel">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-3">
                    <left-menu></left-menu>
                </div>
                <div class="col-md-9">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LeftMenu from "./blocks/LeftMenu.vue";

    export default {
        components: { LeftMenu },
        data: () => {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    #admin-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        width: 100%;
        height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
