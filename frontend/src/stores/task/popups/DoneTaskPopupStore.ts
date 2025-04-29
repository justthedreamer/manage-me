import {defineStore} from "pinia";
import {type DoingTask, DoneTask} from "../../../model/entities/Task.ts";
import {assertProjectDefined, assertTaskDefined} from "../../../helpers/Guards.ts";
import {useUIMessageStore} from "../../common/UIMessageStore.ts";
import {useUserStore} from "../../user/UserStore.ts";
import {useTaskToolboxStore} from "../TaskToolboxStore.ts";
import {projectRepository} from "../../../repositories";

interface DoneTaskPopupStoreState {
    opened: boolean;
    task: DoingTask | null;
}

export const useDoneTaskPopupStore = defineStore("doneTaskPopupStore", {
    state(): DoneTaskPopupStoreState {
        return {
            opened: false,
            task: null
        }
    },
    actions: {
        open(task: DoingTask) {
            this.task = task;
            this.opened = true;
        },
        close() {
            this.task = null;
            this.opened = false;
        },
        doneTask() {
            assertTaskDefined(this.task);
            const attachedProject = useUserStore().attachedProject;
            assertProjectDefined(attachedProject);
            const taskStoryAndTaskIndex = attachedProject.getStoryByTaskId(this.task.id);

            const finishDate = new Date()
            const task = new DoneTask(
                this.task.id,
                this.task.name,
                this.task.description,
                this.task.priority,
                this.task.projectStoryId,
                this.task.estimatedFinishTimeHours,
                this.task.creationDate,
                this.task.workStartDate,
                this.task.assignedUser,
                finishDate)
            taskStoryAndTaskIndex.story.tasks[taskStoryAndTaskIndex.taskIndex] = task;

            projectRepository.updateAttachedProject()

            useUIMessageStore().queue({
                type: "success",
                message: "Task updated successfully!",
            })
            useTaskToolboxStore().setTask(task)
            this.close()
        }
    }
})