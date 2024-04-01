<template>
    <div
        class="snackbar"
        :class="`snackbar-${variant} ${modelValue ? 'showed' : 'hidden'}`"
        :style="styles"
    >
        {{ message }}

        <slot name="action"></slot>

        <template v-if="modelValue">
            <div class="timeline">
                <div class="timeline-action" :class="`${variant}`"></div>
            </div>
        </template>
    </div>
</template>

<script>
    import CustomButton from "./CustomButton.vue";

    export default {
        components: { CustomButton },
        data: () => {
            return {}
        },
        props: {
            message: {
                type: String,
                required: false,
                default: "Ку-ку!"
            },
            variant: {
                type: String,
                required: false,
                default: 'default'
            },
            timeout: {
                type: Number,
                required: false,
                default: 2000
            },
            modelValue: {
                type: Boolean,
                required: true,
                default: false
            }
        },
        computed: {
            styles: function () {
                return {
                    '--timeline-timer': (this.timeout / 800) + 's'
                }
            }
        },
        watch: {
            modelValue: function (value) {
                if(value) {
                    setTimeout(() => {
                        this.$emit('update:modelValue', false);
                    }, this.timeout)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .snackbar {

        font-family: "Montserrat Regular", sans-serif;

        position: absolute;
        bottom: calc(5% - 30px);
        margin: 0 auto;

        padding: 15px 30px;
        border-radius: 5px;

        transition-property: opacity;
        transition-duration: .2s;
        transition-timing-function: ease-in;

        box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);
        -webkit-box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);

        &.hidden {
            opacity: 0;
        }

        &.snackbar-default {
            background: var(--secondary-color);
        }

        &.snackbar-error {
            background: #b00020;
            color: white;
        }

        &.snackbar-success {
            background: #4caf50;
            color: white;
        }

        &.snackbar-warning {
            background: #fb8c00;
            color: white;
        }

        .timeline {
            width: 100%;
            height: 5px;
            background: white;

            position: absolute;
            left: 0;
            bottom: 0;

            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;

            > .timeline-action {
                width: 100%;
                height: 5px;

                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;

                animation-fill-mode: forwards;
                animation-name: timeline;
                animation-duration: var(--timeline-timer);

                &.default {
                    background: var(--secondary-color);
                }

                &.error {
                    background: #b00020;
                }

                &.success {
                    background: #4caf50;
                }

                &.warning {
                    background: #fb8c00;
                }
            }
        }
    }

    @keyframes timeline {
        to { width: 0; }
    }
</style>
