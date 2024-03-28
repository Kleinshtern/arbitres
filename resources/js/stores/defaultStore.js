import { defineStore } from "pinia";

export const defaultStore = defineStore('default', {
        state: () => ({
            cities: [
                { identifier: "Moscow", title: "Москва" }
            ],
            socialNetworks: [
                { url: "https://vk.com", icon: "fa-brands fa-vk" },
                { url: "https://telegram.org", icon: "fa-brands fa-telegram" },
                { url: "https://telegram.org", icon: "fa-brands fa-whatsapp" },
            ],
            menuLinks: [
                { id: 0, path: "", title: "Подобрать ВУЗ" },
                { id: 1, path: "", title: "Университеты" },
                { id: 2, path: "", title: "Отзывы" },
                { id: 3, path: "", title: "Блок" },
                { id: 4, path: "", title: "О сервисе" },
                { id: 5, path: "", title: "FAQ" },
                { id: 6, path: "", title: "Учебным заведениям" },
            ]
        }),
        getters: {
            getSocialNetworks: (state) => state.socialNetworks,
            getMenuLinks: (state) => state.menuLinks,
        }
    }
)
