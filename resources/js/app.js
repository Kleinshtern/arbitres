import './bootstrap';

import { router } from "./router.js";
import {createApp, markRaw} from "vue";
import { createPinia } from "pinia";
import App from "./components/App.vue";
import {authenticateStore} from "./stores/authenticateStore.js";

const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
pinia.use(({store}) => {
    store.$router = markRaw(router);
})
const authStore = authenticateStore();
authStore.checkAuth().then(r => {
    app.use(router);
    app.mount("#app");
});

