import {createRouter, createWebHistory} from "vue-router";
import {Routes} from "./Routes.ts";

const router = createRouter({
    history: createWebHistory(),
    routes: Routes.All
})

export default router;