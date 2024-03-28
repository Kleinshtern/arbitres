<template>
    <div id="info-block">
        <div class="col-sm-6">
            <div class="row mb-2">
                <h1 class="title">
                    {{ informationBlock.title }}
                </h1>
                <p>
                    <small>
                        {{ informationBlock.subtitle }}
                    </small>
                </p>
            </div>

            <custom-button
                :prepend-icon="informationBlock.button.icon"
                :label="informationBlock.button.label"
                color="#5280e2"
                variant="flat"
                text-transform="default"
            ></custom-button>

        </div>
        <div
            id="university-image"
            class="col-sm-6"
            :style="`background-image: url('${informationBlock.image}')`"
        />
    </div>

    <div id="popular-reviews">
        <div class="row align-items-center mt-3 mb-2">
            <div class="col-sm-9">
                <h2 class="title">
                    <i :class="popularReviews.icon" style="color: var(--main-color)"></i>
                    <span class="ms-2">
                    {{ popularReviews.title }}
                    </span>
                </h2>
            </div>
            <div class="col-sm-3 d-flex justify-content-end">
                <custom-button
                    :label="popularReviews.button.label"
                    color="#5280e2"
                    variant="flat"
                    text-transform="default"
                ></custom-button>
            </div>
        </div>
        <div class="row">
            <slider-component :items="popularReviews.reviews"></slider-component>
        </div>
    </div>
</template>

<script>
    import {useMainPageStore} from "../../stores/mainPageStore.js";
    import CustomButton from "../reusable/CustomButton.vue";
    import SliderComponent from "../reusable/SliderComponent.vue";

    export default {
        components: {SliderComponent, CustomButton},
        setup: () => {
            const store = useMainPageStore();

            return {
                store
            }
        },
        data: () => {
            return {}
        },
        computed: {
            informationBlock: function () {
                return this.store.getInfoBlockData
            },
            popularReviews: function () {
                return this.store.getPopularReviews
            }
        }
    }
</script>

<style scoped lang="scss">
    #info-block {
        height: 500px;

        background: var(--secondary-color);
        border-radius: 10px;

        padding-left: 45px;

        display: flex;
        align-items: center;
        justify-content: center;

        #university-image {
            background-size: cover;
            background-repeat: no-repeat;

            height: inherit;
        }
    }

    .title {
        font-family: "Montserrat Bold", sans-serif;
    }

</style>
