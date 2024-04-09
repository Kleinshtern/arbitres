<template>
    <div
        class="menu-link"
        :class="`${route.name === $route.name ? 'active' : ''} ${type === 'dropdown' ? 'dropdown' : ''}`"
    >
        <template v-if="type === 'default'">
            <div class="default-link" @click="goToRoute(route)">
                <template v-if="prependIcon">
                    <i :class="prependIcon"></i>
                </template>
                <div class="label">
                    <span class="text">{{ label }}</span>
                </div>
            </div>
        </template>

        <template v-else-if="type === 'dropdown'">
            <div class="dropdown-link">
                <div
                    class="dropdown-label"
                    @click="switchDropdown()"
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
                        :key="child.id"
                        @click="goToRoute(child.route)"
                    >
                        <template v-if="child.icon">
                            <i :class="child.icon"></i>
                        </template>
                        <div class="label">
                            <span class="text">{{ child.label }}</span>
                        </div>
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
                let label = parent.querySelector('.dropdown-label');

                label.classList.toggle('active');
                contentBlock.classList.toggle('active');
            },
            goToRoute: function (route) {
                this.$router.push(route);
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

        .default-link {
            display: flex;
            align-items: center;
            gap: .5rem;

            width: 100%;
            height: inherit;
        }

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

                &.active {
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
                transition-duration: .5s;
                transition-timing-function: cubic-bezier(0, 1, 0, 1);

                &.active {
                    max-height: 9999px;
                    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
                    transition-delay: 0s;
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

            pointer-events: none;
        }
    }
</style>
