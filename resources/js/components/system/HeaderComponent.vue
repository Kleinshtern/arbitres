<template>
    <header id="header">
        <div class="row align-items-center">
            <div class="col-sm-4 d-flex align-items-center">
                <img
                    id="logo"
                    src="/logos/png/logo-no-background.png"
                    alt="logo"
                >
                <p class="h6 align-self-end">
                    Независимый сервис по оценке высших учебных заведений
                </p>
            </div>
            <div class="col-sm-5 d-flex justify-content-end align-items-center">
                <custom-button
                    append-icon="fa-solid fa-chevron-down"
                    prepend-icon="fa-solid fa-location-dot"
                    label="Москва"
                    color="#5280e2"
                    variant="text"
                >
                </custom-button>

                <template v-for="socialLink in socialButtonLinks">
                    <social-button :url="socialLink.url" :icon="socialLink.icon" />
                </template>

            </div>

            <div class="col-sm-3 d-flex justify-content-end align-items-center">
                <custom-button
                    prepend-icon="fa-regular fa-comment"
                    label="Оставить отзыв"
                    color="#5280e2"
                    variant="flat"
                ></custom-button>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 d-flex align-items-center" id="top-menu">
                <div class="col-sm-10 d-flex align-items-center justify-content-around">
                    <template v-for="menuItem in menuLinks" :key="menuItem.id">
                        <a class="menu-item">
                            <span class="label">{{ menuItem.title }}</span>
                        </a>
                    </template>
                </div>
                <div class="col-sm-2">

                </div>
            </div>
        </div>

    </header>
</template>

<script>
    import SocialButton from "../reusable/SocialButton.vue";
    import CustomButton from "../reusable/CustomButton.vue";

    import { defaultStore } from "../../stores/defaultStore.js";
    import {mapStores} from "pinia";

    export default {
        components: {
            CustomButton,
            SocialButton
        },
        data: () => {
            return {}
        },
        computed: {
            ...mapStores(defaultStore),

            socialButtonLinks() {
                return this.defaultStore.getSocialNetworks;
            },
            menuLinks() {
                return this.defaultStore.getMenuLinks;
            }
        }
    }
</script>
