<template>
    <span
        class="divider"
        :style="styles"
    ></span>
</template>

<script>
    export default {
        props: {
            height: {
                type: Number,
                required: false,
                default: 1
            }
        },
        computed: {
            styles() {
                return {
                    '--divider-height': this.height + 'px'
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .divider {
        display: block;
        width: 100%;
        height: var(--divider-height);

        background: lightgray;
    }
</style>
