import {createMemoryHistory, createRouter} from "vue-router";
import {Routes} from "./Routes.ts";

const router = createRouter({
    history: createMemoryHistory(),
    routes: Routes.All
})

export default router;