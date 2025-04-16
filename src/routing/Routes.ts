import type {RouteRecordRaw} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectView from "../views/ProjectView.vue";
import ProjectAttachmentView from "../views/ProjectAttachmentView.vue";
import StoryView from "../views/StoryView.vue";

export class Routes {
    static readonly HOME_ROUTE_RECORD: RouteRecordRaw = {
        path: "/",
        name: "Home",
        component: HomeView,
    };

    static readonly PROJECT_ROUTE_RECORD: RouteRecordRaw = {
        path: "/project",
        name: "Project",
        component: ProjectView,
    };


    static readonly PROJECT_STORY_ROUTE_RECORD: RouteRecordRaw = {
        path: "/project/story/:id",
        name: "Project Story",
        component: StoryView,
        props: true
    }

    static readonly PROJECT_ATTACHMENT_RECORD: RouteRecordRaw = {
        path: "/project-attachment",
        name: "Project Attachment",
        component: ProjectAttachmentView,
    };

    static readonly All: readonly RouteRecordRaw[] = [
        this.HOME_ROUTE_RECORD,
        this.PROJECT_ROUTE_RECORD,
        this.PROJECT_STORY_ROUTE_RECORD,
        this.PROJECT_ATTACHMENT_RECORD,
    ];
}
