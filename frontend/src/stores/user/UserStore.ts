import {defineStore} from "pinia";
import type {User} from "../../model/entities/User.ts";
import type {UUIDTypes} from "uuid";
import {Project} from "../../model/entities/Project.ts";
import {projectRepository} from "../../repositories";
import {useUIMessageStore} from "../common/UIMessageStore.ts";
import {ErrorUIMessage, SuccessUIMessage} from "../../model/UIMessage.ts";
import {assertUserDefined} from "../../helpers/Guards.ts";
import {ATTACHED_PROJECT_ID_KEY} from "../../config/LocalstorageKeys.ts";

interface State {
    user: User | null;
    attachedProject: Project | null;
}

export const useUserStore = defineStore("userStore", {
    state: (): State => {
        return {
            user: null,
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
        fetchAttachedProject(): void {
            if (this.user) {
                const id = localStorage.getItem(ATTACHED_PROJECT_ID_KEY)
                this.attachedProject = projectRepository.getAll().find(project => project.id === id) ?? null;
                this.user.attachedProjectId = id;
            }
        },
        setUser(user: User | null): void {
            this.user = user;

            if (this.user) {
                this.fetchAttachedProject();
            } else {
                this.attachedProject = null;
            }
        },
        attachProject(projectId: UUIDTypes) {
            try {
                assertUserDefined(this.user)
                this.user.attachedProjectId = projectId;
                localStorage.setItem(ATTACHED_PROJECT_ID_KEY, projectId.toString());
                this.fetchAttachedProject();
                useUIMessageStore().queue(new SuccessUIMessage("Project attached successfully!"))
            } catch (error) {
                useUIMessageStore().queue(new ErrorUIMessage("You are not logged in."));
            }
        }
    },
});