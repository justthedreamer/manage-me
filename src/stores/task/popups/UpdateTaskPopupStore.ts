import {defineStore} from "pinia";
import type {Task} from "../../../model/entities/Task.ts";
import {Priority} from "../../../model/enums/Priority.ts";
import taskValidator from "../../../validation/validators/TaskValidator.ts";
import {useUIMessageStore} from "../../common/UIMessageStore.ts";
import {assertTaskDefined} from "../../../helpers/Guards.ts";
import {projectRepository} from "../../../repositories";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";

interface State {
    opened: boolean,
    task: Task | null,
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
        task: null,
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
        open(task: Task) {
            this.task = task
            Object.assign(this.$state.fields, task)
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
        submit() {
            if (!this.validate()) return;
            assertTaskDefined(this.task)
            this.task.name = this.fields.name;
            this.task.description = this.fields.description;
            this.task.estimatedFinishTime = this.fields.estimatedFinishTime;
            this.task.priority = this.fields.priority;
            projectRepository.updateAttachedProject()
            const uiStore = useUIMessageStore();
            uiStore.queue({
                type: "success",
                message: "task updated successfully!",
            })
            this.close()
        }
    }
})