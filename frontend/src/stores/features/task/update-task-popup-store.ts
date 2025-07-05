import {defineStore} from "pinia";
import {Priority} from "../../../enums/Priority.ts";
import taskValidator from "../../../validation/validators/TaskValidator.ts";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";
import {useUserDataStore} from "../../data/user-data-store.ts";
import taskService from "../../../services/TaskService.ts";

interface State {
    opened: boolean,
    taskId: string | null,
    storyId: string | null,
    fields: {
        name: string,
        description: string,
        priority: Priority;
        estimatedFinishTime: number;
    },
    errors: {
        name: string,
        description: string,
        priority: string,
        estimatedFinishTime: string
    },
}

const initialState = (): State => {
    return {
        opened: false,
        taskId: null,
        storyId: null,
        fields: {
            name: "",
            description: "",
            priority: Priority.LOW,
            estimatedFinishTime: 0,
        },
        errors: {
            name: "",
            description: "",
            priority: "",
            estimatedFinishTime: "",
        }
    }
}

export const useUpdateTaskPopupStore = defineStore("updateTaskBaseInfoFormStore", {
    state(): State {
        return initialState();
    },
    actions: {
        open(data: { taskId: string, storyId: string }) {
            this.taskId = data.taskId;
            this.storyId = data.storyId;
            this.opened = true
        },
        close() {
            this.$reset()
            this.opened = false;
        },
        clearError(error: keyof typeof this.errors) {
            this.errors[error] = '';
        },
        validate() {
            const validationErrors = taskValidator.validateAll({
                name: this.fields.name,
                description: this.fields.description,
                estimatedFinishTime: this.fields.estimatedFinishTime
            })
            return handleValidationErrors(validationErrors, this.errors)
        },
        // todo: consider moving to the component
        async submit() {
            if (!this.validate()) return;
            const attachedProjectId = useUserDataStore().attachedProjectId;
            if (!attachedProjectId) {
                throw new Error("Attempted projectId is required");
            }
            if (!this.taskId) {
                throw new Error("Task ID is required");
            }
            if (!this.storyId) {
                throw new Error("StoryId is required");
            }
            await taskService.updateTaskAsync(attachedProjectId, this.storyId, this.taskId, {
                name: this.fields.name,
                description: this.fields.description,
                priority: this.fields.priority,
                estimatedFinishTimeHours: this.fields.estimatedFinishTime,
            })
            this.close()
        }
    }
})