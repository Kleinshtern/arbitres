<template>
    <div class="card-container" :class="`card-${variant}`" :style="styles">
        <div class="card-icon">
            <slot name="prepend-icon">
                <i :class="prependIcon"></i>
            </slot>
        </div>
        <div class="card-content">
            <div class="card-title">
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
            <div class="card-text">
                <slot name="text">
                    {{ text }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {}
        },
        props: {
            prependIcon: {
                type: String,
                required: false,
                default: null
            },
            title: {
                type: String,
                required: false,
                default: "Card title"
            },
            text: {
                type: String,
                required: false,
                default: "Text"
            },
            link: {
                type: Boolean,
                required: false,
                default: false
            },
            variant: {
                type: String,
                required: false,
                default: "elevated"
            },
            color: {
                type: String,
                required: false,
                default: "#fff"
            },
            alignment: {
                type: String,
                required: false,
                default: "left"
            },
            width: {
                type: String,
                required: false,
                default: "322px"
            }
        },
        computed: {
            styles: function () {
                return {
                    '--alignment-content': this.alignment,
                    '--max-width-card': this.width,
                    '--card-color': this.color
                }
            }
        }
    }
</script>

<style scoped>
    .card-container {
        max-width: var(--max-width-card);
        display: flex;
        justify-content: space-between;
        gap: 0.4rem;

        border-radius: 10px;
        padding: 15px 25px;

        text-align: var(--alignment-content);

        .card-icon {
            flex: 0 0 5%;
            font-size: 1.5rem;
        }

        .card-content {
            .card-title {
                font-weight: bold;
                font-size: 1.5rem;
            }
        }

        &.card-elevated {
            box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);
            -webkit-box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);
            -moz-box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);

            background: var(--card-color);
        }

        &.card-outlined {
            box-shadow: none;

            border: 1px solid var(--card-color);
            color: var(--card-color);
        }

        &.card-tonal {
            position: relative;
            box-shadow: none;
            color: var(--card-color);

            overflow: hidden;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background-color: var(--card-color);
                z-index: -1;
                opacity: 0.1;
            }
        }
    }
</style>
