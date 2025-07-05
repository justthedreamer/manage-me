import {defineStore} from "pinia";
import {useUserDataStore} from "../../data/user-data-store.ts";
import taskService from "../../../services/TaskService.ts";

interface State {
    opened: boolean;
    taskId: string | null;
    storyId: string | null;
}

export const useDoneTaskPopupStore = defineStore("doneTaskPopupStore", {
    state(): State {
        return {
            taskId: null,
            storyId: null,
            opened: false,
        }
    },
    actions: {
        open(data: { taskId: string, storyId: string }) {
            this.taskId = data.taskId;
            this.storyId = data.storyId;
            this.opened = true;
        },
        close() {
            this.taskId = null;
            this.storyId = null;
            this.opened = false;
        },
        async doneTask() {
            const attachedProject = useUserDataStore().attachedProjectId;
            if (!attachedProject) {
                throw new Error("Project is not attached.");
            }
            if (!this.taskId) {
                throw new Error("Task ID is missing.");
            }
            if (!this.storyId) {
                throw new Error("StoryId is missing.");
            }
            await taskService.setTaskDoneAsync(attachedProject, this.taskId, this.storyId);
            this.close()
        }
    }
})