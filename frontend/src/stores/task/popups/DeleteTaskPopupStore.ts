import {defineStore} from "pinia";
import type {Task} from "../../../model/entities/Task.ts";
import {assertProjectDefined, assertTaskDefined} from "../../../helpers/Guards.ts";
import {NotFoundError} from "../../../errors/NotFoundError.ts";
import {useUIMessageStore} from "../../common/UIMessageStore.ts";
import {useUserStore} from "../../user/UserStore.ts";
import {projectRepository} from "../../../repositories";
import {useTaskToolboxStore} from "../TaskToolboxStore.ts";

interface State {
    task: Task | null,
    opened: boolean,
}

export const useDeleteTaskPopupStore = defineStore("deleteTaskPopupStore", {
    state(): State {
        return {
            task: null,
            opened: false,
        }
    },
    actions: {
        open(task: Task) {
            this.task = task;
            this.opened = true;
        },
        close() {
            this.task = null;
            this.opened = false;
        },
        deleteTask() {
            assertTaskDefined(this.task);

            const attachedProject = useUserStore().attachedProject;
            assertProjectDefined(attachedProject);
            const {story, taskIndex} = attachedProject.getStoryByTaskId(this.task.id);

            if (taskIndex !== -1) {
                story.tasks.splice(taskIndex, 1);
            } else {
                throw new NotFoundError("Task index not found in the story.");
            }

            projectRepository.updateAttachedProject();

            useUIMessageStore().queue({
                type: "success",
                message: "Task deleted successfully!",
            })
            useTaskToolboxStore().setTask(null);
            this.close()
        }
    }
})