<template>
  <button
      id="custom-button"
      type="button"
      :class="variant"
      @click="event"

      :style="styles"
  >
      <slot name="prepend-icon">
          <i
              v-if="prependIcon"
              class="append-icon"
              :class="`${prependIcon} ${variant}`"
          ></i>
      </slot>

      <section class="label" :class="variant">
          <slot name="label">
              {{ label }}
          </slot>
      </section>

      <slot name="append-icon">
          <i
              v-if="appendIcon"
              class="append-icon"
              :class="`${appendIcon} ${variant}`"
          ></i>
      </slot>
  </button>
</template>

<script>
    export default {
        data: () => {
            return {}
        },
        props: {
            appendIcon: {
                type: String,
                required: false,
                default: ""
            },
            label: {
                type: String,
                required: false,
                default: ""
            },
            prependIcon: {
                type: String,
                required: false,
                default: ""
            },
            variant: {
                type: String,
                required: false,
                default: "default"
            },
            color: {
                type: String,
                required: false,
                default: "white"
            },
            textTransform: {
                type: String,
                required: false,
                default: "uppercase"
            }
        },
        emits: [
            'click'
        ],
        computed: {
            styles: function () {
                return {
                    '--btn-background-color': this.color,
                    '--btn-border-color': this.color === 'white' || this.color === '#fff' ? '#000' : this.color,
                    '--btn-text-transform': this.textTransform
                }
            }
        },
        methods: {
            event: function() {
                event.target.blur();
            }
        }
    }
</script>

<style scoped lang="scss">
  #custom-button
  {
      font-family: "Montserrat Medium", sans-serif;

      display: inline-flex;
      align-items: center;

      border-radius: 10px;
      padding: 15px 25px;

      background: transparent;

      box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);
      -webkit-box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);
      -moz-box-shadow: 0px 3px 6px -2px rgba(0,0,0,0.5);

      border: none;
      text-transform: var(--btn-text-transform);
      position: relative;

      overflow: hidden;
      user-select: none;

      &:after, &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          transition-property: box-shadow, background, opacity;
          transition-duration: .2s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:before {
          background: var(--btn-background-color);
          z-index: 0;
      }

      &:after {
          opacity: .0;
          background: white;
      }

      &:hover:after {
          opacity: .1;
      }

      &:focus {
          border: none;

          &:after {
              opacity: .3;
          }
      }

      > .prepend-icon, .append-icon {
          padding: 5px;
      }

      > .label, .prepend-icon, .append-icon {
          filter: invert(1);

          &.outline, &.tonal, &.text, &.default {
              filter: invert(0);
          }
      }

      &.outline, &.tonal, &.text {
          box-shadow: none;
          color: var(--btn-background-color);
      }

      &.outline {
          border: 1px solid var(--btn-border-color);

          &:before {
              opacity: .1;
              background: transparent;
          }
          &:after {
              background: var(--btn-border-color);
          }

          &:hover {
              > :after {
                  opacity: .2;
              }
          }
      }

      &.flat {
          box-shadow: none;
      }

      &.tonal {
          &:before {
              opacity: .1;
          }
      }

      &.text {
          &:before {
              opacity: 0;
          }
          &:hover {
              &:before {
                  opacity: .1;
              }
          }
      }

      &.tonal, &.text {
          &:after {
              background: var(--btn-background-color);
          }
          &:focus {
              &:after {
                  opacity: .3;
              }
          }
      }
  }
</style>
