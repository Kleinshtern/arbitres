import SeoMainPage from "../../components/pages/admin/pages/seo/SeoMainPage.vue";

const children = [
    { path: "main-page", name: 'settingMainPage', component: SeoMainPage  }
];

export const pagesRoutes = {
    path: "pages",
    name: "pages",
    children: children,
    beforeEnter: function (to, from, next) {
        if(to.name === 'pages') {
            next('settingMainPage')
        }
    }
}
