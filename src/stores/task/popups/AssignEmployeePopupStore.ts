import {defineStore} from "pinia";
import {DoingTask, TodoTask} from "../../../model/entities/Task.ts";
import {assertProjectDefined, assertTaskDefined, assertUserDefined} from "../../../helpers/Guards.ts";
import {useUIMessageStore} from "../../common/UIMessageStore.ts";
import {useUserStore} from "../../user/UserStore.ts";
import type {User} from "../../../model/entities/User.ts";
import {projectRepository} from "../../../repositories";

interface State {
    opened: boolean;
    task: TodoTask | null;
    selectedUser: User | null;
}

const defaultState = {
    opened: false,
    task: null,
    selectedUser: null,
}

export const useAssignEmployeePopupStore = defineStore("useAssignEmployeePopupStore", {
    state(): State {
        return defaultState;
    },
    actions: {
        open(task: TodoTask) {
            this.task = task;
            this.opened = true;
        },
        close() {
            this.task = null;
            this.opened = false;
        },
        assignEmployee() {
            assertTaskDefined(this.task);
            assertUserDefined(this.selectedUser);

            const attachedProject = useUserStore().attachedProject;
            assertProjectDefined(attachedProject);
            const {story, taskIndex} = attachedProject.getStoryByTaskId(this.task.id);

            const workStartDate = new Date();
            story.tasks[taskIndex] = new DoingTask(
                this.task.id,
                this.task.name,
                this.task.description,
                this.task.priority,
                this.task.projectStoryId,
                this.task.estimatedFinishTimeHours,
                this.task.creationDate,
                workStartDate,
                this.selectedUser!);

            projectRepository.updateAttachedProject()

            useUIMessageStore().queue({
                type: "success",
                message: "Employee assigned successfully!"
            })
            this.close();
        },
    }
})