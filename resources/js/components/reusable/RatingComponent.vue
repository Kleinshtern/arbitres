<template>
    <div class="rating-block">
        <span
            v-for="n in countFillStars" :key="n"
            class="fa-solid fa-star-sharp star"
        ></span>
        <span
            v-for="n in countHalfStars" :key="n"
            class="fa-solid fa-star-half-stroke star"
        ></span>
        <span
            v-for="n in countEmptyStars" :key="n"
            class="fa-regular fa-star-sharp star"
        ></span>

        <span>
            {{ rating }}
        </span>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {}
        },
        props: {
            rating: {
                type: Number,
                required: false,
                default: 0
            }
        },
        computed: {
            calculateRating: function () {
                return Math.ceil(this.rating * 2) / 2;
            },
            countFillStars: function () {
                return Math.trunc(this.calculateRating);
            },
            countHalfStars: function () {
                return Math.round(this.calculateRating - Math.trunc(this.calculateRating));
            },
            countEmptyStars: function () {
                return 5 - (this.countFillStars + this.countHalfStars);
            }
        }
    }
</script>

<style scoped>
    .rating-block {

        padding: 10px 0;

        display: flex;
        align-items: center;
        gap: 0.3rem;

        .star {
            color: var(--main-color);
        }
    }
</style>
