import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"
import * as bootstrap from "bootstrap"
import "./style.scss";
import App from "./App.vue";
import {createApp} from "vue";
import {createPinia} from "pinia";
import {seedProjectsInLocalStorage} from "./seed/LocalStorageSeeds.ts";
import router from "./routing/Router";

export {bootstrap};

const pinia = createPinia();
const app = createApp(App);

seedProjectsInLocalStorage();

app.use(pinia);
app.use(router);

app.mount("#app");

