<template>
    <div id="slider">
        <div class="slider-item">
            slide 1
        </div>
        <div class="slider-item">
            slide 1
        </div>
        <div class="slider-item">
            slide 1
        </div>
        <div class="slider-item">
            slide 1
        </div>
        <div class="slider-item">
            slide 1
        </div>
        <div class="slider-item">
            slide 1
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {}
        },
        props: {
            items: {
                type: Array,
                required: true,
                default: null
            }
        },
        computed: {
            countPages: function () {
                return Math.round(this.items.length / 3)
            }
        }
    }
</script>

<style scoped>

</style>
