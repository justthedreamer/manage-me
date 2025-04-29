import type {RouteRecordRaw} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectView from "../views/ProjectView.vue";
import StoryView from "../views/StoryView.vue";
import ProjectAttachmentView from "../views/ProjectAttachmentView.vue";
import TestView from "../views/TestView.vue";
import LoginView from "../views/LoginView.vue";

export class Routes {
    static readonly HOME_ROUTE_RECORD: RouteRecordRaw = {
        path: "/",
        name: "Home",
        component: HomeView,
    };

    static readonly LOGIN_ROUTE_RECORD: RouteRecordRaw = {
        path: "/login",
        name: "Login",
        component: LoginView,
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
        name: "Attachment",
        component: ProjectAttachmentView,
    };

    static readonly TEST_RECORD: RouteRecordRaw = {
        path: "/test",
        name: "Test",
        component: TestView,
    }

    static readonly All: readonly RouteRecordRaw[] = [
        this.HOME_ROUTE_RECORD,
        this.LOGIN_ROUTE_RECORD,
        this.PROJECT_ROUTE_RECORD,
        this.PROJECT_STORY_ROUTE_RECORD,
        this.PROJECT_ATTACHMENT_RECORD,
        this.TEST_RECORD,
    ];
}
