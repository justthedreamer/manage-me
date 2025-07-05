import {defineStore} from "pinia";
import {useTaskToolboxStore} from "./task-toolbox-store.ts";
import {useProjectDataStore} from "../../data/project-data-store.ts";
import taskService from "../../../services/TaskService.ts";

interface State {
    storyId: string | null,
    taskId: string | null,
    opened: boolean,
}

export const useDeleteTaskPopupStore = defineStore("deleteTaskPopupStore", {
    state(): State {
        return {
            storyId: null,
            taskId: null,
            opened: false,
        }
    },
    actions: {
        open(taskId: string) {
            this.taskId = taskId;
            this.opened = true;
        },
        close() {
            this.taskId = null;
            this.opened = false;
        },
        async deleteTask() {
            const attachedProject = useProjectDataStore().currentProjectId;
            if (!attachedProject) {
                throw new Error("Project is not attached")
            }
            if (!this.storyId) {
                throw new Error("StoryId is not provided")
            }
            if (!this.taskId) {
                throw new Error("No taskId provided")
            }
            await taskService.deleteAsync(attachedProject.id, this.storyId, this.taskId)
            useTaskToolboxStore().setTask(null);
            this.close()
        }
    }
})