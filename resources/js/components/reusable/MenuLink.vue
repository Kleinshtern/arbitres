<template>
    <div
        class="menu-link"
        :class="`${route.name === $route.name ? 'active' : ''} ${type === 'dropdown' ? 'dropdown' : ''}`"
        @click="type === 'dropdown' ? switchDropdown() : $router.push(route)"
    >
        <template v-if="type === 'default'">
            <template v-if="prependIcon">
                <i :class="prependIcon"></i>
            </template>
            <div class="label">
                <span class="text">{{ label }}</span>
            </div>
        </template>

        <template v-else-if="type === 'dropdown'">
            <div
                class="dropdown-label"
            >
                <template v-if="prependIcon">
                    <i :class="prependIcon"></i>
                </template>
                <div class="label">
                    <span class="text">{{ label }}</span>

                    <i class="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            <div
                class="dropdown-content"
            >
                <div
                    class="child-link"
                    v-for="child in children"
                >
                    <template v-if="child.icon">
                        <i :class="child.icon"></i>
                    </template>
                    <div class="label">
                        <span class="text">{{ child.label }}</span>
                    </div>
                </div>
            </div>
        </template>
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
            },
            type: {
                required: false,
                default: "default"
            },
            children: {
                required: false,
                default: []
            }
        },
        methods: {
            switchDropdown: function () {
                let parent = event.target.parentNode;
                let contentBlock = parent.querySelector('.dropdown-content');

                contentBlock.classList.toggle('active');
            }
        }
    }
</script>

<style scoped>
    .menu-link, .child-link {
        min-height: 50px;

        display: flex;
        align-items: center;

        gap: .5rem;
        padding: 0 20px;

        &.dropdown {
            gap: 0;

            padding: 0;

            align-items: unset;
            flex-direction: column;
            justify-content: center;

            .dropdown-label {
                min-height: 50px;
                padding: 0 20px;

                display: flex;
                align-items: center;

                gap: .5rem;

                &:hover {
                    cursor: pointer;
                    background: #abc6ff;
                }

                .label, .text, i {
                    pointer-events: none;
                }
            }

            .dropdown-content
            {
                max-height: 0;
                overflow: hidden;

                transition-property: max-height;
                transition-duration: .3s;
                transition-timing-function: ease-out;

                &.active {
                    max-height: 100%;
                }
            }
        }

        &:not(.dropdown):hover {
            cursor: pointer;
            background: #abc6ff;
        }

        &.active {
            background: #abc6ff;
        }

        .label {
            width: 100%;

            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>
