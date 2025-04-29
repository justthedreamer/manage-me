import {defineStore} from "pinia";
import type {User} from "../../model/entities/User.ts";
import type {UUIDTypes} from "uuid";
import {Project} from "../../model/entities/Project.ts";
import {projectRepository} from "../../repositories";
import {useUIMessageStore} from "../common/UIMessageStore.ts";
import {ErrorUIMessage, SuccessUIMessage} from "../../model/UIMessage.ts";
import {assertUserDefined} from "../../helpers/Guards.ts";
import {devopsUserMock} from "../../mocks/UserMocks.ts";

interface State {
    user: User | null;
    attachedProject: Project | null;
}

export const useUserStore = defineStore("userStore", {
    state: (): State => {
        return {
            user: devopsUserMock,
            attachedProject: null,
        };
    },
    getters: {
        associatedProjects(): Project[] {
            return projectRepository.getAll();
        },
        isLoggedIn(): boolean {
            return this.user !== null;
        }
    },
    actions: {
        fetchAttachedProject() {
            this.attachedProject = projectRepository.getAll().find(project => project.id === this.user?.attachedProjectId) ?? null;
        },
        login() {
            this.user = devopsUserMock;
            this.fetchAttachedProject();
        },
        logout() {
            this.user = null;
            this.attachedProject = null;
        },
        attachProject(projectId: UUIDTypes) {
            try {
                assertUserDefined(this.user)
                this.user.attachedProjectId = projectId;
                this.fetchAttachedProject()
                useUIMessageStore().queue(new SuccessUIMessage("Project attached successfully!"))
            } catch {
                useUIMessageStore().queue(new ErrorUIMessage("You are not logged in."));
            }
        }
    },
});