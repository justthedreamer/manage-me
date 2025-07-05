import {defineStore} from "pinia";
import {ATTACHED_PROJECT_ID_KEY} from "../../config/LocalstorageKeys.ts";

export interface State {
    currentProjectId: string | null;
}

export const useProjectDataStore = defineStore("project-data-store", {
    state(): State {
        return {
            currentProjectId: null,
        }
    },
    actions: {
        restore() {
            this.currentProjectId = localStorage.getItem(ATTACHED_PROJECT_ID_KEY)
        },
        setCurrentProject(projectId: string | null) {
            if (projectId) {
                localStorage.setItem(ATTACHED_PROJECT_ID_KEY, projectId)
            } else {
                localStorage.removeItem(ATTACHED_PROJECT_ID_KEY);
            }
            this.currentProjectId = projectId;
        },
    }
})