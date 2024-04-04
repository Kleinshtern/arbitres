<template>
    <div
        class="menu-link"
        :class="route.name === $route.name ? 'active' : ''"
        @click="$router.push(route)"
    >
        <template v-if="prependIcon">
            <i :class="prependIcon"></i>
        </template>
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

<style scoped>
    .menu-link {
        min-height: 50px;

        display: flex;
        align-items: center;

        gap: .5rem;
        padding: 0 20px;

        &:hover {
            cursor: pointer;
            background: #abc6ff;
        }

        &.active {
            background: #abc6ff;
        }
    }
</style>
