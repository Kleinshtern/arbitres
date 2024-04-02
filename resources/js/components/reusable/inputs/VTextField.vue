<template>
    <div class="text-field-group">
        <input
            class="text-field"
            :type="type"
            :value="modelValue"
            @input="handleInput"
        >
        <span class="bar" :class="`${errorMessage ? 'error-status' : ''}`"></span>
        <span class="hint" v-if="!errorMessage">
            <slot name="hint">
                {{ hint }}
            </slot>
        </span>
        <div class="error">
            {{ errorMessage }}
        </div>
        <div
            class="label"
            :class="`${modelValue ? 'fixed' : ''} ${errorMessage ? 'error-status' : ''}`"
        >
            <slot name="label">
                {{ placeholder }}
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'VTextField',
        props: {
            modelValue: {
                required: true,
            },
            placeholder: {
                type: String,
                required: true,
                default: ''
            },
            hint: {
                type: String,
                required: false,
                default: ''
            },
            type: {
                type: String,
                required: false,
                default: "text"
            },
            errorMessage: {
                type: String,
                required: false
            }
        },
        data: () => {
            return {}
        },
        methods: {
            handleInput: function (e) {
                this.$emit('update:modelValue', e.target.value);
            }
        }
    }
</script>

<style scoped lang="scss">
    .text-field-group {
        position: relative;
        font-family: "Montserrat Regular", sans-serif;

        .text-field {

            border: none;
            width: 100%;

            padding: 25px 15px 10px;

            //border-top-left-radius: 10px;
            //border-top-right-radius: 10px;

            ~ .hint {
                opacity: 0;
            }

            &:focus-visible {
                border: none;
                outline: none;

                ~ .bar:not(.error-status):after {
                    background: var(--main-color);
                }

                ~ .label {
                    top: 0;
                    padding: 0 15px 5px;

                    &:not(.error-status) {
                        color: #b1b1b1;
                    }
                }

                ~ .hint {
                    opacity: 1;
                }
            }
        }

        .bar {
            &::after {
                content: '';

                height: 2px;
                display: block;
                background: var(--secondary-color);
            }

            &.error-status {
                &::after {
                    background: red;
                }
            }
        }

        .label {
            position: absolute;
            top: calc(25% + 10px);
            left: 0;

            padding-left: 15px;

            color: #dcdcdc;

            transition-property: color, top;
            transition-duration: .2s;
            transition-timing-function: ease-in;

            pointer-events: none;

            &.fixed {
                top: 0;
                padding: 0 15px 5px;
            }

            &.error-status {
                color: red;
            }
        }

        &:hover {
            .label:not(.error-status) {
                color: #b1b1b1;
            }
        }

        .hint {
            font-size: .9em;
            padding: 0 15px;

            transition-property: opacity;
            transition-duration: .2s;
            transition-timing-function: ease-in;
        }

        .error {
            font-size: .9em;
            padding: 10px 15px;

            color: red;
        }
    }
</style>
