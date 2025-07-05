import {defineStore} from "pinia";
import {Priority} from "../../../enums/Priority.ts";
import taskValidator from "../../../validation/validators/TaskValidator.ts";
import {EmployeeAssignmentOptions} from "../../../enums/EmployeeAssigmentOption.ts";
import type {User} from "../../../types/User.ts";
import {handleValidationErrors} from "../../../validation/utils/ValidationUtilities.ts";
import taskService from "../../../services/TaskService.ts";
import {useProjectDataStore} from "../../data/project-data-store.ts";
import type {CreateTaskRequest} from "../../../api/requests/create-task-request.ts";

export interface State {
    opened: boolean;
    storyId: string | null;
    fields: {
        name: string,
        description: string,
        priority: Priority,
        estimatedFinishTimeHours: number
        assignmentOption: EmployeeAssignmentOptions
        selectedEmployee: User | null
    };
    errors: {
        name: string,
        description: string,
        estimatedFinishTime: string,
        assignmentOption: string
    };
}

const initialState = (): State => {
    return {
        opened: false,
        storyId: null,
        fields: {
            name: "",
            description: "",
            priority: Priority.LOW,
            estimatedFinishTimeHours: 0,
            assignmentOption: EmployeeAssignmentOptions.NONE,
            selectedEmployee: null,
        },
        errors: {
            name: "",
            description: "",
            estimatedFinishTime: "",
            assignmentOption: "",
        }
    }
}

export const useCreateTaskFormStore = defineStore("createTaskFormStore", {
    state(): State {
        return initialState();
    },
    actions: {
        open(storyId: string) {
            this.storyId = storyId;
            this.opened = true;
        },
        close() {
            this.opened = false;
            this.storyId = null;
            this.$reset()
        },
        clearError(error: keyof typeof this.errors) {
            this.errors[error] = '';
        },
        getRequest(): CreateTaskRequest {
            const {name, description, priority, estimatedFinishTimeHours, selectedEmployee} = this.fields;
            return {
                name: name,
                description: description,
                priority: priority,
                estimatedFinishTimeHours: estimatedFinishTimeHours,
                assignedUserId: selectedEmployee?.id ?? null,
            }
        },
        validate(): boolean {
            const validationErrors = taskValidator.validateAll({
                name: this.fields.name,
                description: this.fields.description,
                estimatedFinishTime: this.fields.estimatedFinishTimeHours
            })

            let validationResult = handleValidationErrors(validationErrors, this.errors)

            if (this.fields.assignmentOption === EmployeeAssignmentOptions.EMPLOYEE && !this.fields.selectedEmployee) {
                this.errors.assignmentOption = "You must select an employee from list above."
                validationResult = false;
            }

            return validationResult;
        },
        async submit() {
            if (!this.validate()) return;
            const attachedProject = useProjectDataStore().currentProjectId;
            if (!attachedProject) {
                throw new Error("Project is not attached.")
            }
            if (!this.storyId) {
                throw new Error("Story id is not defined.")
            }

            const createTaskRequest = this.getRequest();
            await taskService.createAsync(attachedProject.id, this.storyId, createTaskRequest)
            this.close()
        }
    }
})