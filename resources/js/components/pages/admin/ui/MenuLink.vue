<template>
    <div
        class="menu-link"
        :class="`${route.name === $route.name ? 'active' : ''}`"
        @click="$router.push(route)"
    >
        <i :class="prependIcon"></i>
        {{ label }}
    </div>
</template>

<script>
    export default {
        data: () => {
            return {}
        },
        props: {
            label: {
                type: String,
                required: true
            },
            prependIcon: {
                type: String,
                required: false,
                default: null
            },
            route: {
                required: false,
                default: { name: 'MainPage' }
            }
        }
    }
</script>

<style scoped lang="scss">
    .menu-link {
        min-height: 50px;

        display: flex;
        align-items: center;

        gap: .5rem;
        padding: 0 20px;

        transition-property: all;
        transition-duration: 0.2s;
        transition-timing-function: ease;

        &.active {
            background: #abc6ff;
        }

        &:hover {
            background: #abc6ff;
            cursor: pointer;
        }
    }
</style>
