import type {RouteRecordRaw} from "vue-router";
import HomeView from "../Views/HomeView.vue";
import ProjectView from "../Views/ProjectView.vue";
import ProjectAttachmentView from "../Views/ProjectAttachmentView.vue";


export class Routes {
    static readonly HOME_ROUTE_RECORD: RouteRecordRaw = {
        path: "/",
        name: "Home",
        component: HomeView
    };

    static readonly PROJECT_ROUTE_RECORD: RouteRecordRaw = {
        path: "/project",
        name: "Project",
        component: ProjectView,
    };

    static readonly PROJECT_ATTACHMENT_RECORD: RouteRecordRaw = {
        path: "/project-attachment",
        name: "Project Attachment",
        component: ProjectAttachmentView,
    }

    static readonly All: readonly RouteRecordRaw[] = [
        this.HOME_ROUTE_RECORD,
        this.PROJECT_ROUTE_RECORD,
        this.PROJECT_ATTACHMENT_RECORD];
}

