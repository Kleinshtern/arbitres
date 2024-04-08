<template>
    <div
        :id="name"
        class="dialog"
        :class="`${modelValue ? 'showed' : 'hidden'} ${fade ? 'faded' : 'without-fade'} ${transitionDirection}`"
    >
        <div
            class="overflow"
            @click="!persistent ? $emit('update:modelValue', false) : ''"
        ></div>
        <div class="content">
            <div class="dialog-title">
                <div class="title">
                    <slot name="title">
                        <span>{{ title }}</span>

                        <custom-button
                            variant="plain"
                            color="#5280e2"
                            text-transform="default"
                            with-out-paddings
                            @click="$emit('update:modelValue', false)"
                        >
                            <template #label>
                                <i class="fa-solid fa-close"></i>
                            </template>
                        </custom-button>
                    </slot>
                </div>

                <divider :height="1"></divider>
            </div>
            <div class="dialog-body">
                <slot name="body"></slot>
            </div>

            <template v-if="!hideDefaultFooter">
                <divider :height="1"></divider>

                <div class="dialog-footer">
                    <slot name="footer">
                        <custom-button
                            label="Закрыть"
                            text-transform="default"
                            variant="outline"
                            color="#5280e2"
                            block
                            @click="$emit('update:modelValue', false)"
                        ></custom-button>
                    </slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import CustomButton from "./CustomButton.vue";
    import Divider from "./Divider.vue";

    export default {
        components: {Divider, CustomButton },
        data: () => {
            return {}
        },
        props: {
            name: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: false,
                default: "Модальное окно"
            },
            modelValue: {
                type: Boolean,
                required: true,
                default: false
            },
            persistent: {
                type: Boolean,
                required: false,
                default: false
            },
            fade: {
                type: Boolean,
                required: false,
                default: true
            },
            direction: {
                type: String,
                required: false,
                default: 'top'
            },
            hideDefaultFooter: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            transitionDirection: function () {
                switch (this.direction) {
                    case "top": {
                        return 'transition-top';
                    }
                    case "bottom": {
                        return 'transition-bottom';
                    }
                    case "left": {
                        return 'transition-left';
                    }
                    case "right": {
                        return 'transition-right';
                    }
                    default: {
                        return 'transition-top';
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .dialog {
        position: fixed;

        width: 100vw;
        height: 100vh;

        transition-property: top, left, bottom, right;
        transition-timing-function: ease-in;

        &.transition-top, &.transition-left, &.transition-right {
            top: 0;
        }
        &.transition-top, &.transition-bottom {
            left: 0;
        }

        &.showed {
            &.transition-bottom {
                bottom: 0;
            }
            &.transition-left {
                left: 0;
            }
            &.transition-right {
                right: 0;
            }
        }

        &.hidden {
            &.transition-top {
                top: -100%;
                left: 0;
            }
            &.transition-bottom {
                left: 0;
                bottom: -100%;
            }
            &.transition-left {
                left: -100%;
            }
            &.transition-right {
                right: -100%;
            }
        }

        &.faded {
            transition-duration: .2s;
        }
        &.without-fade {
            transition-duration: unset;
        }

        .overflow {
            position: absolute;
            top: 0;
            left: 0;

            background: rgba(0,0,0,.5);
            width: 100%;
            height: 100%;

            z-index: 2;
        }

        .content {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;

            z-index: 3;
            background: white;

            width: 50%;
            height: fit-content;

            border-radius: 10px;

            box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);

            .dialog-title {
                display: flex;
                flex-direction: column;

                font-weight: 900;

                .title {
                    padding: 15px;

                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }

            .dialog-body {
                padding: 15px;
            }

            .dialog-footer {
                padding: 15px;

                display: flex;
                align-items: center;
                justify-content: end;
                gap: .5rem;
            }
        }
    }
</style>
