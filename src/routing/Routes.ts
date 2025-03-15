import type {RouteRecordRaw} from "vue-router";
import HomeView from "../views/HomeView.vue";
import {readonly} from "vue";

export class Routes {
    static readonly Home: RouteRecordRaw = {
        path: "/",
        name: "HomeView",
        component: HomeView
    };

    static readonly All = readonly([Routes.Home]);
}