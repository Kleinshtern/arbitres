<template>
    <div class="container">
        <div class="col-md-12">
            <header-component></header-component>
        </div>
        <div class="col-md-12">
            <main>
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
                                <i :class="popularReviews.icon" class="fa-rotate-by"
                                   style="--fa-rotate-angle: -25deg; color: var(--main-color)"></i>
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
                        <slider-component
                            :items="popularReviews.reviews"
                        >
                            <template v-slot:slider-content="{ item }">
                                <p class="h6">
                                    <strong>{{ item.person }}</strong>
                                    <br>
                                    <small class="text-body-secondary">{{ item.date }}</small>
                                </p>
                                <rating-component :rating="item.rating"></rating-component>
                                <p class="lh-lg fs-6">
                                    {{ item.text }}
                                </p>
                                <p>
                                    <small class="text-body-secondary">Отзыв про:</small>
                                    <br>
                                    <strong>{{ item.university.name }}</strong>
                                </p>
                            </template>
                        </slider-component>
                    </div>
                </div>
                <div id="rating-and-found">
                    <div class="row mt-3 mb-2">
                        <div class="col-md-12 col-lg-8">
                            <div class="information">
                                <h2 class="title">
                                    Оценивайте и находите ВУЗы России!
                                </h2>
                                <p>
                                    Мы взяли за основу "сливы" о вузах, которые пользователи нашего сайта
                                    присылают нам. Слив - это развернутый отзыв о вузе, который проходит несколько
                                    этапов проверки. Слив имеет заданную характеристику.
                                    Он может быть положительным, отрицательным или нейтральным.
                                    Мы просим студентов, преподавателей, сотрудников вуза, просто людей, которые знают о
                                    вузе изнутри.
                                </p>
                            </div>
                            <div class="buttons-block">
                                <custom-button
                                    label="Оставить отзыв"
                                    color="#5280e2"
                                    variant="flat"
                                    prepend-icon="fa-solid fa-files"
                                    text-transform="default"
                                ></custom-button>
                                <custom-button
                                    label="Добавить вуз"
                                    color="#5280e2"
                                    variant="outline"
                                    prepend-icon="fa-regular fa-buildings"
                                    text-transform="default"
                                ></custom-button>
                            </div>
                            <div
                                class="cards-block mt-4 d-flex flex-md-column flex-lg-row justify-content-between gap-4">
                                <v-card
                                    title="452 851"
                                    text="Отзывов в вашем городе"
                                    prepend-icon="fa-regular fa-city"
                                    alignment="right"
                                    variant="tonal"
                                    color="#5280e2"
                                    width="33%"
                                />
                                <v-card
                                    title="22 851"
                                    text="Ответов от компаний"
                                    prepend-icon="fa-regular fa-files"
                                    alignment="right"
                                    variant="tonal"
                                    color="#5280e2"
                                    width="33%"
                                />
                                <v-card
                                    title="8 512"
                                    text="Компаний на портале"
                                    prepend-icon="fa-regular fa-user-group"
                                    alignment="right"
                                    variant="tonal"
                                    color="#5280e2"
                                    width="33%"
                                />
                            </div>
                        </div>
                        <div class="col-md-0 col-lg-4 d-md-none d-lg-block" id="rating-and-found-image"></div>
                    </div>
                </div>
                <div id="top-ten-by-ratings" class="mt-4">
                    <div class="overflow-background"></div>

                    <div class="content">
                        <div class="content-title">
                            <h1 class="title">
                    <span style="color: var(--main-color); text-transform: uppercase">
                        <i class="fa-regular fa-trophy-star"></i> Топ 10
                    </span>
                                ВУЗов по оценкам пользователей
                            </h1>
                            <p class="text-center">
                                Мы провели анализ и собрали для вас лучшие вузы по оценкам пользователей из разных
                                регионов.
                            </p>
                        </div>
                        <div class="content-body mt-5">
                            <v-table
                                :headers="headers"
                                :items="topTenTableData"
                                item-key="id"
                                hover-effect
                            >
                                <template #header.name="{ value }">
                                    {{ value }}
                                </template>
                                <template #item.name="{ value, rootState }">
                                    <div class="organization">
                                        <template v-if="rootState.logo">
                                            <img :src="rootState.logo" :alt="`${value} logo`" class="logotype-univ">
                                        </template>
                                        <span class="name-univ">
                            {{ rootState.name }}
                        </span>
                                    </div>
                                </template>
                                <template #item.world_place="{ value }">
                                    <i class="fa-solid fa-wreath-laurel" style="color: var(--main-color)"></i> {{
                                        value
                                    }}
                                </template>
                                <template #item.russian_place="{ value }">
                                    <i class="fa-solid fa-medal" style="color: var(--main-color)"></i> {{ value }}
                                </template>
                                <template #item.count_review="{ value }">
                                    <i class="fa-solid fa-files" style="color: var(--main-color)"></i> {{ value }}
                                </template>
                            </v-table>
                        </div>
                        <div class="content-footer d-flex align-items-center justify-content-center mt-4 mb-5">
                            <custom-button
                                label="Посмотреть все"
                                variant="flat"
                                color="#5280e2"
                                text-transform="none"
                            ></custom-button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import {useMainPageStore} from "../../stores/mainPageStore.js";
import CustomButton from "../reusable/CustomButton.vue";
import SliderComponent from "../reusable/SliderComponent.vue";
import RatingComponent from "../reusable/RatingComponent.vue";
import VCard from "../reusable/VCard.vue";
import VTable from "../reusable/VTable.vue";
import HeaderComponent from "../system/HeaderComponent.vue";

export default {
    components: {
        HeaderComponent,
        VTable,
        VCard,
        RatingComponent,
        SliderComponent,
        CustomButton
    },
    setup: () => {
        const store = useMainPageStore();

        return {
            store
        }
    },
    data: () => {
        return {
            headers: [
                {key: 'id', title: '№', alignment: 'center'},
                {key: 'name', title: "Название организации"},
                {key: "world_place", title: "Мировой рейтинг", alignment: 'center'},
                {key: "russian_place", title: "Российский рейтинг", alignment: 'center'},
                {key: "count_review", title: "Отзывы компании", alignment: 'center'}
            ]
        }
    },
    computed: {
        informationBlock: function () {
            return this.store.getInfoBlockData
        },
        popularReviews: function () {
            return this.store.getPopularReviews
        },
        topTenTableData: function () {
            return this.store.getTopTenTableData
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
    font-family: "Inter Black", sans-serif;
}

#rating-and-found {
    .information {
        > p {
            margin-top: 2rem;
            margin-bottom: 2rem;
        }
    }

    .buttons-block {
        display: flex;
        gap: 2rem;
    }

    #rating-and-found-image {
        height: inherit;

        background: url("/img/rating-and-found.png") no-repeat center center;
        background-size: contain;
    }
}

#top-ten-by-ratings {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    .overflow-background {
        width: 100vw;
        position: absolute;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        height: 100%;

        background: url("/img/background.jpg") no-repeat;
        background-size: cover;
        z-index: -1;
    }

    .content {
        margin-top: 100px;

        .content-title {
            text-align: center;
        }

        .content-body {
            .organization {
                margin-left: 20px;

                display: flex;
                align-items: center;
                gap: 2rem;

                .logotype-univ {
                    width: 100px;
                    height: 100px;
                    filter: grayscale(100%);
                }

                .name-univ {
                    font-family: "Inter Medium", sans-serif;
                }
            }

            tr:hover {
                .logotype-univ {
                    filter: grayscale(0%) !important;
                }
            }
        }
    }
}
</style>
