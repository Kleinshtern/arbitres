<template>
    <div id="slider-wrapper" :style="widthSlide">
        <div id="slider">
            <div class="slide-page" v-for="page in countPages" :key="page" :id="`page-${page}`">
                <template v-for="slide in onPage" :key="slide">
                    <div class="slide" :id="`slide-${calculateIndex(page, slide)}`">
                        <slot name="slider-content" :item="items[calculateIndex(page, slide)]">
                            Slide {{ calculateIndex(page, slide) + 1 }}
                        </slot>
                    </div>
                </template>
            </div>
        </div>

        <div id="slider-controls" class="d-flex justify-content-between align-items-center">
            <div id="slider-pages">
                <span
                    v-for="page in countPages"
                    :key="page"
                    class="slider-page-selector fa-solid fa-circle fa-sm"
                    :class="page === currentPage ? 'active' : ''"
                    @click="translateToPage(page)"
                >
                </span>
            </div>
            <div id="slider-carets">
                <span
                    @click="currentPage !== 1 ? currentPage-- : currentPage = countPages"
                    class="slider-caret-selector fa-solid fa-caret-left"
                ></span>
                <span
                    @click="currentPage !== countPages ? currentPage++ : currentPage = 1"
                    class="slider-caret-selector fa-solid fa-caret-right active"
                ></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                currentPage: 1
            }
        },
        props: {
            items: {
                type: Array,
                required: true,
                default: null
            },
            onPage: {
                type: Number,
                required: false,
                default: () => {
                    let countOnPage = 3;

                    if(window.innerWidth <= 1024 && window.innerWidth > 768) {
                        countOnPage = 2;
                    }
                    else if(window.innerWidth <= 768) {
                        countOnPage = 1;
                    }

                    return countOnPage;
                }
            }
        },
        mounted() {
            setInterval(() => {
                if(this.currentPage >= this.countPages) {
                    this.currentPage = 1;
                } else { this.currentPage++; }
            }, 3500)
         },
        computed: {
            countPages: function () {
                return Math.round(this.items.length / this.onPage)
            },
            widthSlide: function () {
                return {
                    '--slide-width': `calc(100% / ${this.onPage})`,
                }
            }
        },
        methods: {
            calculateIndex: function (page, slide) {
                return (this.onPage * page) - this.onPage + slide - 1;
            },
            translateToPage: function (page) {
                this.currentPage = page;
            }
        },
        watch: {
            currentPage: function (page) {
                document.getElementById('slider').scrollLeft = document.getElementById('slider').offsetWidth * (page - 1);
            },
        }
    }
</script>

<style>
    #slider-wrapper
    {
        position: relative;

        #slider {
            display: flex;
            overflow-x: hidden;
            scroll-behavior: smooth;

            .slide-page {
                flex-shrink: 0;

                width: 100%;
                display: flex;
                justify-content: space-around;

                .slide {
                    margin: 15px;
                    padding: 25px 35px;

                    width: var(--slide-width);

                    border: 1px solid var(--secondary-color);
                    border-radius: 10px;
                }
            }
        }

        #slider-controls {
            margin-top: 20px;
            margin-bottom: 20px;

            #slider-pages {
                display: flex;
                gap: 0.7rem;

                .slider-page-selector {
                    cursor: pointer;
                    color: var(--secondary-color);

                    &:hover {
                        color: var(--main-color);
                    }

                    &.active {
                        color: var(--main-color);
                    }
                }
            }

            #slider-carets {
                display: flex;
                gap: 0.7rem;

                .slider-caret-selector {
                    cursor: pointer;
                    color: var(--secondary-color);

                    transition-property: color;
                    transition-duration: 0.2s;
                    transition-timing-function: ease-in-out;

                    &:hover {
                        color: var(--main-color);
                    }
                }
            }
        }
    }
</style>
